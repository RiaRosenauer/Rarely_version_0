'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Paperclip, Send } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getChatById } from '@/data/mock-data'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarImage } from '@radix-ui/react-avatar'
import { useUser } from "@/contexts/UserContext"

export default function ChatPage() {
  const params = useParams()
  const chatId = params.id as string
  const chatData = getChatById(chatId)
  const { userData } = useUser()
  
  const [messages, setMessages] = useState(chatData?.messages || [])
  const [newMessage, setNewMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: 'currentUser',
        name: userData?.name || 'user',
        imageUrl: '/icons/avatar-current.svg'
      },
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMsg])
    setNewMessage('')
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Mock message for file attachment
      const newMsg = {
        id: Date.now().toString(),
        content: `📎 Attached file: ${file.name}`,
        sender: {
          id: 'currentUser',
          name: userData?.name || 'user',
          imageUrl: '/icons/avatar-current.svg'
        },
        timestamp: new Date(),
        attachment: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      }
      setMessages(prev => [...prev, newMsg])
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  if (!chatData) return <div>Chat not found</div>

  const chatName = (chatData.type === 'private' && 'user' in chatData
    ? chatData.user.name 
    : chatData.type === 'discussion' && 'title' in chatData
    ? chatData.title
    : 'name' in chatData
    ? chatData.name
    : 'Unknown Chat') as string

  const chatDescription = chatData.type === 'private' && 'user' in chatData
    ? `Private conversation with ${chatData.user.name}`
    : 'description' in chatData
    ? chatData.description
    : ''

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E3D7F4] via-[#f0e9fa] to-[#f8f8fa]">
      {/* Header */}
      <div className="p-6 pb-12">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <Link href="/forum" className="text-[#3a2a76]">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-black mb-1">{chatName}</h1>
              <p className="text-sm text-[#1E4D57]">{chatDescription}</p>
            </div>
          </div>
          <Avatar className="h-8 w-8 overflow-hidden">
            <AvatarImage 
              src={'imageUrl' in chatData ? chatData.imageUrl : undefined} 
              alt={chatName} 
              className="object-cover w-full h-full rounded-full"
            />
            <AvatarFallback>{chatName.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${
              message.sender.id === 'currentUser' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender.id !== 'currentUser' && (
              <Avatar className="w-8 h-8 overflow-hidden">
                <AvatarImage 
                  src={message.sender.imageUrl} 
                  alt={message.sender.name} 
                  className="object-cover w-full h-full rounded-full"
                />
                <AvatarFallback>{message.sender.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2.5 ${
                message.sender.id === 'currentUser'
                  ? 'bg-[#9F8DC7] text-white'
                  : 'bg-white/95 text-[#3a2a76]'
              } shadow-sm backdrop-blur-sm`}
            >
              {message.content}
              <div className={`text-xs mt-1 ${
                message.sender.id === 'currentUser'
                  ? 'text-white/80'
                  : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
            {message.sender.id === 'currentUser' && (
              <Avatar className="w-8 h-8 overflow-hidden">
                <AvatarImage 
                  src={message.sender.id === 'currentUser' ? '/icons/avatar-current.svg' : message.sender.imageUrl} 
                  alt={message.sender.id === 'currentUser' ? (userData?.name || 'user') : message.sender.name} 
                  className="object-cover w-full h-full rounded-full"
                />
                <AvatarFallback>
                  {message.sender.id === 'currentUser' 
                    ? (userData?.name || 'user').slice(0, 2)
                    : message.sender.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="bg-white/95 shadow-sm backdrop-blur-sm rounded-3xl p-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-[#3a2a76]"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-[#3a2a76]/20 focus-visible:ring-[#3a2a76]"
            />
            <Button
              type="submit"
              size="sm"
              className="bg-[#3a2a76] hover:bg-[#a680db] text-white"
              disabled={!newMessage.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
} 