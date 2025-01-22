"use client"

import React, { useState, useEffect, cloneElement } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User } from 'lucide-react';
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";
import { Calendar, MessageCircle, Activity, Check, Heart, Grid, Pill, Smile, Download, Info } from 'lucide-react';

import { Plus, Frown, Meh, Dumbbell, Footprints, Bike, Coffee, Bed } from 'lucide-react';

import { DiaryDialog } from '@/components/DiaryDialog';

import { mockHealthData } from '@/data/mockHealthData';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/contexts/UserContext"
import { mockData } from "@/data/mock-data";
import { studies } from "@/app/studies/data";

import { useDiaryState } from '@/hooks/useDiaryState';
import RarelyWrapped from './RarelyWrapped';
import { FaGift } from 'react-icons/fa';

interface Activity {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}

export default function Dashboard() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [isHealthSynced, setIsHealthSynced] = useState<boolean>(false);
  const [showWrapped, setShowWrapped] = useState(false);
  
  const { 
    symptoms,
        setSymptoms,
        updateSymptom,
        newSymptom,
        setNewSymptom,
        addSymptom, 
        medications,
        setMedications,
        newMedication,
        setNewMedication,
        activityData,
        setActivityData,
        savedActivities,
        setSavedActivities,
        getCurrentDate,
        getCurrentTime,
        exerciseData,
        setExerciseData,
        showExerciseDetails,
        setShowExerciseDetails,
        getActivityIcon,
        getActivityLabel,
        currentStep,
        setCurrentStep,
        getStepTitle,
        selectedActivity, 
        setSelectedActivity,
        showSymptomInput,
        setShowSymptomInput,
        showMedicationInput,
        setShowMedicationInput,
        timeRange,
        setTimeRange,
        showActivitySummary,
        setShowActivitySummary,
        callSubmitDiary,
        hasDiaryEntry, 
        setHasDiaryEntry,
        showDiaryModal, 
        setShowDiaryModal,
        mood, 
        setMood,
        getSavedActivitiesCount
  } = useDiaryState();

  useEffect(() => {
    // Load diary entry status
    const diaryEntryStatus = sessionStorage.getItem("hasDiaryEntry");
    if (diaryEntryStatus === "true") {
      setHasDiaryEntry(true);
    }

    // Load synced providers
    const savedSyncedProviders = localStorage.getItem("syncedProviders");
    if (savedSyncedProviders) {
      setSyncedProviders(JSON.parse(savedSyncedProviders));
      setIsHealthSynced(true);
    }

  }, []);

  const [streakCount, setStreakCount] = useState<number>(7);
  const [syncedProviders, setSyncedProviders] = useState<HealthProvider[]>([]);

  const { userData, setUserData } = useUser();

  useEffect(() => {
    if (currentStep === 2) {
      setSelectedActivity("");
      // Show the summary view instead of hiding it
      setShowActivitySummary(true);
      setShowExerciseDetails(false);
    }
  }, [currentStep]);

  const handleDiaryClick = () => {
    console.log("handleDiaryClick called");
    setShowDiaryModal(true);
  };

  const currentDate = new Date();
  const weekDates = Array.from({length: 7}, (_, i) => {
    const date = new Date();
    date.setDate(currentDate.getDate() - (6 - i));
    return {
      day: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][date.getDay()],
      date: date.getDate(),
      hasStreak: i >= 5 // Example: last 2 days have streaks
    };
  });

  const submitDiary = () => {
    if (!hasDiaryEntry) {
      setStreakCount(prev => prev + 1);
    }

    callSubmitDiary();
    
    localStorage.setItem("streakCount", String(streakCount + 1));
  };

  const generateICalEvent = (appointment: any) => {
    const event = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${new Date('2024-01-15T10:00:00').toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTEND:${new Date('2024-01-15T11:00:00').toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      'SUMMARY:Gene Therapy - Ph.2',
      'DESCRIPTION:Your scheduled gene therapy appointment',
      'LOCATION:Medical Center',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'appointment.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  type HealthProvider = 'apple' | 'whoop' | 'oura' | 'fitbit';

  const handleHealthSync = (provider: HealthProvider) => {
    const newSyncedProviders = [...syncedProviders, provider];
    setIsHealthSynced(true);
    setSyncedProviders(newSyncedProviders);
    setActivityData(mockHealthData[provider]);

    // Save to localStorage
    localStorage.setItem("syncedProviders", JSON.stringify(newSyncedProviders));
    localStorage.setItem("activityData", JSON.stringify(mockHealthData[provider]));
    localStorage.setItem("isHealthSynced", "true");
  };

  const matchingStudy = studies.find(study => study.id === "NCT00083395");

  useEffect(() => {
    const savedStreakCount = localStorage.getItem("streakCount");
    if (savedStreakCount) {
      setStreakCount(parseInt(savedStreakCount));
    }
  }, []);

  useEffect(() => {
    const checkNewDay = () => {
      const lastEntry = localStorage.getItem("lastDiaryEntry");
      if (lastEntry) {
        const lastEntryDate = new Date(JSON.parse(lastEntry).timestamp);
        const today = new Date();
        if (lastEntryDate.getDate() !== today.getDate()) {
          setHasDiaryEntry(false);
          sessionStorage.removeItem("hasDiaryEntry");
        }
      }
    };

    checkNewDay();
    const interval = setInterval(checkNewDay, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const savedActivitiesLength = sessionStorage.getItem("savedActivities")
    ? JSON.parse(sessionStorage.getItem("savedActivities")!).length
    : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E3D7F4] via-[#f0e9fa] to-[#f8f8fa]">
      <div className="p-6">
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
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <button
              onClick={() => setShowWrapped(true)}
              className="text-purple-500"
            >
              <FaGift size={20} />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold">{streakCount}</span>
              <span className="text-orange-500">🔥</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-black">
            Hello {sessionStorage.getItem('userName')}.
          </h1>
        </div>
      </div>

      <div className="px-4 pb-24 space-y-4">
        <div className="space-y-4">
          <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-3xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#3a2a76]/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-[#3a2a76]" />
                  </div>
                  <span className="font-semibold text-base">Daily Diary</span>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date().toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">
                    {hasDiaryEntry ? "A Slightly Pleasant Moment" : "Let's check in to get your daily data"}
                  </h3>
                  
                    
                    {hasDiaryEntry && <div className="flex items-center gap-2"><span className="text-sm text-gray-500">Today's Entry</span> 
                    <Badge variant="secondary">Updated</Badge></div>}
              
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  mood === 3 
                    ? 'bg-green-100' 
                    : mood === 2 
                    ? 'bg-yellow-100' 
                    : 'bg-red-100'
                }`}>
                  {mood === 3 ? (
                    <Smile className="w-6 h-6 text-green-500" />
                  ) : mood === 2 ? (
                    <Meh className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <Frown className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </div>

              <Button 
                className="w-full bg-[#3a2a76] hover:bg-[#a680db] text-white font-medium h-12 rounded-xl"
                onClick={handleDiaryClick}
              >
                {hasDiaryEntry ? "Update Check-in" : "Start Check-in"}
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-2xl p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Heart className="w-5 h-5 text-[#3a2a76]" />
                  <span className="text-xs text-gray-400">Today</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {symptoms.filter(s => s.selected).length}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">Symptoms</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-2xl p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Pill className="w-5 h-5 text-[#3a2a76]" />
                  <span className="text-xs text-gray-400">Today</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {medications.filter(m => m.taken).length}/{medications.length}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">Medications</p>
                </div>
              </div>
            </Card>

            <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-2xl p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Activity className="w-5 h-5 text-[#3a2a76]" />
                  <span className="text-xs text-gray-400">Today</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold truncate">
                    {savedActivitiesLength}
                  </h3>
                  <p className="text-xs text-gray-500 truncate">Activities</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-3xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 ">
                <div className="w-8 h-8 rounded-full bg-[#3a2a76]/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-[#3a2a76]" />
                </div>
                <span className="font-semibold text-lg">Activity</span>
              </div>
              <Select value={timeRange} onValueChange={(value: "today" | "week" | "month") => setTimeRange(value)}>
                <SelectTrigger className="bg-transparent border-none text-[#3a2a76] font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData[timeRange]} margin={{ top: 5, right: 5, bottom: 5, left: -40 }}>
                  <defs>
                    <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3a2a76" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3a2a76" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke="#E5E5EA"
                  />
                  <XAxis 
                    dataKey="time" 
                    stroke="#8E8E93"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis 
                    stroke="#8E8E93"
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                      padding: '8px 12px',
                    }}
                    labelStyle={{
                      color: '#3A3A3C',
                      fontWeight: '500',
                      fontSize: '13px',
                      marginBottom: '4px',
                    }}
                    itemStyle={{
                      color: '#636366',
                      fontSize: '12px',
                      padding: '0',
                    }}
                    formatter={(value: number, name: string, props: any) => {
                      const activityLabels = {
                        1: 'Complete Rest',
                        2: 'Daily Activities',
                        3: 'Light Exercise',
                        4: 'Moderate Exercise',
                        5: 'Intense Exercise'
                      };
                      return [activityLabels[value as keyof typeof activityLabels], ''];
                    }}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3a2a76"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#activityGradient)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3a2a76" 
                    strokeWidth={2}
                    dot={{ 
                      fill: '#FFFFFF',
                      stroke: '#3a2a76',
                      strokeWidth: 2,
                      r: 4
                    }}
                    activeDot={{ 
                      r: 6,
                      stroke: '#3a2a76',
                      strokeWidth: 2,
                      fill: '#FFFFFF'
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Average Activity Level</span>
                <span className="font-medium">
                  {Math.round(activityData[timeRange].reduce((acc, curr) => acc + curr.value, 0) / activityData[timeRange].length * 10) / 10}
                </span>
              </div>
              
              <div className="mt-4 flex items-center gap-3">
                <span className="text-sm text-gray-500">Sync with:</span>
                <div className="flex gap-2">
                  <div className="flex flex-col items-center">
                    <Button 
                      size="sm"
                      variant="ghost" 
                      className={`px-2 py-1 ${syncedProviders.includes('apple') ? 'bg-gray-100' : 'bg-gray-50'}`}
                      onClick={() => !syncedProviders.includes('apple') && handleHealthSync('apple')}
                    >
                      <Image src="/health.webp" alt="Apple" width={14} height={14} />
                    </Button>
                    {syncedProviders.includes('apple') && (
                      <span className="text-[10px] text-gray-600 mt-1">Synced</span>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <Button 
                      size="sm"
                      variant="ghost" 
                      className={`px-2 py-1 ${syncedProviders.includes('whoop') ? 'bg-gray-100' : 'bg-gray-50'}`}
                      onClick={() => !syncedProviders.includes('whoop') && handleHealthSync('whoop')}
                    >
                      <Image src="/whoop.png" alt="Whoop" width={14} height={14} />
                    </Button>
                    {syncedProviders.includes('whoop') && (
                      <span className="text-[10px] text-gray-600 mt-1">Synced</span>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <Button 
                      size="sm"
                      variant="ghost" 
                      className={`px-2 py-1 ${syncedProviders.includes('oura') ? 'bg-gray-100' : 'bg-gray-50'}`}
                      onClick={() => !syncedProviders.includes('oura') && handleHealthSync('oura')}
                    >
                      <Image src="/oura.png" alt="Oura" width={14} height={14} />
                    </Button>
                    {syncedProviders.includes('oura') && (
                      <span className="text-[10px] text-gray-600 mt-1">Synced</span>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <Button 
                      size="sm"
                      variant="ghost" 
                      className={`px-2 py-1 ${syncedProviders.includes('fitbit') ? 'bg-gray-100' : 'bg-gray-50'}`}
                      onClick={() => !syncedProviders.includes('fitbit') && handleHealthSync('fitbit')}
                    >
                      <Image src="/fitbit.png" alt="Fitbit" width={14} height={14} />
                    </Button>
                    {syncedProviders.includes('fitbit') && (
                      <span className="text-[10px] text-gray-600 mt-1">Synced</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-base font-semibold px-1">Upcoming</h2>
          
          <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-xl">
            <CardContent className="p-4">
              <div className="text-sm font-medium text-gray-500 mb-3">Upcoming Appointment</div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#3a2a76]" />
                  <div>
                    <p className="font-medium">Isoproterenol Challenge - ARVC Detection</p>
                    <p className="text-sm text-gray-500">Jan 15, 10:00 AM</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-[#007AFF] border-[#007AFF] hover:bg-[#007AFF]/10"
                    onClick={() => generateICalEvent({
                      title: "Isoproterenol Challenge - ARVC Detection",
                      studyId: "NCT00083395",
                      location: "Bethesda, Maryland, United States"
                    })}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Add to Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {matchingStudy && (
            <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <BookOpen className="w-5 h-5 text-[#3a2a76]" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">New Study Match</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <Info className="w-4 h-4 text-[#3a2a76]" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
                          <DialogHeader>
                            <DialogTitle>{matchingStudy.title}</DialogTitle>
                            <DialogDescription>
                              <div className="space-y-4">
                                <p>{matchingStudy.explanation}</p>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {matchingStudy.title}
                    </p>
                  </div>
                </div>
                <Link href={`/studies/apply/${matchingStudy.id}`}>
                  <Button size="sm" className="w-full bg-[#3a2a76] hover:bg-[#a680db]">
                    Apply
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-base font-semibold px-1">Trending</h2>
          
          <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-xl">
            <Link href={`/forum/chat/${mockData.groups[0].id}`} className="block p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-[#3a2a76] mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{mockData.groups[0].name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {mockData.groups[0].unreadCount} new
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    Join {mockData.groups[0].memberCount} others discussing {mockData.groups[0].description.toLowerCase()}...
                  </p>
                </div>
              </div>
            </Link>
          </Card>

          <div className="space-y-4">
          <h2 className="text-base font-semibold px-1">Community Stats</h2>
          <Card className="bg-white/95 shadow-sm backdrop-blur-sm rounded-xl">

            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">43</div>
                  <div className="text-xs text-gray-500">Active Users</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">1</div>
                  <div className="text-xs text-gray-500">Therapies facilitated</div>
                </div>
                <div>
                  <div className="text-xl font-semibold">7</div>
                  <div className="text-xs text-gray-500">Journal Entries</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t">
        <div className="flex justify-around items-center py-2">
          <Link href="/" className="flex flex-col items-center p-2">
            <Heart className="w-6 h-6 text-[#3a2a76]" />
            <span className="text-xs font-medium">Summary</span>
          </Link>
          <Link href="/sharing" className="flex flex-col items-center p-2">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Sharing</span>
          </Link>
          <Link href="/browse" className="flex flex-col items-center p-2">
            <Grid className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-400">Browse</span>
          </Link>
        </div>
      </div>

      <Dialog 
        open={showDiaryModal} 
        onOpenChange={(open) => {
          setShowDiaryModal(open);
          if (!open) setCurrentStep(1);
        }}
      >
      <DiaryDialog submitDiary={submitDiary}/>
      </Dialog>
      
      {showWrapped && <RarelyWrapped onClose={() => setShowWrapped(false)} />}
      
      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }
      `}</style>

    </div>
  )
}



