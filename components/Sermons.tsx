import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, X, Calendar, User, Clock, Tag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Sermon } from '../types';

const Sermons: React.FC = () => {
  const { sermons } = useApp();
  const [selectedSermon, setSelectedSermon] = useState<Sermon | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(sermons.map(s => s.category || 'General'));
    return ['All', ...Array.from(cats)];
  }, [sermons]);

  const filteredSermons = useMemo(() => {
    if (activeCategory === 'All') return sermons;
    return sermons.filter(s => (s.category || 'General') === activeCategory);
  }, [sermons, activeCategory]);

  return (
    <section id="sermons" className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-brand-500 font-semibold tracking-wide uppercase mb-3">Media</h2>
          <h3 className="text-4xl font-serif font-bold">Worship & Sermons</h3>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/25 scale-105'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredSermons.map((sermon) => (
              <motion.div
                layout
                key={sermon.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
                onClick={() => setSelectedSermon(sermon)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4 shadow-lg bg-gray-800">
                  <img 
                    src={sermon.thumbnail} 
                    alt={sermon.title} 
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://picsum.photos/400/225?grayscale"; 
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs font-mono">
                    {sermon.duration}
                  </div>
                  <div className="absolute top-2 left-2 bg-brand-500/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm">
                    {sermon.category || 'General'}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-1 group-hover:text-brand-400 transition-colors">{sermon.title}</h4>
                <p className="text-gray-400 text-sm mb-1">{sermon.preacher}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{sermon.date}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSermons.length === 0 && (
            <div className="text-center text-gray-500 py-10">
                No sermons found in this category.
            </div>
        )}
      </div>

      {/* Sermon Modal */}
      <AnimatePresence>
        {selectedSermon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSermon(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="relative aspect-video bg-black">
                <img 
                   src={selectedSermon.thumbnail} 
                   alt={selectedSermon.title}
                   className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <PlayCircle className="w-20 h-20 text-white/90" />
                </div>
                <button 
                  onClick={() => setSelectedSermon(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-brand-600 px-2 py-0.5 rounded text-xs font-bold uppercase">{selectedSermon.category || 'General'}</span>
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-white mb-2">{selectedSermon.title}</h3>
                    <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                       <span className="flex items-center gap-1"><User className="w-4 h-4"/> {selectedSermon.preacher}</span>
                       <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {selectedSermon.date}</span>
                       <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {selectedSermon.duration}</span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-full transition-colors whitespace-nowrap">
                    Watch Now
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-brand-400 mb-2">About This Message</h4>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedSermon.description}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-700">
                    <h4 className="text-lg font-bold text-brand-400 mb-2">Speaker Bio</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {selectedSermon.speakerBio}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Related Media</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {sermons.filter(s => s.id !== selectedSermon.id && s.category === selectedSermon.category).slice(0, 2).map(s => (
                       <div key={s.id} className="group cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => setSelectedSermon(s)}>
                          <div className="aspect-video bg-gray-700 rounded-lg overflow-hidden mb-2 relative">
                            <img src={s.thumbnail} className="w-full h-full object-cover" alt={s.title}/>
                            <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded">{s.duration}</span>
                          </div>
                          <p className="text-white font-bold text-sm truncate">{s.title}</p>
                       </div>
                    ))}
                    {sermons.filter(s => s.id !== selectedSermon.id && s.category === selectedSermon.category).length === 0 && (
                        <p className="text-gray-500 text-sm">No related sermons found.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Sermons;