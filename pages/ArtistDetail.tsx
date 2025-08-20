import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Artist } from '../types';
import SpotifyEmbed from '../components/SpotifyEmbed';

const SocialIcon: React.FC<{ href?: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => {
    if (!href) return null;
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-brand-cyan transition-colors duration-300"
            aria-label={`Visit ${label}`}
        >
            {children}
        </a>
    );
};

const ArtistDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [artist, setArtist] = useState<Artist | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtist = async () => {
            setLoading(true);
            try {
                const response = await fetch('/data/artists.json');
                const artists: Artist[] = await response.json();
                const foundArtist = artists.find(a => a.slug === slug);
                setArtist(foundArtist);
            } catch (error) {
                console.error("Failed to fetch artist data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArtist();
    }, [slug]);

    if (loading) {
        return <div className="text-center py-24 text-brand-cyan">Loading Artist...</div>;
    }

    if (!artist) {
        return (
            <div className="text-center py-24">
                <h1 className="text-3xl font-bold text-brand-red">Artist Not Found</h1>
                <p className="text-gray-400 mt-4">The artist you're looking for does not exist in our roster.</p>
                <Link to="/artists" className="inline-block mt-8 px-6 py-2 text-brand-dark bg-brand-cyan rounded-full hover:bg-cyan-300">
                    &larr; Back to Artists
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-brand-dark">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Hero Section */}
                <div 
                    className="relative h-96 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${artist.photo || 'https://placehold.co/1920x1080/0d0c22/00f5ff?text=SMC'})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent"></div>
                    <div className="container mx-auto px-6 relative h-full flex flex-col justify-end pb-8">
                        <Link to="/artists" className="text-brand-cyan hover:underline mb-4 text-sm">&larr; All Artists</Link>
                        <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg">{artist.name}</h1>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Column: Biography & Discography */}
                        <div className="lg:col-span-2">
                             <motion.div
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                             >
                                <h2 className="text-3xl font-bold text-brand-cyan mb-4">Biography</h2>
                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">{artist.bio}</p>
                             </motion.div>
                            
                             {artist.songs.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
                                    className="mt-16"
                                >
                                    <h2 className="text-3xl font-bold text-brand-cyan mb-8">Discography</h2>
                                    <div className="space-y-6">
                                        {artist.songs.map((song, index) => (
                                            <div key={index}>
                                                <h3 className="text-xl font-semibold text-brand-light mb-2">{song.title}</h3>
                                                <SpotifyEmbed spotifyUrl={song.spotifyUrl} />
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                             )}
                        </div>

                        {/* Sidebar: Connect */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                                className="bg-brand-dark-secondary p-6 rounded-lg border border-brand-cyan/20 sticky top-24"
                            >
                                <h3 className="text-2xl font-bold text-brand-light mb-6">Connect</h3>
                                <div className="flex space-x-6">
                                    <SocialIcon href={artist.socials.spotify} label={`${artist.name}'s Spotify`}>
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.183 14.226c-.23.363-.695.485-.933.248-2.175-1.432-4.92-1.758-8.24-.957-.456.11-.91-.17-.91-.643.0-.474.453-.752.909-.862 3.715-.89 6.843-.51 9.278 1.135.238.237.363.695.12 1.074zM17.5 13.12c-.28.45-.82.6-1.274.32-2.52-1.55-6.23-2.01-9.45-.98-.54.17-.98-.21-.98-.75s.44-.92.98-.98c3.67-1.02 7.84-.5 10.74 1.32.45.27.6.82.33 1.27zm.12-2.91c-.32.53-1.02.7-1.55.38-2.93-1.79-7.55-2.3-10.4-.98-.64.19-1.28-.28-1.28-.93s.64-1.12 1.28-.93c3.48-1.04 8.71-.4 11.96 1.6.53.32.7 1.02.39 1.56z"/></svg>
                                    </SocialIcon>
                                    <SocialIcon href={artist.socials.youtube} label={`${artist.name}'s YouTube`}>
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M21.582 7.042c-.225-.814-.88-1.468-1.697-1.695C18.265 5 12 5 12 5s-6.265 0-7.885.347c-.817.227-1.472.88-1.697 1.695C2 8.658 2 12 2 12s0 3.342.418 4.958c.225.815.88 1.468 1.697 1.695C5.735 19 12 19 12 19s6.265 0 7.885-.347c.817-.227 1.472.88 1.697-1.695C22 15.342 22 12 22 12s0-3.342-.418-4.958zM9.75 15V9l5.25 3-5.25 3z" /></svg>
                                    </SocialIcon>
                                    <SocialIcon href={artist.socials.instagram} label={`${artist.name}'s Instagram`}>
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.217.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.013 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.908 4.908 0 01-1.153 1.772 4.908 4.908 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.013-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.908 4.908 0 01-1.772-1.153 4.908 4.908 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428-.047-1.066-.06-1.405-.06-4.122s.013-3.056.06-4.122c.05-1.065.218-1.79.465-2.428a4.908 4.908 0 011.153-1.772A4.908 4.908 0 016.343 2.52c.637-.247 1.363.415 2.428-.465C9.83 2.01 10.16 2 12 2zm0 4.625a5.375 5.375 0 100 10.75 5.375 5.375 0 000-10.75zm0 8.875a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm4.875-9.875a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" /></svg>
                                    </SocialIcon>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ArtistDetail;