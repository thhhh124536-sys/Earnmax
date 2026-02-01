
import React from 'react';
import { AppView } from '../types';

interface BottomNavProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setCurrentView }) => {
  const tabs = [
    { id: AppView.HOME, label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: AppView.EARN, label: 'Earn', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: AppView.TASKS, label: 'Tasks', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { id: AppView.REFER, label: 'Refer', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' },
    { id: AppView.PROFILE, label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 px-1 z-20 pb-safe">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentView(tab.id)}
          className={`flex flex-col items-center flex-1 transition-colors ${
            currentView === tab.id ? 'text-indigo-600 font-bold' : 'text-gray-400'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={currentView === tab.id ? 2.5 : 2} d={tab.icon} />
          </svg>
          <span className="text-[10px] mt-1">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
