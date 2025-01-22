import { NextResponse } from 'next/server';

const OCR_API_KEY = process.env.OCR_API_KEY;
const OCR_API_URL = 'https://api.ocr.space/parse/image';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to base64
    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');

    // Prepare OCR.space request
    const ocrFormData = new FormData();
    ocrFormData.append('base64Image', `data:${file.type};base64,${base64Data}`);
    ocrFormData.append('language', 'eng');
    ocrFormData.append('isOverlayRequired', 'false');
    ocrFormData.append('filetype', file.type.split('/')[1]); // Extract extension from mime type
    ocrFormData.append('OCREngine', '2'); // Using OCR Engine 2 for better results

    const response = await fetch(OCR_API_URL, {
      method: 'POST',
      headers: {
        'apikey': OCR_API_KEY || '',
      },
      body: ocrFormData,
    });

    if (!response.ok) {
      throw new Error('OCR API request failed');
    }

    const result = await response.json();
    
    if (result.ErrorMessage || result.IsErroredOnProcessing) {
      throw new Error(result.ErrorMessage || 'OCR processing failed');
    }

    // Extract text from all parsed results
    const text = result.ParsedResults
      ?.map((result: any) => result.ParsedText)
      .join('\n') || '';

    return NextResponse.json({ text });

  } catch (error) {
    console.error('OCR Error:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
} 