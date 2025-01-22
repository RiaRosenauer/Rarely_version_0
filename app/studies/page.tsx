'use client'

import { Suspense, useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Check, BookOpen } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useSearchParams, useRouter } from 'next/navigation'
import { studies } from './data'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useUser } from "@/contexts/UserContext"




function StudiesContent() {
  const { userData } = useUser();
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams?.get('tab') ?? 'recruiting'
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [appliedStudies, setAppliedStudies] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('appliedStudies')
      return new Set(saved ? JSON.parse(saved) : [])
    }
    return new Set()
  });

  useEffect(() => {
    localStorage.setItem('appliedStudies', JSON.stringify([...appliedStudies]))
  }, [appliedStudies]);

  useEffect(() => {
    const justApplied = searchParams?.get('justApplied')
    if (justApplied) {
      setAppliedStudies(prev => new Set([...prev, justApplied]))
      router.replace('/studies?tab=recruiting')
    }
  }, [searchParams, router]);

  const studiesWithApplicationStatus = studies.map(study => ({
    ...study,
    hasApplied: appliedStudies.has(study.id)
  }));

  const runningStudies = studiesWithApplicationStatus.filter(study => study.status === 'running')
  const completedStudies = studiesWithApplicationStatus.filter(study => study.status === 'completed')

  const handleTabChange = (value: string) => {
    router.push(`/studies?tab=${value}`)
  }

  const handleApply = (studyId: string) => {
    router.push(`/studies/apply/${studyId}`)
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
        <h1 className="text-3xl font-bold text-black mb-1">Studies</h1>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-24 space-y-4">
        <Tabs value={activeTab} className="space-y-4" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3 rounded-xl p-1 bg-white/95 shadow-sm backdrop-blur-sm">
            <TabsTrigger 
              value="recruiting"
              className="rounded-lg data-[state=active]:bg-[#3a2a76] data-[state=active]:text-white transition-all duration-200"
            >
              Recruiting
            </TabsTrigger>
            <TabsTrigger 
              value="running"
              className="rounded-lg data-[state=active]:bg-[#3a2a76] data-[state=active]:text-white transition-all duration-200"
            >
              Running
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="rounded-lg data-[state=active]:bg-[#3a2a76] data-[state=active]:text-white transition-all duration-200"
            >
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recruiting" className="space-y-4">
            {studiesWithApplicationStatus.filter(study => study.status === activeTab).map((study) => (
              <Card key={study.id} className="bg-white/95 shadow-sm backdrop-blur-sm rounded-xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <div 
                      onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
                      className="cursor-pointer"
                    >
                      <h2 className={`text-xl font-semibold text-black ${expandedId === study.id ? '' : 'line-clamp-2'}`}>
                        {study.title}
                        {!expandedId && study.title.length > 100 && (
                          <span className="text-[#3a2a76] text-sm font-normal ml-1">(tap to read more)</span>
                        )}
                      </h2>
                    </div>
                    {study.matches && (
                      <span className="text-emerald-600 text-sm font-medium flex items-center gap-1 mt-1">
                        <Check className="w-4 h-4" />
                        Matches your profile
                      </span>
                    )}
                  </div>

                  <div 
                    onClick={() => setExpandedId(expandedId === study.id ? null : study.id)} 
                    className="text-gray-600 text-sm mb-4 cursor-pointer hover:text-gray-800"
                  >
                    {expandedId === study.id ? (
                      study.explanation
                    ) : (
                      <div className="flex items-center">
                        <span className="line-clamp-1">
                          {study.explanation}
                        </span>
                        <span className="text-[#3a2a76] ml-1 flex-shrink-0">(tap to read more)</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{study.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Starts: {study.startDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className={`font-medium ${study.availableSpots && study.availableSpots <= 10 ? 'text-red-600 animate-pulse font-bold' : ''}`}>
                        {study.availableSpots && study.availableSpots <= 10 ? (
                          `Only ${study.availableSpots} spots left!`
                        ) : (
                          `${study.availableSpots} of ${study.totalSpots} spots left`
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    {study.hasApplied ? (
                      <div className="w-full bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg text-center font-medium">
                        Application Submitted
                      </div>
                    ) : (
                      <>
                        <Button 
                          onClick={() => handleApply(study.id)}
                          className="w-full bg-[#3a2a76] hover:bg-[#a680db] text-white transition-colors"
                        >
                          Apply Now
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="running" className="space-y-4">
            {runningStudies.map((study) => (
              <Card key={study.id} className="bg-white/95 shadow-sm backdrop-blur-sm rounded-xl overflow-hidden">
                <CardContent className="p-4">
                    <h2 className="text-xl font-semibold text-black">
                      {study.title}
                    </h2>
          
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {study.purpose}
                  </p>

                  {/* Study Details */}
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{study.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Started: {study.startDate.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Study Progress Section */}
                  <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-[#3a2a76]" />
                        <span className="font-medium text-[#3a2a76]">Study Timeline</span>
                      </div>
                      <span className="text-sm font-medium text-[#3a2a76]">{study.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-[#3a2a76] h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${study.progress}%` }}
                        aria-label="Study timeline progress"
                      ></div>
                    </div>
                  </div>

                  {/* Enrollment Info */}
                  <div className="mt-3 bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-sm text-gray-600">Current Enrollment</span>
                      </div>
                      <span className="font-medium">
                        {study.participants} participants
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedStudies.map((study) => (
              <Card key={study.id} className="bg-white/90 shadow-sm backdrop-blur-sm rounded-xl overflow-hidden border-gray-100">
                <CardContent className="p-4">
                  <div className="relative mb-3">
                    <div 
                      onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
                      className="cursor-pointer"
                    >
                      <h2 className={`text-xl font-semibold text-black ${expandedId === study.id ? '' : 'line-clamp-2'}`}>
                        {study.title}
                        {!expandedId && study.title.length > 100 && (
                          <span className="text-[#3a2a76] text-sm font-normal ml-1">(tap to read more)</span>
                        )}
                      </h2>
                    </div>
                    <Badge 
                      className="bg-[#3a2a76] text-white font-medium mt-2"
                    >
                      Completed
                    </Badge>
                  </div>
                  
                  <div 
                    onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
                    className="text-gray-600 text-sm mb-4 cursor-pointer hover:text-gray-800"
                  >
                    {expandedId === study.id ? (
                      study.explanation
                    ) : (
                      <div className="flex items-center">
                        <span className="line-clamp-1">
                          {study.explanation}
                        </span>
                        <span className="text-[#3a2a76] ml-1 flex-shrink-0">(tap to read more)</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="line-clamp-1">{study.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Ended: {study.endDate?.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                  
                    <div className="flex items-center mt-2 text-gray-500 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{study.participants} total participants</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function StudiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudiesContent />
    </Suspense>
  )
}

