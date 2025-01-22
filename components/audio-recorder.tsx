'use client'

import { useEffect, useRef } from 'react'

interface AudioRecorderProps {
  onStop: (blob: Blob) => void;
  isRecording: boolean;
}

export default function AudioRecorder({ onStop, isRecording }: AudioRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const initRecorder = async () => {
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(streamRef.current);
        
        mediaRecorderRef.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          onStop(blob);
          chunksRef.current = [];
          // Stop all tracks
          streamRef.current?.getTracks().forEach(track => track.stop());
        };

        if (isRecording) {
          mediaRecorderRef.current.start();
        }
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    };

    if (isRecording) {
      initRecorder();
    }

    return () => {
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, [isRecording, onStop]);

  return null;
} 