import type { ResumeConfig, ResumeData } from '../types/resume';

/**
 * 默认简历数据配置
 * Default resume data configuration
 */
export const defaultResumeData: ResumeData = {
  profile: {
    name: '张三',
    title: '前端开发工程师',
    email: 'zhangsan@example.com',
    phone: '+86 138-0000-0000',
    location: '北京市',
    website: '',
    linkedin: '',
    github: '',
    summary: '具有3年前端开发经验的工程师，熟练掌握React、Vue等现代前端框架，有丰富的项目开发和团队协作经验。',
  },
  education: [
    {
      id: '1',
      school: '北京大学',
      degree: '学士',
      major: '计算机科学与技术',
      startDate: '2018-09',
      endDate: '2022-06',
      gpa: '3.8/4.0',
      description: '主修课程：数据结构、算法设计、软件工程、数据库系统',
    },
  ],
  experience: [
    {
      id: '1',
      company: '阿里巴巴集团',
      position: '前端开发工程师',
      startDate: '2022-07',
      endDate: '2024-12',
      current: true,
      location: '杭州市',
      description: '负责电商平台前端开发，参与多个核心业务模块的设计与实现',
      achievements: [
        '独立完成用户中心模块重构，提升页面加载速度30%',
        '参与设计组件库，提高团队开发效率25%',
        '负责移动端适配，确保多端体验一致性',
      ],
    },
  ],
  projects: [
    {
      id: '1',
      name: '电商管理后台系统',
      description: '基于React和Ant Design开发的电商管理后台系统',
      technologies: ['React', 'TypeScript', 'Ant Design', 'Redux'],
      startDate: '2023-03',
      endDate: '2023-08',
      url: 'https://example.com',
      github: 'https://github.com/example/project',
      highlights: [
        '实现了完整的权限管理系统',
        '支持多语言国际化',
        '集成了数据可视化图表',
      ],
    },
  ],
  skills: [
    {
      id: '1',
      category: '前端技术',
      items: ['React', 'Vue', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    },
    {
      id: '2',
      category: '工具框架',
      items: ['Webpack', 'Vite', 'Git', 'Docker', 'Node.js'],
    },
  ],
  languages: [
    {
      id: '1',
      name: '中文',
      level: 'native',
    },
    {
      id: '2',
      name: '英语',
      level: 'intermediate',
    },
  ],
  certificates: [
    {
      id: '1',
      name: 'AWS云从业者认证',
      issuer: 'Amazon Web Services',
      date: '2023-06',
      url: 'https://aws.amazon.com/certification/',
    },
  ],
};

/**
 * 默认配置
 * Default configuration
 */
export const defaultConfig: ResumeConfig = {
  template: 'modern',
  primaryColor: '#3b82f6',
  fontSize: 'medium',
  spacing: 'normal',
};