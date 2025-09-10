
import type { Course, StudentPerformance } from './types';
import { AcademicCapIcon, BeakerIcon, BookOpenIcon, CalculatorIcon } from '@heroicons/react/24/outline';

export const MOCK_COURSES: Course[] = [
  { id: 'math-8', title: 'Mathematics Grade 8', subject: 'Mathematics', progress: 75, icon: CalculatorIcon },
  { id: 'sci-8', title: 'Science Grade 8', subject: 'Science', progress: 50, icon: BeakerIcon },
  { id: 'eng-8', title: 'English Grade 8', subject: 'English', progress: 90, icon: BookOpenIcon },
  { id: 'hist-8', title: 'Social Studies Grade 8', subject: 'History', progress: 30, icon: AcademicCapIcon },
];

export const MOCK_STUDENT_PERFORMANCE: StudentPerformance[] = [
  { studentName: 'Aarav Sharma', subject: 'Mathematics', score: 85, questionsAttempted: 20, correctAnswers: 17, lastActivity: '2 hours ago' },
  { studentName: 'Diya Patel', subject: 'Mathematics', score: 92, questionsAttempted: 25, correctAnswers: 23, lastActivity: '1 day ago' },
  { studentName: 'Rohan Mehta', subject: 'Mathematics', score: 72, questionsAttempted: 18, correctAnswers: 13, lastActivity: '30 minutes ago' },
  { studentName: 'Priya Singh', subject: 'Science', score: 88, questionsAttempted: 22, correctAnswers: 19, lastActivity: '5 hours ago' },
  { studentName: 'Advik Gupta', subject: 'Science', score: 65, questionsAttempted: 15, correctAnswers: 10, lastActivity: 'yesterday' },
  { studentName: 'Ananya Reddy', subject: 'English', score: 95, questionsAttempted: 30, correctAnswers: 29, lastActivity: '1 hour ago' },
];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'bn', name: 'বাংলা' },
];
