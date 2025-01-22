export type Group = {
  id: string
  name: string
  description: string
  imageUrl: string
  lastActivity: Date
  memberCount: number
  unreadCount?: number
}

export type Discussion = {
  id: string
  title: string
  group: Group
  messageCount: number
  lastUpdated: Date
}

export type PrivateChat = {
  id: string
  userId: string
  userName: string
  userImage: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
}

