import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { HeartHandshake } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const sponsors = [
  { name: 'APCNNG', logo: '/sponsors/apcnng.png' },
  { name: 'Raibak S.R.L.', logo: '/sponsors/raibak-logo.png' },
  { name: 'Fondul Stiintescu', logo: '/sponsors/stiintescu-logo.png' },
];

export const Sponsors = () => {
  const { t, language } = useLanguage();
  const subtitle = language === 'en'
    ? 'Official partners supporting Nexus Club'
    : 'Partenerii oficiali care sustin Nexus Club';

  return (
    <PageTransition>
      <section className="py-32 relative min-h-screen">
        {/* Background Elements */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nexus-purple/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-nexus-blue/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-pill mb-8 border-nexus-purple/30"
            >
              <HeartHandshake className="w-4 h-4 text-nexus-purple" />
              <span className="font-mono text-[10px] text-nexus-white/90 uppercase tracking-[0.2em] font-bold">{t('sponsors.tag')}</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter font-orbitron">
              {t('sponsors.title')} <span className="text-gradient">{t('sponsors.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-nexus-white/70 font-lora leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-3xl group hover:border-nexus-purple/40 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
              >
                <div className="w-full h-40 mb-6 rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-nexus-purple/30 transition-colors p-4">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-2xl font-bold font-orbitron">{sponsor.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
