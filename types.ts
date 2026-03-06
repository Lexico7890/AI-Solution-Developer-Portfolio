
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  metrics?: {
    label: string;
    value: string;
  };
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
}

export type Section = 'home' | 'projects' | 'stack' | 'contact';
