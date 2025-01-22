export type Study = {
  id: string
  title: string
  purpose?: string
  explanation: string
  location: string
  startDate: Date
  endDate?: Date
  totalSpots?: number
  availableSpots?: number
  status: 'recruiting' | 'running' | 'completed'
  progress?: number
  participants?: number
  hasApplied?: boolean
  matches?: boolean
}

export const studies: Study[] = [
  {
    id: "NCT03068149",
    title: "Pilot Randomized Trial With Flecainide in ARVC Patients",
    explanation: "A clinical trial studying the effects of Flecainide in patients with Arrhythmogenic Right Ventricular Cardiomyopathy (ARVC)",
    location: "Multiple locations: Denver, Baltimore, New York",
    startDate: new Date("2023-01-15"),
    totalSpots: 100,
    availableSpots: 45,
    status: "running",
    progress: 55,
    participants: 55,
    matches: true
  },
  {
    id: "NCT01804699",
    title: "National ARVC Data Registry and Bio Bank",
    explanation: "A comprehensive registry and bio bank study for ARVC patients across multiple Canadian centers",
    location: "Multiple locations in Canada",
    startDate: new Date("2023-03-01"),
    totalSpots: 200,
    availableSpots: 85,
    status: "running",
    progress: 42,
    participants: 115,
    matches: false
  },
  {
    id: "NCT00083395",
    title: "Isoproterenol Challenge to Detect Arrhythmogenic Right Ventricular Cardiomyopathy",
    explanation: "Study to evaluate the effectiveness of Isoproterenol challenge in ARVC detection",
    location: "Bethesda, Maryland, United States",
    startDate: new Date("2022-06-01"),
    endDate: new Date("2023-09-30"),
    participants: 50,
    status: "completed",
    progress: 100,
    matches: true
  },
  {
    id: "NCT02291393",
    title: "The Role of High Density Surface ECG in the Diagnosis of Arrhythmogenic Right Ventricular Cardiomyopathy",
    explanation: "Investigation of advanced ECG techniques in ARVC diagnosis",
    location: "Location not provided",
    startDate: new Date("2022-07-15"),
    endDate: new Date("2023-10-15"),
    participants: 75,
    status: "completed",
    progress: 100,
    matches: false
  },
  {
    id: "NCT02302274",
    title: "Diagnostic Value and Safety of Flecainide Infusion Test in Brugada Syndrome",
    explanation: "Evaluation of Flecainide testing in patients with Brugada Syndrome",
    location: "New York, New York, United States",
    startDate: new Date("2022-08-01"),
    endDate: new Date("2023-11-30"),
    participants: 40,
    status: "completed",
    progress: 100,
    matches: true
  },
  {
    id: "NCT00083395",
    title: "Isoproterenol Challenge to Detect Arrhythmogenic Right Ventricular Cardiomyopathy",
    explanation: "Study to evaluate the effectiveness of Isoproterenol challenge in ARVC detection",
    location: "Bethesda, Maryland, United States",
    startDate: new Date("2023-06-01"),
    totalSpots: 50,
    availableSpots: 8,
    status: "recruiting",
    matches: true
  },
  {
    id: "NCT02291393",
    title: "The Role of High Density Surface ECG in the Diagnosis of Arrhythmogenic Right Ventricular Cardiomyopathy",
    explanation: "Investigation of advanced ECG techniques in ARVC diagnosis",
    location: "Location not provided",
    startDate: new Date("2023-07-15"),
    totalSpots: 75,
    availableSpots: 15,
    status: "recruiting",
    matches: false
  },
  {
    id: "NCT02302274",
    title: "Diagnostic Value and Safety of Flecainide Infusion Test in Brugada Syndrome",
    explanation: "Evaluation of Flecainide testing in patients with Brugada Syndrome",
    location: "New York, New York, United States",
    startDate: new Date("2023-08-01"),
    totalSpots: 40,
    availableSpots: 5,
    status: "recruiting",
    matches: true
  },
  {
    id: "NCT01678040",
    title: "Ventricular Volume as Assessed by Cardiac Magnetic Resonance",
    explanation: "Study assessing ventricular volumes using cardiac MRI in ARVC patients",
    location: "Toronto, Ontario, Canada",
    startDate: new Date("2022-05-01"),
    endDate: new Date("2023-08-15"),
    participants: 60,
    status: "completed",
    progress: 100,
    matches: false
  },
  {
    id: "NCT03900208",
    title: "The Arrhythmogenic Right Ventricular Cardiomyopathy/Dysplasia",
    explanation: "Comprehensive study of right ventricle abnormalities in ARVC/D",
    location: "Location not provided",
    startDate: new Date("2022-04-01"),
    endDate: new Date("2023-07-30"),
    participants: 85,
    status: "completed",
    progress: 100,
    matches: true
  }
];