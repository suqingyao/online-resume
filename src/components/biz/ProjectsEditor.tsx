import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateUtils } from '~/lib/dateUtils';
import { useResumeStore } from '~/stores/useResumeStore';
import { Button, DatePicker, Input } from '../ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/Form';
import { MarkdownEditor } from './MarkdownEditor';

// 定义 Project 表单的 Zod schema
const projectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '项目名称不能为空'),
  description: z.string(),
  technologies: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string(),
  url: z.string().url('请输入有效的URL').optional().or(z.literal('')),
  github: z.string().url('请输入有效的GitHub URL').optional().or(z.literal('')),
  highlights: z.array(z.string()),
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

type ProjectFormValues = z.infer<typeof projectSchema>;

export const ProjectsEditor: React.FC = () => {
  const { resumeData, updateProjects } = useResumeStore();

  // 使用 react-hook-form 管理整个表单
  const form = useForm<{
    projects: ProjectFormValues[];
  }>({
    resolver: zodResolver(
      z.object({
        projects: z.array(projectSchema),
      }),
    ),
    defaultValues: {
      projects: resumeData.projects.map(proj => ({
        ...proj,
        technologies: proj.technologies || [],
        highlights: proj.highlights || [],
      })),
    },
    mode: 'onChange',
  });

  // 使用 useFieldArray 管理动态的 project 数组
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'projects',
  });

  // 防抖函数
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // 防抖更新项目经历
  const debouncedUpdateProjects = useCallback(
    debounce((values: ProjectFormValues[]) => {
      updateProjects(values as unknown as typeof resumeData.projects);
    }, 300),
    [updateProjects],
  );

  // 监听表单值变化，自动提交
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.projects) {
        debouncedUpdateProjects(value.projects);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedUpdateProjects]);

  /**
   * 手动触发表单验证
   */
  const validateForm = async () => {
    const isValid = await form.trigger();
    return isValid;
  };

  /**
   * 添加新的项目
   */
  const addProject = () => {
    const newProject: ProjectFormValues = {
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
    append(newProject);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base text-gray-900 font-medium">项目经历</h3>
        <Button
          onClick={addProject}
          variant="outline"
          size="sm"
        >
          <div className="i-heroicons-plus h-3 w-3 mr-1" />
          <span className="text-sm">添加项目</span>
        </Button>
      </div>

      <Form {...form}>
        <div className="grid grid-cols-1 gap-4 flex-1">
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="mb-3 flex items-start justify-between">
                <h4 className="text-sm text-gray-900 font-medium">
                  项目
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
                  name={`projects.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>项目名称 *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="请输入项目名称"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`projects.${index}.url`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>项目链接</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`projects.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>开始时间</FormLabel>
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
                  name={`projects.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>结束时间</FormLabel>
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
                <FormField
                  control={form.control}
                  name={`projects.${index}.github`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>GitHub 链接</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="https://github.com/username/project"
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
                name={`projects.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>项目描述</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value}
                        onChange={value => field.onChange(value)}
                        placeholder="请描述项目的背景、目标和您的贡献...\n\n支持Markdown格式：\n- **项目背景**: 解决了什么问题\n- *技术难点*: 遇到的挑战\n- `技术栈`: React, Node.js, MongoDB\n- [演示地址](url)"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full gap-3">
              <FormField
                control={form.control}
                name={`projects.${index}.technologies`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>技术栈（用逗号分隔）</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value.join(', ')}
                        onChange={(e) => {
                          const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                          field.onChange(technologies);
                        }}
                        placeholder="React, TypeScript, Node.js, MongoDB"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col w-full gap-3">
              <FormField
                control={form.control}
                name={`projects.${index}.highlights`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>项目亮点（每行一个）</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value.join('\n')}
                        onChange={value => field.onChange(value.split('\n'))}
                        placeholder="• 实现了某个核心功能，提升了用户体验\n• 优化了系统性能，响应时间减少50%\n• 获得了多少用户或下载量"
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
