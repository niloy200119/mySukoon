import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles as SparklesIcon } from 'lucide-react';
import FloatingClouds from '../components/FloatingClouds';
import Sparkles from '../components/Sparkles';
import FallingPetals from '../components/FallingPetals';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dreamy">
      <FloatingClouds />
      <Sparkles />
      <FallingPetals count={8} />

      {/* Soft radial overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(248,215,227,0.5) 0%, rgba(232,230,255,0.2) 40%, rgba(255,248,242,0.1) 60%, transparent 80%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Small decorative hearts */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="flex justify-center items-center gap-3 mb-6"
        >
          <SparklesIcon className="w-4 h-4 text-mauve/30" />
          <Heart className="w-4 h-4 text-rose/50" fill="currentColor" />
          <Heart className="w-3 h-3 text-mauve/40" fill="currentColor" />
          <Heart className="w-4 h-4 text-rose/50" fill="currentColor" />
          <SparklesIcon className="w-4 h-4 text-mauve/30" />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-mauve/60 text-sm tracking-[0.3em] uppercase mb-4 font-light"
        >
          for the girl who became my peace
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-4"
          style={{ color: '#3d2b1f' }}
        >
          You are my
          <br />
          <span className="text-rose">sukoon</span>
        </motion.h1>

        {/* Sub-line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="text-mauve/40 font-serif text-lg italic mb-8"
        >
          my calm, my chaos, my everything
        </motion.p>

        {/* Her name — cursive with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1, ease: 'easeOut' }}
          className="mb-4"
        >
          <span
            className="font-cursive text-4xl sm:text-5xl md:text-6xl"
            style={{
              color: '#c38eb4',
              textShadow: '0 0 40px rgba(195,142,180,0.4), 0 0 80px rgba(248,215,227,0.25), 0 0 120px rgba(244,166,181,0.1)',
            }}
          >
            Mimi
          </span>
        </motion.div>

        {/* Sweet sub-name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="text-mauve/35 text-xs tracking-[0.4em] uppercase mb-10"
        >
          Afsana Mimi Alo — my light, my story
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          whileHover={{
            scale: 1.05,
            y: -4,
            boxShadow: '0 12px 50px rgba(244,166,181,0.35)',
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/story')}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-white font-light text-base tracking-wide cursor-pointer border-none"
          style={{
            background: 'linear-gradient(135deg, #f4a6b5, #c38eb4, #e8e6ff)',
            boxShadow: '0 4px 25px rgba(244,166,181,0.3)',
          }}
        >
          <span>Step Into Our World</span>
          <Heart className="w-4 h-4" fill="white" />
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 mx-auto rounded-full border-2 border-mauve/30 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-mauve/40" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
