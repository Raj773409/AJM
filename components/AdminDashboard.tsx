
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Users as UsersIcon, Calendar, Music, Trash2, Plus, LogOut, Flame, LayoutDashboard, Heart, MessageSquare, Gift, Play, FileText, Pencil, Image as ImageIcon, Upload, FileVideo, X, Bold, Italic, Underline, List, ListOrdered, MapPin, Clock } from 'lucide-react';
import { Event, Sermon, Ministry, Testimonial, Song, SongType, SongLanguage, SongCategory, HeroImage } from '../types';

type Tab = 'overview' | 'users' | 'events' | 'sermons' | 'ministries' | 'stories' | 'media' | 'hero';

const AdminDashboard: React.FC = () => {
  const { 
      user, logout, 
      users, deleteUser,
      events, addEvent, deleteEvent, 
      sermons, addSermon, deleteSermon,
      ministries, addMinistry, deleteMinistry,
      testimonials, addTestimonial, deleteTestimonial,
      songs, addSong, updateSong, deleteSong,
      heroImages, addHeroImage, updateHeroImage, deleteHeroImage
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  // Form States
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});
  
  const [showSermonForm, setShowSermonForm] = useState(false);
  const [newSermon, setNewSermon] = useState<Partial<Sermon>>({});

  const [showMinistryForm, setShowMinistryForm] = useState(false);
  const [newMinistry, setNewMinistry] = useState<Partial<Ministry>>({});

  const [showStoryForm, setShowStoryForm] = useState(false);
  const [newStory, setNewStory] = useState<Partial<Testimonial>>({});

  // Song States (Add/Edit)
  const [showSongForm, setShowSongForm] = useState(false);
  const [editingSongId, setEditingSongId] = useState<number | null>(null);
  const [newSong, setNewSong] = useState<Partial<Song>>({
      type: 'lyrics',
      language: 'English',
      category: 'General'
  });

  // Hero Image States
  const [showHeroForm, setShowHeroForm] = useState(false);
  const [newHeroUrl, setNewHeroUrl] = useState('');
  const [editingHeroId, setEditingHeroId] = useState<number | null>(null);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if(newEvent.title && newEvent.date && newEvent.time && newEvent.location && newEvent.description) {
        addEvent({
            title: newEvent.title,
            date: newEvent.date,
            time: newEvent.time,
            location: newEvent.location,
            description: newEvent.description
        });
        setNewEvent({});
        setShowEventForm(false);
    }
  };

  const handleAddSermon = (e: React.FormEvent) => {
    e.preventDefault();
    if(newSermon.title && newSermon.preacher && newSermon.date) {
        addSermon({
            title: newSermon.title,
            preacher: newSermon.preacher,
            date: newSermon.date,
            thumbnail: newSermon.thumbnail || "https://picsum.photos/400/225",
            duration: newSermon.duration || "5:00",
            category: newSermon.category || "General",
            description: newSermon.description || "A powerful message.",
            speakerBio: newSermon.speakerBio || "Guest Speaker",
            videoUrl: newSermon.videoUrl
        });
        setNewSermon({});
        setShowSermonForm(false);
    }
  };

  const handleAddMinistry = (e: React.FormEvent) => {
      e.preventDefault();
      if(newMinistry.title && newMinistry.description) {
          addMinistry({
              title: newMinistry.title,
              description: newMinistry.description,
              image: newMinistry.image || "https://picsum.photos/800/600",
              iconName: newMinistry.iconName || "Heart"
          });
          setNewMinistry({});
          setShowMinistryForm(false);
      }
  };

  const handleAddStory = (e: React.FormEvent) => {
      e.preventDefault();
      if(newStory.name && newStory.quote) {
          addTestimonial({
              name: newStory.name,
              role: newStory.role || "Member",
              quote: newStory.quote,
              thumbnail: newStory.thumbnail || "https://picsum.photos/400/225",
              videoDuration: newStory.videoDuration || "2:30"
          });
          setNewStory({});
          setShowStoryForm(false);
      }
  };

  const handleSaveSong = (e: React.FormEvent) => {
      e.preventDefault();
      if(newSong.title) {
          const songData: Partial<Song> = {
            title: newSong.title,
            language: newSong.language as SongLanguage,
            type: newSong.type as SongType,
            category: newSong.category as SongCategory,
            url: newSong.url,
            content: newSong.content,
            thumbnail: newSong.thumbnail,
            duration: newSong.duration
          };

          if (editingSongId) {
              updateSong(editingSongId, songData);
          } else {
              addSong({
                  ...songData,
                  language: songData.language || 'English',
                  type: songData.type || 'lyrics',
                  category: songData.category || 'General',
                  thumbnail: songData.thumbnail || "https://picsum.photos/400/225?christmas",
                  duration: songData.duration || "3:00"
              } as any);
          }
          setNewSong({ type: 'lyrics', language: 'English', category: 'General' });
          setEditingSongId(null);
          setShowSongForm(false);
      }
  };

  const handleEditClick = (song: Song) => {
      setNewSong(song);
      setEditingSongId(song.id);
      setShowSongForm(true);
  };

  const handleCancelSong = () => {
      setShowSongForm(false);
      setNewSong({ type: 'lyrics', language: 'English', category: 'General' });
      setEditingSongId(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          if (file.size > 8 * 1024 * 1024) {
              alert("File is too large for the demo storage (Max 8MB). Please use a URL for larger files.");
              return;
          }

          const reader = new FileReader();
          reader.onload = (event) => {
              if (event.target?.result) {
                  setNewSong(prev => ({ ...prev, url: event.target?.result as string }));
              }
          };
          reader.readAsDataURL(file);
      }
  };

  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
  };

  const handleSaveHeroImage = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newHeroUrl.trim()) return;

      if (editingHeroId) {
          updateHeroImage(editingHeroId, newHeroUrl);
      } else {
          addHeroImage(newHeroUrl);
      }
      setNewHeroUrl('');
      setEditingHeroId(null);
      setShowHeroForm(false);
  };

  const handleEditHero = (img: HeroImage) => {
      setNewHeroUrl(img.url);
      setEditingHeroId(img.id);
      setShowHeroForm(true);
  };

  const getPageTitle = () => {
      switch(activeTab) {
          case 'overview': return 'Dashboard Overview';
          case 'users': return 'Manage Users';
          case 'events': return 'Upcoming Events';
          case 'sermons': return 'Sermon Library';
          case 'ministries': return 'Ministries';
          case 'stories': return 'Stories & Testimonials';
          case 'media': return 'Media Library';
          case 'hero': return 'Hero Banner Images';
          default: return 'Admin Panel';
      }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center gap-2 border-b border-gray-800">
            <Flame className="text-brand-500 w-6 h-6" />
            <span className="font-serif font-bold tracking-wide">ADMIN PANEL</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                <LayoutDashboard className="w-5 h-5" /> Overview
            </button>
            <button 
                onClick={() => setActiveTab('hero')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'hero' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                <ImageIcon className="w-5 h-5" /> Hero Banner
            </button>
            <button 
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                <UsersIcon className="w-5 h-5" /> Manage Users
            </button>
            <button 
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'events' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                <Calendar className="w-5 h-5" /> Manage Events
            </button>
            <button 
                onClick={() => setActiveTab('sermons')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'sermons' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                <Music className="w-5 h-5" /> Sermons
            </button>
            <button 
                onClick={() => setActiveTab('ministries')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'ministries' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                <Heart className="w-5 h-5" /> Ministries
            </button>
            <button 
                onClick={() => setActiveTab('stories')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'stories' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                <MessageSquare className="w-5 h-5" /> Stories/Testimonials
            </button>
            <button 
                onClick={() => setActiveTab('media')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'media' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
            >
                <Gift className="w-5 h-5" /> Manage Media Songs
            </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
            <div className="mb-4 px-4">
                <p className="text-sm text-gray-400">Logged in as</p>
                <p className="font-bold text-white">{user?.name}</p>
            </div>
            <button 
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-colors font-semibold"
            >
                <LogOut className="w-4 h-4" /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
        </header>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl"><UsersIcon /></div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Users</p>
                            <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-xl"><Calendar /></div>
                        <div>
                            <p className="text-gray-500 text-sm">Active Events</p>
                            <p className="text-3xl font-bold text-gray-900">{events.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-xl"><ImageIcon /></div>
                        <div>
                            <p className="text-gray-500 text-sm">Hero Images</p>
                            <p className="text-3xl font-bold text-gray-900">{heroImages.length}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-xl"><Gift /></div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Songs</p>
                            <p className="text-3xl font-bold text-gray-900">{songs.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-700">Name</th>
                            <th className="p-4 font-semibold text-gray-700">Phone</th>
                            <th className="p-4 font-semibold text-gray-700">Role</th>
                            <th className="p-4 font-semibold text-gray-700">Joined Date</th>
                            <th className="p-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-900">{u.name}</td>
                                <td className="p-4 text-gray-600">{u.phoneNumber}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm">{u.joinedAt}</td>
                                <td className="p-4">
                                    {u.id !== user?.id && (
                                        <button 
                                            onClick={() => deleteUser(u.id)} 
                                            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                            title="Remove User"
                                        >
                                            <Trash2 size={18}/>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr><td colSpan={5} className="p-8 text-center text-gray-500">No users found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
            <div className="space-y-6">
                <button onClick={() => setShowEventForm(!showEventForm)} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium">
                    <Plus className="w-5 h-5" /> Add New Event
                </button>

                <AnimatePresence>
                    {showEventForm && (
                        <motion.form 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            onSubmit={handleAddEvent}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <h3 className="col-span-full text-lg font-bold border-b pb-2 mb-2">Create Event</h3>
                            <input required placeholder="Event Title" className="p-3 border rounded-lg" value={newEvent.title || ''} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
                            <input required type="text" placeholder="Date (e.g. August 25, 2024)" className="p-3 border rounded-lg" value={newEvent.date || ''} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
                            <input required placeholder="Time (e.g. 6:00 PM)" className="p-3 border rounded-lg" value={newEvent.time || ''} onChange={e => setNewEvent({...newEvent, time: e.target.value})} />
                            <input required placeholder="Location" className="p-3 border rounded-lg" value={newEvent.location || ''} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
                            <textarea required placeholder="Description" rows={3} className="col-span-full p-3 border rounded-lg" value={newEvent.description || ''} onChange={e => setNewEvent({...newEvent, description: e.target.value})} />
                            
                            <div className="col-span-full flex justify-end gap-3 mt-2">
                                <button type="button" onClick={() => setShowEventForm(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Save Event</button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="space-y-4">
                    {events.map(event => (
                        <div key={event.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
                                    <span className="flex items-center gap-1"><Calendar size={14}/> {event.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14}/> {event.time}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14}/> {event.location}</span>
                                </div>
                                <p className="text-gray-600 mt-2 text-sm">{event.description}</p>
                            </div>
                            <button onClick={() => deleteEvent(event.id)} className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors self-start md:self-center" title="Delete Event">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                    {events.length === 0 && <p className="text-gray-500 text-center py-10">No upcoming events found.</p>}
                </div>
            </div>
        )}

        {/* Sermons Tab */}
        {activeTab === 'sermons' && (
            <div className="space-y-6">
                <button onClick={() => setShowSermonForm(!showSermonForm)} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium">
                    <Plus className="w-5 h-5" /> Add New Sermon
                </button>

                <AnimatePresence>
                    {showSermonForm && (
                        <motion.form 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            onSubmit={handleAddSermon}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <h3 className="col-span-full text-lg font-bold border-b pb-2 mb-2">Add Sermon</h3>
                            <input required placeholder="Sermon Title" className="p-3 border rounded-lg" value={newSermon.title || ''} onChange={e => setNewSermon({...newSermon, title: e.target.value})} />
                            <input required placeholder="Preacher Name" className="p-3 border rounded-lg" value={newSermon.preacher || ''} onChange={e => setNewSermon({...newSermon, preacher: e.target.value})} />
                            <input required placeholder="Date" className="p-3 border rounded-lg" value={newSermon.date || ''} onChange={e => setNewSermon({...newSermon, date: e.target.value})} />
                            <input placeholder="Duration (e.g. 45 min)" className="p-3 border rounded-lg" value={newSermon.duration || ''} onChange={e => setNewSermon({...newSermon, duration: e.target.value})} />
                            <input placeholder="Thumbnail URL" className="p-3 border rounded-lg" value={newSermon.thumbnail || ''} onChange={e => setNewSermon({...newSermon, thumbnail: e.target.value})} />
                            <input placeholder="Category (e.g. Faith)" className="p-3 border rounded-lg" value={newSermon.category || ''} onChange={e => setNewSermon({...newSermon, category: e.target.value})} />
                            <textarea required placeholder="Description" rows={3} className="col-span-full p-3 border rounded-lg" value={newSermon.description || ''} onChange={e => setNewSermon({...newSermon, description: e.target.value})} />
                            <textarea placeholder="Speaker Bio" rows={2} className="col-span-full p-3 border rounded-lg" value={newSermon.speakerBio || ''} onChange={e => setNewSermon({...newSermon, speakerBio: e.target.value})} />
                            
                            <div className="col-span-full flex justify-end gap-3 mt-2">
                                <button type="button" onClick={() => setShowSermonForm(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Save Sermon</button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sermons.map(sermon => (
                        <div key={sermon.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                            <div className="aspect-video bg-gray-200 relative">
                                <img src={sermon.thumbnail} className="w-full h-full object-cover" alt={sermon.title}/>
                                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">{sermon.duration}</div>
                            </div>
                            <div className="p-4 relative">
                                <h4 className="font-bold text-gray-900 truncate" title={sermon.title}>{sermon.title}</h4>
                                <p className="text-sm text-gray-500 mb-2">{sermon.preacher} • {sermon.date}</p>
                                <button 
                                    onClick={() => deleteSermon(sermon.id)} 
                                    className="absolute top-4 right-4 p-1.5 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Ministries Tab */}
        {activeTab === 'ministries' && (
            <div className="space-y-6">
                <button onClick={() => setShowMinistryForm(!showMinistryForm)} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium">
                    <Plus className="w-5 h-5" /> Add Ministry
                </button>

                <AnimatePresence>
                    {showMinistryForm && (
                        <motion.form 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            onSubmit={handleAddMinistry}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 gap-4"
                        >
                            <h3 className="text-lg font-bold border-b pb-2 mb-2">Add Ministry</h3>
                            <input required placeholder="Ministry Name" className="p-3 border rounded-lg" value={newMinistry.title || ''} onChange={e => setNewMinistry({...newMinistry, title: e.target.value})} />
                            <input placeholder="Image URL" className="p-3 border rounded-lg" value={newMinistry.image || ''} onChange={e => setNewMinistry({...newMinistry, image: e.target.value})} />
                            <input placeholder="Icon Name (e.g. Heart, Flame, Shield)" className="p-3 border rounded-lg" value={newMinistry.iconName || ''} onChange={e => setNewMinistry({...newMinistry, iconName: e.target.value})} />
                            <textarea required placeholder="Description" rows={3} className="p-3 border rounded-lg" value={newMinistry.description || ''} onChange={e => setNewMinistry({...newMinistry, description: e.target.value})} />
                            
                            <div className="flex justify-end gap-3 mt-2">
                                <button type="button" onClick={() => setShowMinistryForm(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Save</button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ministries.map(ministry => (
                        <div key={ministry.title} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
                            <div className="h-40 bg-gray-200 relative">
                                <img src={ministry.image} className="w-full h-full object-cover" alt={ministry.title}/>
                                <div className="absolute bottom-2 left-2 bg-brand-500 text-white p-1 rounded-md">
                                    <Heart size={16}/> 
                                </div>
                            </div>
                            <div className="p-4 relative">
                                <h4 className="font-bold text-gray-900">{ministry.title}</h4>
                                <p className="text-sm text-gray-600 line-clamp-2">{ministry.description}</p>
                                <button 
                                    onClick={() => deleteMinistry(ministry.title)} 
                                    className="absolute top-4 right-4 p-1.5 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Stories Tab */}
        {activeTab === 'stories' && (
            <div className="space-y-6">
                <button onClick={() => setShowStoryForm(!showStoryForm)} className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium">
                    <Plus className="w-5 h-5" /> Add Story
                </button>

                <AnimatePresence>
                    {showStoryForm && (
                        <motion.form 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            onSubmit={handleAddStory}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                            <h3 className="col-span-full text-lg font-bold border-b pb-2 mb-2">Add Testimonial</h3>
                            <input required placeholder="Person Name" className="p-3 border rounded-lg" value={newStory.name || ''} onChange={e => setNewStory({...newStory, name: e.target.value})} />
                            <input placeholder="Role (e.g. Member)" className="p-3 border rounded-lg" value={newStory.role || ''} onChange={e => setNewStory({...newStory, role: e.target.value})} />
                            <input placeholder="Thumbnail URL" className="p-3 border rounded-lg" value={newStory.thumbnail || ''} onChange={e => setNewStory({...newStory, thumbnail: e.target.value})} />
                            <input placeholder="Video Duration (Optional)" className="p-3 border rounded-lg" value={newStory.videoDuration || ''} onChange={e => setNewStory({...newStory, videoDuration: e.target.value})} />
                            <textarea required placeholder="Quote / Testimony" rows={3} className="col-span-full p-3 border rounded-lg" value={newStory.quote || ''} onChange={e => setNewStory({...newStory, quote: e.target.value})} />
                            
                            <div className="col-span-full flex justify-end gap-3 mt-2">
                                <button type="button" onClick={() => setShowStoryForm(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">Save Story</button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map(story => (
                        <div key={story.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group p-4 flex flex-col h-full relative">
                            <div className="flex items-center gap-3 mb-3">
                                <img src={story.thumbnail} className="w-12 h-12 rounded-full object-cover bg-gray-200" alt={story.name}/>
                                <div>
                                    <h4 className="font-bold text-gray-900">{story.name}</h4>
                                    <p className="text-xs text-brand-600">{story.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 italic text-sm mb-2 flex-1">"{story.quote}"</p>
                            <button 
                                onClick={() => deleteTestimonial(story.id)} 
                                className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={16}/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Media (Songs) Tab */}
        {activeTab === 'media' && (
             <div className="space-y-6">
                <button 
                    onClick={() => {
                        setEditingSongId(null);
                        setNewSong({ type: 'lyrics', language: 'English', category: 'General' });
                        setShowSongForm(!showSongForm);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
                >
                    <Plus className="w-5 h-5" /> Add Media/Song
                </button>

                <AnimatePresence>
                    {showSongForm && (
                        <motion.form 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            onSubmit={handleSaveSong}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <h3 className="text-lg font-bold mb-4 border-b pb-2">{editingSongId ? 'Edit Item' : 'Add New Item'}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input required placeholder="Title" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={newSong.title || ''} onChange={e => setNewSong({...newSong, title: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={newSong.category} onChange={e => setNewSong({...newSong, category: e.target.value as SongCategory})}>
                                        <option value="General">General</option>
                                        <option value="Christmas">Christmas</option>
                                        <option value="Dance">Dance</option>
                                        <option value="Worship">Worship</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                                    <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={newSong.language} onChange={e => setNewSong({...newSong, language: e.target.value as SongLanguage})}>
                                        <option value="English">English</option>
                                        <option value="Telugu">Telugu</option>
                                        <option value="Hindi">Hindi</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                    <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={newSong.type} onChange={e => setNewSong({...newSong, type: e.target.value as SongType})}>
                                        <option value="lyrics">Lyrics</option>
                                        <option value="audio">Audio</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                            </div>

                            {/* DYNAMIC FIELDS BASED ON TYPE */}
                            
                            {newSong.type !== 'lyrics' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Media Source</label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input 
                                                    placeholder="Paste URL (YouTube/MP3) or upload file ->" 
                                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none disabled:bg-gray-100 disabled:text-gray-500" 
                                                    value={newSong.url?.startsWith('data:') ? '' : newSong.url || ''} 
                                                    onChange={e => setNewSong({...newSong, url: e.target.value})} 
                                                    disabled={!!(newSong.url && newSong.url.startsWith('data:'))}
                                                />
                                                {newSong.url && newSong.url.startsWith('data:') && (
                                                    <div className="absolute inset-0 bg-green-50 flex items-center px-3 rounded-lg border border-green-200 text-green-700 text-sm font-medium z-10">
                                                        <FileVideo className="w-4 h-4 mr-2"/> 
                                                        File Uploaded ({((newSong.url.length * 0.75) / 1024 / 1024).toFixed(2)} MB)
                                                        <button 
                                                            type="button" 
                                                            onClick={() => setNewSong({...newSong, url: ''})} 
                                                            className="ml-auto p-1 hover:bg-green-100 rounded-full text-red-500"
                                                            title="Remove File"
                                                        >
                                                            <X size={16}/>
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <label className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer hover:bg-gray-700 transition-colors whitespace-nowrap shadow-sm">
                                                <Upload className="w-5 h-5 mr-2" />
                                                <span className="text-sm font-medium">Upload File</span>
                                                <input 
                                                    type="file" 
                                                    accept={newSong.type === 'video' ? "video/*" : "audio/*"} 
                                                    className="hidden" 
                                                    onChange={handleFileUpload}
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Supported: YouTube links, external URLs, or direct file uploads (Max 8MB for demo).</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                                        <input placeholder="Image URL" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={newSong.thumbnail || ''} onChange={e => setNewSong({...newSong, thumbnail: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                                        <input placeholder="e.g. 4:20" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={newSong.duration || ''} onChange={e => setNewSong({...newSong, duration: e.target.value})} />
                                    </div>
                                </div>
                            )}

                            {newSong.type === 'lyrics' && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lyrics Content (Rich Text)</label>
                                    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-brand-500 transition-all">
                                        {/* Toolbar */}
                                        <div className="flex gap-1 p-2 bg-gray-50 border-b border-gray-300 overflow-x-auto">
                                            <button type="button" onClick={() => execCmd('bold')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Bold"><Bold size={16}/></button>
                                            <button type="button" onClick={() => execCmd('italic')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Italic"><Italic size={16}/></button>
                                            <button type="button" onClick={() => execCmd('underline')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Underline"><Underline size={16}/></button>
                                            <div className="w-px h-6 bg-gray-300 mx-1"></div>
                                            <button type="button" onClick={() => execCmd('insertOrderedList')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Ordered List"><ListOrdered size={16}/></button>
                                            <button type="button" onClick={() => execCmd('insertUnorderedList')} className="p-1.5 hover:bg-gray-200 rounded text-gray-700 transition-colors" title="Bullet List"><List size={16}/></button>
                                        </div>
                                        
                                        {/* Editor Area */}
                                        <div 
                                            key={editingSongId ? `edit-${editingSongId}` : 'new-song'}
                                            className="w-full p-4 min-h-[200px] outline-none max-h-[400px] overflow-y-auto prose prose-sm max-w-none"
                                            contentEditable
                                            suppressContentEditableWarning
                                            onInput={(e) => setNewSong({...newSong, content: e.currentTarget.innerHTML})}
                                            dangerouslySetInnerHTML={{__html: newSong.content || ''}}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Use the toolbar to format lyrics. Copy-pasting formatted text is also supported.</p>
                                </div>
                            )}
                            
                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={handleCancelSong} className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700 shadow-lg shadow-brand-500/20 transition-all">{editingSongId ? 'Update Item' : 'Save Item'}</button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {songs.map(song => (
                        <div key={song.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group relative hover:shadow-md transition-all">
                             {/* Delete Button */}
                             <button onClick={() => deleteSong(song.id)} className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm hover:scale-110">
                                <Trash2 className="w-4 h-4" />
                             </button>

                             {/* Edit Button */}
                             <button onClick={() => handleEditClick(song)} className="absolute top-2 right-10 p-1.5 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-sm hover:scale-110">
                                <Pencil className="w-4 h-4" />
                             </button>

                             {song.type === 'video' || song.type === 'audio' ? (
                                 <div className="h-32 bg-gray-200 relative">
                                    <img src={song.thumbnail || "https://picsum.photos/400/225"} className="w-full h-full object-cover" alt={song.title}/>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                        {song.type === 'video' ? <Play className="text-white w-8 h-8 drop-shadow-lg" /> : <Music className="text-white w-8 h-8 drop-shadow-lg" />}
                                    </div>
                                    {song.url?.startsWith('data:') && (
                                        <span className="absolute bottom-1 right-1 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">UPLOADED</span>
                                    )}
                                 </div>
                             ) : (
                                 <div className="h-32 bg-brand-50 flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
                                     <FileText className="text-brand-300 w-12 h-12" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent flex items-end justify-center pb-2">
                                        <span className="text-xs text-brand-400 font-serif italic px-4 truncate w-full text-center">
                                            {song.content?.replace(/<[^>]*>?/gm, '').substring(0, 30)}...
                                        </span>
                                     </div>
                                 </div>
                             )}
                             
                             <div className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] uppercase font-bold text-brand-600 border border-brand-200 px-1.5 rounded bg-brand-50">{song.category}</span>
                                    <span className="text-[10px] text-gray-400 font-medium">{song.type}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 truncate" title={song.title}>{song.title}</h3>
                             </div>
                        </div>
                    ))}
                </div>
             </div>
        )}

        {/* Hero Image Tab */}
        {activeTab === 'hero' && (
            <div className="space-y-6">
                <button 
                    onClick={() => {
                        setEditingHeroId(null);
                        setNewHeroUrl('');
                        setShowHeroForm(!showHeroForm);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors font-medium"
                >
                    <Plus className="w-5 h-5" /> Add Hero Image
                </button>

                <AnimatePresence>
                    {showHeroForm && (
                        <motion.form 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            onSubmit={handleSaveHeroImage}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <h3 className="text-lg font-bold mb-4">{editingHeroId ? 'Edit Image URL' : 'Add New Image'}</h3>
                            <div className="flex gap-4 mb-4">
                                <input 
                                    required 
                                    placeholder="Image URL (e.g. https://picsum.photos/1920/1080)" 
                                    className="flex-1 p-3 border rounded-lg" 
                                    value={newHeroUrl} 
                                    onChange={e => setNewHeroUrl(e.target.value)} 
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button type="button" onClick={() => setShowHeroForm(false)} className="px-4 py-2 text-gray-500 hover:text-gray-700">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700">{editingHeroId ? 'Update' : 'Save'}</button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {heroImages.map((img) => (
                        <div key={img.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group relative">
                             <div className="aspect-video bg-gray-200 relative">
                                <img src={img.url} className="w-full h-full object-cover" alt="Hero Banner"/>
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => handleEditHero(img)} className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => deleteHeroImage(img.id)} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                             </div>
                             <div className="p-3 bg-gray-50 border-t border-gray-100">
                                <p className="text-xs text-gray-500 truncate font-mono">{img.url}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
