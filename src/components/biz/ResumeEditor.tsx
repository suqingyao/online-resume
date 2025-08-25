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

export const ResumeEditor: React.FC = () => {
  const tabs = [
    {
      label: '个人信息',
      value: 'profile',
      content: <ProfileEditor />,
    },
    {
      label: '工作经历',
      value: 'experience',
      content: <ExperienceEditor />,
    },
    {
      label: '项目经历',
      value: 'projects',
      content: <ProjectsEditor />,
    },
    {
      label: '教育经历',
      value: 'education',
      content: <EducationEditor />,
    },
    {
      label: '技能',
      value: 'skills',
      content: <SkillsEditor />,
    },
    {
      label: '其他',
      value: 'others',
      content: <OthersEditor />,
    },
    {
      label: '设置',
      value: 'settings',
      content: <SettingsEditor />,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white shadow-lg">
      {/* 工具栏 */}
      <Toolbar />

      {/* Radix UI Tabs */}
      <Tabs.Root defaultValue="profile" className="flex flex-1 flex-col min-h-0">
        <Tabs.List className="border-b border-gray-200 flex-shrink-0">
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

        {
          tabs.map(tab => (
            <Tabs.Content
              key={tab.value}
              value={tab.value}
              className="flex-1 min-h-0 p-4"
            >
              <div className="h-full overflow-y-auto">
                {tab.content}
              </div>
            </Tabs.Content>
          ))
        }
      </Tabs.Root>
    </div>
  );
};
