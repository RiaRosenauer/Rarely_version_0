'use client'

import { Suspense, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Users, Heart, User } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { mockData } from '@/data/mock-data'
import Image from 'next/image'
import { useUser } from "@/contexts/UserContext"

function formatDateTime(date: Date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else if (days === 1) {
    return 'Yesterday'
  } else if (days < 7) {
    return date.toLocaleDateString([], { weekday: 'long' })
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }
}

function ForumContent() {
  const { userData } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams?.get('tab') || 'groups'
  
  // Initialize state from localStorage
  const [readGroups, setReadGroups] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('readGroups');
      return new Set(saved ? JSON.parse(saved) : []);
    }
    return new Set();
  });
  
  const [readChats, setReadChats] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('readChats');
      return new Set(saved ? JSON.parse(saved) : []);
    }
    return new Set();
  });

  const handleTabChange = (value: string) => {
    router.push(`/forum?tab=${value}`)
  }

  const handleChatClick = (chatId: string) => {
    setReadChats(prev => {
      const newSet = new Set([...prev, chatId]);
      localStorage.setItem('readChats', JSON.stringify([...newSet]));
      return newSet;
    });
  }

  const handleGroupClick = (groupId: string) => {
    setReadGroups(prev => {
      const newSet = new Set([...prev, groupId]);
      localStorage.setItem('readGroups', JSON.stringify([...newSet]));
      return newSet;
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E3D7F4] via-[#f0e9fa] to-[#f8f8fa]">
      
      {/* Header */}
      <div className="p-6 pb-2">
        {/* Logo centered, Avatar right */}
        <div className="flex items-center relative mb-6">
          <div className="w-full flex justify-center">
            <Image 
              src="/logo_green.png" 
              alt="Logo" 
              width={100} 
              height={100} 
              className="opacity-90"
            />
          </div>
          
        </div>
        <h1 className="text-3xl font-bold text-black mb-1">Forum</h1>
      </div>

      {/* Main Content - Adjusted spacing */}
      <div className="px-4 pb-24 space-y-4">
        <Tabs value={activeTab} className="space-y-4" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 rounded-xl p-1 bg-white/95 shadow-sm backdrop-blur-sm">
            <TabsTrigger 
              value="groups"
              className="rounded-lg data-[state=active]:bg-[#3a2a76] data-[state=active]:text-white transition-all duration-200"
            >
              Groups
            </TabsTrigger>
            <TabsTrigger 
              value="private"
              className="rounded-lg data-[state=active]:bg-[#3a2a76] data-[state=active]:text-white transition-all duration-200"
            >
              Private Chats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            {/* Trending Discussions - Now using first group */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-black px-1">Trending Discussions</h2>
              <Link 
                href={`/forum/chat/${mockData.groups[0].id}`} 
                onClick={() => handleGroupClick(mockData.groups[0].id)}
              >
                <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-xl border-0">
                  <div className="p-4 flex items-center gap-3">
                    <Avatar className="w-11 h-11">
                      <AvatarImage src={mockData.groups[0].imageUrl} alt={mockData.groups[0].name} className="object-cover" />
                      <AvatarFallback>{mockData.groups[0].name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium text-black">{mockData.groups[0].name}</h3>
                      <p className="text-sm text-[#1E4D57]/80">{mockData.groups[0].messages[0].content}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-[#1E4D57]/60">
                        {formatDateTime(mockData.groups[0].lastActivity)}
                      </span>
                      {(mockData.groups[0].unreadCount ?? 0) > 0 && !readGroups.has(mockData.groups[0].id) && (
                        <div 
                          onClick={(e) => {
                            e.preventDefault();
                            handleGroupClick(mockData.groups[0].id);
                          }}
                          className="w-6 h-6 rounded-full bg-[#3a2a76] text-white text-xs flex items-center justify-center cursor-pointer"
                        >
                          {mockData.groups[0].unreadCount}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </Link>
            </div>

            {/* Group Discussions - Now showing remaining groups */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-black px-1">Group Discussions</h2>
              {mockData.groups.slice(1).map((group, index) => (
                <div key={group.id}>
                  <Link 
                    href={`/forum/chat/${group.id}`}
                    onClick={() => handleGroupClick(group.id)}
                  >
                    <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-xl border-0">
                      <div className="p-4 flex items-center gap-3">
                        <Avatar className="w-11 h-11">
                          <AvatarImage src={group.imageUrl} alt={group.name} className="object-cover" />
                          <AvatarFallback>{group.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-medium text-black">{group.name}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-[#1E4D57]/80">
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {group.memberCount} members
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-[#1E4D57]/60">
                            {formatDateTime(group.lastActivity)}
                          </span>
                          {group.unreadCount && group.unreadCount > 0 && !readGroups.has(group.id) && (
                            <div 
                              onClick={(e) => {
                                e.preventDefault();
                                handleGroupClick(group.id);
                              }}
                              className="w-6 h-6 rounded-full bg-[#3a2a76] text-white text-xs flex items-center justify-center cursor-pointer"
                            >
                              {group.unreadCount}
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                  {index < mockData.groups.length - 2 && <hr className="border-gray-200 mx-4" />}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="private" className="space-y-2">
            {mockData.privateChats.map((chat, index) => (
              <div key={chat.id}>
                <Link 
                  href={`/forum/chat/${chat.id}`}
                  onClick={() => handleChatClick(chat.id)}
                >
                  <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-xl border-0">
                    <div className="p-4 flex items-center gap-3">
                      <Avatar className="w-11 h-11">
                        <AvatarImage src={chat.user.imageUrl} alt={chat.user.name} className="object-cover" />
                        <AvatarFallback>{chat.user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-black">{chat.user.name}</h3>
                        <p className="text-sm text-[#1E4D57]/80 truncate max-w-[200px] mt-1">
                          {chat.lastMessage}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-[#1E4D57]/60">
                          {formatDateTime(chat.lastMessageTime)}
                        </span>
                        {chat.unreadCount > 0 && !readChats.has(chat.id) && (
                          <div 
                            onClick={(e) => {
                              e.preventDefault();
                              handleChatClick(chat.id);
                            }}
                            className="w-6 h-6 rounded-full bg-[#3a2a76] text-white text-xs flex items-center justify-center cursor-pointer"
                          >
                            {chat.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
                {index < mockData.privateChats.length - 1 && <hr className="border-gray-200 mx-4" />}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t">
        <div className="flex justify-around items-center py-2">
          <Link href="/" className="flex flex-col items-center p-2">
            <Heart className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Summary</span>
          </Link>
          <Link href="/sharing" className="flex flex-col items-center p-2">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Sharing</span>
          </Link>
          <Link href="/forum" className="flex flex-col items-center p-2">
            <MessageCircle className="w-6 h-6 text-[#3a2a76]" />
            <span className="text-xs text-[#3a2a76] font-medium">Forum</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Main component wrapped in Suspense
export default function ForumPage() {
  const { userData } = useUser();
  
  return (
    <Suspense fallback={
      <div className="min-h-[calc(100vh-5rem)]  p-2 md:p-8">
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