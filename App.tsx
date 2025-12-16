
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Ministries from './components/Ministries';
import Events from './components/Events';
import Sermons from './components/Sermons';
import MediaPage from './components/MediaPage';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrayerAI from './components/PrayerAI';
import BackToTop from './components/BackToTop';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import BibleLoader from './components/BibleLoader';
import { AppProvider, useApp } from './contexts/AppContext';

// Inner component to handle Auth logic and Navigation
const AppContent = () => {
  const { user, currentView, isLoading } = useApp();

  // Authentication Check
  if (!user) {
    return <Login />;
  }

  // Admin View
  if (currentView === 'admin' && user.role === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-200 selection:text-brand-900">
      <Navbar />
      
      <AnimatePresence mode="wait">
        {isLoading && <BibleLoader />}
      </AnimatePresence>

      <main>
        {/* VIEW ROUTING LOGIC */}
        {currentView === 'home' && (
            <>
                <Hero />
                <About />
                {/* Note: Christmas Songs section removed from home page to prevent clutter as requested */}
                <Ministries />
                <Sermons />
                <Testimonials />
                <Events />
                <Contact />
            </>
        )}

        {(currentView === 'audio' || currentView === 'video' || currentView === 'lyrics' || currentView === 'christmas' || currentView === 'dance') && (
            <MediaPage viewType={currentView} />
        )}

      </main>
      
      <Footer />
      <PrayerAI />
      <BackToTop />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
