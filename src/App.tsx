import { useEffect, useState } from 'react';
import { Footer } from './components/site/Footer';
import { Toaster } from 'sonner';
import { Main } from './components/site/Main';
import { Header } from './components/site/Header';

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

  return (
    <>
      <div className="h-screen bg-gray-50 flex flex-col w-full">
        <Header viewMode={viewMode} setViewMode={setViewMode} />
        <Main viewMode={viewMode} />
        <Footer />
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
