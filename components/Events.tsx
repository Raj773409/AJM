import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Events: React.FC = () => {
  const { events } = useApp();

  return (
    <section id="events" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-brand-600 font-semibold tracking-wide uppercase mb-3">Calendar</h2>
            <h3 className="text-4xl font-serif font-bold text-gray-900">Upcoming Events</h3>
          </div>
          <button className="hidden md:block px-6 py-3 border-2 border-brand-500 text-brand-600 font-semibold rounded-full hover:bg-brand-50 transition-colors">
            View Full Calendar
          </button>
        </div>

        <div className="space-y-6">
          {events.length === 0 ? (
             <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-2xl">
                No upcoming events scheduled at the moment.
             </div>
          ) : (
            events.map((event, index) => (
                <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col md:flex-row bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow group"
                >
                {/* Date Box */}
                <div className="bg-brand-500 p-6 flex flex-col justify-center items-center text-white min-w-[140px]">
                    <span className="text-3xl font-bold font-serif">{event.date.split(' ').length > 1 ? event.date.split(' ')[1].replace(',', '') : 'TBA'}</span>
                    <span className="text-sm uppercase tracking-wider">{event.date.split(' ')[0]}</span>
                </div>
                
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" /> {event.time}
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {event.location}
                    </div>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">{event.title}</h4>
                    <p className="text-gray-600">{event.description}</p>
                </div>
                
                <div className="p-6 flex items-center justify-center bg-gray-50 md:bg-transparent">
                    <button className="px-6 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold group-hover:bg-brand-600 transition-colors">
                    Details
                    </button>
                </div>
                </motion.div>
            ))
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <button className="px-6 py-3 border-2 border-brand-500 text-brand-600 font-semibold rounded-full hover:bg-brand-50 transition-colors">
                View Full Calendar
            </button>
        </div>
      </div>
    </section>
  );
};

export default Events;