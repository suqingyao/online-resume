import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateUtils } from '~/lib/dateUtils';
import { useResumeStore } from '~/stores/useResumeStore';
import { Button, Checkbox, DatePicker, Input } from '../ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/Form';
import { MarkdownEditor } from './MarkdownEditor';

// 定义 Experience 表单的 Zod schema
const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(1, '公司名称不能为空'),
  position: z.string().min(1, '职位不能为空'),
  startDate: z.string().min(1, '开始时间不能为空'),
  endDate: z.string(),
  current: z.boolean(),
  location: z.string(),
  description: z.string(),
  achievements: z.array(z.string()),
}).refine((data) => {
  // 如果不是当前工作，结束时间不能为空
  if (!data.current && !data.endDate) {
    return false;
  }
  // 结束时间不能早于开始时间
  if (data.endDate && data.endDate < data.startDate) {
    return false;
  }
  return true;
}, {
  message: '结束时间必须晚于开始时间',
  path: ['endDate'],
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

export const ExperienceEditor: React.FC = () => {
  const { resumeData, updateExperience } = useResumeStore();

  // 使用 react-hook-form 管理整个表单
  const form = useForm<{
    experiences: ExperienceFormValues[];
  }>({
    resolver: zodResolver(
      z.object({
        experiences: z.array(experienceSchema),
      }),
    ),
    defaultValues: {
      experiences: resumeData.experience.map(exp => ({
        ...exp,
        achievements: exp.achievements || [],
      })),
    },
    mode: 'onChange',
  });

  // 使用 useFieldArray 管理动态的 experience 数组
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'experiences',
  });

  // 防抖函数
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // 防抖更新工作经历
  const debouncedUpdateExperience = useCallback(
    debounce((values: ExperienceFormValues[]) => {
      updateExperience(values as unknown as typeof resumeData.experience);
    }, 300),
    [updateExperience],
  );

  // 监听表单值变化，自动提交
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.experiences) {
        debouncedUpdateExperience(value.experiences);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedUpdateExperience]);

  /**
   * 手动触发表单验证
   */
  const validateForm = async () => {
    const isValid = await form.trigger();
    return isValid;
  };

  /**
   * 添加新的工作经历
   */
  const addExperience = () => {
    const newExperience: ExperienceFormValues = {
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
    append(newExperience);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base text-gray-900 font-medium">工作经历</h3>
        <Button
          onClick={addExperience}
          variant="outline"
          size="sm"
        >
          <div className="i-heroicons-plus h-3 w-3 mr-1" />
          <span className="text-sm">添加经历</span>
        </Button>
      </div>

      <Form {...form}>
        <div className="grid grid-cols-1 gap-4 flex-1">
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="mb-3 flex items-start justify-between">
                <h4 className="text-sm text-gray-900 font-medium">
                  工作经历
                  {index + 1}
                </h4>
                <Button
                  onClick={() => remove(index)}
                  variant="destructive"
                  size="sm"
                >
                  <div className="i-heroicons-trash h-4 w-4" />
                </Button>
              </div>

              <form className="grid mb-3 gap-3 grid-cols-2">
                <FormField
                  control={form.control}
                  name={`experiences.${index}.company`}
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>公司名称 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="请输入公司名称"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experiences.${index}.position`}
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>职位 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="请输入职位名称"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experiences.${index}.startDate`}
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>开始时间 *</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={DateUtils.toDate(field.value)}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          placeholder="选择开始时间"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experiences.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>结束时间</FormLabel>
                      <div className="flex items-center gap-2">
                        <DatePicker
                          value={DateUtils.toDate(field.value)}
                          disabled={form.watch(`experiences.${index}.current`)}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          placeholder="选择结束时间"
                          className="flex-1"
                        />
                        <FormField
                          control={form.control}
                          name={`experiences.${index}.current`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    // 如果选中"至今"，清空结束时间
                                    if (checked) {
                                      form.setValue(`experiences.${index}.endDate`, '');
                                    }
                                  }}
                                  className="text-sm text-gray-600"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormLabel className="text-sm text-gray-600">至今</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experiences.${index}.location`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>工作地点</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="请输入工作地点"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </div>

            <div className="flex flex-col w-full gap-3">
              <FormField
                control={form.control}
                name={`experiences.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>工作描述</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value}
                        onChange={value => field.onChange(value)}
                        placeholder="请描述您在该职位的主要工作内容...\n\n支持Markdown格式：\n- **负责** 项目开发\n- *参与* 需求分析\n- `技术栈`: React, Node.js\n- [项目链接](url)"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full gap-3">
              <FormField
                control={form.control}
                name={`experiences.${index}.achievements`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>主要成就（每行一个）</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value.join('\n')}
                        onChange={value => field.onChange(value.split('\n'))}
                        placeholder="• 完成了某个重要项目，提升了XX%的效率\n• 带领团队完成了某个目标\n• 获得了某个奖项或认可"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            </React.Fragment>
          ))}
        </div>
      </Form>
    </div>
  );
};
