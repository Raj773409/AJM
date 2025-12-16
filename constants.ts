
import { Ministry, Event, Sermon, Testimonial, Song } from './types';

export const MINISTRIES: Ministry[] = [
  {
    title: "Agni Kids",
    description: "Nurturing the next generation with faith, fun, and biblical foundations in a safe environment.",
    image: "https://picsum.photos/800/600?random=1",
    iconName: "Baby"
  },
  {
    title: "Youth Aflame",
    description: "Empowering young people to live passionately for Christ and impact their culture.",
    image: "https://picsum.photos/800/600?random=2",
    iconName: "Flame"
  },
  {
    title: "Women of Virtue",
    description: "A sisterhood supporting one another through prayer, study, and fellowship.",
    image: "https://picsum.photos/800/600?random=3",
    iconName: "Heart"
  },
  {
    title: "Men of Valor",
    description: "Equipping men to be spiritual leaders in their homes, workplaces, and communities.",
    image: "https://picsum.photos/800/600?random=4",
    iconName: "Shield"
  }
];

export const UPCOMING_EVENTS: Event[] = [
  {
    id: 1,
    title: "Sunday Fire Service",
    date: "Every Sunday",
    time: "10:00 AM",
    location: "Main Sanctuary",
    description: "Join us for powerful worship and a life-changing message."
  },
  {
    id: 2,
    title: "Night of Worship",
    date: "August 25, 2024",
    time: "6:00 PM",
    location: "Prayer Hall",
    description: "An extended time of soaking in God's presence through music and prayer."
  },
  {
    id: 3,
    title: "Community Outreach",
    date: "September 2, 2024",
    time: "9:00 AM",
    location: "City Park",
    description: "Serving our neighbors with food, clothes, and the love of Jesus."
  }
];

export const RECENT_SERMONS: Sermon[] = [
  {
    id: 1,
    title: "The Refiner's Fire",
    preacher: "Rev. Pastor John Doe",
    date: "Aug 18, 2024",
    thumbnail: "https://picsum.photos/400/225?random=10",
    duration: "45 min",
    category: "Spiritual Growth",
    description: "In this powerful message, Rev. Pastor John Doe explores the concept of the Refiner's Fire from Malachi 3:2. Discover how God uses challenges to purify our hearts and strengthen our faith, ultimately producing gold in our character.",
    speakerBio: "Rev. Pastor John Doe has been serving as the Senior Pastor of Agni Jawala Ministries for over 15 years. Known for his dynamic preaching and heart for revival, he is passionate about seeing lives transformed by the Holy Spirit."
  },
  {
    id: 2,
    title: "Walking in Authority",
    preacher: "Ps. Jane Doe",
    date: "Aug 11, 2024",
    thumbnail: "https://picsum.photos/400/225?random=11",
    duration: "52 min",
    category: "Leadership",
    description: "Pastor Jane delivers a stirring sermon on the believer's authority in Christ. Learn how to stand firm against spiritual opposition and walk in the victory that has already been won for you on the cross.",
    speakerBio: "Ps. Jane Doe leads the Women of Virtue ministry and is a powerful teacher of the Word. Her ministry is marked by prophetic insight and a deep love for prayer."
  },
  {
    id: 3,
    title: "Unshakeable Faith",
    preacher: "Rev. Pastor John Doe",
    date: "Aug 04, 2024",
    thumbnail: "https://picsum.photos/400/225?random=12",
    duration: "48 min",
    category: "Faith",
    description: "When the storms of life come, what keeps you standing? This sermon dives into the parable of the wise and foolish builders, teaching us how to build our lives on the solid rock of Jesus Christ.",
    speakerBio: "Rev. Pastor John Doe has been serving as the Senior Pastor of Agni Jawala Ministries for over 15 years. Known for his dynamic preaching and heart for revival, he is passionate about seeing lives transformed by the Holy Spirit."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Williams",
    role: "Member since 2018",
    thumbnail: "https://picsum.photos/400/225?random=20",
    quote: "I found a family here when I was at my lowest. The community support and the power of prayer completely restored my hope.",
    videoDuration: "3:42"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Youth Leader",
    thumbnail: "https://picsum.photos/400/225?random=21",
    quote: "Growing up in Youth Aflame changed the trajectory of my life. I learned what it means to truly follow Jesus.",
    videoDuration: "2:15"
  },
  {
    id: 3,
    name: "David & Maria Rodriguez",
    role: "Family Ministry",
    thumbnail: "https://picsum.photos/400/225?random=22",
    quote: "Our marriage was on the rocks, but the counseling and prayer we received here brought healing and restoration.",
    videoDuration: "5:30"
  }
];

export const HERO_IMAGES = [
  "https://picsum.photos/1920/1080?random=99",
  "https://picsum.photos/1920/1080?random=98",
  "https://picsum.photos/1920/1080?random=97"
];

// --- Songs Data & Alphabets ---

export const ALPHABETS_ENGLISH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
export const ALPHABETS_TELUGU = [
  "అ", "ఆ", "ఇ", "ఈ", "ఉ", "ఊ", "ఎ", "ఏ", "ఐ", "ఒ", "ఓ", "ఔ", 
  "క", "ఖ", "గ", "ఘ", "చ", "జ", "ట", "డ", "ణ", "త", "ద", "న", "ప", "ఫ", "బ", "భ", "మ", "య", "ర", "ల", "వ", "శ", "ష", "స", "హ"
];
export const ALPHABETS_HINDI = [
  "अ", "आ", "इ", "ई", "उ", "ऊ", "ए", "ऐ", "ओ", "औ", 
  "क", "ख", "ग", "घ", "च", "छ", "ज", "झ", "ट", "ठ", "ड", "ढ", "ण", "त", "थ", "द", "ध", "न", "प", "फ", "ब", "भ", "म", "य", "र", "ल", "व", "श", "ष", "स", "ह"
];

export const CHRISTMAS_SONGS: Song[] = [
  // Christmas
  { id: 1, title: "Angels We Have Heard on High", language: "English", type: "audio", category: "Christmas", duration: "4:30", url: "#" },
  { id: 2, title: "Away in a Manger", language: "English", type: "lyrics", category: "Christmas", content: "Away in a manger, no crib for a bed..." },
  { id: 3, title: "Blue Christmas", language: "English", type: "video", category: "Christmas", thumbnail: "https://picsum.photos/400/225?random=50", duration: "3:45" },
  { id: 4, title: "Carol of the Bells", language: "English", type: "audio", category: "Christmas", duration: "2:15", url: "#" },
  { id: 5, title: "Deck the Halls", language: "English", type: "lyrics", category: "Christmas", content: "Deck the halls with boughs of holly..." },
  { id: 6, title: "Feliz Navidad", language: "English", type: "video", category: "Christmas", thumbnail: "https://picsum.photos/400/225?random=51", duration: "3:02" },
  { id: 7, title: "Hark! The Herald Angels Sing", language: "English", type: "audio", category: "Christmas", duration: "4:00", url: "#" },
  { id: 8, title: "Joy to the World", language: "English", type: "video", category: "Christmas", thumbnail: "https://picsum.photos/400/225?random=52", duration: "2:50" },
  { id: 9, title: "O Holy Night", language: "English", type: "lyrics", category: "Christmas", content: "O holy night! The stars are brightly shining..." },
  { id: 10, title: "Silent Night", language: "English", type: "audio", category: "Christmas", duration: "3:20", url: "#" },

  // Telugu Christmas
  { id: 11, title: "ఆనందం ఆనందం", language: "Telugu", type: "audio", category: "Christmas", duration: "5:00", url: "#" },
  { id: 12, title: "ఇదిగో రక్షకుడు", language: "Telugu", type: "lyrics", category: "Christmas", content: "ఇదిగో రక్షకుడు పుట్టెను నేడు..." },
  
  // Dance Songs
  { id: 30, title: "This is Living (Dance Remix)", language: "English", type: "audio", category: "Dance", duration: "3:45", url: "#" },
  { id: 31, title: "Freedom (Live Dance)", language: "English", type: "video", category: "Dance", thumbnail: "https://picsum.photos/400/225?random=60", duration: "4:10" },
  { id: 32, title: "Praise Him Dance", language: "Telugu", type: "video", category: "Dance", thumbnail: "https://picsum.photos/400/225?random=61", duration: "5:20" },
  { id: 33, title: "Jhumo Nacho", language: "Hindi", type: "audio", category: "Dance", duration: "4:00", url: "#" },
  { id: 34, title: "Alive (Remix)", language: "English", type: "lyrics", category: "Dance", content: "I was lost with a broken heart..." }
];
