export type Message = {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export type ChatState = {
  messages: Message[]
  isTyping: boolean
}

