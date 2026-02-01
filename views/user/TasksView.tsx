
import React from 'react';
import { Task, User } from '../../types';

interface TasksViewProps {
  tasks: Task[];
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const TasksView: React.FC<TasksViewProps> = ({ tasks, user, setUser }) => {
  const handleStartTask = (task: Task) => {
    window.open(task.link, '_blank');
    // In a real app, you'd wait for verification. Here we'll just simulate completion.
    setTimeout(() => {
      if (!user.completedTasks.includes(task.id)) {
        setUser(prev => ({
          ...prev,
          balance: prev.balance + task.reward,
          completedTasks: [...prev.completedTasks, task.id]
        }));
      }
    }, 2000);
  };

  const progress = (user.completedTasks.length / tasks.length) * 100;

  return (
    <div className="p-4 space-y-6">
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-gray-800">Daily Tasks</h2>
        <p className="text-gray-500 text-sm">Complete simple tasks for cash</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Daily Progress</h3>
          <span className="text-indigo-600 font-bold text-sm">{user.completedTasks.length}/{tasks.length}</span>
        </div>
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-[10px] text-gray-400">Complete 5 tasks daily for bonus rewards</p>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => {
          const isCompleted = user.completedTasks.includes(task.id);
          return (
            <div key={task.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826L10.242 10.242m4.526 4.526l4-4a4 4 0 10-5.656-5.656l-1.103 1.103" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm flex items-center">
                    {task.title} {isCompleted && <span className="ml-1 text-green-500">✅</span>}
                  </h4>
                  <p className="text-green-600 font-bold text-xs">+৳{task.reward.toFixed(2)}</p>
                </div>
              </div>
              <button 
                onClick={() => handleStartTask(task)}
                disabled={isCompleted}
                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                  isCompleted 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 active:scale-95'
                }`}
              >
                {isCompleted ? 'Done' : 'Start'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TasksView;
