import * as Tabs from '@radix-ui/react-tabs';
import React from 'react';
import {
  EducationEditor,
  ExperienceEditor,
  OthersEditor,
  ProfileEditor,
  ProjectsEditor,
  SettingsEditor,
  SkillsEditor,
  Toolbar,
} from '~/components/biz';
import { ScrollArea } from '~/components/ui';

export const ResumeEditor: React.FC = () => {
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
      label: '项目经历',
      value: 'projects',
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
      label: '其他',
      value: 'others',
    },
    {
      label: '设置',
      value: 'settings',
    },
  ];

  return (
    <div className="h-full flex flex-col rounded-lg bg-white shadow-lg">
      {/* 工具栏 */}
      <Toolbar />

      {/* Radix UI Tabs */}
      <Tabs.Root defaultValue="personal" className="flex flex-1 flex-col">
        <Tabs.List className="border-b border-gray-200">
          <div className="flex overflow-x-auto px-2 space-x-2 sm:px-4 md:space-x-8 sm:space-x-4">
            {
              tabs.map(tab => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className="whitespace-nowrap border-b-2 border-transparent bg-transparent px-1 py-2 text-xs text-gray-500 font-medium data-[state=active]:border-primary hover:border-gray-300 sm:py-3 sm:text-sm data-[state=active]:text-primary hover:text-gray-700"
                >
                  {tab.label}
                </Tabs.Trigger>
              ))
            }
          </div>
        </Tabs.List>

        {/* 个人信息 */}
        <Tabs.Content value="personal" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <ProfileEditor />
        </Tabs.Content>

        {/* 工作经历 */}
        <Tabs.Content value="experience" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <ExperienceEditor />
        </Tabs.Content>

        {/* 教育经历 */}
        <Tabs.Content value="education" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <EducationEditor />
        </Tabs.Content>

        {/* 项目经历 */}
        <Tabs.Content value="projects" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <ProjectsEditor />
        </Tabs.Content>

        {/* 技能 */}
        <Tabs.Content value="skills" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <SkillsEditor />
        </Tabs.Content>

        {/* 其他信息 */}
        <Tabs.Content value="others" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <OthersEditor />
        </Tabs.Content>

        {/* 设置 */}
        <Tabs.Content value="settings" className="flex-1 overflow-y-auto p-2 sm:p-4">
          <SettingsEditor />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
