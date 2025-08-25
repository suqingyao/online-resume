import type { Dispatch, SetStateAction } from 'react';

export function Header({
  viewMode,
  setViewMode,
}: {
  viewMode: 'edit' | 'preview' | 'split';
  setViewMode: Dispatch<SetStateAction<'split' | 'edit' | 'preview'>>;
}) {
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
        <div className="i-heroicons-pencil mr-1 h-3 w-3 sm:h-4 sm:w-4" />
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
        <div className="i-heroicons-eye mr-1 h-3 w-3 sm:h-4 sm:w-4" />
        <span className="hidden sm:inline">预览</span>
        <span className="sm:hidden">预览</span>
      </button>
    </div>
  );

  return (
    <header className=" bg-white shadow-sm sticky top-0 z-50 drop-shadow-xs">
      <div className="mx-auto max-w-7xl px-2 lg:px-8 sm:px-4">
        <div className="h-16 flex items-center justify-between">
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
  );
}
