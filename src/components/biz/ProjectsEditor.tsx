import { DateUtils } from '~/lib/dateUtils';
import { useResumeStore } from '~/stores/useResumeStore';
import { Button, DatePicker, Input, Label } from '../ui';
import { MarkdownEditor } from './MarkdownEditor';

export function ProjectsEditor() {
  const { resumeData, updateProjects } = useResumeStore();

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

  return (
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="name">项目名称 *</Label>
              <Input
                id="name"
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="url">项目链接</Label>
              <Input
                id="url"
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="startDate">开始时间</Label>
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="endDate">结束时间</Label>
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
            <div className="grid w-full max-w-sm  items-center gap-3">
              <Label htmlFor="github">GitHub 链接</Label>
              <Input
                id="github"
                type="url"
                value={project.github}
                onChange={(e) => {
                  const updated = resumeData.projects.map(item =>
                    item.id === project.id ? { ...item, github: e.target.value } : item,
                  );
                  updateProjects(updated);
                }}
                placeholder="https://github.com/username/project"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-3">
            <Label htmlFor="description">项目描述</Label>
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
          </div>

          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="technologies">技术栈（用逗号分隔）</Label>
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

          <div className="grid w-full items-center gap-3">
            <Label htmlFor="highlights">项目亮点（每行一个）</Label>
            <MarkdownEditor
              value={project.highlights.join('\n')}
              onChange={(value) => {
                const updated = resumeData.projects.map(item =>
                  item.id === project.id ? { ...item, highlights: value.split('\n') } : item,
                );
                updateProjects(updated);
              }}
              placeholder="• 实现了某个核心功能，提升了用户体验\n• 优化了系统性能，响应时间减少50%\n• 获得了多少用户或下载量"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
