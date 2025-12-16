
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Event, Sermon, Ministry, Testimonial, Song, HeroImage, AppContextType, AppView } from '../types';
import { UPCOMING_EVENTS, RECENT_SERMONS, MINISTRIES, TESTIMONIALS, CHRISTMAS_SONGS, HERO_IMAGES } from '../constants';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- Auth State ---
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('app_user');
    return saved ? JSON.parse(saved) : null;
  });

  // --- View State ---
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [isLoading, setIsLoading] = useState(false);

  // --- Data State ---
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('db_users');
    return saved ? JSON.parse(saved) : [];
  });

  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('db_events');
    return saved ? JSON.parse(saved) : UPCOMING_EVENTS;
  });

  const [sermons, setSermons] = useState<Sermon[]>(() => {
    const saved = localStorage.getItem('db_sermons');
    return saved ? JSON.parse(saved) : RECENT_SERMONS;
  });

  const [ministries, setMinistries] = useState<Ministry[]>(() => {
    const saved = localStorage.getItem('db_ministries');
    return saved ? JSON.parse(saved) : MINISTRIES;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('db_testimonials');
    return saved ? JSON.parse(saved) : TESTIMONIALS;
  });

  const [songs, setSongs] = useState<Song[]>(() => {
    const saved = localStorage.getItem('db_songs');
    return saved ? JSON.parse(saved) : CHRISTMAS_SONGS;
  });

  const [heroImages, setHeroImages] = useState<HeroImage[]>(() => {
    const saved = localStorage.getItem('db_hero_images');
    if (saved) return JSON.parse(saved);
    return HERO_IMAGES.map((url, index) => ({ id: index, url }));
  });

  // --- Persistence Effects ---
  useEffect(() => localStorage.setItem('app_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('db_users', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('db_events', JSON.stringify(events)), [events]);
  useEffect(() => localStorage.setItem('db_sermons', JSON.stringify(sermons)), [sermons]);
  useEffect(() => localStorage.setItem('db_ministries', JSON.stringify(ministries)), [ministries]);
  useEffect(() => localStorage.setItem('db_testimonials', JSON.stringify(testimonials)), [testimonials]);
  useEffect(() => localStorage.setItem('db_songs', JSON.stringify(songs)), [songs]);
  useEffect(() => localStorage.setItem('db_hero_images', JSON.stringify(heroImages)), [heroImages]);

  // --- Actions ---

  const navigate = (view: AppView) => {
    if (view === currentView) return;
    setIsLoading(true);
    // Simulate loading time for animation
    setTimeout(() => {
        setCurrentView(view);
        window.scrollTo(0,0);
        setIsLoading(false);
    }, 1500);
  };

  const login = (name: string, phoneNumber: string): boolean => {
    const isAdmin = name === "Simon Raj" && phoneNumber === "9392867166_Simon21";
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      phoneNumber,
      role: isAdmin ? 'admin' : 'user',
      joinedAt: new Date().toLocaleDateString()
    };

    setUser(newUser);
    if(isAdmin) setCurrentView('admin');

    if (!isAdmin) {
      setUsers(prev => {
        const exists = prev.find(u => u.phoneNumber === phoneNumber);
        if (!exists) return [...prev, newUser];
        return prev;
      });
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    setCurrentView('home');
    localStorage.removeItem('app_user');
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = { ...eventData, id: Date.now() };
    setEvents(prev => [...prev, newEvent]);
  };

  const deleteEvent = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const addSermon = (sermonData: Omit<Sermon, 'id'>) => {
    const newSermon: Sermon = { ...sermonData, id: Date.now() };
    setSermons(prev => [newSermon, ...prev]);
  };

  const deleteSermon = (id: number) => {
    setSermons(prev => prev.filter(s => s.id !== id));
  };

  const addMinistry = (ministryData: Omit<Ministry, 'id'>) => {
    const newMinistry: Ministry = { ...ministryData, id: Date.now() };
    setMinistries(prev => [...prev, newMinistry]);
  };

  const deleteMinistry = (title: string) => {
    setMinistries(prev => prev.filter(m => m.title !== title)); 
  };

  const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
    const newTestimonial: Testimonial = { ...testimonialData, id: Date.now() };
    setTestimonials(prev => [...prev, newTestimonial]);
  };

  const deleteTestimonial = (id: number) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const addSong = (songData: Omit<Song, 'id'>) => {
    const newSong: Song = { ...songData, id: Date.now() };
    setSongs(prev => [newSong, ...prev]);
  };

  const updateSong = (id: number, updatedData: Partial<Song>) => {
    setSongs(prev => prev.map(song => 
      song.id === id ? { ...song, ...updatedData } : song
    ));
  };

  const deleteSong = (id: number) => {
    setSongs(prev => prev.filter(s => s.id !== id));
  };

  const addHeroImage = (url: string) => {
    setHeroImages(prev => [...prev, { id: Date.now(), url }]);
  };

  const updateHeroImage = (id: number, url: string) => {
    setHeroImages(prev => prev.map(img => img.id === id ? { ...img, url } : img));
  };

  const deleteHeroImage = (id: number) => {
    setHeroImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout,
      currentView,
      navigate,
      isLoading,
      users,
      deleteUser,
      events,
      addEvent,
      deleteEvent,
      sermons,
      addSermon,
      deleteSermon,
      ministries,
      addMinistry,
      deleteMinistry,
      testimonials,
      addTestimonial,
      deleteTestimonial,
      songs,
      addSong,
      updateSong,
      deleteSong,
      heroImages,
      addHeroImage,
      updateHeroImage,
      deleteHeroImage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
