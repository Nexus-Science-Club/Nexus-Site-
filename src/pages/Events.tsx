import { PageTransition } from '../components/PageTransition';
import { ScheduleSection } from '../components/ScheduleSection';
import { motion } from 'motion/react';
import {
  Calendar, MapPin, Microscope, FlaskConical, Atom,
  Heart, Compass, Map, Trophy,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const highlights = [
  { iconRo: <Microscope className="w-4 h-4" />, labelRo: 'Biologie', labelEn: 'Biology', color: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-400/5' },
  { iconRo: <FlaskConical className="w-4 h-4" />, labelRo: 'Chimie', labelEn: 'Chemistry', color: 'text-orange-400', border: 'border-orange-400/30', bg: 'bg-orange-400/5' },
  { iconRo: <Atom className="w-4 h-4" />, labelRo: 'Fizică', labelEn: 'Physics', color: 'text-blue-400', border: 'border-blue-400/30', bg: 'bg-blue-400/5' },
  { iconRo: <Heart className="w-4 h-4" />, labelRo: 'SMURD', labelEn: 'SMURD', color: 'text-red-400', border: 'border-red-400/30', bg: 'bg-red-400/5' },
  { iconRo: <Compass className="w-4 h-4" />, labelRo: 'Escape Room', labelEn: 'Escape Room', color: 'text-nexus-blue', border: 'border-nexus-blue/30', bg: 'bg-nexus-blue/5' },
  { iconRo: <Map className="w-4 h-4" />, labelRo: 'Treasure Hunt', labelEn: 'Treasure Hunt', color: 'text-orange-400', border: 'border-orange-400/30', bg: 'bg-orange-400/5' },
  { iconRo: <Trophy className="w-4 h-4" />, labelRo: 'Premiare', labelEn: 'Awards', color: 'text-nexus-purple', border: 'border-nexus-purple/30', bg: 'bg-nexus-purple/5' },
];

export const Events = () => {
  const { language } = useLanguage();

  const content = language === 'en'
    ? {
        pageTitle: 'EVENTS',
        pageSubtitle: 'PAST ACTIVITIES',
        badge: 'PAST EVENT',
        eventTitle: 'NEXUS SCIENCE FAIR',
        date: '30–31 MAY 2026',
        location: 'CÂMPINA, PRAHOVA',
        desc: 'The Nexus Science Fair brought together students, families, and curious minds from across the region for two unforgettable days of science. Visitors explored live experiments in biology, chemistry, and physics, tackled our escape room, joined the treasure hunt through central Câmpina, and celebrated the best science projects at the awards ceremony.',
      }
    : {
        pageTitle: 'EVENIMENTE',
        pageSubtitle: 'ACTIVITĂȚI TRECUTE',
        badge: 'EVENIMENT TRECUT',
        eventTitle: 'NEXUS SCIENCE FAIR',
        date: '30–31 MAI 2026',
        location: 'CÂMPINA, PRAHOVA',
        desc: 'Nexus Science Fair a adus împreună elevi, familii și minți curioase din întreaga regiune pentru două zile de neuitat dedicate științei. Vizitatorii au explorat experimente live în biologie, chimie și fizică, au participat la escape room-ul nostru, au vânat comori în centrul Câmpinei și au celebrat cele mai bune proiecte la ceremonia de premiere.',
      };

  return (
    <PageTransition>
      {/* ── Page header ─────────────────────────────────────────── */}
      <section className="py-32 bg-nexus-bg/50 relative overflow-hidden">
        <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] bg-nexus-purple/15 rounded-full blur-[110px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-16 w-[360px] h-[360px] bg-nexus-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase">{content.pageTitle}</h1>
              <p className="text-nexus-purple font-mono uppercase tracking-widest">{content.pageSubtitle}</p>
            </div>
            <div className="w-24 h-1 bg-nexus-purple flex-shrink-0"></div>
          </div>

          {/* Event hero card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-8 md:p-12 border border-nexus-purple/25 relative overflow-hidden"
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-nexus-purple to-transparent opacity-70"></div>

            {/* Background glow orb */}
            <div className="absolute -top-20 -right-20 w-[320px] h-[320px] bg-nexus-purple/8 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-nexus-purple/10 border border-nexus-purple/35 flex items-center justify-center shadow-[0_0_28px_rgba(176,102,255,0.25)] flex-shrink-0">
                    <Calendar className="w-7 h-7 text-nexus-purple" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 glass-pill border-nexus-white/20 mb-2">
                      <Trophy className="w-3 h-3 text-nexus-white/50" />
                      <span className="font-mono text-[10px] text-nexus-white/50 uppercase tracking-[0.2em] font-bold">
                        {content.badge}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-orbitron font-black tracking-tight text-gradient">
                      {content.eventTitle}
                    </h2>
                  </div>
                </div>
              </div>

              {/* Date & location */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 glass-pill border-white/10">
                  <Calendar className="w-4 h-4 text-nexus-white/60" />
                  <span className="font-mono text-sm font-bold text-nexus-white/90 tracking-widest">
                    {content.date}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 glass-pill border-white/10">
                  <MapPin className="w-4 h-4 text-nexus-white/60" />
                  <span className="font-mono text-sm font-bold text-nexus-white/90 tracking-widest">
                    {content.location}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-nexus-white/70 leading-relaxed mb-8 max-w-3xl text-base md:text-lg">
                {content.desc}
              </p>

              {/* Highlight pills */}
              <div className="flex flex-wrap gap-2">
                {highlights.map((h) => (
                  <div
                    key={h.labelEn}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${h.border} ${h.bg} backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5`}
                  >
                    <span className={h.color}>{h.iconRo}</span>
                    <span className={`font-mono text-[11px] font-bold uppercase tracking-widest ${h.color}`}>
                      {language === 'en' ? h.labelEn : h.labelRo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Full schedule ────────────────────────────────────────── */}
      <ScheduleSection language={language} />
    </PageTransition>
  );
};
