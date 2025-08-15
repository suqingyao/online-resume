import { Label } from '~/components/ui';

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
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label className="block text-sm text-gray-700 font-medium">
          {label}
        </Label>
      )}

      <div className="overflow-hidden border border-gray-300 rounded-md">
        {/* 工具栏 */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-2">
          <div className="text-xs text-gray-500">
            支持 Markdown 格式
          </div>
        </div>

        {/* 内容区域 */}
        <div className="min-h-[120px]">
          <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="h-full min-h-[120px] w-full resize-none border-0 p-3 text-sm leading-relaxed focus:outline-none"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
          />
        </div>
      </div>

      {/* 帮助提示 */}
      <div className="text-xs text-gray-500">
        支持: **粗体** *斜体* `代码` [链接](url) - 列表
        {' '}
        {'>'}
        {' '}
        引用
      </div>
    </div>
  );
};
