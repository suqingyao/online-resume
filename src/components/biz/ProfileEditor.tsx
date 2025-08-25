import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useResumeStore } from '~/stores/useResumeStore';
import { Input } from '../ui';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/Form';
import { MarkdownEditor } from './MarkdownEditor';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  title: z.string().nonempty(),
  email: z.email(),
  phone: z.string(),
  location: z.string(),
  website: z.string(),
  linkedin: z.string(),
  github: z.string(),
  summary: z.string().max(500, {
    message: 'summary is maximum of 500 characters.',
  }),
});

export function ProfileEditor() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '张三',
      title: '前端开发工程师',
      email: 'zhangsan@example.com',
      phone: '+86 138-0000-0000',
      location: '北京市',
      website: '',
      linkedin: '',
      github: '',
      summary: '具有3年前端开发经验的工程师，熟练掌握React、Vue等现代前端框架，有丰富的项目开发和团队协作经验。',
    },
    mode: 'onChange',
  });

  const { updatePersonalInfo } = useResumeStore();

  // 防抖函数
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // 防抖更新个人信息
  const debouncedUpdatePersonalInfo = useCallback(
    debounce((values: Partial<z.infer<typeof formSchema>>) => {
      updatePersonalInfo(values);
    }, 300),
    [updatePersonalInfo],
  );

  // 监听表单值变化，自动提交
  useEffect(() => {
    const subscription = form.watch((value) => {
      debouncedUpdatePersonalInfo(value as Partial<z.infer<typeof formSchema>>);
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedUpdatePersonalInfo]);

  return (
    <div className="grid gap-4">
      <h3 className="text-base text-gray-900 font-medium">个人信息</h3>
      <Form {...form}>
        <form className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>姓名</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="请输入姓名"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>职位</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入目标职位" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入邮箱地址" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>电话</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入联系电话" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>所在地</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入所在城市" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>个人网站</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="请输入个人网站" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="LinkedIn 个人主页" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>GitHub</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="GitHub 个人主页" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col gap-2 w-full">
                <FormLabel>个人简介</FormLabel>
                <FormControl>
                  <MarkdownEditor
                    value={field.value}
                    onChange={value => field.onChange(value)}
                    placeholder="请简要介绍您的专业背景、技能特长和职业目标...\n\n支持Markdown格式：\n- **粗体文本**\n- *斜体文本*\n- `代码`\n- [链接](url)\n- 列表项"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
