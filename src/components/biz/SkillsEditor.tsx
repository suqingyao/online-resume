import { useResumeStore } from '~/stores/useResumeStore';
import { Button, Input } from '../ui';

export function SkillsEditor() {
  const { resumeData, updateSkills } = useResumeStore();

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
  );
}
