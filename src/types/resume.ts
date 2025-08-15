/**
 * 简历数据类型定义
 */

// 个人信息接口
export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
  summaryMarkdown?: boolean; // 是否使用markdown格式
}

// 教育经历接口
export interface Education {
  id: string;
  school: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
  descriptionMarkdown?: boolean; // 是否使用markdown格式
}

// 工作经历接口
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
  descriptionMarkdown?: boolean; // 是否使用markdown格式
  achievements: string[];
}

// 项目经历接口
export interface Project {
  id: string;
  name: string;
  description: string;
  descriptionMarkdown?: boolean; // 是否使用markdown格式
  technologies: string[];
  startDate: string;
  endDate: string;
  url?: string;
  github?: string;
  highlights: string[];
}

// 技能接口
export interface Skill {
  id: string;
  category: string;
  items: string[];
}

// 语言能力接口
export interface Language {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'native';
}

// 证书接口
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

// 完整简历数据接口
export interface ResumeData {
  profile: Profile;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  languages: Language[];
  certificates: Certificate[];
}

// 简历模板类型
export type ResumeTemplate = 'modern' | 'classic' | 'minimal' | 'creative';

// 简历配置接口
export interface ResumeConfig {
  template: ResumeTemplate;
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'relaxed';
}
