import * as PrimitiveSelect from '@radix-ui/react-select';
import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface PrimitiveSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

/**
 * 自定义Select组件，基于Radix UI构建
 * @param value - 当前选中的值
 * @param onValueChange - 值变化回调函数
 * @param options - 选项数组
 * @param placeholder - 占位符文本
 * @param className - 额外的CSS类名
 */
export const Select: React.FC<PrimitiveSelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = '请选择...',
  className = '',
}) => {
  return (
    <PrimitiveSelect.Root value={value} onValueChange={onValueChange}>
      <PrimitiveSelect.Trigger
        className={`h-9 w-full inline-flex items-center justify-between border border-gray-200 rounded-lg bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-all duration-200 disabled:cursor-not-allowed focus:border-blue-500 hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-500 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-gray-500 ${className}  `}
      >
        <PrimitiveSelect.Value placeholder={placeholder} />
        <PrimitiveSelect.Icon className="text-gray-400">
          <div className="i-heroicons-chevron-down h-4 w-4" />
        </PrimitiveSelect.Icon>
      </PrimitiveSelect.Trigger>

      <PrimitiveSelect.Portal>
        <PrimitiveSelect.Content
          className="animate-in fade-in-0 zoom-in-95 z-50 overflow-hidden border border-gray-200 rounded-lg bg-white shadow-lg"
          position="popper"
          sideOffset={4}
        >
          <PrimitiveSelect.ScrollUpButton className="h-6 flex cursor-default items-center justify-center bg-white text-gray-400">
            <div className="i-heroicons-chevron-up h-4 w-4" />
          </PrimitiveSelect.ScrollUpButton>

          <PrimitiveSelect.Viewport className="p-1">
            {options.map(option => (
              <PrimitiveSelect.Item
                key={option.value}
                value={option.value}
                className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-gray-900 outline-none data-[state=checked]:bg-blue-100 focus:bg-blue-50 hover:bg-blue-50 data-[state=checked]:text-blue-900 focus:text-blue-900 hover:text-blue-900"
              >
                <PrimitiveSelect.ItemText>{option.label}</PrimitiveSelect.ItemText>
              </PrimitiveSelect.Item>
            ))}
          </PrimitiveSelect.Viewport>

          <PrimitiveSelect.ScrollDownButton className="h-6 flex cursor-default items-center justify-center bg-white text-gray-400">
            <div className="i-heroicons-chevron-down h-4 w-4" />
          </PrimitiveSelect.ScrollDownButton>
        </PrimitiveSelect.Content>
      </PrimitiveSelect.Portal>
    </PrimitiveSelect.Root>
  );
};
