import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar, Clock, ChevronDown, Trophy, MapPin, Zap, BookOpen,
  Compass, Microscope, FlaskConical, Heart, Atom,
} from 'lucide-react';
import {
  day1Schedule, day2Schedule, escapeRoomSlots,
  experimentStandsDay1, experimentStandsDay2,
  type ScheduleEntry, type ExperimentStand,
} from '../data/schedule';

/* ── Stand field icons (two sizes) ─────────────────────────────── */

const standFieldIcon: Record<string, React.ReactNode> = {
  Biologie: <Microscope className="w-5 h-5 text-emerald-400" />,
  Chimie: <FlaskConical className="w-5 h-5 text-orange-400" />,
  Fizică: <Atom className="w-5 h-5 text-blue-400" />,
  'Fundația SMURD': <Heart className="w-5 h-5 text-red-400" />,
  NextStep: <Compass className="w-5 h-5 text-nexus-purple" />,
};

/* ── Timeline lookup tables ─────────────────────────────────────── */

const entryDot: Record<string, string> = {
  stands: 'bg-nexus-purple shadow-[0_0_14px_rgba(176,102,255,0.8)] animate-pulse',
  break: 'bg-white/20',
  hunt: 'bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,0.8)]',
  judging: 'bg-yellow-400 shadow-[0_0_14px_rgba(250,204,21,0.8)]',
  awards: 'bg-nexus-purple shadow-[0_0_20px_rgba(176,102,255,1)] animate-pulse',
  submissions: 'bg-nexus-blue shadow-[0_0_14px_rgba(59,130,246,0.8)]',
};

const entryBorder: Record<string, string> = {
  stands: 'border-nexus-purple/20',
  break: 'border-white/[0.04]',
  hunt: 'border-orange-400/30',
  judging: 'border-yellow-400/30',
  awards: 'border-nexus-purple/40',
  submissions: 'border-nexus-blue/25',
};

const entryLeftStrip: Record<string, string> = {
  stands: 'bg-gradient-to-b from-nexus-purple/70 via-nexus-purple/30 to-transparent',
  break: 'bg-transparent',
  hunt: 'bg-gradient-to-b from-orange-400/70 via-orange-400/30 to-transparent',
  judging: 'bg-gradient-to-b from-yellow-400/70 via-yellow-400/30 to-transparent',
  awards: 'bg-gradient-to-b from-nexus-purple/90 via-nexus-purple/50 to-transparent',
  submissions: 'bg-gradient-to-b from-nexus-blue/70 via-nexus-blue/30 to-transparent',
};

const entryTopGradient: Record<string, string | null> = {
  stands: null,
  break: null,
  hunt: 'from-transparent via-orange-400 to-transparent',
  judging: 'from-transparent via-yellow-400 to-transparent',
  awards: 'from-transparent via-nexus-purple to-transparent',
  submissions: 'from-transparent via-nexus-blue to-transparent',
};

const entryIcon: Record<string, React.ReactNode> = {
  stands: <Zap className="w-5 h-5 text-nexus-purple" />,
  break: <Clock className="w-5 h-5 text-nexus-white/35" />,
  hunt: <MapPin className="w-5 h-5 text-orange-400" />,
  judging: <BookOpen className="w-5 h-5 text-yellow-400" />,
  awards: <Trophy className="w-5 h-5 text-nexus-purple" />,
  submissions: <Calendar className="w-5 h-5 text-nexus-blue" />,
};

const entryIconBg: Record<string, string> = {
  stands: 'bg-nexus-purple/10 border-nexus-purple/30 shadow-[0_0_20px_rgba(176,102,255,0.2)]',
  break: 'bg-white/[0.03] border-white/[0.06]',
  hunt: 'bg-orange-400/10 border-orange-400/30 shadow-[0_0_20px_rgba(251,146,60,0.2)]',
  judging: 'bg-yellow-400/10 border-yellow-400/30 shadow-[0_0_20px_rgba(250,204,21,0.2)]',
  awards: 'bg-nexus-purple/15 border-nexus-purple/40 shadow-[0_0_28px_rgba(176,102,255,0.35)]',
  submissions: 'bg-nexus-blue/10 border-nexus-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]',
};

const entryTimeBadge: Record<string, string> = {
  stands: 'bg-nexus-purple/10 border-nexus-purple/20 text-nexus-purple/80',
  break: 'bg-white/[0.03] border-white/[0.06] text-nexus-white/30',
  hunt: 'bg-orange-400/10 border-orange-400/20 text-orange-400/80',
  judging: 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400/80',
  awards: 'bg-nexus-purple/10 border-nexus-purple/30 text-nexus-purple',
  submissions: 'bg-nexus-blue/10 border-nexus-blue/20 text-nexus-blue/80',
};

/* ── Main Component ─────────────────────────────────────────────── */

export const ScheduleSection = ({ language }: { language: string }) => {
  const [activeDay, setActiveDay] = useState(0);
  const [expandedStands, setExpandedStands] = useState<Record<string, boolean>>({});

  const days = [
    { ro: '30 Mai — Sâmbătă', en: '30 May — Saturday' },
    { ro: '31 Mai — Duminică', en: '31 May — Sunday' },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] bg-nexus-purple/15 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-16 w-[360px] h-[360px] bg-nexus-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-pill mb-6 border-nexus-purple/30"
            >
              <Calendar className="w-4 h-4 text-nexus-white/50" />
              <span className="font-mono text-[10px] text-nexus-white/50 uppercase tracking-[0.2em] font-bold">
                30–31 MAI 2026 · CÂMPINA
              </span>
            </motion.div>

            {/* Animated gradient accent bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-40 h-[3px] bg-gradient-to-r from-nexus-purple via-nexus-blue to-nexus-purple rounded-full mb-5 origin-left"
              style={{ backgroundSize: '200% auto', animation: 'gradient 4s linear infinite' }}
            />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black uppercase mb-4 text-gradient"
            >
              SCIENCE FAIR
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-nexus-white/45 font-mono uppercase tracking-widest text-sm"
            >
              {language === 'en' ? 'EVENT RECAP / SCHEDULE' : 'RECAP EVENIMENT / ORAR'}
            </motion.p>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-nexus-purple to-nexus-blue flex-shrink-0"></div>
        </div>

        {/* Day tabs */}
        <div className="flex gap-3 mb-12 flex-wrap">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-6 py-3 font-orbitron font-bold text-xs tracking-widest rounded-full transition-all duration-300 ${
                activeDay === i
                  ? 'bg-nexus-purple text-nexus-bg shadow-[0_0_30px_rgba(176,102,255,0.6)]'
                  : 'glass-pill text-nexus-white/60 hover:text-nexus-white hover:border-nexus-purple/40 hover:bg-nexus-purple/10'
              }`}
            >
              {language === 'en' ? day.en : day.ro}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="relative pl-9 space-y-5"
          >
            {/* Timeline vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-nexus-purple/60 via-nexus-purple/20 to-transparent rounded-full" />

            {(activeDay === 0 ? day1Schedule : day2Schedule).map((entry, i) => (
              <React.Fragment key={`${activeDay}-${i}`}>
                <TimelineEntry
                  entry={entry}
                  index={i}
                  language={language}
                  stands={activeDay === 0 ? experimentStandsDay1 : experimentStandsDay2}
                  expandedStands={expandedStands}
                  onToggleStands={(key) =>
                    setExpandedStands((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                />
              </React.Fragment>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Escape Room card — Day 1 only */}
        {activeDay === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 glass rounded-3xl p-8 border border-nexus-blue/25 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-nexus-blue to-transparent opacity-80"></div>
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-nexus-blue/70 via-nexus-blue/30 to-transparent rounded-l-3xl"></div>

            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-nexus-blue/10 border border-nexus-blue/30 flex items-center justify-center shadow-[0_0_24px_rgba(59,130,246,0.25)] flex-shrink-0">
                <Compass className="w-6 h-6 text-nexus-blue" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-xl tracking-wide">Escape Room</h3>
                <p className="font-mono text-[10px] text-nexus-white/45 uppercase tracking-[0.18em] mt-0.5">
                  {language === 'en'
                    ? '30 min / team · 15 min room reset'
                    : '30 min / echipă · 15 min aranjare'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-5">
              {escapeRoomSlots.map((slot, i) => (
                <div
                  key={slot}
                  className="group glass rounded-2xl px-3 py-4 text-center border border-nexus-blue/20 hover:border-nexus-blue/50 hover:bg-nexus-blue/5 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-200 cursor-default"
                >
                  <span className="font-mono font-bold text-nexus-blue text-sm block">{slot}</span>
                  <span className="font-mono text-[9px] text-nexus-white/30 uppercase tracking-widest mt-1 block group-hover:text-nexus-blue/50 transition-colors">
                    {language === 'en' ? `Slot ${i + 1}` : `Intrare ${i + 1}`}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

/* ── Sub-components ─────────────────────────────────────────────── */

function TimelineEntry({
  entry, index, language, stands, expandedStands, onToggleStands,
}: {
  entry: ScheduleEntry;
  index: number;
  language: string;
  stands: ExperimentStand[];
  expandedStands: Record<string, boolean>;
  onToggleStands: (key: string) => void;
}) {
  const title = language === 'en' ? entry.titleEn : entry.titleRo;
  const description = language === 'en' ? entry.descriptionEn : entry.descriptionRo;
  const isBreak = entry.type === 'break';
  const topGrad = entryTopGradient[entry.type];
  const standsKey = `${entry.type}-${index}`;
  const open = expandedStands[standsKey] ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="relative"
    >
      {/* Timeline dot */}
      <div
        className={`absolute -left-[2.65rem] top-[1.4rem] w-4 h-4 rounded-full border-2 border-nexus-bg ${entryDot[entry.type]}`}
      />

      {isBreak ? (
        /* ── Break entry: minimal pill ── */
        <div className="flex items-center gap-3 py-2 px-4 rounded-full bg-white/[0.02] border border-white/[0.05] w-fit">
          <Clock className="w-3.5 h-3.5 text-nexus-white/25" />
          <span className="font-mono text-[11px] text-nexus-white/30 uppercase tracking-[0.18em]">
            {entry.time}
          </span>
          <span className="font-orbitron text-xs font-bold text-nexus-white/30 tracking-wide">{title}</span>
        </div>
      ) : (
        /* ── Regular entry card ── */
        <div
          className={`glass rounded-2xl border ${entryBorder[entry.type]} relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-200`}
        >
          {/* Colored top line */}
          {topGrad && (
            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${topGrad} opacity-70`} />
          )}
          {/* Colored left strip */}
          <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${entryLeftStrip[entry.type]} rounded-l-2xl`} />

          <div className="p-6 pl-8">
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center ${entryIconBg[entry.type]}`}>
                {entryIcon[entry.type]}
              </div>
              <div className="flex-1 min-w-0">
                {/* Time badge + title */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] uppercase tracking-[0.15em] ${entryTimeBadge[entry.type]}`}>
                    <Clock className="w-2.5 h-2.5" />
                    {entry.time}
                  </span>
                </div>
                <h3
                  className={`font-orbitron font-bold tracking-wide text-lg ${
                    entry.type === 'awards' ? 'text-gradient' : ''
                  }`}
                >
                  {title}
                </h3>
                {description && (
                  <p className="text-nexus-white/55 text-sm leading-relaxed mt-1.5">{description}</p>
                )}

                {entry.type === 'stands' && (
                  <button
                    onClick={() => onToggleStands(standsKey)}
                    className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-nexus-purple/30 bg-nexus-purple/5 text-nexus-purple font-mono text-[10px] uppercase tracking-widest hover:bg-nexus-purple/15 hover:border-nexus-purple/50 transition-all duration-200"
                  >
                    {language === 'en' ? 'View stands' : 'Arată standurile'}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}
              </div>
            </div>

            {/* Expandable stands */}
            {entry.type === 'stands' && open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-hidden"
              >
                {stands.map((stand) => (
                  <React.Fragment key={stand.fieldRo}>
                    <StandCard stand={stand} language={language} />
                  </React.Fragment>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function StandCard({ stand, language }: { stand: ExperimentStand; language: string }) {
  const activities = language === 'en' ? stand.activitiesEn : stand.activitiesRo;
  const fieldIcon = standFieldIcon[stand.fieldRo];

  return (
    <div
      className={`rounded-2xl overflow-hidden border ${stand.borderColor} transition-all duration-200 ${stand.hoverGlow} hover:-translate-y-0.5`}
    >
      {/* Colored top bar */}
      <div className={`h-[2px] w-full ${stand.dotColor} opacity-40`} />
      <div className={`p-5 ${stand.bgColor} backdrop-blur-xl`}>
        {/* Icon + field name */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${stand.borderColor} ${stand.bgColor}`}>
            {fieldIcon}
          </div>
          <span className={`font-orbitron font-bold text-xs tracking-widest uppercase ${stand.iconColor} leading-tight`}>
            {language === 'en' ? stand.fieldEn : stand.fieldRo}
          </span>
        </div>
        {/* Activities */}
        <ul className="space-y-2">
          {activities.map((act, i) => (
            <li key={i} className="flex items-start gap-2.5 text-nexus-white/60 text-[11px] leading-relaxed">
              <span className={`mt-[5px] flex-shrink-0 w-1 h-1 rounded-full ${stand.dotColor} opacity-70`} />
              {act}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
