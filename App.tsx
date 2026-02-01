
import React, { useState, useEffect } from 'react';
import { AppView, User, Video, AppConfig, Milestone, Task } from './types';
import { INITIAL_CONFIG, INITIAL_VIDEOS, INITIAL_MILESTONES, INITIAL_TASKS } from './constants';
import HomeView from './views/user/HomeView';
import EarnView from './views/user/EarnView';
import TasksView from './views/user/TasksView';
import ReferView from './views/user/ReferView';
import ProfileView from './views/user/ProfileView';
import AdminLogin from './views/admin/AdminLogin';
import AdminDashboard from './views/admin/AdminDashboard';
import BottomNav from './components/BottomNav';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('user_data_profile');
    if (saved) return JSON.parse(saved);
    return {
      id: '7768651593',
      username: 'Anit',
      balance: 40.0,
      totalRefers: 0,
      referralCode: 'Anitroyrony',
      dailyAdsWatched: 0,
      completedTasks: [],
      unlockedMilestones: []
    };
  });

  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('app_config');
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [videos, setVideos] = useState<Video[]>(() => {
    const saved = localStorage.getItem('app_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const saved = localStorage.getItem('app_milestones');
    return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('app_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Persist data whenever state changes
  useEffect(() => {
    localStorage.setItem('app_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('app_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('app_milestones', JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem('app_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('user_data_profile', JSON.stringify(user));
  }, [user]);

  const handleUpdateConfig = (newConfig: AppConfig) => setConfig(newConfig);
  const handleUpdateVideos = (newVideos: Video[]) => setVideos(newVideos);
  const handleUpdateMilestones = (newMilestones: Milestone[]) => setMilestones(newMilestones);
  const handleUpdateTasks = (newTasks: Task[]) => setTasks(newTasks);

  const simulateReferral = () => {
    setUser(prev => ({
      ...prev,
      totalRefers: prev.totalRefers + 1,
      balance: prev.balance + config.referReward
    }));
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <HomeView videos={videos} user={user} setUser={setUser} config={config} />;
      case AppView.EARN:
        return <EarnView config={config} user={user} setUser={setUser} />;
      case AppView.TASKS:
        return <TasksView tasks={tasks} user={user} setUser={setUser} />;
      case AppView.REFER:
        return <ReferView milestones={milestones} config={config} user={user} />;
      case AppView.PROFILE:
        return <ProfileView config={config} user={user} setView={setCurrentView} />;
      case AppView.ADMIN_LOGIN:
        return <AdminLogin onLogin={() => setCurrentView(AppView.ADMIN_DASHBOARD)} onBack={() => setCurrentView(AppView.PROFILE)} />;
      case AppView.ADMIN_DASHBOARD:
        return (
          <AdminDashboard 
            config={config} 
            setConfig={handleUpdateConfig}
            videos={videos}
            setVideos={handleUpdateVideos}
            milestones={milestones}
            setMilestones={handleUpdateMilestones}
            tasks={tasks}
            setTasks={handleUpdateTasks}
            onLogout={() => setCurrentView(AppView.PROFILE)} 
          />
        );
      default:
        return <HomeView videos={videos} user={user} setUser={setUser} config={config} />;
    }
  };

  const isAdminView = currentView === AppView.ADMIN_DASHBOARD || currentView === AppView.ADMIN_LOGIN;

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden relative">
      {!isAdminView && <Header user={user} />}
      
      <main className="flex-1 overflow-y-auto">
        {renderView()}
        
        {/* Test Tool */}
        {window.location.hostname === 'localhost' && !isAdminView && (
          <div className="fixed bottom-24 right-4 z-50">
            <button onClick={simulateReferral} className="bg-black/50 text-white text-[8px] p-2 rounded-full opacity-30 hover:opacity-100">
              Dev: +1 Refer
            </button>
          </div>
        )}
      </main>

      {!isAdminView && (
        <BottomNav currentView={currentView} setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default App;
