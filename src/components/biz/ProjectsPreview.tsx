import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { useResumeStore } from "~/stores/useResumeStore";

export function ProjectsPreview() {
  const { resumeData, config } = useResumeStore();
  const { projects } = resumeData;

  const formatDate = (date: string): string => {
    if (!date)
      return '';
    const [year, month] = date.split('-');
    return `${year}.${month}`;
  };


  if (projects.length === 0) {
    return null;
  }

  return (
    <>
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
          ))}</>
  )
}
