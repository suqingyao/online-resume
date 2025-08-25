import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateUtils } from '~/lib/dateUtils';
import { useResumeStore } from '~/stores/useResumeStore';
import { Button, DatePicker, Input } from '../ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/Form';
import { MarkdownEditor } from './MarkdownEditor';

// 定义 Education 表单的 Zod schema
const educationSchema = z.object({
  id: z.string(),
  school: z.string().min(1, '学校名称不能为空'),
  degree: z.string().min(1, '学历不能为空'),
  major: z.string().min(1, '专业不能为空'),
  startDate: z.string().min(1, '开始时间不能为空'),
  endDate: z.string().min(1, '结束时间不能为空'),
  gpa: z.string().optional(),
  description: z.string().optional(),
  descriptionMarkdown: z.boolean().optional(),
}).refine((data) => {
  // 结束时间不能早于开始时间
  if (data.endDate && data.startDate && data.endDate < data.startDate) {
    return false;
  }
  return true;
}, {
  message: '结束时间必须晚于开始时间',
  path: ['endDate'],
});

type EducationFormValues = z.infer<typeof educationSchema>;

export const EducationEditor: React.FC = () => {
  const { resumeData, updateEducation } = useResumeStore();

  // 使用 react-hook-form 管理整个表单
  const form = useForm<{
    educations: EducationFormValues[];
  }>({
    resolver: zodResolver(
      z.object({
        educations: z.array(educationSchema),
      }),
    ),
    defaultValues: {
      educations: resumeData.education.map(edu => ({
        ...edu,
        description: edu.description || '',
        gpa: edu.gpa || '',
      })),
    },
    mode: 'onChange',
  });

  // 使用 useFieldArray 管理动态的 education 数组
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

  // 防抖函数
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // 防抖更新教育经历
  const debouncedUpdateEducation = useCallback(
    debounce((values: EducationFormValues[]) => {
      updateEducation(values as unknown as typeof resumeData.education);
    }, 300),
    [updateEducation],
  );

  // 监听表单值变化，自动提交
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.educations) {
        debouncedUpdateEducation(value.educations);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedUpdateEducation]);

  /**
   * 手动触发表单验证
   */
  const validateForm = async () => {
    const isValid = await form.trigger();
    return isValid;
  };

  /**
   * 添加新的教育经历
   */
  const addEducation = () => {
    const newEducation: EducationFormValues = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
      descriptionMarkdown: false,
    };
    append(newEducation);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base text-gray-900 font-medium">教育经历</h3>
        <Button
          onClick={addEducation}
          variant="outline"
          size="sm"
        >
          <div className="i-heroicons-plus h-3 w-3 mr-1" />
          <span className="text-sm">添加教育经历</span>
        </Button>
      </div>

      <Form {...form}>
        <div className="grid grid-cols-1 gap-4 flex-1">
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="mb-3 flex items-start justify-between">
                <h4 className="text-sm text-gray-900 font-medium">
                  教育经历
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
                  name={`educations.${index}.school`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>学校名称 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="请输入学校名称"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.degree`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>学历 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="如：本科、硕士、博士"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.major`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>专业 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="请输入专业名称"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.gpa`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>GPA</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="如：3.8/4.0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.startDate`}
                  render={({ field }) => (
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
                  name={`educations.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>结束时间 *</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={DateUtils.toDate(field.value)}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          placeholder="选择结束时间"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </div>

            <div className="flex flex-col w-full gap-3">
              <FormField
                control={form.control}
                name={`educations.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>教育描述</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value || ''}
                        onChange={value => field.onChange(value)}
                        placeholder="请描述您的教育背景、主要课程、获得荣誉等...\n\n支持Markdown格式：\n- **主要课程**: 数据结构、算法设计\n- *获得荣誉*: 优秀学生奖学金\n- `相关技能`: 掌握了编程基础\n- [学校官网](url)"
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
