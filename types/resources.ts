export type Resource = {
  id: string
  title: string
  description: string
  category: 'support' | 'therapy' | 'clinics' | 'info'
  link?: string
  location?: string
  contact?: string
} 