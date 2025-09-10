
import React, { useState, useEffect } from 'react';
import type { User, StudentPerformance } from '../types';
import Header from './Header';
import PerformanceChart from './PerformanceChart';
import { getTeacherInsights } from '../services/geminiService';
import { SparklesIcon } from '@heroicons/react/24/solid';
import LoadingSpinner from './LoadingSpinner';

interface TeacherDashboardProps {
  user: User;
  students: StudentPerformance[];
  onLogout: () => void;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, students, onLogout }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoadingInsights(true);
      const generatedInsights = await getTeacherInsights(students);
      setInsights(generatedInsights);
      setIsLoadingInsights(false);
    };

    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [students]);

  const mathStudents = students.filter(s => s.subject === 'Mathematics');
  const scienceStudents = students.filter(s => s.subject === 'Science');

  return (
    <div className="min-h-screen bg-slate-100">
      <Header user={user} onLogout={onLogout} />
      <main className="p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Teacher Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-8">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Class Performance Overview</h2>
              <PerformanceChart data={students} />
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Student Roster</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b text-slate-600">
                                <th className="p-3 font-semibold">Name</th>
                                <th className="p-3 font-semibold">Subject</th>
                                <th className="p-3 font-semibold">Score</th>
                                <th className="p-3 font-semibold">Last Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.studentName} className="border-b hover:bg-slate-50">
                                    <td className="p-3">{student.studentName}</td>
                                    <td className="p-3">{student.subject}</td>
                                    <td className="p-3 font-medium text-slate-800">{student.score}%</td>
                                    <td className="p-3 text-slate-500">{student.lastActivity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-indigo-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <SparklesIcon className="h-6 w-6" />
                <h2 className="text-xl font-bold">AI-Powered Insights</h2>
              </div>
              {isLoadingInsights ? (
                <div className="flex items-center justify-center h-40">
                    <LoadingSpinner />
                </div>
              ) : (
                <div className="prose prose-invert prose-sm">
                  {insights?.split('\n').map((line, index) => {
                    if (line.startsWith('* ')) {
                      return <p key={index} className="!my-2">{line.substring(2)}</p>;
                    }
                    return <p key={index} className="!my-2">{line}</p>
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
