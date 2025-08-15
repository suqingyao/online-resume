import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { useResumeStore } from '~/stores/useResumeStore';

export function ProfilePreview() {
  const { resumeData, config } = useResumeStore();
  const { profile } = resumeData;
  return (
    <section className="mb-8">
      <h1
        className="mb-2 text-3xl font-bold"
        style={{ color: config.primaryColor }}
      >
        {profile.name}
      </h1>
      <h2 className="mb-4 text-xl text-gray-600">{profile.title}</h2>
      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        {profile.email && (
          <div className="flex items-center gap-1">
            <div className="i-heroicons-envelope h-3.5 w-3.5" />
            <span>{profile.email}</span>
          </div>
        )}
        {profile.phone && (
          <div className="flex items-center gap-1">
            <div className="i-heroicons-phone h-3.5 w-3.5" />
            <span>{profile.phone}</span>
          </div>
        )}
        {profile.location && (
          <div className="flex items-center gap-1">
            <div className="i-heroicons-map-pin h-3.5 w-3.5" />
            <span>{profile.location}</span>
          </div>
        )}
        {profile.website && (
          <div className="flex items-center gap-1">
            <div className="i-heroicons-globe-alt h-3.5 w-3.5" />
            <span>{profile.website}</span>
          </div>
        )}
        {profile.linkedin && (
          <div className="flex items-center gap-1">
            <div className="i-mingcute-linkedin-line h-3.5 w-3.5" />
            <span>{profile.linkedin}</span>
          </div>
        )}
        {profile.github && (
          <div className="flex items-center gap-1">
            <div className="i-mingcute-github-line h-3.5 w-3.5" />
            <span>{profile.github}</span>
          </div>
        )}

        {profile.summary && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            className="prose-sm max-w-none prose"
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
              code: ({ children }) => <code className="rounded bg-gray-100 px-1 py-0.5 text-sm">{children}</code>,
              a: ({ href, children }) => <a href={href} className="text-primary hover:underline">{children}</a>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-1">{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
            }}
          >
            {profile.summary}
          </ReactMarkdown>
        )}
      </div>
    </section>
  );
}
