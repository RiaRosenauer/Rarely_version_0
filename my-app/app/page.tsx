"use client"

import Dashboard from "@/components/Dashboard";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen } from 'lucide-react'
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query"
import Image from 'next/image'

export default function Page() {

  const [hasDiaryEntry, setHasDiaryEntry] = useState<boolean>(false);

  useEffect(() => {
    const diaryEntryStatus = sessionStorage.getItem("hasDiaryEntry");
    if (diaryEntryStatus === "true") {
      setHasDiaryEntry(true);
    }
  }, []);

  const handleDiaryClick = () => {
    setHasDiaryEntry(true);
    sessionStorage.setItem("hasDiaryEntry", "true");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 text-[#473F63]">
        <div className="flex items-center">
          <Image 
            src="/placeholder.svg" 
            alt="Logo" 
            width={30}
            height={30}
          />
          <span className="text-sm ml-2">Fe</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 pt-8">
        <div className="space-y-6">
          {/* App Name */}
          <div className="text-center space-y-4">
            {/* Logo */}
            <div className="flex justify-center items-center py-6">
              <Image 
                src="/logo_purple.png" 
                alt="Logo" 
                width={140}
                height={140}
                priority
              />
            </div>
            <h2 className="text-xl font-medium text-[#473F63]">
              Welcome to rarely Fe!
            </h2>
            <p className="text-[#473F63] opacity-80">
              You haven&apos;t filled out your diary yet!
            </p>
          </div>

          {/* Card */}
          {!hasDiaryEntry ? (
            <Card className="bg-[#E6E3FD] border-none shadow-none">
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto w-8 h-8">
                  <BookOpen className="w-full h-full text-[#473F63]" />
                </div>
                <p className="text-[#473F63]">
                  To understand your disease better we need to track your habits!
                </p>
                <Button 
                  className="bg-[#473F63] hover:bg-[#473F63]/90 text-white"
                  onClick={handleDiaryClick}
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Dashboard />
          )}
        </div>
      </main>
    </div>
  )
}

