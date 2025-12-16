import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, Smartphone, User as UserIcon, Lock } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Login: React.FC = () => {
  const { login } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please enter both name and phone number.");
      return;
    }
    
    // Simple validation
    if (phone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    login(name, phone);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Effect */}
      <div 
        className="absolute inset-0 z-0 opacity-50"
        style={{
            backgroundImage: "url('https://picsum.photos/1920/1080?random=99')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)'
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 z-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-20 w-full max-w-md p-8 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-brand-600/20 p-4 rounded-full">
                <Flame className="w-12 h-12 text-brand-500" />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to Agni Jawala Ministries</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-500 transition-colors" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
            
            <div className="relative group">
              {phone.includes('_') ? (
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-500 transition-colors" />
              ) : (
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-500 transition-colors" />
              )}
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] shadow-lg shadow-brand-500/25"
          >
            Enter Sanctuary <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          "For where two or three gather in my name, there am I with them."
        </p>
      </motion.div>
    </div>
  );
};

export default Login;