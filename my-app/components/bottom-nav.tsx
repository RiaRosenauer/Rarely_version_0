"use client"

import { Home, BookOpen, User, Search } from 'lucide-react'
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense } from 'react'

// Create a separate component for the navigation content
function NavigationContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab')

  const isActive = (path: string) => {
    return pathname === path
  }

  const isPrivateTab = pathname === '/forum' && activeTab === 'private'

  const getLinkStyle = (path: string) => {
    return isActive(path) 
      ? { 
          borderBottom: `2px solid ${isPrivateTab ? '#1E4D57' : '#473F63'}`,
          marginBottom: '4px',
          color: isPrivateTab ? '#1E4D57' : '#473F63'
        }  
      : { 
          textDecoration: 'none',
          color: 'rgba(71, 63, 99, 0.5)'
        }  
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${
      isPrivateTab ? 'bg-[#DEEAE5]' : 'bg-[#E6E3FD]'
    } border-t border-gray-200`}>
      <div className="flex justify-around items-center h-20 px-6 max-w-md mx-auto">
        <Link 
          href="/" 
          className="flex flex-col items-center px-4 py-2 w-1/4"
          style={getLinkStyle('/')}
        >
          <Home className="w-6 h-6" style={{ opacity: isActive('/') ? 1 : 0.5 }} />
          <span className="text-xs mt-1" style={{ opacity: isActive('/') ? 1 : 0.5 }}>Dashboard</span>
        </Link>
        <Link 
          href="/forum" 
          className="flex flex-col items-center px-4 py-2 w-1/4"
          style={getLinkStyle('/forum')}
        >
          <BookOpen className="w-6 h-6" style={{ opacity: isActive('/forum') ? 1 : 0.5 }} />
          <span className="text-xs mt-1" style={{ opacity: isActive('/forum') ? 1 : 0.5 }}>Forum</span>
        </Link>
        <Link 
          href="/chat" 
          className="flex flex-col items-center px-4 py-2 w-1/4"
          style={getLinkStyle('/chat')}
        >
          <User className="w-6 h-6" style={{ opacity: isActive('/chat') ? 1 : 0.5 }} />
          <span className="text-xs mt-1" style={{ opacity: isActive('/chat') ? 1 : 0.5 }}>Assistant</span>
        </Link>
        <Link 
          href="/studies" 
          className="flex flex-col items-center px-4 py-2 w-1/4"
          style={getLinkStyle('/studies')}
        >
          <Search className="w-6 h-6" style={{ opacity: isActive('/studies') ? 1 : 0.5 }} />
          <span className="text-xs mt-1" style={{ opacity: isActive('/studies') ? 1 : 0.5 }}>Studies</span>
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
      <div className="fixed bottom-0 left-0 right-0 bg-[#E6E3FD] border-t border-gray-200">
        <div className="flex justify-around items-center h-20 px-6 max-w-md mx-auto">
          {/* Add loading skeleton or simplified version of your nav */}
        </div>
      </div>
    }>
      <NavigationContent />
    </Suspense>
  )
}