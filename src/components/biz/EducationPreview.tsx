import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { useResumeStore } from '~/stores/useResumeStore';

export function EducationPreview() {
  const { resumeData, config } = useResumeStore();
  const { education } = resumeData;

  const formatDate = (date: string): string => {
    if (!date)
      return '';
    const [year, month] = date.split('-');
    return `${year}.${month}`;
  };

  if (education.length === 0) {
    return null;
  }

  return (
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
  );
}
