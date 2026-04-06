import { PageTransition } from '../components/PageTransition';
import { Atom, FlaskConical, Microscope, Scissors, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Fields = () => {
  const { t } = useLanguage();

  const fields = [
    { id: 'microscopy', name: t('fields.microscopy.name'), icon: <Microscope />, desc: t('fields.microscopy.desc') },
    { id: 'chemistry', name: t('fields.chemistry.name'), icon: <FlaskConical />, desc: t('fields.chemistry.desc') },
    { id: 'dissections', name: t('fields.dissections.name'), icon: <Scissors />, desc: t('fields.dissections.desc') },
    { id: 'physics', name: t('fields.physics.name'), icon: <Atom />, desc: t('fields.physics.desc') }
  ];

  return (
    <PageTransition>
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter font-orbitron">{t('fields.title')}</h1>
            <p className="text-nexus-purple font-mono uppercase tracking-widest">{t('fields.subtitle')}</p>
            <div className="w-24 h-1 bg-nexus-purple mx-auto mt-6 shadow-[0_0_15px_rgba(176,102,255,0.5)]"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {fields.map((field, i) => (
              <Link to={`/fields/${field.id}`} key={field.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-8 rounded-3xl group hover:border-nexus-purple/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(176,102,255,0.2)]"
                >
                  <div className="absolute -right-4 -top-4 w-32 h-32 bg-nexus-purple/10 rounded-full blur-3xl group-hover:bg-nexus-purple/20 transition-all duration-500"></div>
                  <div className="w-16 h-16 bg-nexus-purple/10 rounded-2xl flex items-center justify-center text-nexus-purple mb-6 group-hover:bg-nexus-purple group-hover:text-nexus-white transition-all duration-500 shadow-[0_0_15px_rgba(176,102,255,0.2)]">
                    {field.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 font-orbitron flex items-center gap-3">
                    {field.name}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-nexus-purple" />
                  </h3>
                  <p className="text-nexus-white/70 leading-relaxed font-lora">{field.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
