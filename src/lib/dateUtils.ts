import { format, isValid, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/**
 * 日期工具类，基于date-fns库封装
 * 统一处理字符串和Date类型的转换
 */
export class DateUtils {
  /**
   * 将字符串或Date转换为有效的Date对象
   * @param value - 输入值，可以是字符串、Date或undefined
   * @returns 有效的Date对象或undefined
   */
  static toDate(value: string | Date | undefined | null): Date | undefined {
    if (!value)
      return undefined;

    if (value instanceof Date) {
      return isValid(value) ? value : undefined;
    }

    if (typeof value === 'string') {
      // 处理空字符串
      if (value.trim() === '')
        return undefined;

      // 尝试解析ISO字符串
      const date = parseISO(value);
      if (isValid(date))
        return date;

      // 尝试直接创建Date对象
      const fallbackDate = new Date(value);
      return isValid(fallbackDate) ? fallbackDate : undefined;
    }

    return undefined;
  }

  /**
   * 将Date对象转换为ISO字符串
   * @param date - Date对象
   * @returns ISO字符串或空字符串
   */
  static toISOString(date: Date | undefined | null): string {
    if (!date || !isValid(date))
      return '';
    return date.toISOString();
  }

  /**
   * 格式化日期显示
   * @param date - 日期值
   * @param formatStr - 格式字符串，默认为'yyyy年MM月dd日'
   * @returns 格式化后的字符串
   */
  static formatDate(date: string | Date | undefined | null, formatStr: string = 'yyyy年MM月dd日'): string {
    const validDate = this.toDate(date);
    if (!validDate)
      return '';

    try {
      return format(validDate, formatStr, { locale: zhCN });
    }
    catch {
      return '';
    }
  }

  /**
   * 格式化日期为简短格式
   * @param date - 日期值
   * @returns 格式化后的字符串，如'2024-01'
   */
  static formatShort(date: string | Date | undefined | null): string {
    return this.formatDate(date, 'yyyy-MM');
  }

  /**
   * 格式化日期为完整格式
   * @param date - 日期值
   * @returns 格式化后的字符串，如'2024年1月15日'
   */
  static formatFull(date: string | Date | undefined | null): string {
    return this.formatDate(date, 'yyyy年M月d日');
  }

  /**
   * 检查日期是否有效
   * @param date - 日期值
   * @returns 是否为有效日期
   */
  static isValidDate(date: string | Date | undefined | null): boolean {
    return this.toDate(date) !== undefined;
  }

  /**
   * 获取当前日期的ISO字符串
   * @returns 当前日期的ISO字符串
   */
  static now(): string {
    return new Date().toISOString();
  }

  /**
   * 比较两个日期
   * @param date1 - 第一个日期
   * @param date2 - 第二个日期
   * @returns 比较结果：-1(date1<date2), 0(相等), 1(date1>date2), null(无法比较)
   */
  static compare(date1: string | Date | undefined | null, date2: string | Date | undefined | null): number | null {
    const d1 = this.toDate(date1);
    const d2 = this.toDate(date2);

    if (!d1 || !d2)
      return null;

    if (d1.getTime() < d2.getTime())
      return -1;
    if (d1.getTime() > d2.getTime())
      return 1;
    return 0;
  }
}

/**
 * 便捷的导出函数
 */
export const {
  toDate,
  toISOString,
  formatDate,
  formatShort,
  formatFull,
  isValidDate,
  now,
  compare,
} = DateUtils;
