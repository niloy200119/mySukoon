import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { getGallery } from '../services/endpoints';

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  const image = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-cream/90 backdrop-blur-xl" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-dreamy cursor-pointer border-none hover:bg-white transition-colors"
      >
        <X className="w-5 h-5 text-mauve" />
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-dreamy cursor-pointer border-none hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-mauve" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-dreamy cursor-pointer border-none hover:bg-white transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-mauve" />
          </button>
        </>
      )}

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 max-w-4xl max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.imageUrl}
          alt={image.title || 'Memory'}
          className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-dreamy"
        />
        {(image.title || image.description) && (
          <div className="text-center mt-4">
            {image.title && (
              <h3 className="font-serif text-xl text-[#3d2b1f]">{image.title}</h3>
            )}
            {image.description && (
              <p className="text-sm text-mauve/50 mt-1">{image.description}</p>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    getGallery()
      .then((res) => setImages(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const nextImage = () =>
    setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-16 px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-mauve/50 text-sm tracking-[0.3em] uppercase mb-3"
          >
            Moments preserved in light
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#3d2b1f]"
          >
            Memory Garden
          </motion.h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Heart className="w-8 h-8 text-rose animate-pulse-soft" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 text-mauve/40 font-light">
            No memories yet… but every moment is worth saving.
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-6">
            {/* Masonry-style grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.map((image, index) => (
                <motion.div
                  key={image._id}
                  initial={{ opacity: 0, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-dreamy">
                    <img
                      src={image.imageUrl}
                      alt={image.title || 'Memory'}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-rose/0 group-hover:bg-rose/10 transition-all duration-500 flex items-end">
                      <div className="w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {image.title && (
                          <p className="font-serif text-white text-lg drop-shadow-md">
                            {image.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              images={images}
              currentIndex={lightboxIndex}
              onClose={closeLightbox}
              onPrev={prevImage}
              onNext={nextImage}
            />
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
