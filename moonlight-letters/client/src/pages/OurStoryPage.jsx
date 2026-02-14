import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { getTimeline } from '../services/endpoints';

export default function OurStoryPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTimeline()
      .then((res) => setEvents(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-dreamy-warm pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-mauve/50 text-sm tracking-[0.3em] uppercase mb-3"
          >
            Every moment with you
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#3d2b1f]"
          >
            Our Story
          </motion.h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Heart className="w-8 h-8 text-rose animate-pulse-soft" />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-6 relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-rose/20 via-mauve/20 to-rose/20 md:transform md:-translate-x-px" />

            {events.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
                className={`relative mb-16 md:mb-20 ${
                  index % 2 === 0 ? 'md:pr-[55%]' : 'md:pl-[55%]'
                } pl-14 md:pl-0`}
              >
                {/* Timeline dot */}
                <motion.div
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                  className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-rose to-mauve shadow-lg shadow-rose/30">
                    <div className="w-full h-full rounded-full animate-pulse-soft bg-rose/50" />
                  </div>
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="glass rounded-2xl p-6 sm:p-8 shadow-dreamy"
                >
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-mauve/50" />
                    <span className="text-xs text-mauve/50 tracking-wider">
                      {formatDate(event.date)}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#3d2b1f] mb-3 font-medium">
                    {event.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#4a3728]/70 leading-relaxed font-light">
                    {event.description}
                  </p>

                  {event.image && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="mt-5 rounded-xl overflow-hidden"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 sm:h-56 object-cover rounded-xl"
                        loading="lazy"
                      />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            ))}

            {/* End marker */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center pt-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose to-mauve flex items-center justify-center shadow-lg shadow-rose/20">
                <Heart className="w-4 h-4 text-white" fill="white" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center mt-6 font-serif text-lg text-mauve/60 italic"
            >
              …and our story continues, Mimi
            </motion.p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
