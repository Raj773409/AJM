
import React, { useState, useEffect } from 'react';
import { Menu, X, Flame, LogOut, Music, ChevronDown, Video, Mic2, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { AppView } from '../types';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
  const { logout, user, navigate, currentView } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (view: AppView, anchor?: string) => {
    navigate(view);
    setIsOpen(false);
    setMediaDropdownOpen(false);
    if (view === 'home' && anchor) {
        // Allow time for home to render then scroll
        setTimeout(() => {
            const el = document.getElementById(anchor);
            if(el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || currentView !== 'home' ? 'bg-white shadow-lg py-3' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNav('home')}>
            <Flame className={`h-8 w-8 ${scrolled || currentView !== 'home' ? 'text-brand-600' : 'text-white'}`} />
            <span className={`ml-2 font-serif font-bold text-xl tracking-wider ${scrolled || currentView !== 'home' ? 'text-gray-900' : 'text-white'}`}>
              AGNI JAWALA
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Links Container */}
            <div className={`flex items-center gap-6 px-4 py-2 rounded-full backdrop-blur-sm border shadow-sm ${scrolled || currentView !== 'home' ? 'bg-gray-100 border-gray-200' : 'bg-white/5 border-white/10'}`}>
                <button onClick={() => handleNav('home', 'home')} className={`text-sm font-medium transition-colors hover:text-brand-500 uppercase tracking-wide ${scrolled || currentView !== 'home' ? 'text-gray-700' : 'text-white/90'}`}>Home</button>
                <button onClick={() => handleNav('home', 'about')} className={`text-sm font-medium transition-colors hover:text-brand-500 uppercase tracking-wide ${scrolled || currentView !== 'home' ? 'text-gray-700' : 'text-white/90'}`}>About</button>
                
                {/* Media Dropdown */}
                <div className="relative group">
                    <button 
                        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-500 uppercase tracking-wide ${scrolled || currentView !== 'home' ? 'text-gray-700' : 'text-white/90'}`}
                        onMouseEnter={() => setMediaDropdownOpen(true)}
                    >
                        Media <ChevronDown className="w-4 h-4"/>
                    </button>
                    {/* Dropdown Menu */}
                    <div 
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transform opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all origin-top-left invisible group-hover:visible"
                        onMouseLeave={() => setMediaDropdownOpen(false)}
                    >
                        <button onClick={() => handleNav('audio')} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium border-b border-gray-50">
                            <Music className="w-4 h-4 text-brand-500"/> Audio Songs
                        </button>
                        <button onClick={() => handleNav('video')} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium border-b border-gray-50">
                            <Video className="w-4 h-4 text-brand-500"/> Video Songs
                        </button>
                        <button onClick={() => handleNav('lyrics')} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium border-b border-gray-50">
                            <Mic2 className="w-4 h-4 text-brand-500"/> Song Lyrics
                        </button>
                        <button onClick={() => handleNav('dance')} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2 text-gray-700 font-medium">
                            <Sparkles className="w-4 h-4 text-purple-500"/> Dance & Praise
                        </button>
                    </div>
                </div>

                <button onClick={() => handleNav('home', 'events')} className={`text-sm font-medium transition-colors hover:text-brand-500 uppercase tracking-wide ${scrolled || currentView !== 'home' ? 'text-gray-700' : 'text-white/90'}`}>Events</button>
                <button onClick={() => handleNav('home', 'contact')} className={`text-sm font-medium transition-colors hover:text-brand-500 uppercase tracking-wide ${scrolled || currentView !== 'home' ? 'text-gray-700' : 'text-white/90'}`}>Contact</button>
            </div>

            {/* Christmas Songs CTA */}
            <button 
                onClick={() => handleNav('christmas')}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm shadow-xl transform hover:scale-105 transition-all ${
                    scrolled || currentView !== 'home'
                        ? 'bg-gradient-to-r from-red-600 to-green-700 text-white shadow-red-500/20' 
                        : 'bg-white text-red-600 shadow-white/20'
                }`}
            >
                <Star className="w-4 h-4 fill-current" />
                CHRISTMAS
            </button>
            
            {/* User Info & Logout */}
            <div className={`flex items-center gap-3 pl-4 border-l ${scrolled || currentView !== 'home' ? 'border-gray-200' : 'border-white/20'}`}>
                <div className="text-right hidden xl:block">
                    <p className={`text-xs font-semibold ${scrolled || currentView !== 'home' ? 'text-gray-900' : 'text-white'}`}>
                        {user?.name.split(' ')[0]}
                    </p>
                    <p className={`text-[10px] uppercase tracking-wider ${scrolled || currentView !== 'home' ? 'text-gray-500' : 'text-white/70'}`}>
                        Member
                    </p>
                </div>
                <button
                    onClick={logout}
                    className={`p-2 rounded-full transition-colors ${
                        scrolled || currentView !== 'home'
                            ? 'text-gray-400 hover:text-red-500 hover:bg-gray-100' 
                            : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    title="Logout"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled || currentView !== 'home' ? 'text-gray-900' : 'text-white'} hover:text-brand-500 focus:outline-none`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white shadow-xl overflow-hidden border-t border-gray-100"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              <button onClick={() => handleNav('home', 'home')} className="block w-full text-left px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50">Home</button>
              
              <div className="py-2 border-t border-b border-gray-50 my-2">
                  <p className="px-3 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Media Library</p>
                  <button onClick={() => handleNav('audio')} className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 flex items-center gap-2"><Music size={16}/> Audio Songs</button>
                  <button onClick={() => handleNav('video')} className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 flex items-center gap-2"><Video size={16}/> Video Songs</button>
                  <button onClick={() => handleNav('lyrics')} className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 flex items-center gap-2"><Mic2 size={16}/> Lyrics</button>
                  <button onClick={() => handleNav('dance')} className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 flex items-center gap-2"><Sparkles size={16}/> Dance & Praise</button>
              </div>

              <button onClick={() => handleNav('home', 'events')} className="block w-full text-left px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50">Events</button>
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleNav('christmas')}
                    className="block w-full text-center px-4 py-3 bg-red-600 text-white rounded-xl font-bold mb-3 shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                  >
                    <Star size={18} fill="currentColor"/> CHRISTMAS SPECIAL
                  </button>
                  <button 
                    onClick={logout}
                    className="block w-full text-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
                  >
                    Logout
                  </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
