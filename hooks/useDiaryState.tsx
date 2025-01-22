import { useState } from 'react';
import { 
    DEFAULT_SYMPTOMS, 
    DEFAULT_MEDICATIONS, 
    DEFAULT_ACTIVITY_DATA,
    type SavedActivity,  // Note the 'type' keyword here
    type Symptom,
    type Medication,
    type ActivityData,
    DEFAULT_EXERCISE_DATA,
    type ExerciseData,
} from '@/data/diary';

import React from 'react';

import { 
    FaLeaf, 
    FaHome, 
    FaBiking, 
    FaWalking, 
    FaRunning, 
    FaSwimmer, 
    FaPrayingHands,
    FaQuestionCircle
} from 'react-icons/fa';

// A custom hook is just a function that uses React hooks
export function useDiaryState() {
    // useState creates state that can change over time
    const [symptoms, setSymptoms] = useState<Symptom[]>(DEFAULT_SYMPTOMS);;
    const [newSymptom, setNewSymptom] = useState<string>("");

    const [medications, setMedications] = useState<Medication[]>(DEFAULT_MEDICATIONS);
    const [newMedication, setNewMedication] = useState<string>("");

    const [hasDiaryEntry, setHasDiaryEntry] = useState<boolean>(false);
    
    // Helper function to update a specific symptom
    const updateSymptom = (index: number, updates: Partial<Symptom>) => {
      setSymptoms(symptoms.map((symptom, i) => 
        i === index ? { ...symptom, ...updates } : symptom
      ));
    };

    const getActivityIcon = (type: string) => {
        const icons = {
            garden: <FaLeaf className="w-5 h-5" />,
            home: <FaHome className="w-5 h-5" />,
            cycling: <FaBiking className="w-5 h-5" />,
            walking: <FaWalking className="w-5 h-5" />,
            running: <FaRunning className="w-5 h-5" />,
            swimming: <FaSwimmer className="w-5 h-5" />,
            yoga: <FaPrayingHands className="w-5 h-5" />,
            other: <FaQuestionCircle className="w-5 h-5" />
        };
        return icons[type as keyof typeof icons];
    };


    const [activityData, setActivityData] = useState<ActivityData>(DEFAULT_ACTIVITY_DATA);

     // Optional: Add helper function for adding new symptoms
     const addSymptom = (label: string) => {
        if (label.trim()) {
          setSymptoms([
            ...symptoms,
            { label: label.trim(), selected: false, severity: 0 }
          ]);
          setNewSymptom(""); // Clear input after adding
        }
      };

      // Inside useDiaryState hook
      const [savedActivities, setSavedActivities] = useState<SavedActivity[]>(() => {
        // Initialize from sessionStorage on hook creation
        const saved = sessionStorage.getItem('savedActivities');
        return saved ? JSON.parse(saved) : [];
      });

      // Function to get the length of savedActivities
      const getSavedActivitiesCount = () => {
        return savedActivities.length;
      };



      // Add a function to update activities that handles both state and sessionStorage
      const updateSavedActivities = (activities: SavedActivity[]) => {
        setSavedActivities(activities);
        sessionStorage.setItem('savedActivities', JSON.stringify(activities));
        console.log('updateSavedActivities', activities);
        console.log('sessionStorage after update:', sessionStorage.getItem('savedActivities'));
      };

      const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().split('T')[0];
      };
      
      // Helper function to get current time in HH:mm format
      const getCurrentTime = () => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      };

      const [exerciseData, setExerciseData] = useState<ExerciseData>(() => {
        const saved = sessionStorage.getItem('diary_exercise_data');
        return saved ? JSON.parse(saved) : DEFAULT_EXERCISE_DATA;
    });

    const [showExerciseDetails, setShowExerciseDetails] = useState<boolean>(() => {
        const saved = sessionStorage.getItem('diary_show_exercise_details');
        return saved ? JSON.parse(saved) : false;
    });

    const getActivityLabel = (type: string) => {
      const labels = {
        garden: "Lawn & Garden",
        home: "Home Activities",
        cycling: "Cycling",
        walking: "Walking",
        running: "Running",
        swimming: "Swimming",
        yoga: "Yoga",
        other: "Other"
      };
      return labels[type as keyof typeof labels];
    };
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [mood, setMood] = useState<number>(2);

    const getStepTitle = (step: number) => {
      switch (step) {
          case 1: return "How are you feeling today?";
          case 2: return "What activities did you do today?";
          case 3: return "Any symptoms today?";
          case 4: return "Track your medications";
          default: return "";
      }
    };

    const [selectedActivity, setSelectedActivity] = useState<string>("");

    const [showSymptomInput, setShowSymptomInput] = useState(false);
  
    const [showMedicationInput, setShowMedicationInput] = useState(false);
    const [timeRange, setTimeRange] = useState<"today" | "week" | "month">("today");
    const [showDiaryModal, setShowDiaryModal] = useState(false);

    // Add this state to track if we're showing the summary
    const [showActivitySummary, setShowActivitySummary] = useState(false);



    const callSubmitDiary = () => {
      setHasDiaryEntry(true);
      sessionStorage.setItem("hasDiaryEntry", "true");
      setShowDiaryModal(false);

      const diaryData = {
          mood,
          selectedActivity,
          symptoms,
          medications,
          timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem("lastDiaryEntry", JSON.stringify(diaryData));
    };
  
    // Return everything that other components might need
    return {
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
        setSavedActivities: updateSavedActivities,
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
    };
}