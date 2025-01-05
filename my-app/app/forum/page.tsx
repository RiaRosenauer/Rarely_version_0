'use client'

import { Suspense, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, MessageCircle, Users } from 'lucide-react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { colors } from '@/styles/colors'
import { useSearchParams, useRouter } from 'next/navigation'


type Group = {
  id: string
  name: string
  description: string
  imageUrl: string
  lastActivity: Date
  memberCount: number
  unreadCount?: number
}

type Discussion = {
  id: string
  title: string
  groupName: string
  groupImage: string
  messageCount: number
}

const groups: Group[] = [
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

const discussions: Discussion[] = [
  {
    id: '1',
    title: 'New research on chronic pain management',
    groupName: 'Chronic Pain Support',
    groupImage: '/placeholder.svg?height=32&width=32',
    messageCount: 15
  },
  {
    id: '2',
    title: 'Share your wellness journey',
    groupName: 'Daily Wellness Tips',
    groupImage: '/placeholder.svg?height=32&width=32',
    messageCount: 8
  }
]

function formatTimeAgo(date: Date) {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 60) return `${diffInMinutes}m`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
  return `${Math.floor(diffInMinutes / 1440)}d`
}


function ForumContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get('tab') || 'groups'

  const handleTabChange = (value: string) => {
    router.push(`/forum?tab=${value}`)
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-white to-[#DEEAE5]/30 p-2 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#473F63] mb-4">
        Forum
        <span className="block text-base font-normal text-[#1E4D57]/80 mt-1">
          Connect with your community
        </span>
      </h1>
      
      <Tabs value={activeTab} className="space-y-4" onValueChange={handleTabChange}>
        <TabsList className={`grid w-full grid-cols-2 rounded-xl p-1 ${
          activeTab === 'private' ? 'bg-[#DEEAE5]' : 'bg-[#E6E3FD]'
        }`}>
          <TabsTrigger 
            value="groups"
            className="rounded-lg data-[state=active]:bg-[#473F63] data-[state=active]:text-white transition-all duration-200"
          >
            Groups
          </TabsTrigger>
          <TabsTrigger 
            value="private"
            className="rounded-lg data-[state=active]:bg-[#1E4D57] data-[state=active]:text-white transition-all duration-200"
          >
            Private Chats
          </TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="grid gap-4">
          {groups.map((group) => (
            <Link key={group.id} href={`/forum/chat/${group.id}`}>
              <div className="flex items-center p-2 border-b border-gray-200">
                <img
                  src={group.imageUrl}
                  alt={group.name}
                  className="w-12 h-12 rounded-full shadow-sm"
                />
                <div className="flex-1 min-w-0 ml-2">
                  <h3 className="text-[#473F63] font-medium text-lg group-hover:text-[#1E4D57] transition-colors">
                    {group.name}
                  </h3>
                  <p className="text-[#473F63]/90 text-sm mt-1 line-clamp-2">
                    {group.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-[#473F63]/80 group-hover:text-[#473F63]">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {group.memberCount} members
                    </div>
                    <span>Active {formatTimeAgo(group.lastActivity)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* Trending Discussions section with similar styling */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-[#473F63] mb-2">Trending Discussions</h2>
            {discussions.map((discussion) => (
              <Link key={discussion.id} href={`/forum/chat/discussion${discussion.id}`}>
                <div className="flex items-center p-2 border-b border-gray-200">
                  <img
                    src={discussion.groupImage}
                    alt={discussion.groupName}
                    className="w-12 h-12 rounded-full shadow-sm"
                  />
                  <div className="flex-1 min-w-0 ml-2">
                    <h3 className="text-[#473F63] font-medium text-lg group-hover:text-[#1E4D57] transition-colors">
                      {discussion.title}
                    </h3>
                    <p className="text-[#473F63]/90 text-sm mt-1">
                      {discussion.groupName}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className="mt-2 bg-[#E6E3FD]/50 text-[#473F63]"
                    >
                      {discussion.messageCount} messages
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </TabsContent>

        {/* Private chats tab with green styling */}
        <TabsContent value="private" className="grid gap-4">
          {[
            {
              id: '1',
              name: 'Dr. Sarah Johnson',
              image: '/placeholder.svg?height=40&width=40',
              lastMessage: 'How are you feeling today?',
              time: new Date('2024-01-04T21:55:00'),
              unread: 2
            },
            {
              id: '2',
              name: 'Support Coach Mike',
              image: '/placeholder.svg?height=40&width=40',
              lastMessage: 'Great progress on your exercises!',
              time: new Date('2024-01-04T20:30:00'),
              unread: 0
            }
          ].map((chat) => (
            <Link key={chat.id} href={`/forum/chat/private${chat.id}`}>
              <div className="flex items-center p-2 border-b border-gray-200">
                <img
                  src={chat.image}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full shadow-sm"
                />
                <div className="flex-1 min-w-0 ml-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[#1E4D57] font-medium">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-[#1E4D57]/80">
                      {formatTimeAgo(chat.time)}
                    </span>
                  </div>
                  <p className="text-sm text-[#1E4D57]/90 truncate mt-1">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="mt-2 bg-[#DEEAE5] text-[#1E4D57]"
                  >
                    {chat.unread}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}


// Main component wrapped in Suspense
export default function ForumPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-b from-white to-[#DEEAE5]/30 p-2 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#473F63] mb-4">
          Forum
          <span className="block text-base font-normal text-[#1E4D57]/80 mt-1">
            Connect with your community
          </span>
        </h1>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-xl mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <ForumContent />
    </Suspense>
  )
}