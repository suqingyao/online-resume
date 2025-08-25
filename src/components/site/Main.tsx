import { ResumeEditor, ResumePreview } from '../biz';

interface Props {
  viewMode: 'edit' | 'preview' | 'split';
}
export function Main({ viewMode }: Props) {
  return (
    <main className="mx-auto w-full px-4 py-6 bg-gray-100">
      {/* 分屏模式 - 仅在中等屏幕及以上显示 */}
      {viewMode === 'split' && (
        <div className="h-full gap-4 flex items-center justify-center">
          <div className="h-full">
            <ResumeEditor />
          </div>
          <div className="h-full">
            <ResumePreview />
          </div>
        </div>
      )}

      {/* 编辑模式 */}
      {viewMode === 'edit' && (
        <div className="h-full">
          <ResumeEditor />
        </div>
      )}
      {/* 预览模式 */}
      {viewMode === 'preview' && (
        <div className="h-full">
          <ResumePreview />
        </div>
      )}
    </main>
  );
}
