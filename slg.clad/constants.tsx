
import React from 'react';
import { NavItem } from './types';
import { 
  Home, 
  Leaf, 
  Apple, 
  Coffee, 
  Dumbbell, 
  Brain, 
  HomeIcon, 
  BookOpen, 
  Cpu 
} from 'lucide-react';

export const NAVIGATION_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'healthy-living', label: 'Healthy Living', description: 'Foundations of wellness', icon: 'Leaf' },
  { id: 'nutrition', label: 'Nutrition', description: 'What fuels you', icon: 'Apple' },
  { id: 'lifestyle', label: 'Lifestyle', description: 'Smart daily habits', icon: 'Coffee' },
  { id: 'fitness', label: 'Fitness', description: 'Movement for life', icon: 'Dumbbell' },
  { id: 'wellbeing', label: 'Wellbeing', description: 'Mental balance', icon: 'Brain' },
  { id: 'home-environment', label: 'Home Env', description: 'Healthy living spaces', icon: 'HomeIcon' },
  { id: 'resources', label: 'Resources', description: 'Guides & Trackers', icon: 'BookOpen' },
  { id: 'ai-tools', label: 'AI Tools', description: 'Smart Assistance', icon: 'Cpu' },
];

export const getIcon = (name: string, size = 20) => {
  switch (name) {
    case 'Home': return <Home size={size} />;
    case 'Leaf': return <Leaf size={size} />;
    case 'Apple': return <Apple size={size} />;
    case 'Coffee': return <Coffee size={size} />;
    case 'Dumbbell': return <Dumbbell size={size} />;
    case 'Brain': return <Brain size={size} />;
    case 'HomeIcon': return <HomeIcon size={size} />;
    case 'BookOpen': return <BookOpen size={size} />;
    case 'Cpu': return <Cpu size={size} />;
    default: return <Home size={size} />;
  }
};
