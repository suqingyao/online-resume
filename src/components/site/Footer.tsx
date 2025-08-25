export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white h-16">
      <div className="mx-auto max-w-7xl px-2 lg:px-8 sm:px-4 py-4 sm:py-6">
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
  );
}
