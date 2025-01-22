interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'support' | 'therapy' | 'clinics' | 'research';
  link?: string;
  location?: string;
  contact?: string;
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'ARVC Self Help Group',
    description: 'Learn more about ACM and connect with others affected by ACM in a supportive environment',
    category: 'support',
    link: 'https://www.arvc-selbsthilfe.org/',
    contact: 'info@arvc-selbsthilfe.org'
  },
  {
    id: '2',
    title: 'Psychological Support Services',
    description: 'Specialized counseling for individuals dealing with chronic conditions',
    category: 'therapy',
    location: 'Multiple locations available',
    contact: '+49 123 456 7890'
  },
  {
    id: '3',
    title: 'ACM Specialist Center',
    description: 'Specialized center for ACM treatment and research',
    category: 'clinics',
    location: 'Deutsches Herzzentrum München, Bayern, Germany',
    link: 'https://www.deutsches-herzzentrum-muenchen.de/',
    contact: '+49 (0) 89 1218-0'
  },
  {
    id: '4',
    title: 'Understanding ACM',
    description: 'Comprehensive guide to Arrhythmogenic Cardiomyopathy',
    category: 'research',
    link: 'https://www.pennmedicine.org/for-patients-and-visitors/patient-information/conditions-treated-a-to-z/arrhythmogenic-cardiomyopathy'
  }
] 