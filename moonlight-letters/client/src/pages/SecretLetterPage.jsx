import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Heart, KeyRound } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import FallingPetals from '../components/FallingPetals';
import { unlockLetter } from '../services/endpoints';

function TypingText({ text, speed = 30 }) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex((i) => i + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  return (
    <div className="whitespace-pre-wrap font-serif text-base sm:text-lg leading-relaxed text-[#4a3728]/80">
      {displayed}
      {index < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-rose/60 ml-0.5 align-baseline"
        />
      )}
    </div>
  );
}

export default function SecretLetterPage() {
  const [password, setPassword] = useState('');
  const [letter, setLetter] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!unlocked && inputRef.current) {
      inputRef.current.focus();
    }
  }, [unlocked]);

  const handleUnlock = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await unlockLetter(password);
      setLetter(res.data);
      setUnlocked(true);
    } catch {
      setError('That\'s not it, Alo. Try again, chocolate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-dreamy-warm pt-24 pb-16 relative">
        <AnimatePresence>
          {!unlocked ? (
            <motion.div
              key="lock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center min-h-[60vh] px-6"
            >
              {/* Lock icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-blush to-lavender flex items-center justify-center mb-8 shadow-dreamy"
              >
                <Lock className="w-8 h-8 text-mauve" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-serif text-3xl sm:text-4xl text-[#3d2b1f] mb-3 text-center"
              >
                A Secret Letter
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-mauve/50 text-sm mb-10 text-center"
              >
                This letter is only for you, Alo. Enter our secret word.
              </motion.p>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                onSubmit={handleUnlock}
                className="w-full max-w-sm"
              >
                <div className="relative mb-4">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mauve/40" />
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter the secret word…"
                    className="w-full pl-11 pr-4 py-4 rounded-2xl glass text-sm text-[#3d2b1f] placeholder-mauve/30 focus:outline-none focus:ring-2 focus:ring-rose/30 transition-all border-none"
                  />
                </div>

                {error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-rose text-xs text-center mb-4"
                  >
                    {error}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || !password}
                  className="w-full py-4 rounded-2xl text-white font-light text-sm tracking-wide cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg, #f4a6b5, #c38eb4)',
                    boxShadow: '0 4px 20px rgba(244,166,181,0.25)',
                  }}
                >
                  {loading ? 'Unlocking…' : 'Open My Letter'}
                </motion.button>
              </motion.form>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="max-w-2xl mx-auto px-6"
            >
              <FallingPetals count={12} />

              {/* Letter header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="inline-flex items-center gap-2 mb-4"
                >
                  <Heart className="w-5 h-5 text-rose" fill="currentColor" />
                </motion.div>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#3d2b1f]">
                  {letter.title}
                </h1>
              </div>

              {/* Letter body */}
              <div className="glass rounded-3xl p-8 sm:p-12 shadow-dreamy">
                <TypingText text={letter.content} speed={25} />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-center mt-8 font-cursive text-2xl text-mauve/60"
              >
                forever yours, Mimi ♡
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
