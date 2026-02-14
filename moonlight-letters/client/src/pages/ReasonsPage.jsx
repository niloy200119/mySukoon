import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { getReasons } from '../services/endpoints';

function ReasonCard({ reason, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <motion.div
        whileHover={{ y: -8, rotateY: 5, rotateX: -3 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="glass rounded-2xl p-6 sm:p-8 shadow-dreamy h-full relative overflow-hidden cursor-default"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Soft glow on hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.15 : 0,
          }}
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #f4a6b5, transparent 70%)',
          }}
        />

        {/* Pink border glow */}
        <motion.div
          animate={{
            boxShadow: isHovered
              ? '0 0 20px rgba(244,166,181,0.3), inset 0 0 20px rgba(244,166,181,0.05)'
              : '0 0 0px rgba(244,166,181,0)',
          }}
          className="absolute inset-0 rounded-2xl"
        />

        <div className="relative z-10">
          {/* Heart icon */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 10 : 0,
            }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-blush to-rose/30 flex items-center justify-center mb-4"
          >
            <Heart className="w-4 h-4 text-rose" fill="currentColor" />
          </motion.div>

          <h3 className="font-serif text-xl text-[#3d2b1f] mb-3 font-medium">
            {reason.title}
          </h3>

          <p className="text-sm text-[#4a3728]/60 leading-relaxed font-light">
            {reason.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ReasonsPage() {
  const [reasons, setReasons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReasons()
      .then((res) => setReasons(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <Sparkles className="w-6 h-6 text-mauve/40" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-mauve/50 text-sm tracking-[0.3em] uppercase mb-3"
          >
            Reasons without end
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#3d2b1f]"
          >
            Little Things I Love
            <br />
            <span className="text-rose">About You, Alo</span>
          </motion.h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Heart className="w-8 h-8 text-rose animate-pulse-soft" />
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reasons.map((reason, index) => (
                <ReasonCard key={reason._id} reason={reason} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
