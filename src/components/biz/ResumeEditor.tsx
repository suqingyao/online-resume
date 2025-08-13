import * as Tabs from '@radix-ui/react-tabs';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button, Checkbox, DatePicker, Input, Select } from '~/components/ui';
import { DateUtils } from '~/lib/dateUtils';
import { exportToImage, exportToPDF, printResume } from '~/lib/pdfExport';
import { useResumeStore } from '~/stores/useResumeStore';
import { MarkdownEditor } from './MarkdownEditor';

export const ResumeEditor: React.FC = () => {
  const {
    resumeData,
    config,
    updatePersonalInfo,
    updateEducation,
    updateExperience,
    updateProjects,
    updateSkills,
    updateLanguages,
    updateCertificates,
    updateConfig,
  } = useResumeStore();

  const [isExporting, setIsExporting] = useState(false);

  const tabs = [
    {
      label: '个人信息',
      value: 'personal',
    },
    {
      label: '工作经历',
      value: 'experience',
    },
    {
      label: '教育经历',
      value: 'education',
    },
    {
      label: '技能',
      value: 'skills',
    },
    {
      label: '项目经历',
      value: 'projects',
    },
    {
      label: '技能',
      value: 'skills',
    },
    {
      label: '其他',
      value: 'others',
    },
    {
      label: '设置',
      value: 'settings',
    },
  ];

  /**
   * 处理PDF导出
   */
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('resume-preview');
      if (element) {
        await exportToPDF(element, {
          filename: `${resumeData.personalInfo.name}-简历.pdf`,
        });
        toast.success('PDF导出成功！');
      }
    }
    catch (error) {
      toast.error('导出失败，请重试');
    }
    finally {
      setIsExporting(false);
    }
  };

  /**
   * 处理图片导出
   */
  const handleExportImage = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('resume-preview');
      if (element) {
        await exportToImage(element, `${resumeData.personalInfo.name}-简历.png`);
        toast.success('图片导出成功！');
      }
    }
    catch (error) {
      toast.error('导出失败，请重试');
    }
    finally {
      setIsExporting(false);
    }
  };

  /**
   * 处理打印
   */
  const handlePrint = () => {
    const element = document.getElementById('resume-preview');
    if (element) {
      printResume(element);
    }
  };

  /**
   * 添加新的教育经历
   */
  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
    };
    updateEducation([...resumeData.education, newEducation]);
  };

  /**
   * 删除教育经历
   */
  const removeEducation = (id: string) => {
    updateEducation(resumeData.education.filter(edu => edu.id !== id));
  };

  /**
   * 添加新的工作经历
   */
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      description: '',
      achievements: [],
    };
    updateExperience([...resumeData.experience, newExperience]);
  };

  /**
   * 删除工作经历
   */
  const removeExperience = (id: string) => {
    updateExperience(resumeData.experience.filter(exp => exp.id !== id));
  };

  /**
   * 添加新的项目
   */
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      url: '',
      github: '',
      highlights: [],
    };
    updateProjects([...resumeData.projects, newProject]);
  };

  /**
   * 删除项目
   */
  const removeProject = (id: string) => {
    updateProjects(resumeData.projects.filter(proj => proj.id !== id));
  };

  /**
   * 添加新的技能分类
   */
  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      category: '',
      items: [],
    };
    updateSkills([...resumeData.skills, newSkill]);
  };

  /**
   * 删除技能分类
   */
  const removeSkill = (id: string) => {
    updateSkills(resumeData.skills.filter(skill => skill.id !== id));
  };

  return (
    <div className="h-full flex flex-col rounded-lg bg-white shadow-lg">
      {/* 工具栏 */}
      <div className="border-b border-gray-200 p-2 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="ml-auto flex gap-1 sm:gap-2">
            <Button
              onClick={handlePrint}
              variant="secondary"
              size="sm"
              disabled={isExporting}
              className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
            >
              <div className="i-mingcute-print-line h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">打印</span>
            </Button>
            <Button
              onClick={handleExportImage}
              variant="secondary"
              size="sm"
              disabled={isExporting}
              className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
            >
              <div className="i-mingcute-arrow-down-line h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
              <span className="hidden md:inline">导出图片</span>
              <span className="sm:inline md:hidden">图片</span>
            </Button>
            <Button
              onClick={handleExportPDF}
              variant="default"
              size="sm"
              disabled={isExporting}
              className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
            >
              <div className="i-mingcute-arrow-down-line h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">{isExporting ? '导出中...' : '导出PDF'}</span>
              <span className="sm:hidden">PDF</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Radix UI Tabs */}
      <Tabs.Root defaultValue="personal" className="flex flex-1 flex-col">
        <Tabs.List className="border-b border-gray-200">
          <div className="flex overflow-x-auto px-2 space-x-2 sm:px-4 md:space-x-8 sm:space-x-4">
            {
              tabs.map(tab => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className="whitespace-nowrap border-b-2 border-transparent bg-transparent px-1 py-2 text-xs text-gray-500 font-medium data-[state=active]:border-primary-500 hover:border-gray-300 sm:py-3 sm:text-sm data-[state=active]:text-primary-600 hover:text-gray-700"
                >
                  {tab.label}
                </Tabs.Trigger>
              ))
            }
          </div>
        </Tabs.List>

        {/* 个人信息 */}
        <Tabs.Content value="personal" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="space-y-4">
            <h3 className="text-base text-gray-900 font-medium sm:text-lg">个人信息</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  姓名 *
                </label>
                <Input
                  type="text"
                  value={resumeData.personalInfo.name}
                  onChange={e => updatePersonalInfo({ name: e.target.value })}
                  placeholder="请输入姓名"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  职位 *
                </label>
                <Input
                  type="text"
                  value={resumeData.personalInfo.title}
                  onChange={e => updatePersonalInfo({ title: e.target.value })}
                  placeholder="请输入目标职位"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  邮箱 *
                </label>
                <Input
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={e => updatePersonalInfo({ email: e.target.value })}
                  placeholder="请输入邮箱地址"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  电话 *
                </label>
                <Input
                  type="tel"
                  value={resumeData.personalInfo.phone}
                  onChange={e => updatePersonalInfo({ phone: e.target.value })}
                  placeholder="请输入联系电话"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  所在地
                </label>
                <Input
                  type="text"
                  value={resumeData.personalInfo.location}
                  onChange={e => updatePersonalInfo({ location: e.target.value })}
                  placeholder="请输入所在城市"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  个人网站
                </label>
                <Input
                  type="url"
                  value={resumeData.personalInfo.website || ''}
                  onChange={e => updatePersonalInfo({ website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  LinkedIn
                </label>
                <Input
                  type="url"
                  className="input"
                  value={resumeData.personalInfo.linkedin || ''}
                  onChange={e => updatePersonalInfo({ linkedin: e.target.value })}
                  placeholder="LinkedIn 个人主页"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  GitHub
                </label>
                <Input
                  type="url"
                  className="input"
                  value={resumeData.personalInfo.github || ''}
                  onChange={e => updatePersonalInfo({ github: e.target.value })}
                  placeholder="GitHub 个人主页"
                />
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm text-gray-700 font-medium">
                  个人简介
                </label>
                <Checkbox
                  checked={resumeData.personalInfo.summaryMarkdown || false}
                  onCheckedChange={checked => updatePersonalInfo({ summaryMarkdown: checked })}
                  label="Markdown格式"
                  className="text-xs text-gray-500"
                />
              </div>
              {resumeData.personalInfo.summaryMarkdown
                ? (
                    <MarkdownEditor
                      value={resumeData.personalInfo.summary}
                      onChange={value => updatePersonalInfo({ summary: value })}
                      placeholder="请简要介绍您的专业背景、技能特长和职业目标...\n\n支持Markdown格式：\n- **粗体文本**\n- *斜体文本*\n- `代码`\n- [链接](url)\n- 列表项"
                    />
                  )
                : (
                    <textarea
                      className="textarea"
                      rows={4}
                      value={resumeData.personalInfo.summary}
                      onChange={e => updatePersonalInfo({ summary: e.target.value })}
                      placeholder="请简要介绍您的专业背景、技能特长和职业目标..."
                    />
                  )}
            </div>
          </div>
        </Tabs.Content>

        {/* 工作经历 */}
        <Tabs.Content value="experience" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-gray-900 font-medium sm:text-lg">工作经历</h3>
              <Button
                onClick={addExperience}
                variant="default"
                size="sm"
                className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
              >
                <div className="i-heroicons-plus h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">添加经历</span>
              </Button>
            </div>

            {resumeData.experience.map((exp, index) => (
              <div key={exp.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="mb-3 flex items-start justify-between sm:mb-4">
                  <h4 className="text-sm text-gray-900 font-medium sm:text-base">
                    工作经历
                    {index + 1}
                  </h4>
                  <Button
                    onClick={() => removeExperience(exp.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <div className="i-heroicons-trash h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 mb-3 gap-3 sm:grid-cols-2 sm:mb-4 sm:gap-4">
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      公司名称 *
                    </label>
                    <Input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = resumeData.experience.map(item =>
                          item.id === exp.id ? { ...item, company: e.target.value } : item,
                        );
                        updateExperience(updated);
                      }}
                      placeholder="请输入公司名称"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      职位 *
                    </label>
                    <Input
                      type="text"
                      value={exp.position}
                      onChange={(e) => {
                        const updated = resumeData.experience.map(item =>
                          item.id === exp.id ? { ...item, position: e.target.value } : item,
                        );
                        updateExperience(updated);
                      }}
                      placeholder="请输入职位名称"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      开始时间 *
                    </label>
                    <DatePicker
                      value={DateUtils.toDate(exp.startDate)}
                      onChange={(value) => {
                        const updated = resumeData.experience.map(item =>
                          item.id === exp.id ? { ...item, startDate: value } : item,
                        );
                        updateExperience(updated);
                      }}
                      placeholder="选择开始时间"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      结束时间
                    </label>
                    <div className="flex items-center gap-2">
                      <DatePicker
                        value={DateUtils.toDate(exp.endDate)}
                        disabled={exp.current}
                        onChange={(value) => {
                          const updated = resumeData.experience.map(item =>
                            item.id === exp.id ? { ...item, endDate: value } : item,
                          );
                          updateExperience(updated);
                        }}
                        placeholder="选择结束时间"
                        className="flex-1"
                      />
                      <Checkbox
                        checked={exp.current}
                        onCheckedChange={(checked) => {
                          const updated = resumeData.experience.map(item =>
                            item.id === exp.id ? { ...item, current: checked, endDate: checked ? '' : item.endDate } : item,
                          );
                          updateExperience(updated);
                        }}
                        label="至今"
                        className="text-sm text-gray-600"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      工作地点
                    </label>
                    <Input
                      type="text"
                      value={exp.location}
                      onChange={(e) => {
                        const updated = resumeData.experience.map(item =>
                          item.id === exp.id ? { ...item, location: e.target.value } : item,
                        );
                        updateExperience(updated);
                      }}
                      placeholder="请输入工作地点"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm text-gray-700 font-medium">
                      工作描述
                    </label>
                    <Checkbox
                      checked={exp.descriptionMarkdown || false}
                      onCheckedChange={(checked) => {
                        const updated = resumeData.experience.map(item =>
                          item.id === exp.id ? { ...item, descriptionMarkdown: checked } : item,
                        );
                        updateExperience(updated);
                      }}
                      label="Markdown格式"
                      className="text-xs text-gray-500"
                    />
                  </div>
                  {exp.descriptionMarkdown
                    ? (
                        <MarkdownEditor
                          value={exp.description}
                          onChange={(value) => {
                            const updated = resumeData.experience.map(item =>
                              item.id === exp.id ? { ...item, description: value } : item,
                            );
                            updateExperience(updated);
                          }}
                          placeholder="请描述您在该职位的主要工作内容...\n\n支持Markdown格式：\n- **负责** 项目开发\n- *参与* 需求分析\n- `技术栈`: React, Node.js\n- [项目链接](url)"
                        />
                      )
                    : (
                        <textarea
                          className="textarea"
                          rows={3}
                          value={exp.description}
                          onChange={(e) => {
                            const updated = resumeData.experience.map(item =>
                              item.id === exp.id ? { ...item, description: e.target.value } : item,
                            );
                            updateExperience(updated);
                          }}
                          placeholder="请描述您在该职位的主要工作内容..."
                        />
                      )}
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-700 font-medium">
                    主要成就（每行一个）
                  </label>
                  <textarea
                    className="textarea"
                    rows={4}
                    value={exp.achievements.join('\n')}
                    onChange={(e) => {
                      const achievements = e.target.value.split('\n').filter(item => item.trim());
                      const updated = resumeData.experience.map(item =>
                        item.id === exp.id ? { ...item, achievements } : item,
                      );
                      updateExperience(updated);
                    }}
                    placeholder="• 完成了某个重要项目，提升了XX%的效率\n• 带领团队完成了某个目标\n• 获得了某个奖项或认可"
                  />
                </div>
              </div>
            ))}
          </div>
        </Tabs.Content>

        {/* 教育经历 */}
        <Tabs.Content value="education" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-gray-900 font-medium sm:text-lg">教育经历</h3>
              <Button
                onClick={addEducation}
                variant="default"
                size="sm"
                className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
              >
                <div className="i-heroicons-plus h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">添加教育经历</span>
              </Button>
            </div>

            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="mb-3 flex items-start justify-between sm:mb-4">
                  <h4 className="text-sm text-gray-900 font-medium sm:text-base">
                    教育经历
                    {index + 1}
                  </h4>
                  <Button
                    onClick={() => removeEducation(edu.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <div className="i-heroicons-trash h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 mb-3 gap-3 sm:grid-cols-2 sm:mb-4 sm:gap-4">
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      学校名称 *
                    </label>
                    <Input
                      type="text"
                      value={edu.school}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item =>
                          item.id === edu.id ? { ...item, school: e.target.value } : item,
                        );
                        updateEducation(updated);
                      }}
                      placeholder="请输入学校名称"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      学历 *
                    </label>
                    <Input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item =>
                          item.id === edu.id ? { ...item, degree: e.target.value } : item,
                        );
                        updateEducation(updated);
                      }}
                      placeholder="如：本科、硕士、博士"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      专业 *
                    </label>
                    <Input
                      type="text"
                      value={edu.major}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item =>
                          item.id === edu.id ? { ...item, major: e.target.value } : item,
                        );
                        updateEducation(updated);
                      }}
                      placeholder="请输入专业名称"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      GPA
                    </label>
                    <Input
                      type="text"
                      className="input"
                      value={edu.gpa || ''}
                      onChange={(e) => {
                        const updated = resumeData.education.map(item =>
                          item.id === edu.id ? { ...item, gpa: e.target.value } : item,
                        );
                        updateEducation(updated);
                      }}
                      placeholder="如：3.8/4.0"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      开始时间 *
                    </label>
                    <DatePicker
                      value={DateUtils.toDate(edu.startDate)}
                      onChange={(value) => {
                        const updated = resumeData.education.map(item =>
                          item.id === edu.id ? { ...item, startDate: value } : item,
                        );
                        updateEducation(updated);
                      }}
                      placeholder="选择开始时间"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      结束时间 *
                    </label>
                    <DatePicker
                      value={DateUtils.toDate(edu.endDate)}
                      onChange={(value) => {
                        const updated = resumeData.education.map(item =>
                          item.id === edu.id ? { ...item, endDate: value } : item,
                        );
                        updateEducation(updated);
                      }}
                      placeholder="选择结束时间"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm text-gray-700 font-medium">
                      教育描述
                    </label>
                    <Checkbox
                      checked={edu.descriptionMarkdown || false}
                      onCheckedChange={(checked) => {
                        const updated = resumeData.education.map(item =>
                          item.id === edu.id ? { ...item, descriptionMarkdown: checked } : item,
                        );
                        updateEducation(updated);
                      }}
                      label="Markdown格式"
                      className="text-xs text-gray-500"
                    />
                  </div>
                  {edu.descriptionMarkdown
                    ? (
                        <MarkdownEditor
                          value={edu.description || ''}
                          onChange={(value) => {
                            const updated = resumeData.education.map(item =>
                              item.id === edu.id ? { ...item, description: value } : item,
                            );
                            updateEducation(updated);
                          }}
                          placeholder="请描述您的教育背景、主要课程、获得荣誉等...\n\n支持Markdown格式：\n- **主要课程**: 数据结构、算法设计\n- *获得荣誉*: 优秀学生奖学金\n- `相关技能`: 掌握了编程基础\n- [学校官网](url)"
                        />
                      )
                    : (
                        <textarea
                          className="w-full"
                          rows={3}
                          value={edu.description}
                          onChange={(e) => {
                            const updated = resumeData.education.map(item =>
                              item.id === edu.id ? { ...item, description: e.target.value } : item,
                            );
                            updateEducation(updated);
                          }}
                          placeholder="请描述您的教育背景、主要课程、获得荣誉等..."
                        />
                      )}
                </div>
              </div>
            ))}
          </div>
        </Tabs.Content>

        {/* 项目经历 */}
        <Tabs.Content value="projects" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-gray-900 font-medium sm:text-lg">项目经历</h3>
              <Button
                onClick={addProject}
                variant="default"
                size="sm"
                className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
              >
                <div className="i-heroicons-plus h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">添加项目</span>
              </Button>
            </div>

            {resumeData.projects.map((project, index) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="mb-3 flex items-start justify-between sm:mb-4">
                  <h4 className="text-sm text-gray-900 font-medium sm:text-base">
                    项目
                    {index + 1}
                  </h4>
                  <Button
                    onClick={() => removeProject(project.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <div className="i-heroicons-trash h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 mb-3 gap-3 sm:grid-cols-2 sm:mb-4 sm:gap-4">
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      项目名称 *
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={project.name}
                      onChange={(e) => {
                        const updated = resumeData.projects.map(item =>
                          item.id === project.id ? { ...item, name: e.target.value } : item,
                        );
                        updateProjects(updated);
                      }}
                      placeholder="请输入项目名称"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      项目链接
                    </label>
                    <input
                      type="url"
                      className="input"
                      value={project.url}
                      onChange={(e) => {
                        const updated = resumeData.projects.map(item =>
                          item.id === project.id ? { ...item, url: e.target.value } : item,
                        );
                        updateProjects(updated);
                      }}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      开始时间
                    </label>
                    <DatePicker
                      value={DateUtils.toDate(project.startDate)}
                      onChange={(value) => {
                        const updated = resumeData.projects.map(item =>
                          item.id === project.id ? { ...item, startDate: value } : item,
                        );
                        updateProjects(updated);
                      }}
                      placeholder="选择开始时间"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      结束时间
                    </label>
                    <DatePicker
                      value={DateUtils.toDate(project.endDate)}
                      onChange={(value) => {
                        const updated = resumeData.projects.map(item =>
                          item.id === project.id ? { ...item, endDate: value } : item,
                        );
                        updateProjects(updated);
                      }}
                      placeholder="选择结束时间"
                      className="w-full"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      GitHub 链接
                    </label>
                    <input
                      type="url"
                      className="input"
                      value={project.github}
                      onChange={(e) => {
                        const updated = resumeData.projects.map(item =>
                          item.id === project.id ? { ...item, github: e.target.value } : item,
                        );
                        updateProjects(updated);
                      }}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm text-gray-700 font-medium">
                      项目描述
                    </label>
                    <Checkbox
                      checked={project.descriptionMarkdown || false}
                      onCheckedChange={(checked) => {
                        const updated = resumeData.projects.map(item =>
                          item.id === project.id ? { ...item, descriptionMarkdown: checked } : item,
                        );
                        updateProjects(updated);
                      }}
                      label="Markdown格式"
                      className="text-xs text-gray-500"
                    />
                  </div>
                  {project.descriptionMarkdown
                    ? (
                        <MarkdownEditor
                          value={project.description}
                          onChange={(value) => {
                            const updated = resumeData.projects.map(item =>
                              item.id === project.id ? { ...item, description: value } : item,
                            );
                            updateProjects(updated);
                          }}
                          placeholder="请描述项目的背景、目标和您的贡献...\n\n支持Markdown格式：\n- **项目背景**: 解决了什么问题\n- *技术难点*: 遇到的挑战\n- `技术栈`: React, Node.js, MongoDB\n- [演示地址](url)"
                        />
                      )
                    : (
                        <textarea
                          className="w-full"
                          rows={3}
                          value={project.description}
                          onChange={(e) => {
                            const updated = resumeData.projects.map(item =>
                              item.id === project.id ? { ...item, description: e.target.value } : item,
                            );
                            updateProjects(updated);
                          }}
                          placeholder="请描述项目的背景、目标和您的贡献..."
                        />
                      )}
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm text-gray-700 font-medium">
                    技术栈（用逗号分隔）
                  </label>
                  <Input
                    type="text"
                    value={project.technologies.join(', ')}
                    onChange={(e) => {
                      const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                      const updated = resumeData.projects.map(item =>
                        item.id === project.id ? { ...item, technologies } : item,
                      );
                      updateProjects(updated);
                    }}
                    placeholder="React, TypeScript, Node.js, MongoDB"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm text-gray-700 font-medium">
                    项目亮点（每行一个）
                  </label>
                  <textarea
                    className="textarea"
                    rows={4}
                    value={project.highlights.join('\n')}
                    onChange={(e) => {
                      const highlights = e.target.value.split('\n').filter(item => item.trim());
                      const updated = resumeData.projects.map(item =>
                        item.id === project.id ? { ...item, highlights } : item,
                      );
                      updateProjects(updated);
                    }}
                    placeholder="• 实现了某个核心功能，提升了用户体验\n• 优化了系统性能，响应时间减少50%\n• 获得了多少用户或下载量"
                  />
                </div>
              </div>
            ))}
          </div>
        </Tabs.Content>

        {/* 技能 */}
        <Tabs.Content value="skills" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base text-gray-900 font-medium sm:text-lg">专业技能</h3>
              <Button
                onClick={addSkill}
                variant="secondary"
                size="sm"
                className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
              >
                <div className="i-heroicons-plus h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">添加技能分类</span>
              </Button>
            </div>

            {resumeData.skills.map((skill, index) => (
              <div key={skill.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="mb-3 flex items-start justify-between sm:mb-4">
                  <h4 className="text-sm text-gray-900 font-medium sm:text-base">
                    技能分类
                    {index + 1}
                  </h4>
                  <Button
                    onClick={() => removeSkill(skill.id)}
                    variant="destructive"
                    size="sm"
                    title="删除技能分类"
                  >
                    <div className="i-heroicons-trash h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      分类名称
                    </label>
                    <Input
                      type="text"
                      className="input"
                      value={skill.category}
                      onChange={(e) => {
                        const updated = resumeData.skills.map(item =>
                          item.id === skill.id ? { ...item, category: e.target.value } : item,
                        );
                        updateSkills(updated);
                      }}
                      placeholder="如：前端技术、后端技术、工具框架等"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm text-gray-700 font-medium">
                      技能列表（用逗号分隔）
                    </label>
                    <textarea
                      className="w-full"
                      rows={3}
                      value={skill.items.join(', ')}
                      onChange={(e) => {
                        const items = e.target.value.split(',').map(item => item.trim()).filter(item => item);
                        const updated = resumeData.skills.map(item =>
                          item.id === skill.id ? { ...item, items } : item,
                        );
                        updateSkills(updated);
                      }}
                      placeholder="React, Vue, TypeScript, JavaScript, HTML5, CSS3"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Tabs.Content>

        {/* 其他信息 */}
        <Tabs.Content value="others" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="space-y-6">
            <h3 className="text-base text-gray-900 font-medium sm:text-lg">其他信息</h3>

            {/* 语言能力 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-gray-800 font-medium sm:text-base">语言能力</h4>
                <Button
                  onClick={() => {
                    const newLanguage = {
                      id: Date.now().toString(),
                      name: '',
                      level: 'intermediate' as const,
                    };
                    updateLanguages([...resumeData.languages, newLanguage]);
                  }}
                  variant="secondary"
                  size="sm"
                  className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                >
                  <div className="i-heroicons-plus h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">添加语言</span>
                </Button>
              </div>

              {resumeData.languages.map(language => (
                <div key={language.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h5 className="text-sm text-gray-900 font-medium">语言</h5>
                    <Button
                      onClick={() => {
                        updateLanguages(resumeData.languages.filter(lang => lang.id !== language.id));
                      }}
                      variant="destructive"
                      size="sm"
                      title="删除语言"
                    >
                      <div className="i-heroicons-trash h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm text-gray-700 font-medium">
                        语言名称
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={language.name}
                        onChange={(e) => {
                          const updated = resumeData.languages.map(item =>
                            item.id === language.id ? { ...item, name: e.target.value } : item,
                          );
                          updateLanguages(updated);
                        }}
                        placeholder="如：英语、日语等"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700 font-medium">
                        熟练程度
                      </label>
                      <Select
                        value={language.level}
                        onValueChange={(value) => {
                          const updated = resumeData.languages.map(item =>
                            item.id === language.id ? { ...item, level: value as 'beginner' | 'intermediate' | 'advanced' | 'native' } : item,
                          );
                          updateLanguages(updated);
                        }}
                        options={[
                          { value: 'beginner', label: '初级' },
                          { value: 'intermediate', label: '中级' },
                          { value: 'advanced', label: '高级' },
                          { value: 'native', label: '母语' },
                        ]}
                        placeholder="选择熟练程度"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 证书认证 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm text-gray-800 font-medium sm:text-base">证书认证</h4>
                <Button
                  onClick={() => {
                    const newCertificate = {
                      id: Date.now().toString(),
                      name: '',
                      issuer: '',
                      date: '',
                      url: '',
                    };
                    updateCertificates([...resumeData.certificates, newCertificate]);
                  }}
                  variant="secondary"
                  size="sm"
                  className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
                >
                  <div className="i-heroicons-plus h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">添加证书</span>
                </Button>
              </div>

              {resumeData.certificates.map(certificate => (
                <div key={certificate.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h5 className="text-sm text-gray-900 font-medium">证书</h5>
                    <Button
                      onClick={() => {
                        updateCertificates(resumeData.certificates.filter(cert => cert.id !== certificate.id));
                      }}
                      variant="destructive"
                      size="sm"
                      title="删除证书"
                    >
                      <div className="i-heroicons-trash h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm text-gray-700 font-medium">
                        证书名称
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={certificate.name}
                        onChange={(e) => {
                          const updated = resumeData.certificates.map(item =>
                            item.id === certificate.id ? { ...item, name: e.target.value } : item,
                          );
                          updateCertificates(updated);
                        }}
                        placeholder="如：AWS云从业者认证"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700 font-medium">
                        颁发机构
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={certificate.issuer}
                        onChange={(e) => {
                          const updated = resumeData.certificates.map(item =>
                            item.id === certificate.id ? { ...item, issuer: e.target.value } : item,
                          );
                          updateCertificates(updated);
                        }}
                        placeholder="如：Amazon Web Services"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700 font-medium">
                        获得时间
                      </label>
                      <DatePicker
                        value={DateUtils.toDate(certificate.date)}
                        onChange={(value) => {
                          const updated = resumeData.certificates.map(item =>
                            item.id === certificate.id ? { ...item, date: value } : item,
                          );
                          updateCertificates(updated);
                        }}
                        placeholder="选择获得时间"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700 font-medium">
                        证书链接（可选）
                      </label>
                      <input
                        type="url"
                        className="input"
                        value={certificate.url}
                        onChange={(e) => {
                          const updated = resumeData.certificates.map(item =>
                            item.id === certificate.id ? { ...item, url: e.target.value } : item,
                          );
                          updateCertificates(updated);
                        }}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Tabs.Content>

        {/* 设置 */}
        <Tabs.Content value="settings" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <div className="space-y-6">
            <h3 className="text-base text-gray-900 font-medium sm:text-lg">简历设置</h3>

            <div>
              <label className="mb-2 block text-sm text-gray-700 font-medium">
                主题色
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { color: '#3b82f6', name: '蓝色' },
                  { color: '#10b981', name: '绿色' },
                  { color: '#f59e0b', name: '橙色' },
                  { color: '#ef4444', name: '红色' },
                  { color: '#8b5cf6', name: '紫色' },
                  { color: '#6b7280', name: '灰色' },
                ].map(item => (
                  <Button
                    key={item.color}
                    onClick={() => updateConfig({ primaryColor: item.color })}
                    variant="ghost"
                    size="sm"
                    className={`h-6 w-6 border-2 rounded-full p-0 sm:h-8 sm:w-8 ${
                      config.primaryColor === item.color ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: item.color }}
                    title={item.name}
                  >
                    <span className="sr-only">{item.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-700 font-medium">
                字体大小
              </label>
              <Select
                value={config.fontSize}
                onValueChange={value => updateConfig({ fontSize: value as any })}
                options={[
                  { value: 'small', label: '小号' },
                  { value: 'medium', label: '中号' },
                  { value: 'large', label: '大号' },
                ]}
                placeholder="选择字体大小"
                className="w-full sm:w-48"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-700 font-medium">
                间距
              </label>
              <Select
                value={config.spacing}
                onValueChange={value => updateConfig({ spacing: value as any })}
                options={[
                  { value: 'compact', label: '紧凑' },
                  { value: 'normal', label: '正常' },
                  { value: 'relaxed', label: '宽松' },
                ]}
                placeholder="选择间距"
                className="w-full sm:w-48"
              />
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
