import React from 'react';
import { Flame, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <Flame className="h-8 w-8 text-brand-500" />
              <span className="ml-2 font-serif font-bold text-xl tracking-wider">
                AGNI JAWALA
              </span>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
              Igniting hearts with the fire of the Holy Spirit. We are dedicated to spreading the Gospel, serving the community, and equipping believers for works of service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-600 transition-colors"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-600 transition-colors"><Instagram className="w-5 h-5"/></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-600 transition-colors"><Youtube className="w-5 h-5"/></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-brand-600 transition-colors"><Twitter className="w-5 h-5"/></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#about" className="hover:text-brand-500 transition-colors">About Us</a></li>
              <li><a href="#ministries" className="hover:text-brand-500 transition-colors">Ministries</a></li>
              <li><a href="#events" className="hover:text-brand-500 transition-colors">Events</a></li>
              <li><a href="#sermons" className="hover:text-brand-500 transition-colors">Sermons</a></li>
              <li><a href="#contact" className="hover:text-brand-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Service Times</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex justify-between">
                <span>Sunday Service</span>
                <span className="text-brand-500">10:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Bible Study</span>
                <span className="text-brand-500">Wed 7:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Friday Prayer</span>
                <span className="text-brand-500">6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Agni Jawala Ministries. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;