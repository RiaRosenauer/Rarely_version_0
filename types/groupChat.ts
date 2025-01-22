export type GroupChatMessage = {
  id: string
  content: string
  sender: {
    id: string
    name: string
    imageUrl?: string
  }
  timestamp: Date
}

export type GroupChat = {
  id: string
  name: string
  description: string
  imageUrl: string
  messages: GroupChatMessage[]
} 