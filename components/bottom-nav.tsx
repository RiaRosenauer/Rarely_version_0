"use client"

import { Bot, BookOpen, User, Brain, Info } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Suspense } from 'react'

// Create a separate component for the navigation content
function NavigationContent() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }


  const getLinkStyle = (path: string) => {
    return isActive(path) 
      ? { 
          borderBottom: '2px solid #473F63',
          marginBottom: '4px',
          color: '#473F63'
        }  
      : { 
          textDecoration: 'none',
          color: 'rgba(71, 63, 99, 0.5)'
        }  
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#f8f8fa] border-t border-gray-200">
      <div className="flex justify-around items-center h-20 px-6 max-w-md mx-auto">
        <Link 
          href="/forum" 
          className="flex flex-col items-center px-4 py-2 w-1/5"
          style={getLinkStyle('/forum')}
        >
          <BookOpen className="w-6 h-6" style={{ opacity: isActive('/forum') ? 1 : 0.5 }} />
          <span className="text-xs mt-1" style={{ opacity: isActive('/forum') ? 1 : 0.5 }}>Forum</span>
        </Link>
        <Link 
          href="/chat" 
          className="flex flex-col items-center px-4 py-2 w-1/5"
          style={getLinkStyle('/chat')}
        >
          <Bot className="w-6 h-6" style={{ opacity: isActive('/chat') ? 1 : 0.5 }} />
          <span className="text-xs mt-1" style={{ opacity: isActive('/chat') ? 1 : 0.5 }}>Assistant</span>
        </Link>
        <Link 
          href="/" 
          className="flex flex-col items-center px-4 py-2 w-1/5"
          style={getLinkStyle('/')}
        >
          <User className="w-6 h-6" style={{ opacity: isActive('/') ? 1 : 0.5 }} />
          <span className="text-xs mt-1" style={{ opacity: isActive('/') ? 1 : 0.5 }}>You</span>
        </Link>
        <Link 
          href="/studies" 
          className="flex flex-col items-center px-4 py-2 w-1/5"
          style={getLinkStyle('/studies')}
        >
          <Brain className="w-6 h-6" style={{ opacity: isActive('/studies') ? 1 : 0.5 }} />
          <span className="text-xs mt-1" style={{ opacity: isActive('/studies') ? 1 : 0.5 }}>Studies</span>
        </Link>
        <Link 
          href="/resources" 
          className="flex flex-col items-center px-4 py-2 w-1/5"
          style={getLinkStyle('/resources')}
        >
          <Info className="w-6 h-6" style={{ opacity: isActive('/resources') ? 1 : 0.5 }} />
          <span className="text-xs mt-1" style={{ opacity: isActive('/resources') ? 1 : 0.5 }}>Resources</span>
        </Link>
      </div>
    </div>
  )
}

// Main component wrapped in Suspense
export function BottomNav() {
  return (
    <Suspense fallback={
      // You can provide a loading state here
      <div className="fixed bottom-0 left-0 right-0 bg-[#f8f8fa] border-t border-gray-200">
        <div className="flex justify-around items-center h-20 px-6 max-w-md mx-auto">
          {/* Add loading skeleton or simplified version of your nav */}
        </div>
      </div>
    }>
      <NavigationContent />
    </Suspense>
  )
}