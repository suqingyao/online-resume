import { useResumeStore } from '~/stores/useResumeStore';
import { CertificatePreview } from './CertificatePreview';
import { EducationPreview } from './EducationPreview';
import { ExperiencePreview } from './ExpericencePreview';
import { LanguagePreview } from './LanguagePreview';
import { ProfilePreview } from './ProfilePreview';
import { ProjectsPreview } from './ProjectsPreview';
import { SkillsPreview } from './SkillsPreview';

/**
 * 简历预览组件
 * 负责渲染完整的简历内容
 */
export const ResumePreview: React.FC = () => {
  const { config } = useResumeStore();

  return (
    <div
      id="resume-preview"
      className="mx-auto max-w-4xl w-full bg-white shadow-lg"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: config.spacing === 'compact' ? '15mm' : config.spacing === 'relaxed' ? '25mm' : '20mm',
        fontSize: config.fontSize === 'small' ? '12px' : config.fontSize === 'large' ? '16px' : '14px',
        lineHeight: '1.5',
      }}
    >
      <ProfilePreview />

      <ExperiencePreview />

      <ProjectsPreview />

      <EducationPreview />

      <SkillsPreview />

      <LanguagePreview />

      <CertificatePreview />
    </div>
  );
};
