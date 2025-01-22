'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { studies } from '../../data'

// Mock user data - in a real app, this would come from your auth system
const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  age: '45',
  medicalHistory: 'Diagnosed with ACM in 2020\nNo other major health conditions\nFamily history of heart disease',
  currentMedications: 'Beta blockers (Metoprolol 25mg daily)\nACE inhibitors (Lisinopril 10mg daily)',
}

export default function ApplyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const study = studies.find(s => s.id === params.id)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    medicalHistory: '',
    currentMedications: '',
    studySpecificInfo: '',
  })

  // Pre-fill the form with user data and study-specific information
  useEffect(() => {
    if (study) {
      setFormData({
        ...mockUserData,
        studySpecificInfo: `I am interested in participating in the ${study.title} study because I have ACM and want to contribute to research that could help others with this condition.

Key Information:
- Diagnosis Date: 2020
- Current Symptoms: Managed with medication
- Previous Study Participation: None
- Availability: Flexible schedule for study requirements
- Travel: Can regularly visit ${study.location}`,
      })
    }
  }, [study])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted. We'll be in touch soon.",
    })
    
    router.push(`/studies?tab=recruiting&justApplied=${study?.id}`)
  }

  if (!study) return <div>Study not found</div>

  return (
    <div className="min-h-[calc(100vh-5rem)] p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-[#473F63] mb-6">
        Apply for Study: {study.title}
      </h1>
      
      <Card className="p-6">
        <div className="mb-6 bg-[#E6E3FD] p-4 rounded-lg">
          <h2 className="text-[#473F63] font-medium mb-2">Please Review Your Application</h2>
          <p className="text-sm text-[#473F63]/80">
            We've pre-filled this form with your information. Please review and update any details that need to be changed.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Age</label>
              <Input
                type="number"
                required
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Medical History</label>
            <textarea
              className="w-full p-2 border rounded-md min-h-[100px]"
              required
              value={formData.medicalHistory}
              onChange={e => setFormData({...formData, medicalHistory: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Current Medications</label>
            <textarea
              className="w-full p-2 border rounded-md min-h-[100px]"
              required
              value={formData.currentMedications}
              onChange={e => setFormData({...formData, currentMedications: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Information for {study.title}</label>
            <textarea
              className="w-full p-2 border rounded-md min-h-[150px]"
              required
              value={formData.studySpecificInfo}
              onChange={e => setFormData({...formData, studySpecificInfo: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit"
              className="w-full bg-[#473F63] text-white"
            >
              Confirm and Submit Application
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
} 