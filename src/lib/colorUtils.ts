/**
 * 颜色转换工具函数
 * 将 oklch 颜色值转换为 RGB 格式
 */

/**
 * 将 OKLCH 颜色值转换为 RGB (更准确的实现)
 * @param oklchString - OKLCH 颜色字符串，例如 "oklch(0.623 0.214 259.815)"
 * @returns RGB 颜色字符串，例如 "rgb(59, 130, 246)"
 */
export function oklchToRgb(oklchString: string): string {
  // 提取 L, C, H 值
  const match = oklchString.match(/oklch\(([^)]+)\)/);
  if (!match) {
    return oklchString; // 如果不是有效的 oklch 格式，直接返回原值
  }

  const values = match[1].trim().split(/\s+/);
  let L = parseFloat(values[0]);
  let C = parseFloat(values[1]);
  let H = parseFloat(values[2]);
  
  // 处理可能的 alpha 值
  let alpha = 1;
  if (values[3]) {
    const alphaStr = values[3].replace(/[%/]/g, '');
    if (alphaStr.includes('%')) {
      alpha = parseFloat(alphaStr) / 100;
    } else {
      alpha = parseFloat(alphaStr);
    }
  }

  // 将 H 从角度转换为弧度
  H = H * Math.PI / 180;

  // 转换 OKLCH 到 OKLAB
  const a = C * Math.cos(H);
  const b = C * Math.sin(H);

  // 转换 OKLAB 到 XYZ (使用标准 illuminant D65)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = Math.pow(l_, 3);
  const m = Math.pow(m_, 3);
  const s = Math.pow(s_, 3);

  // 转换 XYZ 到 Linear RGB (使用 sRGB 的 XYZ 到 RGB 矩阵)
  let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let b2 = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  // 应用 gamma 校正转换到 sRGB
  const gamma = (c: number): number => {
    return c <= 0.0031308 
      ? 12.92 * c 
      : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };

  r = gamma(r);
  g = gamma(g);
  b2 = gamma(b2);

  // 转换为 0-255 范围并限制在有效范围内
  const red = Math.round(Math.max(0, Math.min(255, r * 255)));
  const green = Math.round(Math.max(0, Math.min(255, g * 255)));
  const blue = Math.round(Math.max(0, Math.min(255, b * 255)));
  
  // 如果有 alpha 值，返回 rgba 格式
  if (alpha < 1) {
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  }
  
  return `rgb(${red}, ${green}, ${blue})`;
}

/**
 * 将 CSS 字符串中的所有 oklch 颜色值转换为 RGB
 * @param cssString - 包含 oklch 颜色值的 CSS 字符串
 * @returns 转换后的 CSS 字符串
 */
export function convertOklchToRgbInCss(cssString: string): string {
  // 使用正则表达式匹配所有 oklch 颜色值
  return cssString.replace(/oklch\([^)]+\)/g, (match) => {
    return quickOklchToRgb(match);
  });
}

/**
 * 创建一个不包含 oklch 颜色值的 CSS 样式表用于 PDF 导出
 * @param originalCss - 原始 CSS 内容
 * @returns 转换后的 CSS 内容
 */
export function createPdfCompatibleCss(originalCss: string): string {
  return convertOklchToRgbInCss(originalCss);
}

// 预定义的颜色映射表（用于常用的 oklch 颜色值）
const OKLCH_COLOR_MAP: Record<string, string> = {
  'oklch(1 0 0)': 'rgb(255, 255, 255)',
  'oklch(0.141 0.005 285.823)': 'rgb(17, 24, 39)',
  'oklch(0.985 0 0)': 'rgb(249, 250, 251)',
  'oklch(0.623 0.214 259.815)': 'rgb(59, 130, 246)',
  'oklch(0.97 0.014 254.604)': 'rgb(255, 255, 255)',
  'oklch(0.967 0.001 286.375)': 'rgb(241, 245, 249)',
  'oklch(0.21 0.006 285.885)': 'rgb(30, 41, 59)',
  'oklch(0.552 0.016 285.938)': 'rgb(100, 116, 139)',
  'oklch(0.577 0.245 27.325)': 'rgb(220, 38, 38)',
  'oklch(0.92 0.004 286.32)': 'rgb(226, 232, 240)',
  'oklch(0.646 0.222 41.116)': 'rgb(249, 115, 22)',
  'oklch(0.6 0.118 184.704)': 'rgb(16, 185, 129)',
  'oklch(0.398 0.07 227.392)': 'rgb(96, 165, 250)',
  'oklch(0.828 0.189 84.429)': 'rgb(234, 179, 8)',
  'oklch(0.769 0.188 70.08)': 'rgb(245, 158, 11)',
  'oklch(0.546 0.245 262.881)': 'rgb(37, 99, 235)',
  'oklch(0.379 0.146 265.522)': 'rgb(191, 219, 254)',
  'oklch(0.274 0.006 286.033)': 'rgb(51, 65, 85)',
  'oklch(0.705 0.015 286.067)': 'rgb(148, 163, 184)',
  'oklch(0.704 0.191 22.216)': 'rgb(248, 113, 113)',
  'oklch(0.488 0.243 264.376)': 'rgb(96, 165, 250)',
  'oklch(0.696 0.17 162.48)': 'rgb(52, 211, 153)',
  'oklch(0.627 0.265 303.9)': 'rgb(192, 132, 252)',
  'oklch(0.645 0.246 16.439)': 'rgb(249, 115, 22)',
  'oklch(1 0 0 / 10%)': 'rgba(255, 255, 255, 0.1)',
  'oklch(1 0 0 / 15%)': 'rgba(255, 255, 255, 0.15)',
};

/**
 * 快速转换常用的 oklch 颜色值（使用预定义映射表）
 * @param oklchString - OKLCH 颜色字符串
 * @returns 对应的 RGB 颜色字符串
 */
export function quickOklchToRgb(oklchString: string): string {
  // 清理字符串，移除多余的空格
  const cleanString = oklchString.replace(/\s+/g, ' ').trim();
  
  // 检查是否在预定义映射表中
  if (OKLCH_COLOR_MAP[cleanString]) {
    return OKLCH_COLOR_MAP[cleanString];
  }
  
  // 如果不在映射表中，使用计算转换
  return oklchToRgb(oklchString);
}

// 导出颜色映射表用于测试
export { OKLCH_COLOR_MAP };