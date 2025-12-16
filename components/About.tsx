import React from 'react';
import { motion } from 'framer-motion';
import { Target, Heart, Users } from 'lucide-react';

const About: React.FC = () => {
  const cards = [
    { icon: <Heart className="w-8 h-8 text-brand-500" />, title: "Love God", text: "We believe in passionate worship and wholehearted devotion to our Creator." },
    { icon: <Users className="w-8 h-8 text-brand-500" />, title: "Love People", text: "Building a supportive community where everyone feels like family." },
    { icon: <Target className="w-8 h-8 text-brand-500" />, title: "Serve the World", text: "Extending God's love beyond our four walls through outreach and missions." },
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-brand-600 font-semibold tracking-wide uppercase mb-3">Who We Are</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              A Church Driven by <br/> the <span className="text-brand-600">Flame of Faith</span>
            </h3>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Agni Jawala Ministries, our name signifies the burning desire to see lives transformed by the power of the Holy Spirit. 
              Founded on biblical truth, we are a multi-generational community committed to revival, healing, and restoration.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Whether you are exploring faith for the first time or looking for a new spiritual home, you are welcome here. 
              Come as you are, and leave changed.
            </p>
            <div className="h-1 w-20 bg-brand-500 rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="flex items-start p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="bg-white p-3 rounded-xl shadow-sm mr-4">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h4>
                  <p className="text-gray-600">{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;