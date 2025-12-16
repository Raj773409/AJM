import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { Baby, Flame, Heart, Shield, Cross, Users } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Baby: <Baby />,
  Flame: <Flame />,
  Heart: <Heart />,
  Shield: <Shield />,
  Cross: <Cross />,
  Users: <Users />
};

const Ministries: React.FC = () => {
  const { ministries } = useApp();

  return (
    <section id="ministries" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-brand-600 font-semibold tracking-wide uppercase mb-3">Our Ministries</h2>
          <h3 className="text-4xl font-serif font-bold text-gray-900">Connect & Grow</h3>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            There is a place for everyone to belong, serve, and grow in their walk with God.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.title + index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative group">
                <img 
                  src={ministry.image} 
                  alt={ministry.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 p-2 bg-brand-500 rounded-lg text-white">
                  {iconMap[ministry.iconName] || <Flame />}
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-xl font-bold text-gray-900 mb-3">{ministry.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {ministry.description}
                </p>
                <button className="text-brand-600 font-semibold text-sm hover:text-brand-700 self-start transition-colors">
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ministries;