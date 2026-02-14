import { motion } from 'framer-motion';

export default function FallingPetals({ count = 15 }) {
  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 6,
    size: 8 + Math.random() * 12,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.left}%`,
            top: '-5%',
            width: petal.size,
            height: petal.size,
            borderRadius: '50% 0 50% 50%',
            background: 'linear-gradient(135deg, #f8d7e3, #f4a6b5)',
            opacity: 0.4,
          }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, petal.rotation + 720],
            x: [0, Math.sin(petal.id) * 60],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
