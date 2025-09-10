
import React, { useState } from 'react';
import type { User, Course } from '../types';
import Header from './Header';
import { MOCK_COURSES } from '../constants';
import { BookOpenIcon, Cog6ToothIcon, LightBulbIcon, SparklesIcon } from '@heroicons/react/24/outline';
import LearningModule from './LearningModule';
import EQModule from './EQModule';

interface StudentDashboardProps {
  user: User;
  courses: Course[];
  onLogout: () => void;
}

type ActiveView = 'dashboard' | 'learning' | 'iq' | 'eq';

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleStartLearning = (course: Course) => {
    setSelectedCourse(course);
    setActiveView('learning');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'learning':
        return <LearningModule course={selectedCourse!} onBack={() => setActiveView('dashboard')} />;
      case 'eq':
        return <EQModule onBack={() => setActiveView('dashboard')} />;
      case 'dashboard':
      default:
        return (
          <>
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_COURSES.map(course => (
                <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-100 p-3 rounded-xl">
                      <course.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg">{course.subject}</h3>
                  </div>
                  <p className="text-slate-600 mt-2 flex-grow">{course.title}</p>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <button onClick={() => handleStartLearning(course)} className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 my-6 pt-4">Skill Development</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div onClick={() => setActiveView('eq')} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <div className="flex items-center space-x-4">
                        <div className="bg-teal-100 p-3 rounded-xl">
                            <SparklesIcon className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">Emotional Intelligence (EQ)</h3>
                            <p className="text-slate-600 mt-1">Develop self-awareness and social skills.</p>
                        </div>
                    </div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm opacity-50 cursor-not-allowed">
                    <div className="flex items-center space-x-4">
                        <div className="bg-amber-100 p-3 rounded-xl">
                            <LightBulbIcon className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">Logical Reasoning (IQ)</h3>
                            <p className="text-slate-600 mt-1">Coming soon...</p>
                        </div>
                    </div>
                 </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex">
      <nav className="w-64 bg-white shadow-md flex-shrink-0 min-h-screen p-4 flex flex-col">
        <h1 className="text-2xl font-bold text-indigo-600 p-4">Alfanumrik</h1>
        <ul className="space-y-2 mt-8">
          <li>
            <button onClick={() => setActiveView('dashboard')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold text-left transition-colors ${activeView === 'dashboard' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}>
              <BookOpenIcon className="h-6 w-6" />
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button onClick={() => setActiveView('eq')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold text-left transition-colors ${activeView === 'eq' ? 'bg-indigo-100 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`}>
              <SparklesIcon className="h-6 w-6" />
              <span>EQ Training</span>
            </button>
          </li>
        </ul>
        <div className="mt-auto">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 text-left transition-colors">
            <Cog6ToothIcon className="h-6 w-6" />
            <span>Settings</span>
          </button>
        </div>
      </nav>
      <main className="flex-1">
        <Header user={user} onLogout={onLogout} />
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
