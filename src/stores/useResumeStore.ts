import type { ResumeConfig, ResumeData } from '../types/resume';
import { create } from 'zustand';
import { defaultConfig, defaultResumeData } from '../config/defaultResumeData';

/**
 * 简历状态接口
 */
interface ResumeState {
  resumeData: ResumeData;
  config: ResumeConfig;
}

/**
 * 简历操作接口
 */
interface ResumeActions {
  updatePersonalInfo: (info: Partial<ResumeData['profile']>) => void;
  updateEducation: (education: ResumeData['education']) => void;
  updateExperience: (experience: ResumeData['experience']) => void;
  updateProjects: (projects: ResumeData['projects']) => void;
  updateSkills: (skills: ResumeData['skills']) => void;
  updateLanguages: (languages: ResumeData['languages']) => void;
  updateCertificates: (certificates: ResumeData['certificates']) => void;
  updateConfig: (config: Partial<ResumeConfig>) => void;
  resetResume: () => void;
}

/**
 * 简历数据 Zustand Store
 */
export const useResumeStore = create<ResumeState & ResumeActions>(set => ({
  // 状态
  resumeData: defaultResumeData,
  config: defaultConfig,

  // 操作
  /**
   * 更新个人信息
   */
  updatePersonalInfo: info =>
    set(state => ({
      resumeData: {
        ...state.resumeData,
        profile: { ...state.resumeData.profile, ...info },
      },
    })),

  /**
   * 更新教育经历
   */
  updateEducation: education =>
    set(state => ({
      resumeData: { ...state.resumeData, education },
    })),

  /**
   * 更新工作经历
   */
  updateExperience: experience =>
    set(state => ({
      resumeData: { ...state.resumeData, experience },
    })),

  /**
   * 更新项目经历
   */
  updateProjects: projects =>
    set(state => ({
      resumeData: { ...state.resumeData, projects },
    })),

  /**
   * 更新技能
   */
  updateSkills: skills =>
    set(state => ({
      resumeData: { ...state.resumeData, skills },
    })),

  /**
   * 更新语言能力
   */
  updateLanguages: languages =>
    set(state => ({
      resumeData: { ...state.resumeData, languages },
    })),

  /**
   * 更新证书
   */
  updateCertificates: certificates =>
    set(state => ({
      resumeData: { ...state.resumeData, certificates },
    })),

  /**
   * 更新配置
   */
  updateConfig: newConfig =>
    set(state => ({
      config: { ...state.config, ...newConfig },
    })),

  /**
   * 重置简历数据
   */
  resetResume: () =>
    set(() => ({
      resumeData: defaultResumeData,
      config: defaultConfig,
    })),
}));
