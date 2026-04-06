import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Events = () => {
  const { t, language } = useLanguage();

  const emptyState = language === 'en'
    ? {
        title: 'There are no upcoming events',
        desc: 'We are currently preparing the next workshops and activities. Check back soon for updates.'
      }
    : {
        title: 'Nu exista evenimente viitoare',
        desc: 'Pregatim urmatoarele workshop-uri si activitati. Revino curand pentru noutati.'
      };

  return (
    <PageTransition>
      <section className="py-32 bg-nexus-bg/50 relative overflow-hidden">
        <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] bg-nexus-purple/15 rounded-full blur-[110px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-16 w-[360px] h-[360px] bg-nexus-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase">{t('events.title')}</h1>
              <p className="text-nexus-purple font-mono uppercase tracking-widest">{t('events.subtitle')}</p>
            </div>
            <div className="w-24 h-1 bg-nexus-purple"></div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass rounded-3xl p-10 md:p-14 border border-nexus-purple/25 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-nexus-purple to-transparent opacity-60"></div>
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-nexus-purple/10 border border-nexus-purple/35 text-nexus-purple flex items-center justify-center shadow-[0_0_24px_rgba(176,102,255,0.25)]">
                <Calendar className="w-10 h-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-orbitron font-black tracking-tight mb-4">
                {emptyState.title}
              </h2>
              <p className="text-nexus-white/65 max-w-xl mx-auto leading-relaxed">
                {emptyState.desc}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-nexus-white/70 font-mono text-[11px] uppercase tracking-[0.18em]">
                <Clock size={14} />
                {language === 'en' ? 'Schedule in progress' : 'Program in pregatire'}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
