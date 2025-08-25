import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useResumeStore } from '~/stores/useResumeStore';
import { Button, Input } from '../ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/Form';
import { MarkdownEditor } from './MarkdownEditor';

// 定义 Skill 表单的 Zod schema
const skillSchema = z.object({
  id: z.string(),
  category: z.string().min(1, '分类名称不能为空'),
  items: z.array(z.string()),
});

type SkillFormValues = z.infer<typeof skillSchema>;

export const SkillsEditor: React.FC = () => {
  const { resumeData, updateSkills } = useResumeStore();

  // 使用 react-hook-form 管理整个表单
  const form = useForm<{
    skills: SkillFormValues[];
  }>({
    resolver: zodResolver(
      z.object({
        skills: z.array(skillSchema),
      }),
    ),
    defaultValues: {
      skills: resumeData.skills.map(skill => ({
        ...skill,
        items: skill.items || [],
      })),
    },
    mode: 'onChange',
  });

  // 使用 useFieldArray 管理动态的 skill 数组
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'skills',
  });

  // 防抖函数
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // 防抖更新技能
  const debouncedUpdateSkills = useCallback(
    debounce((values: SkillFormValues[]) => {
      updateSkills(values as unknown as typeof resumeData.skills);
    }, 300),
    [updateSkills],
  );

  // 监听表单值变化，自动提交
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.skills) {
        debouncedUpdateSkills(value.skills);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedUpdateSkills]);

  /**
   * 手动触发表单验证
   */
  const validateForm = async () => {
    const isValid = await form.trigger();
    return isValid;
  };

  /**
   * 添加新的技能分类
   */
  const addSkill = () => {
    const newSkill: SkillFormValues = {
      id: Date.now().toString(),
      category: '',
      items: [],
    };
    append(newSkill);
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base text-gray-900 font-medium">专业技能</h3>
        <Button
          onClick={addSkill}
          variant="outline"
          size="sm"
        >
          <div className="i-heroicons-plus h-3 w-3 mr-1" />
          <span className="text-sm">添加技能分类</span>
        </Button>
      </div>

      <Form {...form}>
        <div className="grid grid-cols-1 gap-4 flex-1">
          {fields.map((field, index) => (
            <React.Fragment key={field.id}>
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="mb-3 flex items-start justify-between">
                <h4 className="text-sm text-gray-900 font-medium">
                  技能分类
                  {index + 1}
                </h4>
                <Button
                  onClick={() => remove(index)}
                  variant="destructive"
                  size="sm"
                  title="删除技能分类"
                >
                  <div className="i-heroicons-trash h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name={`skills.${index}.category`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>分类名称</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="如：前端技术、后端技术、工具框架等"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`skills.${index}.items`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>技能列表（每行一个）</FormLabel>
                      <FormControl>
                        <MarkdownEditor
                          value={field.value.join('\n')}
                          onChange={(value) => {
                            const items = value.split('\n').map(item => item.trim()).filter(item => item);
                            field.onChange(items);
                          }}
                          placeholder="React&#10;Vue&#10;TypeScript&#10;JavaScript&#10;HTML5&#10;CSS3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            </React.Fragment>
          ))}
        </div>
      </Form>
    </div>
  );
};
