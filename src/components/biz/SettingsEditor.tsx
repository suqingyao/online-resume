import { useResumeStore } from '~/stores/useResumeStore';
import { Button, Label, Select } from '../ui';

export function SettingsEditor() {
  const { resumeData, updateConfig, config } = useResumeStore();

  return (
    <div className="grid gap-4">
      <h3 className="text-base text-gray-900 font-medium">简历设置</h3>

      <div className="border border-gray-200 rounded-lg p-3">
        <div className="mb-3">
          <Label className="text-sm text-gray-700 font-medium">主题色</Label>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { color: '#3b82f6', name: '蓝色' },
            { color: '#10b981', name: '绿色' },
            { color: '#f59e0b', name: '橙色' },
            { color: '#ef4444', name: '红色' },
            { color: '#8b5cf6', name: '紫色' },
            { color: '#6b7280', name: '灰色' },
          ].map(item => (
            <Button
              key={item.color}
              onClick={() => updateConfig({ primaryColor: item.color })}
              variant="ghost"
              size="sm"
              className={`h-6 w-6 border-2 rounded-full p-0 ${
                config.primaryColor === item.color ? 'border-gray-800' : 'border-gray-300'
              }`}
              style={{ backgroundColor: item.color }}
              title={item.name}
            >
              <span className="sr-only">{item.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-3">
        <div className="space-y-4">
          <div>
            <Label className="mb-1 block text-sm text-gray-700 font-medium">字体大小</Label>
            <Select
              value={config.fontSize}
              onValueChange={value => updateConfig({ fontSize: value as any })}
              options={[
                { value: 'small', label: '小号' },
                { value: 'medium', label: '中号' },
                { value: 'large', label: '大号' },
              ]}
              placeholder="选择字体大小"
            />
          </div>

          <div>
            <Label className="mb-1 block text-sm text-gray-700 font-medium">间距</Label>
            <Select
              value={config.spacing}
              onValueChange={value => updateConfig({ spacing: value as any })}
              options={[
                { value: 'compact', label: '紧凑' },
                { value: 'normal', label: '正常' },
                { value: 'relaxed', label: '宽松' },
              ]}
              placeholder="选择间距"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
