import { cn } from '@suqingyao/utils';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

/**
 * Markdown编辑器组件，支持实时预览
 * @param value - 当前markdown内容
 * @param onChange - 内容变化回调
 * @param placeholder - 占位符文本
 * @param label - 标签文本
 * @param className - 自定义样式类
 */
export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = '支持Markdown格式...',
  label,
  className = '',
}) => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm text-gray-700 font-medium">
          {label}
        </label>
      )}

      <div className="overflow-hidden border border-gray-300 rounded-md">
        {/* 工具栏 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2">
          <div className="text-xs text-gray-500">
            支持 Markdown 格式
          </div>
          <div className="flex gap-x-1">
            <button
              type="button"
              onClick={() => setIsPreview(false)}
              className={cn(`flex items-center rounded p-1 text-xs gap-x-1`, !isPreview
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700')}
            >
              <div className="i-mingcute-pencil-line h-3 w-3" />
              <span>编辑</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPreview(true)}
              className={cn(`flex items-center rounded p-1 text-xs gap-1`, isPreview
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700')}
            >
              <div className="i-mingcute-eye-line h-3 w-3" />
              <span>预览</span>
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="min-h-[120px]">
          {
            isPreview
              ? (
                  <div className="prose-sm max-w-none p-3 prose">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        // 自定义组件样式
                        h1: ({ children }) => (
                          <h1 className="mb-2 text-xl font-bold">{children}</h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="mb-2 text-lg font-semibold">{children}</h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="mb-1 text-base font-medium">{children}</h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-2 leading-relaxed">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-2 list-disc list-inside space-y-1">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-2 list-decimal list-inside space-y-1">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-sm">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                        code: ({ children }) => (
                          <code className="rounded bg-gray-100 px-1 py-0.5 text-xs font-mono">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="mb-2 overflow-x-auto rounded bg-gray-100 p-2 text-xs">
                            {children}
                          </pre>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="mb-2 border-l-4 border-gray-300 pl-3 text-gray-600 italic">
                            {children}
                          </blockquote>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-blue-600 underline hover:text-blue-800"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {value || '暂无内容'}
                    </ReactMarkdown>
                  </div>
                )
              : (
                  <textarea
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="h-full min-h-[120px] w-full resize-none border-0 p-3 text-sm leading-relaxed focus:outline-none"
                    style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
                  />
                )
          }
        </div>
      </div>

      {/* 帮助提示 */}
      {!isPreview && (
        <div className="text-xs text-gray-500">
          支持: **粗体** *斜体* `代码` [链接](url) - 列表
          {' '}
          {'>'}
          {' '}
          引用
        </div>
      )}
    </div>
  );
};
