
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  user: User;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="px-4 pt-4 pb-2 bg-white shadow-sm border-b sticky top-0 z-10 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">My Balance</p>
          <p className="text-xl font-bold text-gray-800">৳{user.balance.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <img 
          src={`https://picsum.photos/seed/${user.username}/100/100`} 
          alt="avatar" 
          className="w-10 h-10 rounded-full border-2 border-indigo-100"
        />
        <span className="font-semibold text-gray-700">{user.username}</span>
      </div>
    </header>
  );
};

export default Header;
