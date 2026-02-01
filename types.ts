
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  link: string;
  adsLimit: number;
  monetagZoneId: string;
  createdAt: number;
  views: number;
  description: string;
}

export interface Task {
  id: string;
  title: string;
  reward: number;
  type: 'telegram' | 'youtube' | 'social';
  link: string;
  completed: boolean;
}

export interface Milestone {
  id: string;
  referCount: number;
  bonus: number;
}

export interface AppConfig {
  dailyAdLimit: number;
  adReward: number;
  referReward: number;
  withdrawRules: string;
  withdrawNotice: string;
  minWithdrawAmount: number;
  minWithdrawReferralCount: number;
  monetagMainZoneId: string;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    databaseURL: string;
  };
}

export interface User {
  id: string;
  username: string;
  balance: number;
  totalRefers: number;
  referralCode: string;
  dailyAdsWatched: number;
  completedTasks: string[];
  unlockedMilestones: string[];
}

export enum AppView {
  HOME = 'HOME',
  EARN = 'EARN',
  TASKS = 'TASKS',
  REFER = 'REFER',
  PROFILE = 'PROFILE',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_DASHBOARD = 'ADMIN_DASHBOARD'
}
