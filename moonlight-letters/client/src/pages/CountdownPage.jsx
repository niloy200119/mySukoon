import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

function CountdownRing({ label, value, max, color }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background ring */}
          <circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke="rgba(244,166,181,0.15)"
            strokeWidth="4"
          />
          {/* Progress ring */}
          <motion.circle
            cx="50" cy="50" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        {/* Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={value}
            initial={{ scale: 1.1, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            className="font-serif text-3xl sm:text-4xl text-[#3d2b1f]"
          >
            {value}
          </motion.span>
        </div>
      </div>
      <span className="mt-2 text-xs text-mauve/50 tracking-wider uppercase">{label}</span>
    </div>
  );
}

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculate(targetDate));

  function calculate(target) {
    const diff = new Date(target) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculate(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

export default function CountdownPage() {
  const navigate = useNavigate();

  // Next Valentine's Day
  const now = new Date();
  let valentinesYear = now.getFullYear();
  const valentines = new Date(valentinesYear, 1, 14); // Feb 14
  if (now >= valentines) valentinesYear++;
  const nextValentines = new Date(valentinesYear, 1, 14);

  // Anniversary — customize this date
  const anniversaryDate = new Date('2024-03-15');
  let nextAnniversary = new Date(
    now.getFullYear(),
    anniversaryDate.getMonth(),
    anniversaryDate.getDate()
  );
  if (now >= nextAnniversary) {
    nextAnniversary = new Date(
      now.getFullYear() + 1,
      anniversaryDate.getMonth(),
      anniversaryDate.getDate()
    );
  }

  const valentinesCountdown = useCountdown(nextValentines);
  const anniversaryCountdown = useCountdown(nextAnniversary);

  const [showFinale, setShowFinale] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const handleAlways = () => {
    // Create confetti hearts
    const hearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      size: 12 + Math.random() * 16,
    }));
    setConfetti(hearts);
    setShowFinale(true);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-dreamy pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <Clock className="w-6 h-6 text-mauve/40" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-mauve/50 text-sm tracking-[0.3em] uppercase mb-3"
          >
            Every second closer to you, Alo
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#3d2b1f]"
          >
            Counting the Moments
          </motion.h1>
        </div>

        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* Valentine's Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 sm:p-12 shadow-dreamy text-center"
          >
            <h2 className="font-serif text-2xl sm:text-3xl text-[#3d2b1f] mb-2">
              Until Valentine's Day
            </h2>
            <p className="text-sm text-mauve/40 mb-8">
              {nextValentines.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
              <CountdownRing label="Days" value={valentinesCountdown.days} max={365} color="#f4a6b5" />
              <CountdownRing label="Hours" value={valentinesCountdown.hours} max={24} color="#c38eb4" />
              <CountdownRing label="Minutes" value={valentinesCountdown.minutes} max={60} color="#e8e6ff" />
              <CountdownRing label="Seconds" value={valentinesCountdown.seconds} max={60} color="#ffe5d4" />
            </div>
          </motion.div>

          {/* Anniversary Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass rounded-3xl p-8 sm:p-12 shadow-dreamy text-center"
          >
            <h2 className="font-serif text-2xl sm:text-3xl text-[#3d2b1f] mb-2">
              Until Our Anniversary
            </h2>
            <p className="text-sm text-mauve/40 mb-8">
              {nextAnniversary.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
              <CountdownRing label="Days" value={anniversaryCountdown.days} max={365} color="#c38eb4" />
              <CountdownRing label="Hours" value={anniversaryCountdown.hours} max={24} color="#f4a6b5" />
              <CountdownRing label="Minutes" value={anniversaryCountdown.minutes} max={60} color="#ffe5d4" />
              <CountdownRing label="Seconds" value={anniversaryCountdown.seconds} max={60} color="#e8e6ff" />
            </div>
          </motion.div>

          {/* Forever Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center py-16 relative"
          >
            {/* Floating confetti hearts */}
            {confetti.map((h) => (
              <motion.div
                key={h.id}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: -400, opacity: 0, x: (Math.random() - 0.5) * 200 }}
                transition={{ duration: 2, delay: h.delay, ease: 'easeOut' }}
                className="absolute z-20"
                style={{ left: `${h.x}%`, bottom: '40%' }}
              >
                <Heart
                  className="text-rose"
                  fill="currentColor"
                  style={{ width: h.size, height: h.size, opacity: 0.6 }}
                />
              </motion.div>
            ))}

            <motion.h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3d2b1f] leading-snug max-w-xl mx-auto mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              If the world gets loud, Afsana…
              <br />
              <span className="text-rose">I will still choose you, Mimi</span>
              <br />
              in the quiet.
            </motion.h2>

            {!showFinale ? (
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAlways}
                className="mt-8 px-10 py-4 rounded-2xl text-white font-serif text-lg tracking-wide cursor-pointer border-none"
                style={{
                  background: 'linear-gradient(135deg, #f4a6b5, #c38eb4)',
                  boxShadow: '0 4px 20px rgba(244,166,181,0.3)',
                }}
              >
                Always.
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-10"
              >
                <p className="font-cursive text-3xl sm:text-4xl text-mauve">
                  Every lifetime, Alo.
                </p>
                <p className="text-sm text-mauve/40 mt-2 font-light">— your chocolate boy</p>
                <Heart className="w-6 h-6 text-rose mx-auto mt-4 animate-pulse-soft" fill="currentColor" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
