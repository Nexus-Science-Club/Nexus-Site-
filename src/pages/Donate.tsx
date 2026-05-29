import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { HeartHandshake, Sparkles, ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { assetPath } from '../utils/assetPath';

const sponsors = [
  {
    name: 'APCNNG',
    logo: assetPath('sponsors/apcnng.png'),
    descRo: 'Asociația Părinților și Cadrelor Didactice de la Colegiul "Nicolae Grigorescu"',
    descEn: 'Parents & Teachers Association of "Nicolae Grigorescu" College',
  },
  {
    name: 'Raibak S.R.L.',
    logo: assetPath('sponsors/raibak-logo.png'),
    descRo: 'Partener local pentru logistică și suport eveniment',
    descEn: 'Local partner for logistics and event support',
  },
  {
    name: 'Fondul Stiintescu',
    logo: assetPath('sponsors/stiintescu-logo.png'),
    descRo: 'Finanțator principal prin programul Prahova Science Fund',
    descEn: 'Main funder via the Prahova Science Fund program',
  },
];

export const Donate = () => {
  const { language } = useLanguage();

  const content = language === 'en'
    ? {
        badge: 'BECOME A PARTNER',
        subtitle: 'We advance science through partnerships. Join the organisations investing in the future of research and education.',
        partnersHeading: 'CURRENT PARTNERS',
        ctaHeading: 'READY TO PARTNER WITH US?',
        ctaDesc: "If you want to support Nexus Science Club and be part of our story, get in touch. We're open to any form of collaboration — from in-kind contributions to strategic partnerships.",
        ctaButton: 'CONTACT US',
        ctaNote: 'Custom packages available · nexusscienceclub@gmail.com',
      }
    : {
        badge: 'DEVINO PARTENER',
        subtitle: 'Susținem știința prin parteneriate. Alătură-te organizațiilor care investesc în viitorul cercetării și educației.',
        partnersHeading: 'PARTENERI ACTUALI',
        ctaHeading: 'VREI SĂ DEVII PARTENER?',
        ctaDesc: 'Dacă dorești să susții activitățile Nexus Science Club și să fii parte din povestea noastră, scrie-ne. Suntem deschiși oricărui tip de colaborare — de la contribuții în natură la parteneriate strategice.',
        ctaButton: 'CONTACTEAZĂ-NE',
        ctaNote: 'Pachete personalizate disponibile · nexusscienceclub@gmail.com',
      };

  return (
    <PageTransition>
      <section className="py-32 relative min-h-screen overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/4 -right-24 w-[480px] h-[480px] bg-nexus-purple/12 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-16 w-[400px] h-[400px] bg-nexus-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* ── Page header ─────────────────────────────────── */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 glass-pill mb-8 border-nexus-purple/30"
              >
                <HeartHandshake className="w-4 h-4 text-nexus-purple" />
                <span className="font-mono text-[10px] text-nexus-white/90 uppercase tracking-[0.2em] font-bold">
                  {content.badge}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-orbitron mb-6"
              >
                SPONSOR <span className="text-gradient">US</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-nexus-white/65 font-lora leading-relaxed max-w-xl"
              >
                {content.subtitle}
              </motion.p>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-nexus-purple to-nexus-blue flex-shrink-0 rounded-full"></div>
          </div>

          {/* ── Current partners ────────────────────────────── */}
          <div className="mb-24">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-nexus-purple font-mono uppercase tracking-widest text-sm mb-10"
            >
              {content.partnersHeading}
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8">
              {sponsors.map((sponsor, i) => (
                <motion.div
                  key={sponsor.name}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="glass rounded-3xl overflow-hidden group hover:border-nexus-purple/40 hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                  {/* Purple top gradient strip */}
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-nexus-purple to-transparent opacity-50 group-hover:opacity-90 transition-opacity" />

                  {/* Logo area */}
                  <div className="h-52 bg-white/[0.03] border-b border-white/[0.06] flex items-center justify-center p-10 group-hover:bg-white/[0.05] transition-colors">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Name + description */}
                  <div className="p-7 flex-1">
                    <h3 className="font-orbitron font-bold text-lg mb-2 group-hover:text-nexus-purple/90 transition-colors">
                      {sponsor.name}
                    </h3>
                    <p className="text-nexus-white/50 text-sm font-lora leading-relaxed">
                      {language === 'en' ? sponsor.descEn : sponsor.descRo}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Contact CTA ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden border border-nexus-purple/25"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-nexus-purple to-transparent opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-br from-nexus-purple/8 via-transparent to-nexus-blue/5 pointer-events-none" />
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-nexus-purple/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-nexus-purple/10 border border-nexus-purple/35 flex items-center justify-center shadow-[0_0_40px_rgba(176,102,255,0.3)]">
                <Sparkles className="w-10 h-10 text-nexus-purple" />
              </div>

              <h2 className="text-3xl md:text-4xl font-orbitron font-black tracking-tight mb-5">
                {content.ctaHeading}
              </h2>

              <p className="text-nexus-white/65 font-lora text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                {content.ctaDesc}
              </p>

              <a
                href="mailto:nexusscienceclub@gmail.com"
                className="inline-flex items-center gap-3 px-10 py-5 bg-nexus-white text-nexus-bg font-orbitron font-bold text-sm tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <Mail className="w-4 h-4" />
                {content.ctaButton}
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="mt-6 font-mono text-[11px] text-nexus-white/30 uppercase tracking-widest">
                {content.ctaNote}
              </p>
            </div>
          </motion.div>

        </div>
      </section>
    </PageTransition>
  );
};
