import { Group, Discussion, PrivateChat } from '../types/forum'

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Chronic Pain Support',
    description: 'Share experiences and tips for managing chronic pain',
    imageUrl: '/placeholder.svg?height=48&width=48',
    lastActivity: new Date('2024-01-04T21:48:00'),
    memberCount: 1234,
    unreadCount: 3
  },
  {
    id: '2',
    name: 'Treatment Discussions',
    description: 'Discussion about various treatment options',
    imageUrl: '/placeholder.svg?height=48&width=48',
    lastActivity: new Date('2024-01-04T15:30:00'),
    memberCount: 856
  },
  {
    id: '3',
    name: 'Daily Wellness Tips',
    description: 'Daily tips for maintaining wellness',
    imageUrl: '/placeholder.svg?height=48&width=48',
    lastActivity: new Date('2024-01-03T19:20:00'),
    memberCount: 2341,
    unreadCount: 1
  }
]

export const mockDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'New research on chronic pain management',
    group: mockGroups[0],
    messageCount: 15,
    lastUpdated: new Date('2024-01-04T22:00:00')
  },
  {
    id: '2',
    title: 'Share your wellness journey',
    group: mockGroups[2],
    messageCount: 8,
    lastUpdated: new Date('2024-01-04T21:30:00')
  }
]

export const mockPrivateChats: PrivateChat[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Dr. Sarah Johnson',
    userImage: '/placeholder.svg?height=40&width=40',
    lastMessage: 'How are you feeling today?',
    lastMessageTime: new Date('2024-01-04T21:55:00'),
    unreadCount: 2
  },
  {
    id: '2',
    userId: '2',
    userName: 'Support Coach Mike',
    userImage: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Great progress on your exercises!',
    lastMessageTime: new Date('2024-01-04T20:30:00'),
    unreadCount: 0
  }
]

