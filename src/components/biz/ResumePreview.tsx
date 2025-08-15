import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { useResumeStore } from '~/stores/useResumeStore';

/**
 * 简历预览组件
 * 负责渲染完整的简历内容
 */
export const ResumePreview: React.FC = () => {
  const { resumeData, config } = useResumeStore();
  const { personalInfo, education, experience, projects, skills, languages, certificates } = resumeData;

  /**
   * 获取语言等级显示文本
   */
  const getLanguageLevel = (level: string): string => {
    const levels = {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级',
      native: '母语',
    };
    return levels[level as keyof typeof levels] || level;
  };

  /**
   * 格式化日期显示
   */
  const formatDate = (date: string): string => {
    if (!date)
      return '';
    const [year, month] = date.split('-');
    return `${year}.${month}`;
  };

  return (
    <div
      id="resume-preview"
      className="mx-auto max-w-4xl w-full bg-white shadow-lg"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: config.spacing === 'compact' ? '15mm' : config.spacing === 'relaxed' ? '25mm' : '20mm',
        fontSize: config.fontSize === 'small' ? '12px' : config.fontSize === 'large' ? '16px' : '14px',
        lineHeight: '1.5',
      }}
    >
      {/* 个人信息部分 */}
      <header className="mb-8">
        <h1
          className="mb-2 text-3xl font-bold"
          style={{ color: config.primaryColor }}
        >
          {personalInfo.name}
        </h1>
        <h2 className="mb-4 text-xl text-gray-600">{personalInfo.title}</h2>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <div className="i-heroicons-envelope h-3.5 w-3.5" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <div className="i-heroicons-phone h-3.5 w-3.5" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <div className="i-heroicons-map-pin h-3.5 w-3.5" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-1">
              <div className="i-heroicons-globe-alt h-3.5 w-3.5" />
              <span>{personalInfo.website}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <div className="i-mingcute-linkedin-line h-3.5 w-3.5" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center gap-1">
              <div className="i-mingcute-github-line h-3.5 w-3.5" />
              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>

        {personalInfo.summary && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            className="prose-sm max-w-none prose"
            components={{
              p: ({ children }) => <p className="mb-2">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              code: ({ children }) => <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">{children}</code>,
              a: ({ href, children }) => <a href={href} className="text-primary hover:underline">{children}</a>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
            }}
          >
            {personalInfo.summary}
          </ReactMarkdown>
        )}
      </header>

      {/* 工作经历 */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h3
            className="mb-4 border-b-2 pb-2 text-xl font-semibold"
            style={{ borderColor: config.primaryColor, color: config.primaryColor }}
          >
            工作经历
          </h3>
          {experience.map(exp => (
            <div key={exp.id} className="mb-6">
              <div className="mb-2 flex flex-row items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{exp.position}</h4>
                  <p className="text-base text-gray-600">
                    {exp.company}
                    {' '}
                    •
                    {' '}
                    {exp.location}
                  </p>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1 text-sm text-gray-500">
                  <div className="i-heroicons-calendar-days h-3.5 w-3.5" />
                  <span>
                    {formatDate(exp.startDate)}
                    {' '}
                    -
                    {exp.current ? '至今' : formatDate(exp.endDate)}
                  </span>
                </div>
              </div>
              {exp.description && (
                <div className="mb-3 text-gray-700">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    className="prose-sm max-w-none prose"
                    components={{
                      p: ({ children }) => <p className="mb-2">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                      code: ({ children }) => <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">{children}</code>,
                      a: ({ href, children }) => <a href={href} className="text-primary hover:underline">{children}</a>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
                      li: ({ children }) => <li>{children}</li>,
                    }}
                  >
                    {exp.description}
                  </ReactMarkdown>
                </div>
              )}
              {exp.achievements.length > 0 && (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exp.achievements.map(achievement => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* 项目经历 */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h3
            className="mb-4 border-b-2 pb-2 text-xl font-semibold"
            style={{ borderColor: config.primaryColor, color: config.primaryColor }}
          >
            项目经历
          </h3>
          {projects.map(project => (
            <div key={project.id} className="mb-6">
              <div className="mb-2 flex flex-row items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{project.name}</h4>
                  <div className="text-base text-gray-600">
                    {project.descriptionMarkdown
                      ? (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            className="prose-sm max-w-none prose"
                            components={{
                              p: ({ children }) => <p className="mb-2">{children}</p>,
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                              code: ({ children }) => <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">{children}</code>,
                              a: ({ href, children }) => <a href={href} className="text-primary hover:underline">{children}</a>,
                              ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
                              li: ({ children }) => <li>{children}</li>,
                            }}
                          >
                            {project.description}
                          </ReactMarkdown>
                        )
                      : (
                          <p>{project.description}</p>
                        )}
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-1 text-sm text-gray-500">
                  <div className="i-heroicons-calendar-days h-3.5 w-3.5" />
                  <span>
                    {formatDate(project.startDate)}
                    {' '}
                    -
                    {formatDate(project.endDate)}
                  </span>
                </div>
              </div>

              {project.technologies.length > 0 && (
                <div className="mb-3">
                  <span className="text-sm text-gray-600 font-medium">技术栈：</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span
                        key={tech}
                        className="rounded px-2 py-1 text-xs"
                        style={{ backgroundColor: `${config.primaryColor}20`, color: config.primaryColor }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.highlights.length > 0 && (
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {project.highlights.map(highlight => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}

              <div className="mt-2 flex gap-4 text-sm">
                {project.url && (
                  <a href={project.url} className="text-primary hover:underline">
                    项目链接
                  </a>
                )}
                {project.github && (
                  <a href={project.github} className="text-primary hover:underline">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 教育经历 */}
      {education.length > 0 && (
        <section className="mb-8">
          <h3
            className="mb-4 border-b-2 pb-2 text-xl font-semibold"
            style={{ borderColor: config.primaryColor, color: config.primaryColor }}
          >
            教育经历
          </h3>
          {education.map(edu => (
            <div key={edu.id} className="mb-4">
              <div className="mb-2 flex flex-row items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{edu.school}</h4>
                  <p className="text-base text-gray-600">
                    {edu.degree}
                    {' '}
                    •
                    {' '}
                    {edu.major}
                  </p>
                  {edu.gpa && (
                    <p className="text-sm text-gray-500">
                      GPA:
                      {edu.gpa}
                    </p>
                  )}
                </div>
                <div className="flex flex-shrink-0 items-center gap-1 text-sm text-gray-500">
                  <div className="i-heroicons-calendar-days h-3.5 w-3.5" />
                  <span>
                    {formatDate(edu.startDate)}
                    {' '}
                    -
                    {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
              {edu.description && (
                <div className="text-gray-700">
                  {edu.descriptionMarkdown
                    ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw, rehypeSanitize]}
                          className="prose-sm max-w-none prose"
                          components={{
                            p: ({ children }) => <p className="mb-2">{children}</p>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            code: ({ children }) => <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">{children}</code>,
                            a: ({ href, children }) => <a href={href} className="text-primary hover:underline">{children}</a>,
                            ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
                            li: ({ children }) => <li>{children}</li>,
                          }}
                        >
                          {edu.description}
                        </ReactMarkdown>
                      )
                    : (
                        <p>{edu.description}</p>
                      )}
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* 技能 */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h3
            className="mb-4 border-b-2 pb-2 text-xl font-semibold"
            style={{ borderColor: config.primaryColor, color: config.primaryColor }}
          >
            专业技能
          </h3>
          {skills.map(skill => (
            <div
              key={skill.id}
              className="mb-4"
            >
              <h4 className="mb-2 text-base text-gray-800 font-medium">
                {skill.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <span
                    key={item}
                    className="rounded px-2 py-1 text-sm"
                    style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 语言能力 */}
      {languages.length > 0 && (
        <section className="mb-8">
          <h3
            className="mb-4 border-b-2 pb-2 text-xl font-semibold"
            style={{ borderColor: config.primaryColor, color: config.primaryColor }}
          >
            语言能力
          </h3>
          <div className="space-y-2">
            {languages.map(lang => (
              <div key={lang.id} className="flex justify-between">
                <span className="text-base font-medium">{lang.name}</span>
                <span className="text-sm text-gray-600">{getLanguageLevel(lang.level)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 证书认证 */}
      {certificates.length > 0 && (
        <section className="mb-8">
          <h3
            className="mb-4 border-b-2 pb-2 text-xl font-semibold"
            style={{ borderColor: config.primaryColor, color: config.primaryColor }}
          >
            证书认证
          </h3>
          <div className="space-y-3">
            {certificates.map(cert => (
              <div key={cert.id}>
                <h4 className="text-base font-medium">{cert.name}</h4>
                <p className="text-sm text-gray-600">{cert.issuer}</p>
                <p className="text-sm text-gray-500">{formatDate(cert.date)}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
