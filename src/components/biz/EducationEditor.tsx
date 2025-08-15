import { DateUtils } from '~/lib/dateUtils';
import { useResumeStore } from '~/stores/useResumeStore';
import { Button, DatePicker, Input, Label } from '../ui';
import { MarkdownEditor } from './MarkdownEditor';

export function EducationEditor() {
  const { resumeData, updateEducation } = useResumeStore();

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

  return (
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="school">学校名称 *</Label>
              <Input
                id="school"
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="degree">学历 *</Label>
              <Input
                id="degree"
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="major">专业 *</Label>
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="gpa">GPA</Label>
              <Input
                id="gpa"
                type="text"
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="startDate">开始时间 *</Label>
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
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="endDate">结束时间 *</Label>
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
            <div className="grid w-full items-center gap-3">
              <Label>
                教育描述
              </Label>
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
  );
}
