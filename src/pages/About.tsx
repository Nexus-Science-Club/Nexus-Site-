import { PageTransition } from '../components/PageTransition';
import { motion } from 'motion/react';
import { Lightbulb, Users, FlaskConical, Handshake } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { assetPath } from '../utils/assetPath';

export const About = () => {
  const { language } = useLanguage();

  const content = language === 'en'
    ? {
        title: 'ABOUT NEXUS',
        subtitle: 'A CLUB BUILT BY STUDENTS FOR STUDENTS',
        storyTitle: 'How It Started',
        story: [
          'Nexus Club was founded in 2025 on the initiative of science-loving students from the "Nicolae Grigorescu" National College. With the support of mentors and coordinating teachers, this dream became a reality and quickly transformed into one of the most important activities of the college.',
          'The team is made up of 11 dedicated, ambitious students united by the same passion for knowledge and scientific exploration. The club members previously collaborated in the high school robotics team and educational volunteer projects, building a strong team spirit, creativity, and perseverance.',
          'Nexus Club was born from a real need: to offer students a modern, safe, and accessible space where they can experiment, create, and learn beyond class hours.'
        ],
        missionTitle: 'Mission and Impact',
        mission: [
          'We want to transform the way students discover chemistry, physics, and biology, with a strong focus on practice, exploration, and applied learning.',
          'We believe that science should be experienced, not just memorized. That is why our mission is to make learning interactive, relevant, and engaging for all students passionate about discovery.',
          'Through the dedication of our members and the support of our coordinating teachers, Nexus Club aims to become a center of innovation and scientific curiosity within the college.'
        ],
        supportTitle: 'Support',
        supportText:
          'The project is supported by the Prahova Science Fund (2025 edition), implemented by the Prahova Community Foundation, in partnership with the Romanian-American Foundation and the Federation of Community Foundations in Romania, with local funding provided by Colen Impex.',
        galleryTitle: 'Inside Nexus',
        stats: {
          founded: 'Founded',
          team: 'Core Team',
          focus: 'Main Fields',
          partners: 'Funding Partners'
        }
      }
    : {
        title: 'DESPRE NEXUS',
        subtitle: 'UN CLUB CONSTRUIT DE ELEVI PENTRU ELEVI',
        storyTitle: 'Cum A Inceput',
        story: [
          'Nexus Club a fost fondat in 2025 la initiativa elevilor pasionati de stiinta de la Colegiul National "Nicolae Grigorescu". Cu sprijinul mentorilor si al profesorilor coordonatori, acest vis a devenit realitate si s-a transformat rapid intr-una dintre cele mai importante activitati ale colegiului.',
          'Echipa este formata din 11 elevi dedicati si ambitiosi, uniti de aceeasi pasiune pentru cunoastere si explorare stiintifica. Membrii clubului au colaborat anterior in echipa de robotica a liceului si in proiecte educationale de voluntariat.',
          'Nexus Club s-a nascut dintr-o nevoie reala: sa ofere elevilor un spatiu modern, sigur si accesibil in care sa experimenteze, sa creeze si sa invete dincolo de orele de curs.'
        ],
        missionTitle: 'Misiune si Impact',
        mission: [
          'Vrem sa transformam modul in care elevii descopera chimia, fizica si biologia, punand accent pe practica, explorare si invatare aplicata.',
          'Credem ca stiinta trebuie traita, nu doar memorata. De aceea, misiunea noastra este sa facem invatarea interactiva, relevanta si atractiva pentru toti elevii pasionati de descoperire.',
          'Prin dedicarea membrilor si sprijinul profesorilor coordonatori, Nexus Club isi propune sa devina un centru de inovatie si curiozitate stiintifica in cadrul colegiului.'
        ],
        supportTitle: 'Sustinere',
        supportText:
          'Proiectul este sustinut de Prahova Science Fund (editia 2025), implementat de Fundatia Comunitara Prahova, in parteneriat cu Romanian-American Foundation si Federatia Fundatiilor Comunitare din Romania, cu finantare locala oferita de Colen Impex.',
        galleryTitle: 'Viata In Nexus',
        stats: {
          founded: 'Infiintat',
          team: 'Echipa Core',
          focus: 'Domenii Principale',
          partners: 'Parteneri Finantare'
        }
      };

  const stats = [
    { label: content.stats.founded, value: '2025', icon: <Lightbulb /> },
    { label: content.stats.team, value: '11', icon: <Users /> },
    { label: content.stats.focus, value: '3', icon: <FlaskConical /> },
    { label: content.stats.partners, value: '4', icon: <Handshake /> }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <PageTransition>
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 font-orbitron tracking-tighter">{content.title}</h1>
            <p className="max-w-3xl mx-auto text-nexus-white/65 font-mono text-xs md:text-sm uppercase tracking-[0.18em]">
              {content.subtitle}
            </p>
            <div className="w-24 h-1 bg-nexus-purple mx-auto shadow-[0_0_15px_rgba(176,102,255,0.5)]"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold text-nexus-purple font-orbitron">{content.storyTitle}</h2>
              <div className="space-y-5">
                {content.story.map((paragraph) => (
                  <p key={paragraph} className="text-nexus-white/75 leading-relaxed font-lora text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-3 bg-gradient-to-r from-nexus-purple/20 to-nexus-blue/20 blur-2xl opacity-40"></div>
              <img
                src={assetPath('about-group.jpg')}
                alt={language === 'en' ? 'Nexus Club group photo' : 'Fotografie de grup Nexus Club'}
                className="relative z-10 w-full h-[470px] object-cover rounded-3xl border border-nexus-purple/25 shadow-[0_22px_55px_rgba(0,0,0,0.45)]"
              />
              <div className="absolute bottom-5 left-5 right-5 z-20 glass rounded-2xl p-4 border-nexus-purple/20">
                <p className="font-orbitron text-sm tracking-wider text-nexus-white">
                  {language === 'en' ? 'Nexus Club Team - 2025' : 'Echipa Nexus Club - 2025'}
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="glass p-8 rounded-2xl text-center border-nexus-purple/10 hover:border-nexus-purple/40 transition-all duration-500 group hover:-translate-y-2 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(176,102,255,0.2)]">
                <div className="w-12 h-12 bg-nexus-purple/10 rounded-xl flex items-center justify-center text-nexus-purple mx-auto mb-4 group-hover:bg-nexus-purple group-hover:text-nexus-white transition-all duration-500">
                  {stat.icon}
                </div>
                <div className="text-4xl font-orbitron font-black text-nexus-white mb-2">
                  {stat.value}
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-nexus-white/50">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center font-orbitron tracking-widest">{content.galleryTitle}</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <motion.div whileHover={{ y: -8 }} className="col-span-2 lg:col-span-2 rounded-3xl overflow-hidden border border-nexus-purple/20">
                <img src={assetPath('about-lab-1.jpg')} alt="Nexus science activity" className="w-full h-[260px] md:h-[360px] object-cover" />
              </motion.div>
              <motion.div whileHover={{ y: -8 }} className="rounded-3xl overflow-hidden border border-nexus-purple/20">
                <img src={assetPath('about-lab-2.jpg')} alt="Nexus experimentation session" className="w-full h-[260px] md:h-[360px] object-cover" />
              </motion.div>
              <motion.div whileHover={{ y: -8 }} className="rounded-3xl overflow-hidden border border-nexus-purple/20">
                <img src={assetPath('about-lab-3.jpg')} alt="Nexus club laboratory moment" className="w-full h-[260px] md:h-[360px] object-cover" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass p-12 rounded-3xl border-nexus-purple/20 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nexus-purple to-transparent opacity-50"></div>
            <h3 className="text-2xl font-bold mb-6 text-center font-orbitron tracking-widest">{content.missionTitle}</h3>
            <div className="max-w-4xl mx-auto text-center space-y-6 text-nexus-white/80 font-lora text-lg">
              {content.mission.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-10 max-w-4xl mx-auto rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-nexus-purple mb-3 text-center">{content.supportTitle}</p>
              <p className="text-center text-nexus-white/70 leading-relaxed">{content.supportText}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
