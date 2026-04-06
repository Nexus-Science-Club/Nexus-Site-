import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Donate = () => {
  const { t } = useLanguage();

  const tiers = [
    {
      name: 'Supporter',
      amount: '€50',
      desc: t('donate.tiers.supporter.desc'),
      perks: [t('donate.tiers.supporter.perk1'), t('donate.tiers.supporter.perk2'), t('donate.tiers.supporter.perk3')]
    },
    {
      name: 'Innovator',
      amount: '€200',
      desc: t('donate.tiers.innovator.desc'),
      perks: [t('donate.tiers.innovator.perk1'), t('donate.tiers.innovator.perk2'), t('donate.tiers.innovator.perk3')]
    },
    {
      name: 'Visionary',
      amount: '€500+',
      desc: t('donate.tiers.visionary.desc'),
      perks: [t('donate.tiers.visionary.perk1'), t('donate.tiers.visionary.perk2'), t('donate.tiers.visionary.perk3'), t('donate.tiers.visionary.perk4')]
    }
  ];

  return (
    <PageTransition>
      <section className="py-32 relative min-h-screen">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-nexus-purple/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-nexus-blue/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-pill mb-8 border-nexus-purple/30"
            >
              <Heart className="w-4 h-4 text-nexus-purple" />
              <span className="font-mono text-[10px] text-nexus-white/90 uppercase tracking-[0.2em] font-bold">{t('donate.tag')}</span>
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter font-orbitron">
              {t('donate.title')}<span className="text-gradient">{t('donate.titleHighlight')}</span>
            </h1>
            <p className="text-xl text-nexus-white/70 font-lora leading-relaxed">
              {t('donate.desc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`glass p-8 rounded-3xl relative overflow-hidden flex flex-col ${i === 1 ? 'border-nexus-purple/50 shadow-[0_0_30px_rgba(176,102,255,0.2)]' : 'hover:border-nexus-purple/30'}`}
              >
                {i === 1 && (
                  <div className="absolute top-0 left-0 w-full py-1 bg-gradient-to-r from-nexus-purple to-nexus-blue text-center font-mono text-[10px] uppercase tracking-widest font-bold">
                    {t('donate.popular')}
                  </div>
                )}
                <div className={`mt-4 mb-6 ${i === 1 ? 'text-nexus-purple' : 'text-nexus-white'}`}>
                  <h3 className="text-2xl font-bold font-orbitron mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black font-orbitron">{tier.amount}</span>
                    <span className="text-sm font-mono opacity-60">{t('donate.perMonth')}</span>
                  </div>
                </div>
                <p className="text-nexus-white/70 font-lora mb-8 flex-grow">{tier.desc}</p>
                <ul className="space-y-4 mb-8">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm font-lora text-nexus-white/80">
                      <CheckCircle2 className="w-5 h-5 text-nexus-purple shrink-0" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-xl font-orbitron font-bold text-sm tracking-widest transition-all duration-300 ${i === 1 ? 'bg-nexus-purple text-white hover:bg-nexus-purple/80 shadow-[0_0_20px_rgba(176,102,255,0.4)]' : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-nexus-purple/30 text-nexus-white'}`}>
                  {t('donate.donateNow')}
                </button>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-10 md:p-16 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-nexus-purple/10 to-transparent pointer-events-none"></div>
            <Sparkles className="w-12 h-12 text-nexus-purple mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold font-orbitron mb-6">{t('donate.corporate')}</h2>
            <p className="text-lg text-nexus-white/70 font-lora mb-8 max-w-2xl mx-auto">
              {t('donate.corporateDesc')}
            </p>
            <a href="mailto:contact@nexusclub.ro" className="inline-flex items-center gap-3 px-8 py-4 bg-nexus-white text-nexus-bg font-orbitron font-bold text-sm tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              {t('donate.contact')} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
