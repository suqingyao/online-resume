import { cn } from '@suqingyao/utils';
import { ChevronDownIcon } from 'lucide-react';

import * as React from 'react';
import { Button } from '~/components/ui/Button';
import { Calendar } from '~/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/Popover';
import { DateUtils } from '~/lib/dateUtils';

interface DatePickerProps {
  className?: string;
  value?: Date | string;
  onChange?: (date: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 日期选择器组件
 * @param className - 自定义样式类
 * @param value - 当前日期值，支持Date对象或ISO字符串
 * @param onChange - 日期变化回调，返回ISO字符串
 * @param placeholder - 占位符文本
 * @param disabled - 是否禁用
 */
export function DatePicker({
  className,
  value,
  onChange,
  placeholder = '选择日期',
  disabled,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(DateUtils.toDate(value));
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setDate(DateUtils.toDate(value));
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          disabled={disabled}
          className={cn(
            'w-48 justify-between font-normal',
            disabled && 'cursor-not-allowed opacity-50',
            className,
          )}
        >
          {date ? date.toLocaleDateString() : placeholder}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            setDate(date);
            setOpen(false);
            onChange?.(DateUtils.toISOString(date));
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
