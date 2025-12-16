
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Hero: React.FC = () => {
  const { heroImages } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  // Fallback if no images
  const currentImageUrl = heroImages.length > 0 
    ? heroImages[currentImageIndex]?.url 
    : "https://picsum.photos/1920/1080?grayscale";

  return (
    <div id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImageIndex} // Key change triggers animation
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${currentImageUrl}')` }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.span 
            className="inline-block py-1 px-3 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-300 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            WELCOME TO AGNI JAWALA
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-lg">
            Ignite Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-500">
              Spiritual Fire
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
            A place of worship, community, and transformation. 
            Join us as we pursue God's presence together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="#events"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-full font-bold text-lg shadow-lg shadow-brand-500/30 transition-all"
            >
              Join Us This Sunday
            </motion.a>
            <motion.a 
              href="#sermons"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              Watch Sermons
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </div>
  );
};

export default Hero;
