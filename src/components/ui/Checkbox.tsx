import * as PrimitiveCheckbox from '@radix-ui/react-checkbox';
import React from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * 自定义Checkbox组件，基于Radix UI构建
 * @param checked - 是否选中
 * @param onCheckedChange - 选中状态变化回调函数
 * @param label - 标签文本
 * @param className - 额外的CSS类名
 * @param disabled - 是否禁用
 */
export const Checkbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onCheckedChange,
  label,
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <PrimitiveCheckbox.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="h-4 w-4 flex items-center justify-center border border-gray-300 rounded bg-white transition-all duration-200 disabled:cursor-not-allowed data-[state=checked]:border-blue-600 hover:border-gray-400 data-[state=checked]:bg-blue-600 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
      >
        <PrimitiveCheckbox.Indicator className="text-white">
          <div className="i-heroicons-check h-3 w-3" />
        </PrimitiveCheckbox.Indicator>
      </PrimitiveCheckbox.Root>
      {label && (
        <label className="cursor-pointer select-none text-sm text-gray-600">
          {label}
        </label>
      )}
    </div>
  );
};
