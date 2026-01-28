
export type AppSection = 
  | 'home' 
  | 'healthy-living' 
  | 'nutrition' 
  | 'lifestyle' 
  | 'fitness' 
  | 'wellbeing' 
  | 'home-environment' 
  | 'resources' 
  | 'ai-tools';

export interface NavItem {
  id: AppSection;
  label: string;
  description?: string;
  icon: string;
}

export interface MealOption {
  name: string;
  description: string;
  ingredients: string[];
  type: 'no-cook' | 'under-5' | 'quick' | 'healthy';
}

export interface HealthCheckResponse {
  summary: string;
  suggestions: string[];
}
