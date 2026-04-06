import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { assetPath } from '../utils/assetPath';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.fields'), href: '/fields' },
    { name: t('nav.events'), href: '/events' },
    { name: t('nav.team'), href: '/team' },
    { name: t('nav.sponsors'), href: '/sponsors' },
    { name: t('nav.donate'), href: '/donate' }
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ro' : 'en');
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none">
      <nav className={`pointer-events-auto transition-all duration-500 ${isScrolled ? 'bg-nexus-bg/80 backdrop-blur-md border border-nexus-purple/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-full py-3 px-6 w-full max-w-5xl' : 'bg-transparent py-4 px-2 w-full max-w-7xl'}`}>
        <div className="flex justify-between items-center w-full">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={assetPath('nexus-logo.png')}
              alt="NEXUS logo"
              className="w-11 h-11 object-contain scale-[1.2] origin-center transition-transform duration-300 group-hover:scale-[1.28]"
            />
            <span className="text-xl font-orbitron font-bold tracking-widest text-nexus-white">NEXUS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 relative">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                className={`relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 z-10 ${location.pathname === link.href ? 'text-nexus-white' : 'text-nexus-white/60 hover:text-nexus-white'}`}
              >
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            ))}
            <div className="w-px h-4 bg-white/20 mx-2"></div>
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-nexus-white/80 hover:text-nexus-white transition-all text-xs font-mono uppercase"
            >
              <Globe size={14} />
              {language === 'en' ? 'EN' : 'RO'}
            </button>
            <Link to="/join" className="ml-2 px-6 py-2.5 bg-nexus-white text-nexus-bg font-orbitron font-bold text-xs tracking-wider rounded-full hover:scale-105 transition-transform duration-300">
              {t('nav.join')}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleLanguage}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-nexus-white"
            >
              <Globe size={16} />
              <span className="text-[10px] font-mono ml-1">{language.toUpperCase()}</span>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-nexus-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="md:hidden overflow-hidden flex flex-col gap-2"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-2xl p-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-xl font-mono text-sm uppercase tracking-widest text-center transition-colors ${location.pathname === link.href ? 'bg-white/10 text-nexus-white' : 'text-nexus-white/60 hover:bg-white/5'}`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link to="/join" onClick={() => setIsMobileMenuOpen(false)} className="w-full py-4 mt-2 bg-nexus-white text-nexus-bg font-orbitron font-bold rounded-xl text-center text-sm tracking-widest">
                  {t('nav.join')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};
