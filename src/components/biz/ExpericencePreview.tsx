import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { useResumeStore } from '~/stores/useResumeStore';

export function ExperiencePreview() {
  const { resumeData, config } = useResumeStore();
  const { experience } = resumeData;

  const formatDate = (date: string): string => {
    if (!date)
      return '';
    const [year, month] = date.split('-');
    return `${year}.${month}`;
  };

  if (experience.length === 0) {
    return null;
  }

  return (
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
  );
}
