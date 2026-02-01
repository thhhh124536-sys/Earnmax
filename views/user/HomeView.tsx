
import React, { useState } from 'react';
import { Video, User, AppConfig } from '../../types';

interface HomeViewProps {
  videos: Video[];
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  config: AppConfig;
}

const HomeView: React.FC<HomeViewProps> = ({ videos, user, setUser, config }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVideos = videos.filter(v => v.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleUnlock = (video: Video) => {
    // Simulate Ad showing
    alert(`Watching Ad for ${video.title}. Zone ID: ${video.monetagZoneId}`);
    // Update user stats...
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <p className="text-gray-500 text-sm">Watch ads to unlock premium episodes.</p>
        <div className="relative">
          <input
            type="text"
            placeholder="Search episodes..."
            className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] shadow-xl">
        <img 
          src="https://picsum.photos/seed/featured/800/450" 
          alt="Featured" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex flex-col justify-end p-6">
          <div className="flex items-center space-x-2 mb-2">
            <img src="https://picsum.photos/seed/p1/50/50" className="w-8 h-8 rounded-full border border-white" />
            <span className="text-white font-medium text-xs">Premium Content <svg className="inline w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1.414-1.414L9 10.586 7.707 9.293a1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg></span>
          </div>
          <h2 className="text-white text-xl font-bold leading-tight">Links provided below. Unlock now to enjoy!</h2>
          <p className="text-blue-200 text-xs mt-1">@EarnMaxBot_Official</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Trending Files</h3>
        <span className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs font-bold">Latest</span>
      </div>

      <div className="space-y-4">
        {filteredVideos.map((video) => (
          <div key={video.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex space-x-4">
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="w-24 h-24 rounded-xl object-cover"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-gray-800 text-sm">{video.title}</h4>
                <p className="text-gray-500 text-[10px] mt-1 line-clamp-2">{video.description}</p>
              </div>
              <button 
                onClick={() => handleUnlock(video)}
                className="w-full mt-2 py-2 bg-[#101828] text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-2"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2V7a5 5 0 00-5-5zM7 7a3 3 0 016 0v2H7V7z" /></svg>
                <span>Unlock (0/{video.adsLimit})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
