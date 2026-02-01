
import React, { useState } from 'react';
import { User, AppConfig, AppView } from '../../types';

interface ProfileViewProps {
  user: User;
  config: AppConfig;
  setView: (view: AppView) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, config, setView }) => {
  const [method, setMethod] = useState('Bkash (Personal)');
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [clickCount, setClickCount] = useState(0);

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) < config.minWithdrawAmount) {
      alert(`Minimum withdraw is ৳${config.minWithdrawAmount}`);
      return;
    }
    if (user.balance < parseFloat(amount)) {
      alert("Insufficient balance!");
      return;
    }
    
    // Referral Check
    if (user.totalRefers < config.minWithdrawReferralCount) {
      alert(`Withdrawal Locked! You need at least ${config.minWithdrawReferralCount} referrals to withdraw. Current refers: ${user.totalRefers}`);
      return;
    }
    
    // Show withdrawal notice first
    alert(`--- WITHDRAW RULES ---\n${config.withdrawRules}\n\n--- IMPORTANT NOTICE ---\n${config.withdrawNotice}`);
    
    // Logic to submit withdrawal...
    alert("Withdrawal request submitted successfully! Please wait for admin approval.");
  };

  const handleSecretAdminAccess = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    // Secret access: click 5 times to show admin login
    if (nextCount >= 5) {
      setView(AppView.ADMIN_LOGIN);
      setClickCount(0);
    }
    // Reset click count after 3 seconds of inactivity
    setTimeout(() => setClickCount(0), 3000);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col items-center pt-6 pb-2 space-y-3">
        <div className="relative group cursor-pointer" onClick={handleSecretAdminAccess}>
          <img 
            src={`https://picsum.photos/seed/${user.username}/200/200`} 
            alt="avatar" 
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="absolute inset-0 rounded-full bg-black/0 active:bg-black/10 transition-colors"></div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">{user.username}</h2>
          <p className="text-gray-400 font-medium text-sm">@{user.referralCode}</p>
          <p className="text-gray-300 text-[10px] mt-1 select-none">User ID: {user.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Balance</p>
          <p className="text-xl font-black text-indigo-600">৳{user.balance.toFixed(2)}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center space-y-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Refers</p>
          <p className="text-xl font-black text-blue-600">{user.totalRefers}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-800">Withdraw Funds</h3>
          </div>
          {user.totalRefers < config.minWithdrawReferralCount && (
            <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold animate-pulse">
              Locked: Need {config.minWithdrawReferralCount} Refers
            </span>
          )}
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1">Payment Method</label>
            <select 
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full bg-slate-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none appearance-none"
            >
              <option>Bkash (Personal)</option>
              <option>Nagad (Personal)</option>
              <option>Rocket (Personal)</option>
              <option>Upay (Personal)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1">Wallet / Number</label>
            <input 
              type="text"
              placeholder="017xxxxxxxx"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="w-full bg-slate-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1">Amount (Min ৳{config.minWithdrawAmount})</label>
            <input 
              type="number"
              placeholder="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-slate-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-100 outline-none"
            />
          </div>

          <button 
            onClick={handleWithdraw}
            className={`w-full py-4 rounded-2xl font-bold text-sm shadow-lg active:scale-[0.98] transition-all ${
              user.totalRefers < config.minWithdrawReferralCount 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
              : 'bg-indigo-600 text-white shadow-indigo-100'
            }`}
          >
            {user.totalRefers < config.minWithdrawReferralCount ? 'Referral Goal Not Met' : 'Submit Withdrawal Request'}
          </button>
          
          <p className="text-[10px] text-center text-gray-400 italic">
            Requirement: {config.minWithdrawReferralCount} Successful Referrals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
