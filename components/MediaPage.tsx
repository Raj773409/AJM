
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, FileText, Music, Disc, Search, X, Volume2, BookOpen, Star, Sparkles, Globe } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { ALPHABETS_ENGLISH, ALPHABETS_TELUGU, ALPHABETS_HINDI } from '../constants';
import { Song, AppView, SongLanguage } from '../types';

interface MediaPageProps {
  viewType: AppView;
}

// Helper to extract YouTube ID
const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const MediaPage: React.FC<MediaPageProps> = ({ viewType }) => {
  const { songs } = useApp();
  const [selectedLetter, setSelectedLetter] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<SongLanguage | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  // Determine Page Title & Theme
  const pageConfig = useMemo(() => {
      switch(viewType) {
          case 'audio': return { title: 'Audio Library', icon: <Disc className="w-12 h-12 text-brand-500"/>, desc: 'Listen to the sounds of worship.' };
          case 'video': return { title: 'Video Gallery', icon: <PlayCircle className="w-12 h-12 text-brand-500"/>, desc: 'Watch powerful ministrations and songs.' };
          case 'lyrics': return { title: 'Song Lyrics', icon: <FileText className="w-12 h-12 text-brand-500"/>, desc: 'Sing along with the lyrics of life.' };
          case 'christmas': return { title: 'Christmas Special', icon: <Star className="w-12 h-12 text-yellow-500"/>, desc: 'Celebrate the birth of our Savior.' };
          case 'dance': return { title: 'Dance & Praise', icon: <Sparkles className="w-12 h-12 text-purple-500"/>, desc: 'Express your joy through movement.' };
          default: return { title: 'Media', icon: <Music/>, desc: '' };
      }
  }, [viewType]);

  // Filter & Sort Logic
  const filteredSongs = useMemo(() => {
    // 1. First, filter the songs based on hard criteria
    const filtered = songs.filter(song => {
      // Filter by View Type (Category or Media Type)
      let matchType = false;
      if (viewType === 'christmas') matchType = song.category === 'Christmas';
      else if (viewType === 'dance') matchType = song.category === 'Dance';
      else if (viewType === 'audio') matchType = song.type === 'audio';
      else if (viewType === 'video') matchType = song.type === 'video';
      else if (viewType === 'lyrics') matchType = song.type === 'lyrics';

      // Filter by Language
      const matchLanguage = selectedLanguage === 'All' || song.language === selectedLanguage;

      // Filter by Alphabet
      const matchLetter = selectedLetter === 'All' ? true : song.title.startsWith(selectedLetter);
      
      // Filter by Search Query (Basic inclusion check)
      const searchLower = searchQuery.toLowerCase().trim();
      // For rich text content, stripping HTML tags for search might be better, but direct inclusion check often works for basic keywords
      const matchSearch = searchQuery === '' || 
                          song.title.toLowerCase().includes(searchLower) ||
                          (song.content && song.content.toLowerCase().includes(searchLower));

      return matchType && matchLanguage && matchLetter && matchSearch;
    });

    // 2. Sort results by relevance if there is a search query
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        
        filtered.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            const contentA = a.content?.toLowerCase() || '';
            const contentB = b.content?.toLowerCase() || '';

            // Scoring function: Higher score = higher relevance
            const getScore = (t: string, c: string) => {
                if (t === query) return 100; // Exact title match (Highest Priority)
                if (t.startsWith(query)) return 80; // Starts with title
                if (t.includes(query)) return 60; // Contains in title
                if (c.includes(query)) return 40; // Contains in lyrics
                return 0;
            };

            const scoreA = getScore(titleA, contentA);
            const scoreB = getScore(titleB, contentB);

            return scoreB - scoreA; // Descending order
        });
    }

    return filtered;
  }, [viewType, selectedLetter, searchQuery, songs, selectedLanguage]);

  // Dynamic Alphabets based on Language
  const currentAlphabets = useMemo(() => {
      if (selectedLanguage === 'Telugu') return ALPHABETS_TELUGU;
      if (selectedLanguage === 'Hindi') return ALPHABETS_HINDI;
      return ALPHABETS_ENGLISH;
  }, [selectedLanguage]);

  const handleLanguageChange = (lang: SongLanguage | 'All') => {
      setSelectedLanguage(lang);
      setSelectedLetter('All');
  };

  return (
    <section className="min-h-screen pt-24 pb-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 z-0">
         <div className="absolute top-10 right-10 w-96 h-96 bg-brand-600/30 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
            <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }}
                className="inline-block p-4 bg-white/5 rounded-full mb-4 border border-white/10 backdrop-blur-md"
            >
                {pageConfig.icon}
            </motion.div>
            <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-5xl md:text-6xl font-serif font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-brand-200 to-brand-500"
            >
                {pageConfig.title}
            </motion.h1>
            <p className="text-gray-400 text-lg">{pageConfig.desc}</p>
        </div>

        {/* Controls Container */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 mb-10 shadow-2xl">
            {/* Search Bar */}
            <div className="mb-6 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search by title or lyrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all shadow-inner"
              />
            </div>

            {/* Language Filter */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                    {(['All', 'English', 'Telugu', 'Hindi'] as const).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => handleLanguageChange(lang)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                                selectedLanguage === lang 
                                    ? 'bg-brand-600 text-white shadow-lg' 
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                            }`}
                        >
                            {lang === 'All' && <Globe className="w-3 h-3" />}
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
                                    ? 'bg-brand-600 text-white shadow-lg scale-110' 
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                            }`}
                        >
                            All
                        </button>
                        {currentAlphabets.map((letter) => (
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
                            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 hover:bg-gray-700 transition-all border border-gray-700 hover:border-brand-500/50 group cursor-pointer shadow-lg hover:shadow-brand-500/10 flex flex-col"
                        >
                            {/* Visual Thumbnail */}
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-black border border-white/5 shadow-inner">
                                {song.type === 'lyrics' ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-brand-900 group-hover:to-gray-900 transition-colors">
                                        <BookOpen className="w-10 h-10 text-gray-600 group-hover:text-brand-400 mb-2 transition-colors" />
                                        <div className="text-xs text-gray-500 font-serif italic p-2 text-center line-clamp-3">
                                            {/* Preview stripping HTML tags */}
                                            "{song.content?.replace(/<[^>]*>?/gm, '').substring(0, 50)}..."
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <img 
                                        src={song.thumbnail || "https://picsum.photos/400/225?grayscale"} 
                                        alt={song.title} 
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                                                {song.type === 'video' ? <PlayCircle className="w-5 h-5 text-white" /> : <Music className="w-5 h-5 text-white" />}
                                            </div>
                                        </div>
                                    </>
                                )}
                                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">{song.duration || 'N/A'}</span>
                            </div>

                            <div className="mt-auto">
                                <h3 className="font-bold text-lg mb-1 group-hover:text-brand-400 transition-colors truncate">{song.title}</h3>
                                <div className="flex justify-between items-center text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <span className={`w-2 h-2 rounded-full ${song.language === 'English' ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                                        {song.language}
                                    </span>
                                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase tracking-wider text-[10px]">{song.category}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center text-gray-500 py-20">
                        <div className="p-6 bg-white/5 rounded-full mb-4 border border-white/10">
                             <Search className="w-10 h-10 opacity-30" />
                        </div>
                        <p className="text-xl font-medium text-gray-400">No songs found matching "{searchQuery}"</p>
                        <div className="flex gap-2 mt-4 text-sm text-gray-500">
                           {selectedLanguage !== 'All' && <span>Language: {selectedLanguage}</span>}
                           {selectedLetter !== 'All' && <span> • Starts with: {selectedLetter}</span>}
                        </div>
                        <button onClick={() => { setSearchQuery(''); setSelectedLetter('All'); setSelectedLanguage('All'); }} className="mt-6 px-8 py-3 bg-brand-600 rounded-full text-white hover:bg-brand-700 transition-colors shadow-lg shadow-brand-500/20">
                            Clear Filters
                        </button>
                    </div>
                )}
            </AnimatePresence>
        </div>

        {/* Details Modal */}
        <AnimatePresence>
          {selectedSong && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSong(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-3xl bg-gray-900 border border-brand-500/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-r from-gray-900 to-gray-800">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-3">
                        {selectedSong.title}
                    </h3>
                    <div className="flex gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-brand-500/20 text-brand-300 text-xs rounded border border-brand-500/30 uppercase font-bold tracking-wider">{selectedSong.category}</span>
                        <span className="px-2 py-0.5 bg-white/10 text-gray-300 text-xs rounded border border-white/10 uppercase font-bold tracking-wider">{selectedSong.language}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedSong(null)} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-full text-gray-400 transition-colors">
                    <X className="w-8 h-8" />
                  </button>
                </div>

                <div className="p-8 overflow-y-auto bg-gray-900/50 custom-scrollbar">
                  {/* LYRICS VIEW */}
                  {selectedSong.type === 'lyrics' && (
                    <div 
                      className="bg-white/5 rounded-2xl p-10 font-serif text-xl leading-loose text-gray-200 text-center shadow-inner border border-white/5 relative overflow-hidden prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedSong.content || '' }}
                    />
                  )}

                  {/* VIDEO VIEW */}
                  {selectedSong.type === 'video' && (
                    <div className="space-y-6">
                       <div className="aspect-video bg-black rounded-2xl overflow-hidden flex items-center justify-center border border-gray-700 relative shadow-2xl group">
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
                              <div className="text-center p-10">
                                 <PlayCircle className="w-20 h-20 text-brand-500 mx-auto mb-4 opacity-50" />
                                 <p className="text-gray-500 text-lg">Video source unavailable</p>
                              </div>
                          )}
                       </div>
                    </div>
                  )}

                  {/* AUDIO VIEW */}
                  {selectedSong.type === 'audio' && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-10">
                       <div className="w-64 h-64 bg-gradient-to-br from-brand-600 to-gray-900 rounded-full flex items-center justify-center shadow-2xl shadow-brand-500/20 relative group">
                          <div className="absolute inset-0 rounded-full border-[6px] border-white/5 border-t-brand-400 animate-spin-slow opacity-70"></div>
                          <div className="absolute inset-4 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                              <Music className="w-24 h-24 text-white drop-shadow-lg" />
                          </div>
                       </div>
                       
                       {selectedSong.url && selectedSong.url !== '#' ? (
                            <div className="w-full max-w-lg bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                                <audio controls className="w-full" autoPlay>
                                    <source src={selectedSong.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                       ) : (
                            <div className="text-center bg-white/5 px-8 py-6 rounded-2xl border border-white/10">
                                 <p className="text-gray-400">Audio source unavailable</p>
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

export default MediaPage;
