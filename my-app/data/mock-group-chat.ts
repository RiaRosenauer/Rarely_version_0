import { GroupChat } from '@/types/groupChat'

export const mockGroupChat: GroupChat = {
  id: '1',
  name: 'Chronic Pain Support',
  description: 'Share experiences and tips for managing chronic pain',
  imageUrl: '/placeholder.svg?height=48&width=48',
  messages: [
    {
      id: '1',
      content: 'Has anyone tried acupuncture for chronic pain management?',
      sender: {
        id: 'user1',
        name: 'Sarah Johnson',
        imageUrl: '/placeholder.svg?height=32&width=32'
      },
      timestamp: new Date('2024-01-04T14:00:00')
    },
    {
      id: '2',
      content: 'Yes! I\'ve been doing it for 6 months and it\'s helped a lot with my back pain.',
      sender: {
        id: 'user2',
        name: 'Mike Wilson',
        imageUrl: '/placeholder.svg?height=32&width=32'
      },
      timestamp: new Date('2024-01-04T14:05:00')
    },
    {
      id: '3',
      content: 'Could you recommend your acupuncturist? I\'m looking to try it.',
      sender: {
        id: 'user3',
        name: 'Emily Chen',
        imageUrl: '/placeholder.svg?height=32&width=32'
      },
      timestamp: new Date('2024-01-04T14:10:00')
    }
  ]
}

export const mockPrivateChat: GroupChat = {
  id: 'private1',
  name: 'Dr. Sarah Johnson',
  description: 'Private conversation',
  imageUrl: '/placeholder.svg?height=40&width=40',
  messages: [
    {
      id: 'p1',
      content: 'How are you feeling today?',
      sender: {
        id: 'doctor1',
        name: 'Dr. Sarah Johnson',
        imageUrl: '/placeholder.svg?height=32&width=32'
      },
      timestamp: new Date('2024-01-04T21:55:00')
    },
    {
      id: 'p2',
      content: 'Much better, the new medication seems to be helping',
      sender: {
        id: 'currentUser',
        name: 'You',
        imageUrl: '/placeholder.svg?height=32&width=32'
      },
      timestamp: new Date('2024-01-04T21:56:00')
    },
    {
      id: 'p3',
      content: 'That\'s great to hear! Any side effects?',
      sender: {
        id: 'doctor1',
        name: 'Dr. Sarah Johnson',
        imageUrl: '/placeholder.svg?height=32&width=32'
      },
      timestamp: new Date('2024-01-04T21:57:00')
    }
  ]
}

export const mockDiscussionChat: GroupChat = {
  id: 'discussion1',
  name: 'New research on chronic pain management',
  description: 'Discussion in Chronic Pain Support group',
  imageUrl: '/placeholder.svg?height=48&width=48',
  messages: [
    {
      id: 'd1',
      content: 'Has anyone seen the new research paper on chronic pain management published in Nature?',
      sender: {
        id: 'user4',
        name: 'Dr. James Wilson',
        imageUrl: '/placeholder.svg?height=32&width=32'
      },
      timestamp: new Date('2024-01-04T15:00:00')
    },
    {
      id: 'd2',
      content: 'Yes! The findings about neuroplasticity are fascinating.',
      sender: {
        id: 'user5',
        name: 'Lisa Chen',
        imageUrl: '/placeholder.svg?height=32&width=32'
      },
      timestamp: new Date('2024-01-04T15:05:00')
    }
  ]
} 