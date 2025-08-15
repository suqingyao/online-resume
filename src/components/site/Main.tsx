import { ResumeEditor, ResumePreview } from '../biz';
import { ScrollArea } from '../ui';

interface Props {
  viewMode: 'edit' | 'preview' | 'split';
}
export function Main({ viewMode }: Props) {
  return (
    <main className="mx-auto max-w-7xl px-2 py-4 lg:px-8 sm:px-4 sm:py-6">
      <div className="sm:max-h-[calc(100vh-8rem] max-h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* 分屏模式 - 仅在中等屏幕及以上显示 */}
        {viewMode === 'split' && (
          <div className="hidden h-full gap-4 md:grid md:grid-cols-2 lg:gap-6">
            <div className="overflow-hidden">
              <ResumeEditor />
            </div>
            <div className="h-full rounded-lg bg-gray-100 p-4 lg:p-6">
              <div className="flex justify-center overflow-y-auto">
                <ResumePreview />
              </div>
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
          <div className="h-full overflow-y-auto rounded-lg bg-gray-100 p-2 lg:p-6 sm:p-4">
            <div className="flex justify-center">
              <ResumePreview />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
