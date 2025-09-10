
import React from 'react';
import { UserRole } from '../types';
import { UserIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import AlfanumrikLogo from './AlfanumrikLogo';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <AlfanumrikLogo className="h-20 w-auto text-indigo-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">Welcome to Alfanumrik</h1>
        <p className="mt-3 text-slate-600">Transforming Education Through AI-Powered Personalized Learning.</p>
        
        <div className="mt-12 space-y-4">
          <p className="font-semibold text-slate-700">Choose your role to begin:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onLogin(UserRole.STUDENT)}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-indigo-300"
            >
              <div className="bg-indigo-100 rounded-full p-4">
                <UserIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <span className="mt-4 font-semibold text-lg text-slate-800">I am a Student</span>
            </button>
            <button
              onClick={() => onLogin(UserRole.TEACHER)}
              className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1 border border-transparent hover:border-sky-300"
            >
               <div className="bg-sky-100 rounded-full p-4">
                <AcademicCapIcon className="h-8 w-8 text-sky-600" />
              </div>
              <span className="mt-4 font-semibold text-lg text-slate-800">I am a Teacher</span>
            </button>
          </div>
        </div>
        <p className="mt-16 text-sm text-slate-500">&copy; {new Date().getFullYear()} Alfanumrik. Adapting to Every Mind.</p>
      </div>
    </div>
  );
};

export default LoginScreen;
