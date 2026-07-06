import { useState, useEffect } from 'react';
import { PageTransition } from '../components/PageTransition';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { teamMembers } from '../data/teamMembers';

const memberImages = import.meta.glob('../../members/*.{jpg,jpeg,png,JPG,JPEG,PNG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const getImageUrl = (fileName: string) => {
  const entry = Object.entries(memberImages).find(([path]) => path.endsWith(`/${fileName}`));
  return entry ? entry[1] : '';
};

type Member = {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
};

const MemberModal = ({ member, onClose }: { member: Member; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal card */}
        <motion.div
          className="relative z-10 w-full max-w-lg"
          initial={{ opacity: 0, scale: 0.88, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', stiffness: 340, damping: 28 }}
        >
          {/* Glow ring */}
          <div
            className="absolute -inset-px rounded-3xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(176,102,255,0.6) 0%, rgba(59,130,246,0.4) 50%, rgba(176,102,255,0.2) 100%)',
              filter: 'blur(1px)',
            }}
          />

          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(12,5,22,0.97) 0%, rgba(8,4,18,0.99) 100%)',
              border: '1px solid rgba(176,102,255,0.25)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(176,102,255,0.12)',
            }}
          >
            {/* Top purple accent bar */}
            <div
              className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, #B066FF, #3B82F6, #B066FF)' }}
            />

            {/* Header with photo */}
            <div className="relative px-8 pt-8 pb-6 flex items-center gap-6">
              {/* Subtle glow behind photo */}
              <div
                className="absolute left-8 top-8 w-24 h-24 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(176,102,255,0.3) 0%, transparent 70%)' }}
              />

              <div
                className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0"
                style={{
                  border: '2px solid rgba(176,102,255,0.5)',
                  boxShadow: '0 0 28px rgba(176,102,255,0.35)',
                }}
              >
                {member.imageUrl ? (
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center font-orbitron text-2xl font-bold"
                    style={{ background: 'rgba(176,102,255,0.15)', color: '#B066FF' }}
                  >
                    {member.name.split(' ').map((p) => p[0]).join('')}
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h2
                  className="font-orbitron font-bold text-xl leading-tight mb-2 text-white"
                  style={{ letterSpacing: '0.04em' }}
                >
                  {member.name}
                </h2>
                <span
                  className="inline-block text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(176,102,255,0.15)',
                    border: '1px solid rgba(176,102,255,0.3)',
                    color: '#B066FF',
                  }}
                >
                  {member.role}
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.5)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(176,102,255,0.2)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#B066FF';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(176,102,255,0.4)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="1" y1="1" x2="11" y2="11" />
                  <line x1="11" y1="1" x2="1" y2="11" />
                </svg>
              </button>
            </div>

            {/* Divider */}
            <div className="mx-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(176,102,255,0.3), transparent)' }} />

            {/* Description */}
            <div className="px-8 py-6">
              <div className="flex gap-3 items-start">
                <span
                  className="mt-1 text-lg leading-none flex-shrink-0"
                  style={{ color: '#B066FF', opacity: 0.7 }}
                >
                  "
                </span>
                <p
                  className="font-lora text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.78)' }}
                >
                  {member.description}
                </p>
                <span
                  className="self-end text-lg leading-none flex-shrink-0"
                  style={{ color: '#B066FF', opacity: 0.7 }}
                >
                  "
                </span>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="px-8 pb-7 flex justify-center">
              <button
                onClick={onClose}
                className="text-xs font-mono uppercase tracking-widest transition-all duration-200"
                style={{ color: 'rgba(176,102,255,0.55)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#B066FF')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(176,102,255,0.55)')}
              >
                ← Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const Team = () => {
  const { t, language } = useLanguage();
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const members = teamMembers.map((member) => ({
    ...member,
    role: language === 'en' ? member.roleEn : member.roleRo,
    description: language === 'en' ? member.descriptionEn : member.descriptionRo,
    imageUrl: getImageUrl(member.imageFile),
  }));

  return (
    <PageTransition>
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black mb-6">{t('team.title')}</h1>
            <p className="text-nexus-purple font-mono uppercase tracking-widest">{t('team.subtitle')}</p>
            <div className="w-24 h-1 bg-nexus-purple mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {members.map((member, i) => (
              <motion.button
                key={member.name}
                onClick={() => setSelectedMember(member)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative text-left focus:outline-none rounded-2xl cursor-pointer"
                style={{ height: '17rem' }}
                aria-label={`View profile of ${member.name}`}
              >
                {/* Card glow on hover */}
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(176,102,255,0.5), rgba(59,130,246,0.3))',
                    filter: 'blur(0.5px)',
                  }}
                />

                <div
                  className="relative w-full h-full rounded-2xl flex flex-col items-center justify-center text-center p-6 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Photo */}
                  <div
                    className="w-28 h-28 rounded-full mb-4 overflow-hidden transition-all duration-300"
                    style={{
                      border: '1px solid rgba(255,255,255,0.15)',
                      boxShadow: '0 0 24px rgba(176,102,255,0.28)',
                      background: 'rgba(176,102,255,0.1)',
                    }}
                  >
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-nexus-purple font-orbitron text-2xl font-bold">
                        {member.name.split(' ').map((part) => part[0]).join('')}
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-lg mb-1 text-white">{member.name}</h3>
                  <p className="text-xs font-mono text-nexus-purple uppercase tracking-widest mb-4">{member.role}</p>

                  {/* "View profile" hint */}
                  <div
                    className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                  >
                    <span
                      className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{
                        background: 'rgba(176,102,255,0.15)',
                        border: '1px solid rgba(176,102,255,0.3)',
                        color: '#B066FF',
                      }}
                    >
                      View Profile →
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <MemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </PageTransition>
  );
};
