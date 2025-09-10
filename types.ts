
export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export interface User {
  name: string;
  role: UserRole;
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  progress: number;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}

export interface StudentPerformance {
  studentName: string;
  subject: string;
  score: number;
  questionsAttempted: number;
  correctAnswers: number;
  lastActivity: string;
}

export interface Question {
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}
