import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfeyvJdzvmdYw7lTJJqV57DFKAWVyIV9vlb3Q1K3Vs7T90vXQ/viewform?embedded=true';
const formOpenUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfeyvJdzvmdYw7lTJJqV57DFKAWVyIV9vlb3Q1K3Vs7T90vXQ/viewform';

export const Join = () => {
  const { t, language } = useLanguage();

  const helperText = language === 'en'
    ? 'Complete the application directly below.'
    : 'Completeaza formularul direct mai jos.';

  const openText = language === 'en' ? 'Open Form in New Tab' : 'Deschide Formularul in Tab Nou';

  return (
    <PageTransition>
      <section className="py-32 relative overflow-hidden">
        {/* Background Symbols */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex flex-wrap justify-around items-center text-6xl font-mono text-nexus-purple">
          <span>S</span><span>P</span><span>D</span><span>A</span><span>N</span><span>L</span><span>I</span><span>O</span><span>F</span>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl border border-nexus-purple/30 p-6 md:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-nexus-purple/10 blur-3xl rounded-full -mr-20 -mt-20"></div>

            <div className="text-center mb-8 md:mb-10">
              <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">{t('join.title')}</h1>
              <p className="text-nexus-white/65 leading-relaxed max-w-3xl mx-auto">{t('join.subtitle')}</p>
              <p className="text-nexus-purple font-mono text-xs uppercase tracking-[0.2em] mt-4">{helperText}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-nexus-bg/50 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <iframe
                src={formUrl}
                title="Nexus Join Form"
                className="w-full"
                style={{ height: '1758px', border: 0 }}
                loading="lazy"
              >
                Loading...
              </iframe>
            </div>

            <div className="mt-6 flex justify-center">
              <a
                href={formOpenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-nexus-purple/20 hover:border-nexus-purple/40 transition-all font-mono text-xs uppercase tracking-[0.14em]"
              >
                {openText}
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
