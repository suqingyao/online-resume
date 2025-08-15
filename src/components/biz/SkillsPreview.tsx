import { useResumeStore } from '~/stores/useResumeStore';

export function SkillsPreview() {
  const { resumeData, config } = useResumeStore();
  const { skills } = resumeData;

  if (skills.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h3
        className="mb-4 border-b-2 pb-2 text-xl font-semibold"
        style={{ borderColor: config.primaryColor, color: config.primaryColor }}
      >
        专业技能
      </h3>
      {skills.map(skill => (
        <div
          key={skill.id}
          className="mb-4"
        >
          <h4 className="mb-2 text-base text-gray-800 font-medium">
            {skill.category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {skill.items.map(item => (
              <span
                key={item}
                className="rounded px-2 py-1 text-sm"
                style={{ backgroundColor: `${config.primaryColor}15`, color: config.primaryColor }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
