export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'oitocloud';

export const BRAND = {
  name: 'oitocloud',
  tagline: 'Proprietary Cloud Infrastructure & Edge Engine.',
  description: 'Deploy web applications, APIs, and microservices on our global high-speed edge network with automated SSL and instant domain routing.',
} as const;

export const COLORS = {
  primary: '#06b6d4',     // cyan-500
  secondary: '#8b5cf6',   // violet-500
  accent: '#22d3ee',      // cyan-400
  success: '#10b981',     // emerald-500
  warning: '#f59e0b',     // amber-500
  error: '#ef4444',       // red-500
} as const;

export const DEPLOY_STEPS = [
  {
    id: 'sync',
    label: 'Syncing Code Vault',
    description: 'Securing your source code in oitocloud Code Vault...',
  },
  {
    id: 'provision',
    label: 'Provisioning oitocloud Node',
    description: 'Setting up dedicated edge compute environment...',
  },
  {
    id: 'deploy',
    label: 'Deploying to Edge',
    description: 'Building and deploying across oitocloud global mesh...',
  },
] as const;

export const NAV_ITEMS = [
  { label: 'Projects', href: '/dashboard', icon: 'grid' },
  { label: 'Domains', href: '/dashboard/domains', icon: 'globe' },
  { label: 'Billing', href: '/dashboard/billing', icon: 'credit-card' },
  { label: 'Settings', href: '/dashboard/settings', icon: 'settings' },
] as const;

export const MAX_UPLOAD_SIZE = 50 * 1024 * 1024; // 50MB
