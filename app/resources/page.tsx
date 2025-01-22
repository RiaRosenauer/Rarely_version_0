'use client'

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, ExternalLink, BookOpen } from 'lucide-react'
import { resources } from '@/data/mock-resources'
import Image from "next/image"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useUser } from "@/contexts/UserContext"

export default function ResourcesPage() {
  const { userData } = useUser();
  
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
        <h1 className="text-3xl font-bold text-black mb-1">ACM Resources</h1>
      </div>


      {/* Main Content */}
      <div className="px-4 pb-24 space-y-4">
        {resources.map((resource) => (
          <Card 
            key={resource.id} 
            className="bg-white/95 shadow-sm backdrop-blur-sm rounded-xl overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-lg">{resource.title}</h2>
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-[#3a2a76]/10 text-[#3a2a76] font-medium capitalize"
                >
                  {resource.category}
                </Badge>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {resource.description}
              </p>

              <div className="space-y-2 text-sm">
                {resource.location && (
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-[#3a2a76]" />
                    <span>{resource.location}</span>
                  </div>
                )}
                {resource.contact && (
                  <div className="flex items-center text-gray-500">
                    <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-[#3a2a76]" />
                    <span>{resource.contact}</span>
                  </div>
                )}
                {resource.link && (
                  <a 
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[#3a2a76] hover:text-[#a680db] transition-colors underline"
                  >
                    <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>Visit Website</span>
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 