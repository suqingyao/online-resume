import { DateUtils } from '~/lib/dateUtils';
import { useResumeStore } from '~/stores/useResumeStore';
import { Button, Checkbox, DatePicker, Input, Label } from '../ui';
import { MarkdownEditor } from './MarkdownEditor';

export const ExperienceEditor: React.FC = () => {
  const {
    resumeData,
    updateExperience,
  } = useResumeStore();

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

  return (
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="company">公司名称 *</Label>
              <Input
                id="company"
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="position">职位 *</Label>
              <Input
                id="position"
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="startDate">开始时间 *</Label>
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="endDate">结束时间</Label>
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
                      item.id === exp.id ? { ...item, current: checked as boolean, endDate: checked ? '' : item.endDate } : item,
                    );
                    updateExperience(updated);
                  }}
                  className="text-sm text-gray-600"
                >
                </Checkbox>
                <Label> 至今</Label>
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="location">工作地点</Label>
              <Input
                id="location"
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

          <div className="grid w-full items-center gap-3">
            <Label>工作描述</Label>
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
          </div>

          <div className="grid w-full items-center gap-3">
            <Label>主要成就（每行一个）</Label>
            <MarkdownEditor
              value={exp.achievements.join('\n')}
              onChange={(value) => {
                const updated = resumeData.experience.map(item =>
                  item.id === exp.id ? { ...item, achievements: value.split('\n') } : item,
                );
                updateExperience(updated);
              }}
              placeholder="• 完成了某个重要项目，提升了XX%的效率\n• 带领团队完成了某个目标\n• 获得了某个奖项或认可"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
