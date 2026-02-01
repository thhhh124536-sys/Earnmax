
import React from 'react';
import { AppConfig, User } from '../../types';

interface EarnViewProps {
  config: AppConfig;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const EarnView: React.FC<EarnViewProps> = ({ config, user, setUser }) => {
  const handleWatchAd = () => {
    if (user.dailyAdsWatched >= config.dailyAdLimit) {
      alert("Daily limit reached!");
      return;
    }
    
    // Simulate Ad Call
    alert(`Calling Monetag Zone ID: ${config.monetagMainZoneId}`);
    
    setUser(prev => ({
      ...prev,
      balance: prev.balance + config.adReward,
      dailyAdsWatched: prev.dailyAdsWatched + 1
    }));
  };

  return (
    <div className="p-4 flex flex-col items-center space-y-8">
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-gray-800">Earn Money</h2>
        <p className="text-gray-500 text-sm">Watch ads & boost your wallet</p>
        <div className="mt-4 inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold border border-indigo-100">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Daily Limit: {user.dailyAdsWatched}/{config.dailyAdLimit}</span>
        </div>
      </div>

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl shadow-indigo-100 p-8 flex flex-col items-center space-y-6 border border-gray-50">
        <div className="relative">
          <div className="absolute inset-0 bg-orange-400 blur-2xl opacity-20 animate-pulse"></div>
          <button 
            onClick={handleWatchAd}
            className="relative w-32 h-32 bg-gradient-to-tr from-orange-400 to-amber-300 rounded-full shadow-lg shadow-orange-100 flex items-center justify-center transition-transform active:scale-95"
          >
            <svg className="w-16 h-16 text-white ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202l4.445 3.63A1 1 0 0016 14V6a1 1 0 00-1.555-.832L10 8.798 4.555 5.168z" />
            </svg>
          </button>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-gray-800">Watch Video Ad</h3>
          <p className="text-gray-500 text-sm">Get <span className="text-green-600 font-bold">৳{config.adReward.toFixed(2)}</span> instantly per video.</p>
        </div>

        <button 
          onClick={handleWatchAd}
          className="w-full py-4 bg-[#101828] text-white rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-lg hover:bg-gray-800 active:scale-[0.98] transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
          <span>Start Watching</span>
        </button>
      </div>

      <div className="w-full max-w-sm bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100/50 space-y-3">
        <h4 className="font-bold text-indigo-900 flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          <span>Rules</span>
        </h4>
        <ul className="text-xs text-indigo-700 space-y-2">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Watch the full video to get the reward.
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Do not close the popup early.
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Daily Limit resets every 24 hours.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EarnView;
