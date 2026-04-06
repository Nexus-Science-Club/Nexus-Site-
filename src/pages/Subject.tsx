import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, Download, Microscope, FlaskConical, Scissors, Atom } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type PresentationItem = {
  id: string;
  title: string;
  href: string;
};

const pdfModules = import.meta.glob('../../presentations/**/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>;

const formatPdfTitle = (fileName: string) => {
  const noExtension = fileName.replace(/\.pdf$/i, '');
  return noExtension.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
};

const presentationsBySubject = Object.entries(pdfModules).reduce<Record<string, PresentationItem[]>>(
  (acc, [filePath, href]) => {
    const normalizedPath = filePath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');
    const subject = parts[parts.length - 2];
    const fileName = parts[parts.length - 1];

    if (!subject || !fileName) return acc;
    if (!acc[subject]) acc[subject] = [];

    acc[subject].push({
      id: normalizedPath,
      title: formatPdfTitle(fileName),
      href
    });

    return acc;
  },
  {}
);

Object.values(presentationsBySubject).forEach((items) => {
  items.sort((a, b) => a.title.localeCompare(b.title, 'ro', { sensitivity: 'base' }));
});

export const Subject = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const { t, language } = useLanguage();

  const subjectData: Record<string, any> = {
    microscopy: {
      title: t('subject.microscopy.title'),
      icon: <Microscope className="w-12 h-12" />,
      desc: t('subject.microscopy.desc'),
      presentations: presentationsBySubject.microscopy || []
    },
    chemistry: {
      title: t('subject.chemistry.title'),
      icon: <FlaskConical className="w-12 h-12" />,
      desc: t('subject.chemistry.desc'),
      presentations: presentationsBySubject.chemistry || []
    },
    dissections: {
      title: t('subject.dissections.title'),
      icon: <Scissors className="w-12 h-12" />,
      desc: t('subject.dissections.desc'),
      presentations: presentationsBySubject.dissections || []
    },
    physics: {
      title: t('subject.physics.title'),
      icon: <Atom className="w-12 h-12" />,
      desc: t('subject.physics.desc'),
      presentations: presentationsBySubject.physics || []
    }
  };

  const data = subjectData[subjectId || ''] || subjectData.physics;

  return (
    <PageTransition>
      <section className="py-32 relative min-h-screen">
        {/* Background Elements */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-nexus-purple/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-nexus-blue/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <Link to="/fields" className="inline-flex items-center gap-2 text-nexus-white/60 hover:text-nexus-purple transition-colors mb-12 font-mono text-sm uppercase tracking-widest">
            <ArrowLeft size={16} /> {t('subject.back')}
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-16">
            <div className="w-24 h-24 bg-nexus-purple/10 border border-nexus-purple/30 rounded-3xl flex items-center justify-center text-nexus-purple shadow-[0_0_30px_rgba(176,102,255,0.2)]">
              {data.icon}
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter font-orbitron">{data.title}</h1>
              <p className="text-xl text-nexus-white/70 font-lora max-w-2xl leading-relaxed">{data.desc}</p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-8 font-orbitron flex items-center gap-3">
              <FileText className="text-nexus-purple" />
              {t('subject.presentations')}
            </h2>
            {data.presentations.length > 0 ? (
              <div className="grid gap-4">
                {data.presentations.map((pres: PresentationItem, i: number) => (
                  <motion.div
                    key={pres.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-nexus-purple/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-nexus-purple/10 rounded-xl flex items-center justify-center text-nexus-purple group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-orbitron mb-1 group-hover:text-nexus-purple transition-colors">{pres.title}</h3>
                        <p className="text-sm font-mono text-nexus-white/50 uppercase tracking-wider">PDF</p>
                      </div>
                    </div>
                    <a
                      href={pres.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-white/5 hover:bg-nexus-purple/20 border border-white/10 hover:border-nexus-purple/50 rounded-xl font-mono text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 text-nexus-white"
                    >
                      <Download size={16} /> {t('subject.download')}
                    </a>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 border border-white/10 text-center">
                <p className="text-nexus-white/70 font-lora text-lg">
                  {language === 'en'
                    ? 'No presentations uploaded for this subject yet.'
                    : 'Nu sunt inca prezentari incarcate pentru aceasta materie.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
