// Define users for consistent reference
const users = {
  currentUser: {
    id: 'currentUser',
    name: 'user',
    imageUrl: '/icons/avatar-current.svg'
  },
  olaf: {
    id: 'user2',
    name: 'Olaf',
    imageUrl: '/icons/olaf.jpg',
},
  maria: {
    id: 'user1',
    name: 'Maria',
    imageUrl: '/icons/maria.jpg',
},
  emily: {
    id: 'user3',
    name: 'Emily Chen',
    imageUrl: '/icons/avatar-3.jpg'
  },
  drWilson: {
    id: 'user4',
    name: 'James Wilson',
    imageUrl: '/icons/avatar-4.jpg'
  },
  lisa: {
    id: 'user5',
    name: 'Lisa Chen',
    imageUrl: '/icons/avatar-5.jpg'
  }
}

export const mockData = {
  groups: [
    {
      id: '1',
      type: 'group',
      name: 'ACM Support Community',
      description: 'Share experiences and support for living with ACM/ARVC',
      imageUrl: '/icons/support_community.jpg',
      memberCount: 21,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
      unreadCount: 3,
      messages: [
        {
          id: '1',
          content: 'Has anyone had experience with ICD implantation recovery?',
          sender: users.currentUser,
          timestamp: new Date('2024-01-04T14:00:00')
        },
        {
          id: '2',
          content: 'Yes, I had mine implanted 6 months ago. Recovery was smooth - back to normal activities within weeks.',
          sender: users.olaf,
          timestamp: new Date('2024-01-04T14:05:00')
        },
        {
          id: '3',
          content: 'I had mine done last year. The first few days were uncomfortable but it gets better quickly.',
          sender: users.emily,
          timestamp: new Date('2024-01-04T14:10:00')
        }
      ]
    },
    {
      id: '2',
      type: 'group',
      name: 'Treatment & Medications',
      description: 'Discussions about ACM treatments, medications, and ICD management',
      imageUrl: '/icons/medication.jpeg',
      memberCount: 32,
      lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000),
      messages: [
        {
          id: 't1',
          content: 'Has anyone experienced side effects with beta blockers? My doctor just increased my dose.',
          sender: users.emily,
          timestamp: new Date('2024-01-04T10:00:00')
        },
        {
          id: 't2',
          content: 'I had some fatigue initially but it improved after a few weeks. Make sure to stay hydrated!',
          sender: users.maria,
          timestamp: new Date('2024-01-04T10:15:00')
        },
        {
          id: 't3',
          content: 'The adjustment period is normal. If side effects persist beyond 2-3 weeks, consult your doctor.',
          sender: users.drWilson,
          timestamp: new Date('2024-01-04T10:30:00')
        }
      ]
    },
    {
      id: '3',
      type: 'group',
      name: 'Exercise & Lifestyle',
      description: 'Safe exercise guidelines and lifestyle modifications for ACM patients',
      imageUrl: '/icons/workout.jpg',
      memberCount: 41,
      lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unreadCount: 1,
      messages: [
        {
          id: 'e1',
          content: 'Looking for recommendations for low-intensity cardio exercises that are safe for ACM patients.',
          sender: users.currentUser,
          timestamp: new Date('2024-01-03T15:00:00')
        },
        {
          id: 'e2',
          content: 'I do yoga and light swimming. Both are great for staying active while maintaining safe heart rates.',
          sender: users.lisa,
          timestamp: new Date('2024-01-03T15:10:00')
        },
        {
          id: 'e3',
          content: 'Walking is also excellent. Start with 15-20 minutes and gradually increase as comfortable.',
          sender: users.olaf,
          timestamp: new Date('2024-01-03T15:15:00')
        },
        {
          id: 'e4',
          content: 'Remember to always monitor your heart rate and stop if you feel any discomfort.',
          sender: users.drWilson,
          timestamp: new Date('2024-01-03T15:20:00')
        }
      ]
    }
  ],

  privateChats: [
    {
      id: 'private1',
      type: 'private',
      user: users.olaf,
      lastMessage: 'Hey, I saw your question about ICD recovery in the main group.',
      lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
      unreadCount: 2,
      messages: [
        {
          id: 'o1',
          content: 'Hey, I saw your question about ICD recovery in the main group.',
          sender: users.olaf,
          timestamp: new Date('2024-01-04T14:30:00')
        },
        {
          id: 'o2',
          content: 'Thanks for reaching out! Would love to hear more about your experience.',
          sender: users.currentUser,
          timestamp: new Date('2024-01-04T14:32:00')
        }
      ]
    },
    {
      id: 'private2',
      type: 'private',
      user: users.maria,
      lastMessage: 'Hi! I noticed you\'re new to the group. Welcome!',
      lastMessageTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
      unreadCount: 0,
      messages: [
        {
          id: 'm1',
          content: 'Hi! I noticed you\'re new to the group. Welcome!',
          sender: users.maria,
          timestamp: new Date('2024-01-04T16:00:00')
        },
        {
          id: 'm2',
          content: 'Thank you Maria! Yes, just joined yesterday.',
          sender: users.currentUser,
          timestamp: new Date('2024-01-04T16:05:00')
        }
      ]
    }
  ]
}

// Helper functions to get data for different views
export const getGroupById = (id: string) => 
  mockData.groups.find(g => g.id === id)


export const getPrivateChatById = (id: string) =>
  mockData.privateChats.find(p => p.id === id)

export const getChatById = (id: string) => {
  return getGroupById(id) || getPrivateChatById(id)
} 