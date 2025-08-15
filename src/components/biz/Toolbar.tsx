import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui';
import { exportToImage, exportToPDF, printResume } from '~/lib/pdfExport';
import { useResumeStore } from '~/stores/useResumeStore';

export function Toolbar() {
  const { resumeData } = useResumeStore();

  const [isExporting, setIsExporting] = useState(false);

  /**
   * 处理PDF导出
   */
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('resume-preview');
      if (element) {
        await exportToPDF(element, {
          filename: `${resumeData.profile.name}-简历.pdf`,
        });
        toast.success('PDF导出成功！');
      }
    }
    catch (error) {
      toast.error('导出失败，请重试');
    }
    finally {
      setIsExporting(false);
    }
  };

  /**
   * 处理图片导出
   */
  const handleExportImage = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('resume-preview');
      if (element) {
        await exportToImage(element, `${resumeData.profile.name}-简历.png`);
        toast.success('图片导出成功！');
      }
    }
    catch (error) {
      toast.error('导出失败，请重试');
    }
    finally {
      setIsExporting(false);
    }
  };

  /**
   * 处理打印
   */
  const handlePrint = () => {
    const element = document.getElementById('resume-preview');
    if (element) {
      printResume(element);
    }
  };

  return (
    <div className="border-b border-gray-200 p-2 sm:p-4">
      <div className="flex items-center justify-between">
        <div className="ml-auto flex gap-1 sm:gap-2">
          <Button
            onClick={handlePrint}
            variant="secondary"
            size="sm"
            disabled={isExporting}
            className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
          >
            <div className="i-mingcute-print-line h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">打印</span>
          </Button>
          <Button
            onClick={handleExportImage}
            variant="secondary"
            size="sm"
            disabled={isExporting}
            className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
          >
            <div className="i-mingcute-arrow-down-line h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
            <span className="hidden md:inline">导出图片</span>
            <span className="sm:inline md:hidden">图片</span>
          </Button>
          <Button
            onClick={handleExportPDF}
            variant="default"
            size="sm"
            disabled={isExporting}
            className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
          >
            <div className="i-mingcute-arrow-down-line h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{isExporting ? '导出中...' : '导出PDF'}</span>
            <span className="sm:hidden">PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
