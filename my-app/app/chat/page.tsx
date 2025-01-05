'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Heart, Paperclip, Send } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { initialMessages } from '@/data/mock-messages'
import type { Message } from '@/types/chat'
import Image from 'next/image'

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate bot response - replace with actual API call later
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for sharing! Taking care of your health is very important.",
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b">
        <Link href="/" className="text-[#473F63]">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-medium text-[#473F63]">Chat with AI bot</h1>
        <div className="text-sm font-medium text-[#473F63]">Health Care</div>
      </div>

      {/* Logo */}
      <div className="flex justify-center items-center py-6">
        <Image 
          src="/logo_purple.png" 
          alt="Logo" 
          width={80}
          height={80}
          priority
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-[#E6E3FD] text-[#473F63]'
                  : 'bg-[#DEEAE5] text-[#1E4D57]'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-[#DEEAE5] text-[#1E4D57] rounded-2xl px-4 py-2">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t p-4 bg-white">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[#473F63]"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-white border-[#E6E3FD] focus-visible:ring-[#473F63]"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="text-[#473F63]"
            disabled={!newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </form>
    </div>
  )
}

