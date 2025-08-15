import { useResumeStore } from '~/stores/useResumeStore';

export function CertificatePreview() {
  const { resumeData, config } = useResumeStore();
  const { certificates } = resumeData;

  const formatDate = (date: string) => {
    if (!date)
      return '';
    const [year, month] = date.split('-');
    return `${year}.${month}`;
  };

  if (certificates.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h3
        className="mb-4 border-b-2 pb-2 text-xl font-semibold"
        style={{ borderColor: config.primaryColor, color: config.primaryColor }}
      >
        证书认证
      </h3>
      <div className="space-y-3">
        {certificates.map(cert => (
          <div key={cert.id}>
            <h4 className="text-base font-medium">{cert.name}</h4>
            <p className="text-sm text-gray-600">{cert.issuer}</p>
            <p className="text-sm text-gray-500">{formatDate(cert.date)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
