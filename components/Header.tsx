
import React, { useState } from 'react';
import type { User } from '../types';
import { UserRole } from '../types';
import { ChevronDownIcon, ArrowRightOnRectangleIcon, LanguageIcon } from '@heroicons/react/24/outline';
import { LANGUAGES } from '../constants';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  
  const roleBg = user.role === UserRole.STUDENT ? 'bg-indigo-100 text-indigo-800' : 'bg-sky-100 text-sky-800';
  
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="max-w-full mx-auto px-8">
        <div className="flex justify-end items-center h-16">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600 transition-colors"
              >
                <LanguageIcon className="h-6 w-6" />
                <span>{selectedLang.name}</span>
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-1 z-20">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang);
                        setLangDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2"
              >
                <div className="text-right">
                  <p className="font-semibold text-slate-800">{user.name}</p>
                  <p className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block ${roleBg}`}>
                    {user.role}
                  </p>
                </div>
                <img
                  className="h-10 w-10 rounded-full"
                  src={`https://i.pravatar.cc/150?u=${user.name}`}
                  alt="User avatar"
                />
                <ChevronDownIcon className="h-5 w-5 text-slate-500" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-20">
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
