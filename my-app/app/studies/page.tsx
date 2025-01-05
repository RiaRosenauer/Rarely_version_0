'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users } from 'lucide-react'
import { colors } from "@/styles/colors"

type Study = {
  id: string
  title: string
  purpose: string
  location: string
  startDate: Date
  totalSpots: number
  availableSpots: number
}

const studies: Study[] = [
  {
    id: '1',
    title: 'Genetic Factors in ARVC',
    purpose: 'Investigating genetic mutations associated with arrhythmogenic right ventricular cardiomyopathy (ARVC)',
    location: 'Johns Hopkins Hospital, Baltimore, MD',
    startDate: new Date('2024-03-15'),
    totalSpots: 100,
    availableSpots: 37,
  },
  {
    id: '2',
    title: 'Novel Treatments for ACM',
    purpose: 'Evaluating the efficacy of new medications in managing arrhythmogenic cardiomyopathy (ACM)',
    location: 'Mayo Clinic, Rochester, MN',
    startDate: new Date('2024-04-01'),
    totalSpots: 200,
    availableSpots: 85,
  },
  {
    id: '3',
    title: 'ACM and Exercise',
    purpose: 'Assessing the impact of different exercise regimens on ACM progression',
    location: 'Stanford University Medical Center, CA',
    startDate: new Date('2024-05-10'),
    totalSpots: 150,
    availableSpots: 112,
  },
]

export default function StudiesPage() {
  return (
    <div className={`min-h-[calc(100vh-5rem)] bg-gradient-to-b from-white to-[${colors.lightgreen}]/30 p-4 md:p-8`}>
      <h1 className={`text-2xl md:text-3xl font-bold text-[${colors.darkgreen}] mb-6`}>
        Available Research Studies
        <span className={`block text-base font-normal text-[${colors.darkgreen}]/80 mt-2`}>
          Exploring Arrhythmogenic Cardiomyopathy
        </span>
      </h1>
      
      <div className="flex flex-col gap-4">
        {studies.map((study) => (
          <div 
            key={study.id} 
            className="border-b border-gray-300 pb-4 mb-4"
          >
            <div className="flex justify-between items-center  mb-1">
              <h2 className={`text-[${colors.darkgreen}] text-xl`}>
                {study.title}
              </h2>
              <Badge 
                variant="secondary" 
                className={`w-fit bg-[${colors.lightgreen}] text-[${colors.darkgreen}] font-medium`}
              >
                {study.availableSpots} spots left
              </Badge>
            </div>
            <p className={`text-[${colors.darkgreen}]/90 text-sm mb-2 line-clamp-2`}>
              {study.purpose}
            </p>
            <div className="space-y-1 text-sm">
              <div className={`flex items-center text-[${colors.darkgreen}]/80`}>
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="line-clamp-1">{study.location}</span>
              </div>
              <div className={`flex items-center text-[${colors.darkgreen}]/80`}>
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Starts: {study.startDate.toLocaleDateString()}</span>
              </div>
              <div className={`flex items-center text-[${colors.darkgreen}]/80`}>
                <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="font-medium">
                  {study.availableSpots} of {study.totalSpots} spots remaining
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

