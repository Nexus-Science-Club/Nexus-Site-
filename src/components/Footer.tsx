import { Instagram, Youtube, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { assetPath } from '../utils/assetPath';

export const Footer = () => {
  return (
    <footer className="py-16 border-t border-white/5 bg-nexus-bg">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <img
              src={assetPath('nexus-logo.png')}
              alt="NEXUS logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-orbitron font-bold tracking-tighter">NEXUS</span>
          </div>
          <p className="text-nexus-white/50 max-w-sm mb-8">
            Curiosity is our compass. A student-led initiative dedicated to the pursuit of scientific excellence and innovation.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/nexus.cnng?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:text-nexus-purple transition-colors"><Instagram size={20} /></a>
            <a href="https://www.youtube.com/@nexuscnng" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:text-nexus-purple transition-colors"><Youtube size={20} /></a>
            <a href="https://github.com/Nexus-Science-Club" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:text-nexus-purple transition-colors"><Github size={20} /></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-orbitron font-bold mb-6 text-sm uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-4 font-mono text-xs text-nexus-white/50">
            <li><Link to="/about" className="hover:text-nexus-purple transition-colors">About Us</Link></li>
            <li><Link to="/fields" className="hover:text-nexus-purple transition-colors">Fields of Study</Link></li>
            <li><Link to="/team" className="hover:text-nexus-purple transition-colors">Our Team</Link></li>
            <li><Link to="/events" className="hover:text-nexus-purple transition-colors">Upcoming Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-orbitron font-bold mb-6 text-sm uppercase tracking-widest">Contact</h4>
          <ul className="space-y-4 font-mono text-xs text-nexus-white/50">
            <li>Science Lab, CNNG</li>
            <li>Every Friday @ 15:00</li>
            <li>nexusscience4@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-nexus-white/30 uppercase tracking-widest">
        <span>© 2026 NEXUS SCIENCE CLUB. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED BY NEXUS WEB TEAM</span>
      </div>
    </footer>
  );
};
