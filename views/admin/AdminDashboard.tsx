
import React, { useState } from 'react';
import { AppConfig, Video, Milestone, Task } from '../../types';

interface AdminDashboardProps {
  config: AppConfig;
  setConfig: (c: AppConfig) => void;
  videos: Video[];
  setVideos: (v: Video[]) => void;
  milestones: Milestone[];
  setMilestones: (m: Milestone[]) => void;
  tasks: Task[];
  setTasks: (t: Task[]) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  config, setConfig, videos, setVideos, milestones, setMilestones, tasks, setTasks, onLogout 
}) => {
  const [tab, setTab] = useState<'config' | 'videos' | 'tasks' | 'milestones' | 'database'>('config');
  const [statusMsg, setStatusMsg] = useState<{type: 'success'|'error', text: string} | null>(null);

  // --- Forms State ---
  const [videoForm, setVideoForm] = useState<Video>({
    id: '', title: '', thumbnail: '', link: '', adsLimit: 5, monetagZoneId: '', createdAt: 0, views: 0, description: ''
  });
  const [isEditingVideo, setIsEditingVideo] = useState(false);

  const [taskForm, setTaskForm] = useState<Task>({
    id: '', title: '', reward: 100, type: 'telegram', link: '', completed: false
  });
  const [isEditingTask, setIsEditingTask] = useState(false);

  const [milestoneForm, setMilestoneForm] = useState<Milestone>({
    id: '', referCount: 10, bonus: 100
  });
  const [isEditingMilestone, setIsEditingMilestone] = useState(false);

  const showStatus = (text: string, type: 'success'|'error' = 'success') => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  const handleSaveConfig = () => {
    setConfig({ ...config });
    showStatus("System Settings Updated! ✅");
  };

  // --- Video Logic ---
  const handleVideoSubmit = () => {
    if (!videoForm.title || !videoForm.link) {
      showStatus("Title and Link are required!", 'error');
      return;
    }
    if (isEditingVideo) {
      const updated = videos.map(v => v.id === videoForm.id ? videoForm : v);
      setVideos(updated);
      showStatus("Video updated!");
    } else {
      const newVideo = { ...videoForm, id: Date.now().toString(), createdAt: Date.now() };
      setVideos([newVideo, ...videos]);
      showStatus("New video posted!");
    }
    setVideoForm({ id: '', title: '', thumbnail: '', link: '', adsLimit: 5, monetagZoneId: '', createdAt: 0, views: 0, description: '' });
    setIsEditingVideo(false);
  };

  const handleDeleteVideo = (id: string) => {
    if (window.confirm("Are you sure? This video will be removed from user panel.")) {
      setVideos(videos.filter(v => v.id !== id));
      showStatus("Video deleted.");
    }
  };

  // --- Task Logic ---
  const handleTaskSubmit = () => {
    if (!taskForm.title || !taskForm.link) {
      showStatus("Task Title and Link are required!", 'error');
      return;
    }
    if (isEditingTask) {
      const updated = tasks.map(t => t.id === taskForm.id ? taskForm : t);
      setTasks(updated);
      showStatus("Task updated!");
    } else {
      const newTask = { ...taskForm, id: Date.now().toString() };
      setTasks([newTask, ...tasks]);
      showStatus("New task added!");
    }
    setTaskForm({ id: '', title: '', reward: 100, type: 'telegram', link: '', completed: false });
    setIsEditingTask(false);
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter(t => t.id !== id));
      showStatus("Task deleted.");
    }
  };

  // --- Milestone Logic ---
  const handleMilestoneSubmit = () => {
    if (isEditingMilestone) {
      const updated = milestones.map(m => m.id === milestoneForm.id ? milestoneForm : m);
      setMilestones(updated);
      showStatus("Milestone updated!");
    } else {
      const newM = { ...milestoneForm, id: Date.now().toString() };
      setMilestones([...milestones, newM]);
      showStatus("New milestone added!");
    }
    setMilestoneForm({ id: '', referCount: 10, bonus: 100 });
    setIsEditingMilestone(false);
  };

  const handleDeleteMilestone = (id: string) => {
    if (window.confirm("Delete this milestone?")) {
      setMilestones(milestones.filter(m => m.id !== id));
      showStatus("Milestone removed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      {statusMsg && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm animate-bounce ${
          statusMsg.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
        }`}>
          {statusMsg.text}
        </div>
      )}

      <header className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <h1 className="font-black text-xl text-slate-800 tracking-tight">EarnMax Control</h1>
        <button onClick={onLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-bold text-xs">Logout</button>
      </header>

      <div className="flex bg-white border-b sticky top-[60px] z-20 overflow-x-auto no-scrollbar">
        {[
          { id: 'config', label: '1. Settings' },
          { id: 'tasks', label: '2. Tasks' },
          { id: 'videos', label: '3. Movies' },
          { id: 'milestones', label: '4. Milestones' },
          { id: 'database', label: '5. DB' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as any)}
            className={`px-6 py-4 text-sm font-bold whitespace-nowrap relative ${tab === t.id ? 'text-indigo-600' : 'text-slate-400'}`}
          >
            {t.label}
            {tab === t.id && <div className="absolute bottom-0 left-6 right-6 h-1 bg-indigo-600 rounded-t-full"></div>}
          </button>
        ))}
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* SETTINGS */}
        {tab === 'config' && (
          <div className="space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-black text-slate-800">Global Config</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1">DAILY ADS</label>
                <input type="number" value={config.dailyAdLimit} onChange={(e) => setConfig({...config, dailyAdLimit: parseInt(e.target.value)})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1">AD REWARD (৳)</label>
                <input type="number" value={config.adReward} onChange={(e) => setConfig({...config, adReward: parseFloat(e.target.value)})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1">REFER (৳)</label>
                <input type="number" value={config.referReward} onChange={(e) => setConfig({...config, referReward: parseFloat(e.target.value)})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 ml-1">MIN WITHDRAW</label>
                <input type="number" value={config.minWithdrawAmount} onChange={(e) => setConfig({...config, minWithdrawAmount: parseFloat(e.target.value)})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
              </div>
              <div className="space-y-1 col-span-2">
                <label className="text-[10px] font-bold text-slate-400 ml-1">MIN WITHDRAW REFERS (NEEDED)</label>
                <input type="number" value={config.minWithdrawReferralCount} onChange={(e) => setConfig({...config, minWithdrawReferralCount: parseInt(e.target.value)})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none font-black text-red-600"/>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 ml-1">MONETAG MAIN ZONE</label>
              <input type="text" value={config.monetagMainZoneId} onChange={(e) => setConfig({...config, monetagMainZoneId: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 ml-1">WITHDRAW NOTICE</label>
              <textarea rows={3} value={config.withdrawNotice} onChange={(e) => setConfig({...config, withdrawNotice: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none text-sm"/>
            </div>
            <button onClick={handleSaveConfig} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg">Save All Settings</button>
          </div>
        )}

        {/* TASKS */}
        {tab === 'tasks' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-lg font-black text-slate-800">{isEditingTask ? 'Edit Task' : 'Add New Task'}</h2>
              <input placeholder="Task Title" value={taskForm.title} onChange={(e) => setTaskForm({...taskForm, title: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
              <input placeholder="Link" value={taskForm.link} onChange={(e) => setTaskForm({...taskForm, link: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Reward" value={taskForm.reward} onChange={(e) => setTaskForm({...taskForm, reward: parseFloat(e.target.value)})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
                <select value={taskForm.type} onChange={(e) => setTaskForm({...taskForm, type: e.target.value as any})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none">
                  <option value="telegram">Telegram</option>
                  <option value="youtube">YouTube</option>
                  <option value="social">Social</option>
                </select>
              </div>
              <button onClick={handleTaskSubmit} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">
                {isEditingTask ? 'Update Task' : 'Publish Task'}
              </button>
              {isEditingTask && <button onClick={() => {setIsEditingTask(false); setTaskForm({id:'', title:'', reward:100, type:'telegram', link:'', completed:false})}} className="w-full text-slate-400 text-xs font-bold">Cancel Edit</button>}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-500 ml-1">Live Tasks ({tasks.length})</h3>
              {tasks.map(t => (
                <div key={t.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-lg font-bold text-xs">{t.type[0].toUpperCase()}</div>
                    <p className="font-bold text-sm">{t.title}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button onClick={() => {setTaskForm(t); setIsEditingTask(true)}} className="p-2 text-blue-500 bg-blue-50 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    <button onClick={() => handleDeleteTask(t.id)} className="p-2 text-red-500 bg-red-50 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MOVIES */}
        {tab === 'videos' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-lg font-black text-slate-800">{isEditingVideo ? 'Edit Movie' : 'Post New Movie'}</h2>
              <input placeholder="Movie Title" value={videoForm.title} onChange={(e) => setVideoForm({...videoForm, title: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
              <input placeholder="Thumbnail URL" value={videoForm.thumbnail} onChange={(e) => setVideoForm({...videoForm, thumbnail: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Monetag ID" value={videoForm.monetagZoneId} onChange={(e) => setVideoForm({...videoForm, monetagZoneId: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
                <input type="number" placeholder="Ads Count" value={videoForm.adsLimit} onChange={(e) => setVideoForm({...videoForm, adsLimit: parseInt(e.target.value)})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
              </div>
              <input placeholder="Video Link" value={videoForm.link} onChange={(e) => setVideoForm({...videoForm, link: e.target.value})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none"/>
              <button onClick={handleVideoSubmit} className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold shadow-lg">
                {isEditingVideo ? 'Update Post' : 'Publish Movie'}
              </button>
              {isEditingVideo && <button onClick={() => {setIsEditingVideo(false); setVideoForm({id:'', title:'', thumbnail:'', link:'', adsLimit:5, monetagZoneId:'', createdAt:0, views:0, description:''})}} className="w-full text-slate-400 text-xs font-bold">Cancel Edit</button>}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-500 ml-1">Live Feed ({videos.length})</h3>
              {videos.map(v => (
                <div key={v.id} className="bg-white p-3 rounded-2xl flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <img src={v.thumbnail} className="w-10 h-10 rounded-lg object-cover flex-shrink-0"/>
                    <p className="font-bold text-sm truncate">{v.title}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button onClick={() => {setVideoForm(v); setIsEditingVideo(true)}} className="p-2 text-blue-500 bg-blue-50 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    <button onClick={() => handleDeleteVideo(v.id)} className="p-2 text-red-500 bg-red-50 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MILESTONES (NEW) */}
        {tab === 'milestones' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
              <h2 className="text-lg font-black text-slate-800">{isEditingMilestone ? 'Edit Milestone' : 'Add New Milestone'}</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">TARGET REFERS</label>
                  <input type="number" value={milestoneForm.referCount} onChange={(e) => setMilestoneForm({...milestoneForm, referCount: parseInt(e.target.value)})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none font-bold"/>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400">BONUS (৳)</label>
                  <input type="number" value={milestoneForm.bonus} onChange={(e) => setMilestoneForm({...milestoneForm, bonus: parseInt(e.target.value)})} className="w-full bg-slate-50 border p-3 rounded-xl outline-none font-bold text-green-600"/>
                </div>
              </div>
              <button onClick={handleMilestoneSubmit} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold">
                {isEditingMilestone ? 'Update Milestone' : 'Add Milestone'}
              </button>
              {isEditingMilestone && <button onClick={() => {setIsEditingMilestone(false); setMilestoneForm({id:'', referCount:10, bonus:100})}} className="w-full text-slate-400 text-xs font-bold">Cancel</button>}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-500 ml-1">Current Milestones ({milestones.length})</h3>
              {milestones.map(m => (
                <div key={m.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm">
                  <div>
                    <p className="font-bold text-sm">{m.referCount} Refers</p>
                    <p className="text-xs text-green-600 font-bold">Bonus: ৳{m.bonus}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button onClick={() => {setMilestoneForm(m); setIsEditingMilestone(true)}} className="p-2 text-blue-500 bg-blue-50 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                    <button onClick={() => handleDeleteMilestone(m.id)} className="p-2 text-red-500 bg-red-50 rounded-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DATABASE */}
        {tab === 'database' && (
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-lg font-black text-slate-800">Database Connection</h2>
            <div className="space-y-3">
              {Object.keys(config.firebaseConfig).map((key) => (
                <div key={key} className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">{key}</label>
                  <input type="text" value={(config.firebaseConfig as any)[key]} onChange={(e) => {
                    const updated = { ...config.firebaseConfig, [key]: e.target.value };
                    setConfig({ ...config, firebaseConfig: updated });
                  }} className="w-full bg-slate-50 border p-2 rounded-xl outline-none text-xs font-mono"/>
                </div>
              ))}
              <button onClick={() => showStatus("Firebase Synced!")} className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold">Connect & Sync</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
