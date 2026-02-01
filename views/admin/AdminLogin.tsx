
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onBack }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    if (user === 'Anit124536' && pass === '124536Ar@') {
      onLogin();
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-white text-3xl font-black">Admin Panel</h1>
        <p className="text-slate-400 text-sm">Authorized access only</p>
      </div>

      <div className="w-full max-w-md space-y-4">
        <input 
          type="text"
          placeholder="Admin Username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
        <input 
          type="password"
          placeholder="Admin Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        />
        <button 
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-xl shadow-indigo-900/20 active:scale-95 transition-all"
        >
          Login to Dashboard
        </button>
        <button 
          onClick={onBack}
          className="w-full text-slate-500 py-2 text-sm font-medium hover:text-slate-400"
        >
          Cancel and return
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
