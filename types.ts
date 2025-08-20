export interface Song {
  title: string;
  spotifyUrl: string;
  coverImage: string;
  description: string;
}

export interface Artist {
  name: string;
  slug: string;
  bio: string;
  photo: string;
  socials: {
    spotify?: string;
    youtube?: string;
    instagram?: string;
  };
  songs: Song[];
}

export interface NewsPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image: string;
  content: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export interface Playlist {
  title: string;
  platform: 'Spotify' | 'YouTube';
  url: string;
  coverImage: string;
  description: string;
}

export interface Event {
  title: string;
  date: string;
  venue: string;
  city: string;
  description: string;
  ticketUrl: string;
}

export interface VibeSong {
    title: string;
    artist: string;
    reason: string;
}