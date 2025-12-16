
export interface Ministry {
  id?: number; 
  title: string;
  description: string;
  image: string;
  iconName: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface Sermon {
  id: number;
  title: string;
  preacher: string;
  date: string;
  thumbnail: string;
  duration: string;
  description: string;
  speakerBio: string;
  videoUrl?: string;
  category: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  thumbnail: string;
  quote: string;
  videoDuration: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  role: 'admin' | 'user';
  joinedAt: string;
}

export type SongType = 'audio' | 'video' | 'lyrics';
export type SongLanguage = 'English' | 'Telugu' | 'Hindi';
export type SongCategory = 'Christmas' | 'Dance' | 'Worship' | 'General';

export interface Song {
  id: number;
  title: string;
  language: SongLanguage;
  type: SongType;
  category: SongCategory; // Added category
  url?: string;     
  content?: string; 
  thumbnail?: string;
  duration?: string;
}

export interface HeroImage {
  id: number;
  url: string;
}

export type AppView = 'home' | 'audio' | 'video' | 'lyrics' | 'christmas' | 'dance' | 'admin';

export interface AppContextType {
  user: User | null;
  login: (name: string, phoneNumber: string) => boolean;
  logout: () => void;
  
  // Navigation
  currentView: AppView;
  navigate: (view: AppView) => void;
  isLoading: boolean;

  users: User[];
  deleteUser: (id: string) => void;

  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  deleteEvent: (id: number) => void;

  sermons: Sermon[];
  addSermon: (sermon: Omit<Sermon, 'id'>) => void;
  deleteSermon: (id: number) => void;

  ministries: Ministry[];
  addMinistry: (ministry: Omit<Ministry, 'id'>) => void;
  deleteMinistry: (title: string) => void;

  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: number) => void;

  songs: Song[]; // Renamed from christmasSongs
  addSong: (song: Omit<Song, 'id'>) => void;
  updateSong: (id: number, song: Partial<Song>) => void;
  deleteSong: (id: number) => void;

  heroImages: HeroImage[];
  addHeroImage: (url: string) => void;
  updateHeroImage: (id: number, url: string) => void;
  deleteHeroImage: (id: number) => void;
}
