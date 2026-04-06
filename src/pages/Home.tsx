import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'motion/react';
import { ArrowRight, Atom, Sparkles, FlaskConical, Microscope, Dna } from 'lucide-react';
import { PageTransition } from '../components/PageTransition';
import { useLanguage } from '../contexts/LanguageContext';

export const Home = () => {
  const { t, language } = useLanguage();
  const exploreLabel = language === 'en' ? 'EXPLORE FIELDS' : 'EXPLOREAZA MATERIILE';
  const fields = language === 'en' 
    ? ["Physics", "Chemistry", "Microscopy", "Dissections", "Robotics", "Astronomy"]
    : ["Fizică", "Chimie", "Microscopie", "Disecții", "Robotică", "Astronomie"];
  const [fieldIndex, setFieldIndex] = useState(0);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFieldIndex((prev) => (prev + 1) % fields.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Starfield Animation
    const canvas = document.getElementById('starfield') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
    const count = 300;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.3 + 0.05,
        opacity: Math.random()
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.fillStyle = `rgba(248, 249, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y -= star.speed;
        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0) star.opacity = 0;
        if (star.opacity > 1) star.opacity = 1;
        if (star.y < 0) star.y = canvas.height;
      });
      requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Star Field Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <canvas id="starfield" className="w-full h-full opacity-40"></canvas>
        </div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-nexus-purple/10 rounded-full blur-[100px] pointer-events-none animate-float mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-nexus-blue/10 rounded-full blur-[100px] pointer-events-none animate-float mix-blend-screen" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-pill mb-8 border-nexus-purple/30"
            >
              <Sparkles className="w-4 h-4 text-nexus-purple" />
              <span className="font-mono text-[10px] text-nexus-white/90 uppercase tracking-[0.2em] font-bold">{t('home.welcome')}</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-orbitron font-black leading-[1.1] mb-6 tracking-tighter">
              {t('home.we')} <br /> {t('home.explore')} <br />
              <span className="inline-block min-w-[300px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={fields[fieldIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block text-gradient"
                  >
                    {fields[fieldIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-nexus-white/70 max-w-lg mb-10 leading-relaxed font-light">
              {t('home.desc')}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/fields" className="px-8 py-4 bg-nexus-white text-nexus-bg font-orbitron font-bold text-sm tracking-widest rounded-full hover:scale-105 transition-transform flex items-center gap-3 group shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                {exploreLabel}
                <div className="w-6 h-6 rounded-full bg-nexus-bg/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
              <Link to="/join" className="px-8 py-4 glass-pill font-orbitron font-bold text-sm tracking-widest hover:bg-white/10 transition-colors border-white/20">
                {t('home.joinNexus')}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:flex justify-center relative perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-[500px] h-[500px] flex items-center justify-center"
            >
              {/* Central Core */}
              <div className="absolute inset-0 bg-gradient-to-tr from-nexus-purple/10 to-nexus-blue/10 rounded-full blur-3xl animate-pulse" style={{ transform: "translateZ(-50px)" }}></div>
              
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 w-40 h-40 glass rounded-full shadow-[0_0_50px_rgba(176,102,255,0.3)] border-nexus-purple/40 backdrop-blur-3xl"
                style={{ transform: "translateZ(60px)" }}
              >
                <Link to="/fields/physics" className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform duration-300" title="Physics">
                  <Atom className="w-20 h-20 text-nexus-white animate-[spin_10s_linear_infinite]" strokeWidth={1.5} />
                </Link>
              </motion.div>

              {/* Orbiting Elements */}
              <motion.div
                animate={{ y: [-15, 15, -15], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-12 left-12 z-30 w-20 h-20 glass rounded-2xl border-nexus-blue/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] backdrop-blur-xl"
                style={{ transform: "translateZ(80px)" }}
              >
                <Link to="/fields/microscopy" className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform duration-300" title="Microscopy">
                  <Microscope className="w-10 h-10 text-nexus-blue" strokeWidth={1.5} />
                </Link>
              </motion.div>

              <motion.div
                animate={{ y: [15, -15, 15], rotate: [0, -10, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-20 right-10 z-10 w-24 h-24 glass rounded-full border-pink-500/30 shadow-[0_0_30px_rgba(236,72,153,0.2)] backdrop-blur-xl"
                style={{ transform: "translateZ(40px)" }}
              >
                <Link to="/fields/chemistry" className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform duration-300" title="Chemistry">
                  <FlaskConical className="w-12 h-12 text-pink-400" strokeWidth={1.5} />
                </Link>
              </motion.div>

              <motion.div
                animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-16 left-16 z-20 w-24 h-24 glass rounded-full border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)] backdrop-blur-xl"
                style={{ transform: "translateZ(90px)" }}
              >
                <Link to="/fields/dissections" className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform duration-300" title="Dissections">
                  <Dna className="w-12 h-12 text-emerald-400" strokeWidth={1.5} />
                </Link>
              </motion.div>

              <motion.div
                animate={{ y: [20, -20, 20], rotate: [0, 15, -15, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-24 right-16 z-30 w-20 h-20 glass rounded-2xl border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)] backdrop-blur-xl"
                style={{ transform: "translateZ(70px)" }}
              >
                <Link to="/fields/physics" className="w-full h-full flex items-center justify-center hover:scale-110 transition-transform duration-300" title="Physics">
                  <Atom className="w-10 h-10 text-amber-400" strokeWidth={1.5} />
                </Link>
              </motion.div>

              {/* Decorative rings for elegance */}
              <div className="absolute inset-10 border border-white/5 rounded-full" style={{ transform: "translateZ(-20px)" }}></div>
              <div className="absolute inset-24 border border-white/10 rounded-full border-dashed animate-[spin_30s_linear_infinite]" style={{ transform: "translateZ(10px)" }}></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};
