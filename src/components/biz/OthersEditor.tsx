import { DateUtils } from '~/lib/dateUtils';
import { useResumeStore } from '~/stores/useResumeStore';
import { Button, DatePicker, Select } from '../ui';

export function OthersEditor() {
  const { resumeData, updateLanguages, updateCertificates } = useResumeStore();

  /**
   * 添加新的语言
   */
  const addLanguage = () => {
    const newLanguage = {
      id: Date.now().toString(),
      name: '',
      level: 'intermediate' as const,
    };
    updateLanguages([...resumeData.languages, newLanguage]);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-base text-gray-900 font-medium sm:text-lg">其他信息</h3>

      {/* 语言能力 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-gray-800 font-medium sm:text-base">语言能力</h4>
          <Button
            onClick={() => {
              const newLanguage = {
                id: Date.now().toString(),
                name: '',
                level: 'intermediate' as const,
              };
              updateLanguages([...resumeData.languages, newLanguage]);
            }}
            variant="secondary"
            size="sm"
            className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
          >
            <div className="i-heroicons-plus h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">添加语言</span>
          </Button>
        </div>

        {resumeData.languages.map(language => (
          <div key={language.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="text-sm text-gray-900 font-medium">语言</h5>
              <Button
                onClick={() => {
                  updateLanguages(resumeData.languages.filter(lang => lang.id !== language.id));
                }}
                variant="destructive"
                size="sm"
                title="删除语言"
              >
                <div className="i-heroicons-trash h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  语言名称
                </label>
                <input
                  type="text"
                  className="input"
                  value={language.name}
                  onChange={(e) => {
                    const updated = resumeData.languages.map(item =>
                      item.id === language.id ? { ...item, name: e.target.value } : item,
                    );
                    updateLanguages(updated);
                  }}
                  placeholder="如：英语、日语等"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  熟练程度
                </label>
                <Select
                  value={language.level}
                  onValueChange={(value) => {
                    const updated = resumeData.languages.map(item =>
                      item.id === language.id ? { ...item, level: value as 'beginner' | 'intermediate' | 'advanced' | 'native' } : item,
                    );
                    updateLanguages(updated);
                  }}
                  options={[
                    { value: 'beginner', label: '初级' },
                    { value: 'intermediate', label: '中级' },
                    { value: 'advanced', label: '高级' },
                    { value: 'native', label: '母语' },
                  ]}
                  placeholder="选择熟练程度"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 证书认证 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm text-gray-800 font-medium sm:text-base">证书认证</h4>
          <Button
            onClick={() => {
              const newCertificate = {
                id: Date.now().toString(),
                name: '',
                issuer: '',
                date: '',
                url: '',
              };
              updateCertificates([...resumeData.certificates, newCertificate]);
            }}
            variant="secondary"
            size="sm"
            className="px-2 py-1.5 text-xs sm:px-3 sm:py-2 sm:text-sm"
          >
            <div className="i-heroicons-plus h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">添加证书</span>
          </Button>
        </div>

        {resumeData.certificates.map(certificate => (
          <div key={certificate.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <div className="mb-3 flex items-center justify-between">
              <h5 className="text-sm text-gray-900 font-medium">证书</h5>
              <Button
                onClick={() => {
                  updateCertificates(resumeData.certificates.filter(cert => cert.id !== certificate.id));
                }}
                variant="destructive"
                size="sm"
                title="删除证书"
              >
                <div className="i-heroicons-trash h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  证书名称
                </label>
                <input
                  type="text"
                  className="input"
                  value={certificate.name}
                  onChange={(e) => {
                    const updated = resumeData.certificates.map(item =>
                      item.id === certificate.id ? { ...item, name: e.target.value } : item,
                    );
                    updateCertificates(updated);
                  }}
                  placeholder="如：AWS云从业者认证"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  颁发机构
                </label>
                <input
                  type="text"
                  className="input"
                  value={certificate.issuer}
                  onChange={(e) => {
                    const updated = resumeData.certificates.map(item =>
                      item.id === certificate.id ? { ...item, issuer: e.target.value } : item,
                    );
                    updateCertificates(updated);
                  }}
                  placeholder="如：Amazon Web Services"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  获得时间
                </label>
                <DatePicker
                  value={DateUtils.toDate(certificate.date)}
                  onChange={(value) => {
                    const updated = resumeData.certificates.map(item =>
                      item.id === certificate.id ? { ...item, date: value } : item,
                    );
                    updateCertificates(updated);
                  }}
                  placeholder="选择获得时间"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-700 font-medium">
                  证书链接（可选）
                </label>
                <input
                  type="url"
                  className="input"
                  value={certificate.url}
                  onChange={(e) => {
                    const updated = resumeData.certificates.map(item =>
                      item.id === certificate.id ? { ...item, url: e.target.value } : item,
                    );
                    updateCertificates(updated);
                  }}
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
