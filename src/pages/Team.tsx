import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
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

export const Team = () => {
  const { t, language } = useLanguage();

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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group perspective-1000 h-80"
              >
                <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden glass rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <div className="w-28 h-28 rounded-full mb-4 border border-white/15 overflow-hidden shadow-[0_0_24px_rgba(176,102,255,0.28)] bg-nexus-purple/10">
                      {member.imageUrl ? (
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-nexus-purple font-orbitron text-2xl font-bold">
                          {member.name.split(' ').map((part) => part[0]).join('')}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-xs font-mono text-nexus-purple uppercase tracking-widest">{member.role}</p>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden glass rounded-2xl p-8 flex flex-col items-center justify-center text-center rotate-y-180 bg-nexus-purple/10">
                    <div className="w-12 h-12 bg-nexus-purple/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-nexus-purple text-xl">*</span>
                    </div>
                    <p className="text-sm font-mono text-nexus-white/80 leading-relaxed">"{member.description}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
