export interface SkillItem {
  name: string;
  description: string;
  usagePercentage?: number;
  experienceYears?: number;
  experienceProjects?: number;
  keywords?: string[];
}

export interface SkillCategory {
  id: 'backend' | 'frontend' | 'databases' | 'devops' | 'ai-automation' | 'testing';
  name: string;
  summary: string;
  experienceYears: number;
  skills: SkillItem[];
}

export interface SkillSummary {
  totalRepositories: number;
  mainLanguagesShare: {
    language: string;
    usagePercentage: number;
  }[];
  contributionsLastYear: number;
  activeRepositories: number;
  repositoriesWithStars: number;
  accountCreatedAt: string;
}
