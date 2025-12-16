
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, FileText, Music, Disc, Search, X, Volume2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ALPHABETS_ENGLISH, ALPHABETS_TELUGU, ALPHABETS_HINDI } from '../constants';
import { SongType, SongLanguage, Song } from '../types';

// Helper to extract YouTube ID
const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const ChristmasSongs: React.FC = () => {
  const { songs } = useApp();
  const christmasSongs = useMemo(() => songs.filter(s => s.category === 'Christmas'), [songs]);
  
  const [activeTab, setActiveTab] = useState<SongType>('audio');
  const [activeLanguage, setActiveLanguage] = useState<SongLanguage>('English');
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  // Filter Logic
  const filteredSongs = useMemo(() => {
    return christmasSongs.filter(song => {
      // 1. Filter by Tab (Type)
      const matchTab = song.type === activeTab;
      
      // 2. Filter by Language
      const matchLang = song.language === activeLanguage;
      
      // 3. Filter by Alphabet
      const matchLetter = selectedLetter === 'All' ? true : song.title.startsWith(selectedLetter);
      
      // 4. Filter by Search Query (Title or Lyrics)
      const searchLower = searchQuery.toLowerCase();
      const matchSearch = searchQuery === '' || 
                          song.title.toLowerCase().includes(searchLower) ||
                          (song.content && song.content.toLowerCase().includes(searchLower));

      return matchTab && matchLang && matchLetter && matchSearch;
    });
  }, [activeTab, activeLanguage, selectedLetter, searchQuery, christmasSongs]);

  // Determine which alphabet to show
  const currentAlphabet = useMemo(() => {
    if (activeLanguage === 'English') return ALPHABETS_ENGLISH;
    if (activeLanguage === 'Telugu') return ALPHABETS_TELUGU;
    if (activeLanguage === 'Hindi') return ALPHABETS_HINDI;
    return ALPHABETS_ENGLISH;
  }, [activeLanguage]);

  // Handle Tab Switch (Reset filters)
  const handleLanguageChange = (lang: SongLanguage) => {
    setActiveLanguage(lang);
    setSelectedLetter('All');
  };

  return (
    <section id="christmas-songs" className="py-24 bg-gradient-to-b from-gray-900 via-brand-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-10 right-10 w-96 h-96 bg-red-600 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-10 left-10 w-96 h-96 bg-green-600 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="inline-block p-2 px-4 bg-white/10 rounded-full text-brand-300 text-sm font-bold tracking-widest mb-4 backdrop-blur-sm border border-white/10"
          >
            CELEBRATE THE SEASON
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-red-400">
            Christmas Songs
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Experience the joy of Christmas through our collection of melodies, videos, and lyrics in multiple languages.
          </p>
        </div>

        {/* Controls Container */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 mb-10 shadow-2xl">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search songs by title or lyrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-inner"
              />
            </div>

            {/* Top Row: Type & Language */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                {/* Media Type Tabs */}
                <div className="flex bg-black/40 rounded-full p-1 border border-white/10">
                    {(['audio', 'video', 'lyrics'] as SongType[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveTab(type)}
                            className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                                activeTab === type 
                                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/50' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            {type === 'audio' && <Disc className="w-4 h-4"/>}
                            {type === 'video' && <PlayCircle className="w-4 h-4"/>}
                            {type === 'lyrics' && <FileText className="w-4 h-4"/>}
                            {type}
                        </button>
                    ))}
                </div>

                {/* Language Filter */}
                <div className="flex gap-2">
                    {(['English', 'Telugu', 'Hindi'] as SongLanguage[]).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => handleLanguageChange(lang)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                                activeLanguage === lang
                                    ? 'bg-white text-brand-900 border-white font-bold'
                                    : 'bg-transparent text-white/60 border-white/10 hover:border-white/40'
                            }`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>

            {/* Alphabet Scroll */}
            <div className="relative">
                <div className="overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex gap-2 min-w-max px-2">
                        <button
                            onClick={() => setSelectedLetter('All')}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                selectedLetter === 'All' 
                                    ? 'bg-green-600 text-white shadow-lg scale-110' 
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            All
                        </button>
                        {currentAlphabet.map((letter) => (
                            <button
                                key={letter}
                                onClick={() => setSelectedLetter(letter)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border border-transparent ${
                                    selectedLetter === letter 
                                        ? 'bg-white text-brand-900 scale-110 border-brand-500' 
                                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
            <AnimatePresence mode="popLayout">
                {filteredSongs.length > 0 ? (
                    filteredSongs.map((song) => (
                        <motion.div
                            layout
                            key={song.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={() => setSelectedSong(song)}
                            className="bg-gray-800/50 rounded-2xl p-4 hover:bg-gray-800 transition-colors border border-gray-700 hover:border-gray-600 group cursor-pointer shadow-lg hover:shadow-brand-900/20"
                        >
                            {/* Card Content Based on Type */}
                            {song.type === 'video' && (
                                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black">
                                    <img 
                                      src={song.thumbnail || "https://picsum.photos/400/225?grayscale"} 
                                      alt={song.title} 
                                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <PlayCircle className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">{song.duration}</span>
                                </div>
                            )}

                            {song.type === 'audio' && (
                                <div className="flex items-center justify-center aspect-[2/1] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl mb-4 relative overflow-hidden group-hover:shadow-inner">
                                    <div className="absolute inset-0 bg-brand-500/10 group-hover:bg-brand-500/20 transition-colors"></div>
                                    <Music className="w-12 h-12 text-gray-600 group-hover:text-brand-500 transition-colors" />
                                    <span className="absolute bottom-2 right-2 bg-black/40 text-gray-300 text-[10px] px-1.5 py-0.5 rounded">{song.duration}</span>
                                </div>
                            )}

                            {song.type === 'lyrics' && (
                                <div className="aspect-[2/1] bg-white text-gray-800 rounded-xl mb-4 p-4 text-xs overflow-hidden relative font-serif italic leading-relaxed shadow-inner">
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90"></div>
                                    "{song.content?.substring(0, 100)}..."
                                </div>
                            )}

                            <h3 className="font-bold text-lg mb-1 group-hover:text-brand-400 transition-colors truncate">{song.title}</h3>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>{song.language}</span>
                                <span className="uppercase tracking-wider font-bold text-brand-500">{song.type}</span>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-20">
                        <div className="p-4 bg-white/5 rounded-full mb-4">
                             <Search className="w-8 h-8 opacity-50" />
                        </div>
                        <p className="text-xl font-medium">No songs found matching "{searchQuery}"</p>
                        {selectedLetter !== 'All' && <p className="text-sm mt-2">Filter active: Starts with "{selectedLetter}"</p>}
                        <button onClick={() => { setSearchQuery(''); setSelectedLetter('All'); }} className="mt-6 px-6 py-2 bg-brand-600 rounded-full text-white hover:bg-brand-700 transition-colors">
                            Clear All Filters
                        </button>
                    </div>
                )}
            </AnimatePresence>
        </div>

        {/* Details Modal */}
        <AnimatePresence>
          {selectedSong && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSong(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
              />
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-800/50">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white">{selectedSong.title}</h3>
                    <div className="flex gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-brand-600/20 text-brand-400 text-xs rounded border border-brand-500/30 uppercase font-bold">{selectedSong.language}</span>
                        <span className="px-2 py-0.5 bg-white/10 text-gray-300 text-xs rounded border border-white/10 uppercase font-bold">{selectedSong.type}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedSong(null)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto bg-gray-900">
                  {/* LYRICS VIEW */}
                  {selectedSong.type === 'lyrics' && (
                    <div className="bg-white/5 rounded-xl p-8 font-serif text-lg leading-loose text-gray-200 whitespace-pre-line text-center shadow-inner border border-white/5">
                      {selectedSong.content}
                    </div>
                  )}

                  {/* VIDEO VIEW */}
                  {selectedSong.type === 'video' && (
                    <div className="space-y-4">
                       <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center border border-gray-800 relative shadow-2xl">
                          {selectedSong.url && getYoutubeId(selectedSong.url) ? (
                              <iframe 
                                width="100%" 
                                height="100%" 
                                src={`https://www.youtube.com/embed/${getYoutubeId(selectedSong.url)}?autoplay=1`} 
                                title={selectedSong.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                          ) : selectedSong.url && selectedSong.url !== '#' ? (
                              <video controls autoPlay className="w-full h-full">
                                  <source src={selectedSong.url} type="video/mp4" />
                                  Your browser does not support the video tag.
                              </video>
                          ) : (
                              <div className="text-center">
                                 <PlayCircle className="w-16 h-16 text-brand-500 mx-auto mb-4 opacity-50" />
                                 <p className="text-gray-500">Video source not available</p>
                              </div>
                          )}
                       </div>
                       <p className="text-gray-400 text-sm text-center font-mono">Duration: {selectedSong.duration}</p>
                    </div>
                  )}

                  {/* AUDIO VIEW */}
                  {selectedSong.type === 'audio' && (
                    <div className="flex flex-col items-center justify-center py-10 space-y-8">
                       <div className="w-40 h-40 bg-gradient-to-br from-brand-600 to-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-brand-500/20 animate-pulse-slow relative">
                          <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-white/50 animate-spin-slow"></div>
                          <Volume2 className="w-16 h-16 text-white" />
                       </div>
                       
                       {selectedSong.url && selectedSong.url !== '#' ? (
                            <div className="w-full max-w-md bg-white/5 p-4 rounded-xl border border-white/10">
                                <audio controls className="w-full" autoPlay>
                                    <source src={selectedSong.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                       ) : (
                            <div className="text-center bg-white/5 px-6 py-4 rounded-xl">
                                 <p className="text-gray-400 text-sm">Audio source not available</p>
                                 <p className="text-xs text-gray-600 mt-1">Please check back later</p>
                            </div>
                       )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ChristmasSongs;
