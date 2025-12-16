import React from 'react';
import { motion } from 'framer-motion';
import { Play, Quote } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Testimonials: React.FC = () => {
  const { testimonials } = useApp();

  return (
    <section id="stories" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50 skew-x-12 transform translate-x-20 z-0 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase mb-3">Stories of Faith</h2>
          <h3 className="text-4xl font-serif font-bold text-gray-900">Testimonials</h3>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories of how God is moving in the lives of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200 border border-gray-100 flex flex-col h-full hover:border-brand-200 transition-colors group"
            >
              <div className="relative rounded-xl overflow-hidden mb-6 aspect-video bg-gray-100 cursor-pointer shadow-inner">
                <img 
                  src={story.thumbnail} 
                  alt={story.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-brand-600 fill-current" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded text-white text-xs font-medium">
                  {story.videoDuration}
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="mb-4 text-brand-500">
                  <Quote className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-gray-600 italic mb-6 flex-1 text-lg">
                  "{story.quote}"
                </p>
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <h4 className="font-bold text-gray-900 text-lg">{story.name}</h4>
                  <p className="text-brand-600 text-sm font-medium">{story.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;