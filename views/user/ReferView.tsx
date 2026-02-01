
import React from 'react';
import { Milestone, User, AppConfig } from '../../types';

interface ReferViewProps {
  milestones: Milestone[];
  config: AppConfig;
  user: User;
}

const ReferView: React.FC<ReferViewProps> = ({ milestones, config, user }) => {
  const referLink = `https://t.me/EarnMaxBot?start=${user.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referLink);
    alert("Referral link copied! Share it with friends to earn bonus cash.");
  };

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="relative rounded-3xl overflow-hidden aspect-[2/1] bg-gradient-to-br from-indigo-600 to-purple-500 p-8 flex flex-col items-center justify-center text-center space-y-2 shadow-xl shadow-indigo-200">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
        </div>
        <h2 className="text-white text-3xl font-black">Invite Friends</h2>
        <p className="text-indigo-100 text-sm font-medium">Earn up to ৳10,000 from milestones!</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Referral Bonus</p>
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-600">You get instantly</p>
          <span className="text-lg font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg border border-green-100">৳{config.referReward}</span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 space-y-3">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Unique Link</p>
        <div className="flex space-x-2">
          <input 
            readOnly
            value={referLink}
            className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-[10px] text-gray-500 font-mono outline-none"
          />
          <button 
            onClick={copyToClipboard}
            className="bg-[#101828] text-white px-5 rounded-xl font-bold text-xs hover:bg-gray-800 transition-colors"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Referral Milestones</h3>
        <div className="space-y-3">
          {milestones.map((m) => {
            const isUnlocked = user.totalRefers >= m.referCount;
            return (
              <div key={m.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{m.referCount} Friends</h4>
                  <p className="text-indigo-600 font-bold text-xs">Bonus Reward: ৳{m.bonus}</p>
                </div>
                <button 
                  disabled={!isUnlocked}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    isUnlocked 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-100 active:scale-95' 
                    : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isUnlocked ? 'Claimed' : 'Locked'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReferView;
