export interface Symptom {
    label: string;
    selected: boolean;
    severity: number;
}

export interface Medication {
    name: string;
    taken: boolean;
    prescribed: boolean;
    category: string;
    dosage: {
      value: number;
      unit: string;
    }[];
    details_taken: boolean[];
    times: string[];
    number_of_pills: number[];
}

export interface ActivityData {
    today: Array<{
        time: string;
        value: number;
        activity: string;
    }>;
    week: Array<{
        time: string;
        value: number;
        activity: string;
    }>;
    month: Array<{
        time: string;
        value: number;
        activity: string;
    }>;
}
  
// Add this type for saved activities
export type SavedActivity = {
type: string;
description: string;
datetime: string;
intensity: number;
duration?: {
    hours: number;
    minutes: number;
};
distance?: number;
steps?: number;
};




export type ExerciseData = {
    description: string;
    date: string;
    time: string;
    duration: {
        hours: number;
        minutes: number;
    };
    distance: number;
    steps: number;
    intensity: number;
};


export const DEFAULT_SYMPTOMS: Symptom[] = [
{ label: "Palpitations", selected: false, severity: 0 },
{ label: "Extra Heartbeats", selected: false, severity: 0 },
{ label: "Rapid Heartbeat", selected: false, severity: 0 },
{ label: "Shortness of Breath", selected: false, severity: 0 },
{ label: "Chest Pain/Discomfort", selected: false, severity: 0 },
{ label: "Dizziness", selected: false, severity: 0 },
{ label: "Loss of Consciousness", selected: false, severity: 0 },
{ label: "Fatigue", selected: false, severity: 0 },
];

export const DEFAULT_MEDICATIONS: Medication[] = [
    // Antiarrhythmic drugs
    { 
      name: "Sotalol", 
      taken: false, 
      prescribed: true, 
      category: "Antiarrhythmic", 
      dosage: [{ value: 80, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    { 
      name: "Amiodarone", 
      taken: false, 
      prescribed: false, 
      category: "Antiarrhythmic", 
      dosage: [{ value: 200, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    { 
      name: "Flecainide", 
      taken: false, 
      prescribed: false, 
      category: "Antiarrhythmic", 
      dosage: [{ value: 100, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    
    // Beta blockers
    { 
      name: "Bisoprolol", 
      taken: false, 
      prescribed: true, 
      category: "Beta Blocker", 
      dosage: [{ value: 20, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    { 
      name: "Metoprolol", 
      taken: false, 
      prescribed: false, 
      category: "Beta Blocker", 
      dosage: [{ value: 50, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    
    // Heart failure drugs
    { 
      name: "ACE Inhibitor", 
      taken: false, 
      prescribed: true, 
      category: "Heart Failure", 
      dosage: [{ value: 10, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    { 
      name: "Entresto (Sacubitril/Valsartan)", 
      taken: false, 
      prescribed: true, 
      category: "Heart Failure", 
      dosage: [{ value: 20, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    { 
      name: "Eplerenon", 
      taken: false, 
      prescribed: false, 
      category: "Heart Failure", 
      dosage: [{ value: 10, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    { 
      name: "Finerenon", 
      taken: false, 
      prescribed: false, 
      category: "Heart Failure", 
      dosage: [{ value: 10, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    
    // Diuretics
    { 
      name: "Furosemide", 
      taken: false, 
      prescribed: false, 
      category: "Diuretic", 
      dosage: [{ value: 20, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    { 
      name: "Torasemide", 
      taken: false, 
      prescribed: false, 
      category: "Diuretic", 
      dosage: [{ value: 20, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
    
    // SGLT2 Inhibitors
    { 
      name: "SGLT2 Inhibitor", 
      taken: false, 
      prescribed: false, 
      category: "SGLT2", 
      dosage: [{ value: 10, unit: "mg" }],
      details_taken: [false],
      times: ["8:00 AM"],
      number_of_pills: [1]
    },
  ];



// Add this after your DEFAULT_SYMPTOMS and DEFAULT_MEDICATIONS
export const DEFAULT_ACTIVITY_DATA: ActivityData = {
    today: [
      { time: '9AM', value: 1, activity: 'Complete Rest' },
      { time: '11AM', value: 2, activity: 'Daily Activities' },
      { time: '1PM', value: 3, activity: 'Light Exercise' },
      { time: '3PM', value: 4, activity: 'Moderate Exercise' },
      { time: '5PM', value: 2, activity: 'Daily Activities' },
      { time: '7PM', value: 3, activity: 'Light Exercise' },
      { time: '9PM', value: 1, activity: 'Complete Rest' },
    ],
    week: [
      { time: 'Mon', value: 2, activity: 'Daily Activities' },
      { time: 'Tue', value: 3, activity: 'Light Exercise' },
      { time: 'Wed', value: 4, activity: 'Moderate Exercise' },
      { time: 'Thu', value: 2, activity: 'Daily Activities' },
      { time: 'Fri', value: 3, activity: 'Light Exercise' },
      { time: 'Sat', value: 1, activity: 'Complete Rest' },
      { time: 'Sun', value: 2, activity: 'Daily Activities' },
    ],
    month: [
      { time: 'Week 1', value: 2, activity: 'Daily Activities' },
      { time: 'Week 2', value: 3, activity: 'Light Exercise' },
      { time: 'Week 3', value: 4, activity: 'Moderate Exercise' },
      { time: 'Week 4', value: 2, activity: 'Daily Activities' },
    ],
  };


// Add default exercise data
export const DEFAULT_EXERCISE_DATA: ExerciseData = {
    description: "",
    date: new Date().toISOString().split('T')[0],  // Current date in YYYY-MM-DD format
    time: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,  // Current time in HH:mm format
    duration: {
        hours: 0,
        minutes: 0
    },
    distance: 0,
    steps: 0,
    intensity: 50,
};