import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Langfuse } from 'langfuse';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
  secretKey: process.env.LANGFUSE_SECRET_KEY!,
  baseUrl: process.env.LANGFUSE_BASE_URL
});

const MAX_TOKENS = 200; // Adjust based on your needs
const MEMORY_WINDOW = 10; // Number of recent messages to keep in full
let systemPrompt = `
You are Jona, a knowledgeable and compassionate ACM (Arrhythmogenic Cardiomyopathy) specialist.
Respond to queries with accurate information about ACM, its symptoms, management, and treatment options.
Keep answers short and concise, strictly under 50 words.
If your response exceeds 50 words, truncate it appropriately.
Always use markdown for formatting. 
Provide a disclaimer for medical advice and recommend consulting a specialist.
`;


// Add rate limiting configuration
const RATE_LIMIT = 5; // messages per minute
const RATE_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds

// Store request timestamps by IP
const requestLog = new Map<string, number[]>();

// Add this function to handle rate limiting
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestLog.get(ip) || [];
  
  // Clean old requests
  const recentRequests = userRequests.filter(
    timestamp => now - timestamp < RATE_WINDOW
  );
  
  // Check if rate limit is exceeded
  if (recentRequests.length >= RATE_LIMIT) {
    return true;
  }
  
  // Update requests log
  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return false;
}

async function summarizeMessages(messages: any[]) {
  try {
    const conversation = messages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Please provide a brief, informative summary of the key points from this conversation. Focus on the most important information that would be relevant for continuing the discussion."
        },
        {
          role: "assistant",
          content: conversation
        }
      ],
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Summarization error:', error);
    return 'Error summarizing previous conversation.';
  }
}

export async function POST(req: Request) {
  const headersList = headers();
  const ip = headersList.get('x-forwarded-for') || 'unknown';

  const trace = langfuse.trace({
    id: `chat-${Date.now()}`,
    userId: ip,
    metadata: { 
      source: 'chat-api',
      environment: process.env.NODE_ENV
    },
    tags: ['acm-chat']
  });

  try {
    // Rate limit check
    if (isRateLimited(ip)) {
      trace.update({ 
        name: 'rate_limited',
        output: { error: 'Rate limit exceeded' },
      });
      return NextResponse.json(
        { 
          message: "You've reached the message limit for the demo. Unfortunately the API bill will drown us otherwise:(",
          error: 'Rate limit exceeded' 
        },
        { status: 429 }
      );
    }

    const { messages, documentContext } = await req.json();

    // Track message summarization if needed
    let processedMessages = [...messages];
    if (messages.length > MEMORY_WINDOW) {
      const oldMessages = messages.slice(0, -1);
      const lastMessage = messages[messages.length - 1];
      
      const summarySpan = trace.span({
        name: 'summarize_messages',
        input: { messages: oldMessages },
        metadata: { messageCount: oldMessages.length }
      });
      
      const summary = await summarizeMessages(oldMessages);
      
      summarySpan.end({
        output: { summary },
        level: summary ? 'DEFAULT' : 'ERROR'
      });
      
      processedMessages = [
        { role: "assistant", content: `Previous conversation summary: ${summary}` },
        lastMessage
      ];
    }

    const generation = trace.generation({
      name: 'chat_completion',
      model: "gpt-4o-mini",
      modelParameters: {
        temperature: 0.7,
        max_tokens: MAX_TOKENS,
      },
      input: {
        system_prompt: systemPrompt,
        messages: processedMessages,
        document_context: documentContext
      },
      metadata: {
        hasContext: !!documentContext,
        messageCount: processedMessages.length,
        totalTokens: processedMessages.reduce((acc, msg) => acc + msg.content.length, 0)
      }
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: MAX_TOKENS,
      messages: [
        { role: "system", content: systemPrompt },
        ...processedMessages
      ],
    });

    generation.end({ 
      output: {
        completion: completion.choices[0].message.content,
        usage: completion.usage,
        finish_reason: completion.choices[0].finish_reason
      }
    });

    trace.update({
      name: 'success',
      output: { status: 'Chat completion successful' },
    });

    return NextResponse.json({
      message: completion.choices[0].message.content
    });

  } catch (error) {
    // Now trace is in scope
    trace.update({
      name: 'error',
      output: { error: error instanceof Error ? error.message : 'Unknown error' },
    });
    
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat' },
      { status: 500 }
    );
  }
}