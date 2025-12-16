
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Cross } from 'lucide-react';

const BibleLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      {/* Holy Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/40 via-transparent to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        className="relative"
      >
        {/* Book/Bible Animation */}
        <motion.div
           animate={{ 
             rotateX: [0, 10, 0], 
             y: [0, -10, 0]
           }}
           transition={{ 
             duration: 2, 
             repeat: Infinity, 
             ease: "easeInOut" 
           }}
           className="relative z-10 text-brand-100"
        >
          <BookOpen size={120} strokeWidth={1} />
        </motion.div>

        {/* Rising Cross */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: -40, opacity: 1 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0 text-brand-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.8)]"
        >
          <Cross size={60} fill="currentColor" />
        </motion.div>

        {/* Rays of Light */}
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-transparent via-brand-500/10 to-transparent z-[-1] blur-xl rounded-full"
        />
      </motion.div>

      <motion.h2
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-12 text-2xl font-serif text-brand-100 tracking-widest uppercase font-bold"
      >
        Loading Word...
      </motion.h2>
    </div>
  );
};

export default BibleLoader;
