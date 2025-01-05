import { Message } from '../types/chat'

export const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hi! I'm glad you care about your health.",
    sender: 'bot',
    timestamp: new Date('2024-01-04T14:00:00'),
  },
  {
    id: '2',
    content: 'What do you think is important for staying healthy?',
    sender: 'bot',
    timestamp: new Date('2024-01-04T14:01:00'),
  },
  {
    id: '3',
    content: 'Hi! I think exercising, eating right and going to the doctor regularly',
    sender: 'user',
    timestamp: new Date('2024-01-04T14:02:00'),
  },
  {
    id: '4',
    content: 'By the way, do you vaccinate?',
    sender: 'bot',
    timestamp: new Date('2024-01-04T14:03:00'),
  },
  {
    id: '5',
    content: 'Of course! Vaccines stop diseases from spreading and keep people healthy',
    sender: 'user',
    timestamp: new Date('2024-01-04T14:04:00'),
  },
]

