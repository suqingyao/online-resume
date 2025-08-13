import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * PDF导出配置接口
 */
interface ExportOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

/**
 * 将HTML元素导出为PDF
 * @param element - 要导出的HTML元素
 * @param options - 导出选项
 */
export async function exportToPDF(element: HTMLElement, options: ExportOptions = {}): Promise<void> {
  const {
    filename = 'resume.pdf',
    quality = 1,
    format = 'a4',
    orientation = 'portrait',
  } = options;

  try {
    // 显示加载状态
    const loadingElement = document.createElement('div');
    loadingElement.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        color: white;
        font-size: 18px;
      ">
        正在生成PDF...
      </div>
    `;
    document.body.appendChild(loadingElement);

    // 获取元素的实际尺寸
    const rect = element.getBoundingClientRect();
    const canvas = await html2canvas(element, {
      scale: quality * 2, // 提高分辨率
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: rect.width,
      height: rect.height,
      scrollX: 0,
      scrollY: 0,
    });

    // 计算PDF尺寸
    const imgWidth = format === 'a4' ? 210 : 216; // A4: 210mm, Letter: 216mm
    const imgHeight = format === 'a4' ? 297 : 279; // A4: 297mm, Letter: 279mm

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // 计算缩放比例
    const ratio = Math.min(
      (imgWidth - 20) / (canvasWidth * 0.264583), // 0.264583 = mm per pixel at 96dpi
      (imgHeight - 20) / (canvasHeight * 0.264583),
    );

    const scaledWidth = canvasWidth * 0.264583 * ratio;
    const scaledHeight = canvasHeight * 0.264583 * ratio;

    // 创建PDF
    // eslint-disable-next-line new-cap
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: format === 'a4' ? 'a4' : 'letter',
    });

    // 计算居中位置
    const x = (imgWidth - scaledWidth) / 2;
    const y = (imgHeight - scaledHeight) / 2;

    // 添加图片到PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);

    // 保存PDF
    pdf.save(filename);

    // 移除加载状态
    document.body.removeChild(loadingElement);
  }
  catch (error) {
    console.error('PDF导出失败:', error);
    // 移除加载状态
    const loadingElement = document.querySelector('[style*="position: fixed"]');
    if (loadingElement) {
      document.body.removeChild(loadingElement);
    }
    throw new Error('PDF导出失败，请重试');
  }
}

/**
 * 导出为图片
 * @param element - 要导出的HTML元素
 * @param filename - 文件名
 * @param format - 图片格式
 */
export async function exportToImage(element: HTMLElement, filename: string = 'resume.png', format: 'png' | 'jpeg' = 'png'): Promise<void> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    // 创建下载链接
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL(`image/${format}`);

    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  catch (error) {
    console.error('图片导出失败:', error);
    throw new Error('图片导出失败，请重试');
  }
}

/**
 * 打印简历
 * @param element - 要打印的HTML元素
 */
export function printResume(element: HTMLElement): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    throw new Error('无法打开打印窗口，请检查浏览器设置');
  }

  const styles = Array.from(document.styleSheets)
    .map((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules)
          .map(rule => rule.cssText)
          .join('');
      }
      catch {
        return '';
      }
    })
    .join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>简历打印</title>
        <style>
          ${styles}
          @media print {
            body { margin: 0; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  // 等待内容加载完成后打印
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}
