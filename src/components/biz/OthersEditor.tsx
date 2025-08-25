import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DateUtils } from '~/lib/dateUtils';
import { useResumeStore } from '~/stores/useResumeStore';
import { Button, DatePicker, Input, Select } from '../ui';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/Form';

// 定义 Language 表单的 Zod schema
const languageSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '语言名称不能为空'),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'native'], {
    message: '请选择熟练程度',
  }),
});

// 定义 Certificate 表单的 Zod schema
const certificateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '证书名称不能为空'),
  issuer: z.string().min(1, '颁发机构不能为空'),
  date: z.string().min(1, '获得时间不能为空'),
  url: z.string().url('请输入有效的URL').optional().or(z.literal('')),
});

type LanguageFormValues = z.infer<typeof languageSchema>;
type CertificateFormValues = z.infer<typeof certificateSchema>;

export const OthersEditor: React.FC = () => {
  const { resumeData, updateLanguages, updateCertificates } = useResumeStore();

  // 使用 react-hook-form 管理语言表单
  const languageForm = useForm<{
    languages: LanguageFormValues[];
  }>({
    resolver: zodResolver(
      z.object({
        languages: z.array(languageSchema),
      }),
    ),
    defaultValues: {
      languages: resumeData.languages.map(lang => ({
        ...lang,
      })),
    },
    mode: 'onChange',
  });

  // 使用 react-hook-form 管理证书表单
  const certificateForm = useForm<{
    certificates: CertificateFormValues[];
  }>({
    resolver: zodResolver(
      z.object({
        certificates: z.array(certificateSchema),
      }),
    ),
    defaultValues: {
      certificates: resumeData.certificates.map(cert => ({
        ...cert,
        url: cert.url || '',
      })),
    },
    mode: 'onChange',
  });

  // 使用 useFieldArray 管理动态的语言数组
  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control: languageForm.control,
    name: 'languages',
  });

  // 使用 useFieldArray 管理动态的证书数组
  const { fields: certificateFields, append: appendCertificate, remove: removeCertificate } = useFieldArray({
    control: certificateForm.control,
    name: 'certificates',
  });

  // 防抖函数
  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // 防抖更新语言
  const debouncedUpdateLanguages = useCallback(
    debounce((values: LanguageFormValues[]) => {
      updateLanguages(values as unknown as typeof resumeData.languages);
    }, 300),
    [updateLanguages],
  );

  // 防抖更新证书
  const debouncedUpdateCertificates = useCallback(
    debounce((values: CertificateFormValues[]) => {
      updateCertificates(values as unknown as typeof resumeData.certificates);
    }, 300),
    [updateCertificates],
  );

  // 监听语言表单值变化，自动提交
  useEffect(() => {
    const subscription = languageForm.watch((value) => {
      if (value.languages) {
        debouncedUpdateLanguages(value.languages);
      }
    });
    return () => subscription.unsubscribe();
  }, [languageForm, debouncedUpdateLanguages]);

  // 监听证书表单值变化，自动提交
  useEffect(() => {
    const subscription = certificateForm.watch((value) => {
      if (value.certificates) {
        debouncedUpdateCertificates(value.certificates);
      }
    });
    return () => subscription.unsubscribe();
  }, [certificateForm, debouncedUpdateCertificates]);

  /**
   * 添加新的语言
   */
  const addLanguage = () => {
    const newLanguage: LanguageFormValues = {
      id: Date.now().toString(),
      name: '',
      level: 'intermediate',
    };
    appendLanguage(newLanguage);
  };

  /**
   * 添加新的证书
   */
  const addCertificate = () => {
    const newCertificate: CertificateFormValues = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    appendCertificate(newCertificate);
  };

  return (
    <div className="grid gap-6">
      <h3 className="text-base text-gray-900 font-medium">其他信息</h3>

      {/* 语言能力 */}
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-gray-800 font-medium">语言能力</h4>
          <Button
            onClick={addLanguage}
            variant="outline"
            size="sm"
          >
            <div className="i-heroicons-plus h-3 w-3 mr-1" />
            <span className="text-sm">添加语言</span>
          </Button>
        </div>

        <Form {...languageForm}>
          <div className="grid grid-cols-1 gap-4">
            {languageFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h5 className="text-sm text-gray-900 font-medium">语言</h5>
                  <Button
                    onClick={() => removeLanguage(index)}
                    variant="destructive"
                    size="sm"
                    title="删除语言"
                  >
                    <div className="i-heroicons-trash h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={languageForm.control}
                    name={`languages.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>语言名称</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="如：英语、日语等"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={languageForm.control}
                    name={`languages.${index}.level`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>熟练程度</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            options={[
                              { value: 'beginner', label: '初级' },
                              { value: 'intermediate', label: '中级' },
                              { value: 'advanced', label: '高级' },
                              { value: 'native', label: '母语' },
                            ]}
                            placeholder="选择熟练程度"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </Form>
      </div>

      {/* 证书认证 */}
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-gray-800 font-medium">证书认证</h4>
          <Button
            onClick={addCertificate}
            variant="outline"
            size="sm"
          >
            <div className="i-heroicons-plus h-3 w-3 mr-1" />
            <span className="text-sm">添加证书</span>
          </Button>
        </div>

        <Form {...certificateForm}>
          <div className="grid grid-cols-1 gap-4">
            {certificateFields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-lg p-3">
                <div className="mb-3 flex items-center justify-between">
                  <h5 className="text-sm text-gray-900 font-medium">证书</h5>
                  <Button
                    onClick={() => removeCertificate(index)}
                    variant="destructive"
                    size="sm"
                    title="删除证书"
                  >
                    <div className="i-heroicons-trash h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField
                    control={certificateForm.control}
                    name={`certificates.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>证书名称</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="如：AWS云从业者认证"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={certificateForm.control}
                    name={`certificates.${index}.issuer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>颁发机构</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="如：Amazon Web Services"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={certificateForm.control}
                    name={`certificates.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>获得时间</FormLabel>
                        <FormControl>
                          <DatePicker
                            value={DateUtils.toDate(field.value)}
                            onChange={(value) => {
                              field.onChange(value);
                            }}
                            placeholder="选择获得时间"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={certificateForm.control}
                    name={`certificates.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>证书链接（可选）</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </Form>
      </div>
    </div>
  );
};
