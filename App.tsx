
import React, { useState, useCallback, useEffect } from 'react';
import type { User } from './types';
import { UserRole } from './types';
import LoginScreen from './components/LoginScreen';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import { MOCK_COURSES, MOCK_STUDENT_PERFORMANCE } from './constants';
import AlfanumrikLogo from './components/AlfanumrikLogo';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets or checking session
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = useCallback((role: UserRole) => {
    if (role === UserRole.STUDENT) {
      setUser({ name: 'Aarav Sharma', role: UserRole.STUDENT });
    } else {
      setUser({ name: 'Mrs. Das', role: UserRole.TEACHER });
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <AlfanumrikLogo className="h-16 w-auto text-indigo-600 mb-4" />
        <LoadingSpinner />
        <p className="mt-4 text-slate-600">Initializing Alfanumrik Platform...</p>
      </div>
    );
  }
  
  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {user.role === UserRole.STUDENT && <StudentDashboard user={user} courses={MOCK_COURSES} onLogout={handleLogout} />}
      {user.role === UserRole.TEACHER && <TeacherDashboard user={user} students={MOCK_STUDENT_PERFORMANCE} onLogout={handleLogout} />}
    </div>
  );
};

export default App;
