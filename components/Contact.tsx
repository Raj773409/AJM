import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info */}
          <div>
            <h2 className="text-brand-600 font-semibold tracking-wide uppercase mb-3">Get in Touch</h2>
            <h3 className="text-4xl font-serif font-bold text-gray-900 mb-8">Visit Us</h3>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-brand-50 p-3 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Our Location</h4>
                  <p className="text-gray-600">123 Faith Avenue<br/>Revival City, RC 54321</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-50 p-3 rounded-lg mr-4">
                  <Phone className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-50 p-3 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">contact@agnijawala.org</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-50 p-3 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">Office Hours</h4>
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h4>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
              />
              <textarea 
                rows={4} 
                placeholder="How can we help you?" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
              ></textarea>
              <button 
                type="button" 
                className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;