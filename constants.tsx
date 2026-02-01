
import React from 'react';
import { AppConfig, Video, Milestone, Task } from './types';

export const INITIAL_CONFIG: AppConfig = {
  dailyAdLimit: 60,
  adReward: 20,
  referReward: 50,
  withdrawRules: "1. Follow all steps correctly.\n2. Do not use VPN or Proxy.\n3. Account must be at least 24h old.",
  withdrawNotice: "Payment processing takes up to 24-48 hours. Please be patient and check your wallet.",
  minWithdrawAmount: 100,
  minWithdrawReferralCount: 5,
  monetagMainZoneId: "1234567",
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    databaseURL: ""
  }
};

export const INITIAL_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Exclusive Movie Clip 01 🔞',
    thumbnail: 'https://picsum.photos/seed/clip1/400/250',
    link: 'https://example.com/v1',
    adsLimit: 6,
    monetagZoneId: '7654321',
    createdAt: Date.now(),
    views: 1240,
    description: 'Watch the full 3 minute 24 second video here 👇🔗'
  },
  {
    id: '2',
    title: 'Viral Social Media Leak 🔞',
    thumbnail: 'https://picsum.photos/seed/clip2/400/250',
    link: 'https://example.com/v2',
    adsLimit: 5,
    monetagZoneId: '7654321',
    createdAt: Date.now() - 86400000,
    views: 4500,
    description: 'Check out the 16-minute uncut version 😋'
  }
];

export const INITIAL_MILESTONES: Milestone[] = [
  { id: 'm1', referCount: 100, bonus: 2000 },
  { id: 'm2', referCount: 300, bonus: 6000 },
  { id: 'm3', referCount: 500, bonus: 9000 }
];

export const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Check Payment Proof ✅', reward: 100, type: 'telegram', link: 'https://t.me/example', completed: false },
  { id: 't2', title: 'Join Official Channel ⏩', reward: 100, type: 'telegram', link: 'https://t.me/example2', completed: false }
];
