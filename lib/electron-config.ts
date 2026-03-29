import { PageId } from './navigation-state';

export interface ElectronConfig {
  id: PageId;
  label: string;
  route: string;
  orbitRadius: number;
  speed: number; // seconds per revolution
  startAngle: number; // degrees
  color: string;
  glowColor: string;
}

export const ELECTRONS: ElectronConfig[] = [
  {
    id: 'research',
    label: 'Research',
    route: '/research',
    orbitRadius: 160,
    speed: 12,
    startAngle: 0,
    color: '#2dd4bf',
    glowColor: 'rgba(45, 212, 191, 0.6)',
  },
  {
    id: 'publications',
    label: 'Publications',
    route: '/publications',
    orbitRadius: 220,
    speed: 18,
    startAngle: 72,
    color: '#5eead4',
    glowColor: 'rgba(94, 234, 212, 0.6)',
  },
  {
    id: 'team',
    label: 'Team',
    route: '/team',
    orbitRadius: 280,
    speed: 25,
    startAngle: 144,
    color: '#14b8a6',
    glowColor: 'rgba(20, 184, 166, 0.6)',
  },
  {
    id: 'library',
    label: 'Library',
    route: '/library',
    orbitRadius: 340,
    speed: 15,
    startAngle: 216,
    color: '#99f6e4',
    glowColor: 'rgba(153, 246, 228, 0.6)',
  },
  {
    id: 'contact',
    label: 'Contact',
    route: '/contact',
    orbitRadius: 400,
    speed: 20,
    startAngle: 288,
    color: '#ccfbf1',
    glowColor: 'rgba(204, 251, 241, 0.6)',
  },
];

// Nucleus configuration
export const NUCLEUS_CONFIG = {
  radius: 60,
  innerRadius: 35,
  color: '#f97316',
  innerColor: '#fbbf24',
  glowColor: 'rgba(249, 115, 22, 0.4)',
  pulseColor: 'rgba(251, 191, 36, 0.3)',
};
