import { motion } from 'motion/react';
import { assetPath } from '../utils/assetPath';

export const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 z-[100] bg-nexus-bg flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        <img
          src={assetPath('nexus-logo.png')}
          alt="NEXUS logo"
          className="w-24 h-24 object-contain animate-spin-slow drop-shadow-[0_0_24px_rgba(176,102,255,0.45)]"
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute -bottom-8 left-0 h-1 bg-gradient-to-r from-nexus-purple to-nexus-blue rounded-full"
        />
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12 text-4xl font-orbitron font-black tracking-tighter text-nexus-white"
      >
        NEXUS
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-4 font-mono text-xs uppercase tracking-[0.3em] text-nexus-purple"
      >
        Initializing Science Core...
      </motion.p>
    </motion.div>
  );
};
