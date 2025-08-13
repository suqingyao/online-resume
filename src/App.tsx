import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { ResumeEditor, ResumePreview } from '~/components/biz';

/**
 * 主应用组件
 * 提供简历编辑和预览的完整界面
 */
function App() {
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');

  /**
   * 监听窗口大小变化，在移动端自动切换到编辑模式
   */
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768; // md断点
      if (isMobile && viewMode === 'split') {
        setViewMode('edit');
      }
    };

    // 初始检查
    handleResize();

    // 添加事件监听
    window.addEventListener('resize', handleResize);

    // 清理事件监听
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [viewMode]);

  /**
   * 渲染视图模式切换按钮
   */
  const renderViewModeButtons = () => (
    <div className="flex rounded-lg bg-gray-100 p-1">
      <button
        type="button"
        onClick={() => setViewMode('edit')}
        className={`flex items-center rounded-md px-2 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:py-2 sm:text-sm ${
          viewMode === 'edit'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <div className="i-mingcute-pencil-line mr-1 h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">编辑</span>
        <span className="sm:hidden">编辑</span>
      </button>
      {/* 分屏模式在小屏幕上隐藏 */}
      <button
        type="button"
        onClick={() => setViewMode('split')}
        className={`hidden items-center rounded-md px-2 py-1.5 text-xs font-medium transition-colors md:flex sm:px-3 sm:py-2 sm:text-sm ${
          viewMode === 'split'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <div className="i-mingcute-computer-line mr-1 h-3 w-3 sm:h-4 sm:w-4" />
        分屏
      </button>
      <button
        type="button"
        onClick={() => setViewMode('preview')}
        className={`flex items-center rounded-md px-2 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:py-2 sm:text-sm ${
          viewMode === 'preview'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <div className="i-mingcute-eye-line mr-1 h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">预览</span>
        <span className="sm:hidden">预览</span>
      </button>
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* 头部导航 */}
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-2 lg:px-8 sm:px-4">
            <div className="h-14 flex items-center justify-between sm:h-16">
              <div className="min-w-0 flex flex-1 items-center">
                <h1 className="truncate text-lg text-gray-900 font-bold md:text-2xl sm:text-xl">
                  <span className="hidden sm:inline">Online Resume Editor</span>
                  <span className="sm:hidden">Online Resume Editor</span>
                </h1>
              </div>

              {/* 视图模式切换 */}
              <div className="ml-2 flex items-center">
                {renderViewModeButtons()}
              </div>
            </div>
          </div>
        </header>

        {/* 主内容区域 */}
        <main className="mx-auto max-w-7xl px-2 py-4 lg:px-8 sm:px-4 sm:py-6">
          <div className="h-[calc(100vh-100px)] sm:h-[calc(100vh-120px)]">
            {/* 分屏模式 - 仅在中等屏幕及以上显示 */}
            {viewMode === 'split' && (
              <div className="hidden h-full gap-4 md:grid md:grid-cols-2 lg:gap-6">
                <div className="overflow-hidden">
                  <ResumeEditor />
                </div>
                <div className="overflow-y-auto rounded-lg bg-gray-100 p-4 lg:p-6">
                  <div className="flex justify-center">
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

        {/* 页脚 */}
        <footer className="mt-auto border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-2 py-3 lg:px-8 sm:px-4 sm:py-4">
            <div className="flex flex-col text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between space-y-2 sm:text-sm sm:space-y-0">
              <div>
                <p className="text-center sm:text-left">© 2024 在线简历编辑器. 支持实时编辑、预览和PDF导出.</p>
              </div>
              <div className="flex items-center justify-center sm:justify-end">
                <span className="hidden md:inline">技术栈: React 19 + TypeScript + UnoCSS + Zustand</span>
                <span className="md:hidden">React + TypeScript + UnoCSS</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
