import { useResumeStore } from '~/stores/useResumeStore';

export function LanguagePreview() {
  const { resumeData, config } = useResumeStore();
  const { languages } = resumeData;

  const getLanguageLevel = (level: string): string => {
    const levels = {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级',
      native: '母语',
    };
    return levels[level as keyof typeof levels] || level;
  };

  if (!languages.length) {
    return null;
  }

  return (
    <section className="mb-8">
      <h3
        className="mb-4 border-b-2 pb-2 text-xl font-semibold"
        style={{ borderColor: config.primaryColor, color: config.primaryColor }}
      >
        语言能力
      </h3>
      <div className="space-y-2">
        {languages.map(lang => (
          <div key={lang.id} className="flex justify-between">
            <span className="text-base font-medium">{lang.name}</span>
            <span className="text-sm text-gray-600">{getLanguageLevel(lang.level)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
