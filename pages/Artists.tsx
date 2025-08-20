import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Artist } from '../types';

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


const Artists: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        fetch('./data/artists.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch artists.');
                return response.json();
            })
            .then((data: Artist[]) => {
                // Filter out the founder to feature other artists
                const regularArtists = data.filter(artist => artist.name !== "Muhammed Sufiyan");
                setArtists(regularArtists);
            })
            .catch(error => console.error("Error loading artists data:", error));
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
    };

    return (
        <div className="py-16 sm:py-24 bg-brand-dark overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-brand-cyan" style={{ textShadow: '0 0 15px rgba(0, 245, 255, 0.5)' }}>Our Artists</h1>
                    <p className="mt-2 text-lg text-brand-light/80">The creative souls behind the music.</p>
                </motion.div>

                {artists.length > 0 ? (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {artists.map((artist) => (
                           <motion.div key={artist.name} variants={itemVariants} className="h-full">
                                <Link to={`/artists/${artist.slug}`} className="block h-full group">
                                    <div className="bg-brand-dark-secondary rounded-lg overflow-hidden border border-brand-cyan/20 flex flex-col transition-all duration-300 group-hover:border-brand-cyan/60 group-hover:-translate-y-2 group-hover:shadow-[0_0_25px_rgba(0,245,255,0.3)] h-full">
                                        <div className="relative">
                                            <img 
                                                src={artist.photo || `https://placehold.co/800x600/1f1e33/e0e0e0?text=${encodeURIComponent(artist.name)}`} 
                                                alt={artist.name} 
                                                className="w-full h-72 object-cover object-center" 
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-secondary via-brand-dark-secondary/50 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 p-6">
                                                <h2 className="text-3xl font-bold text-brand-light">{artist.name}</h2>
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <p className="text-gray-400 mb-6 leading-relaxed flex-grow">{artist.bio.substring(0, 150)}...</p>
                                            
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-cyan/20">
                                                <div className="flex space-x-4">
                                                    <SocialIcon href={artist.socials.spotify} label={`${artist.name}'s Spotify`}>
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.183 14.226c-.23.363-.695.485-.933.248-2.175-1.432-4.92-1.758-8.24-.957-.456.11-.91-.17-.91-.643.0-.474.453-.752.909-.862 3.715-.89 6.843-.51 9.278 1.135.238.237.363.695.12 1.074zM17.5 13.12c-.28.45-.82.6-1.274.32-2.52-1.55-6.23-2.01-9.45-.98-.54.17-.98-.21-.98-.75s.44-.92.98-.98c3.67-1.02 7.84-.5 10.74 1.32.45.27.6.82.33 1.27zm.12-2.91c-.32.53-1.02.7-1.55.38-2.93-1.79-7.55-2.3-10.4-.98-.64.19-1.28-.28-1.28-.93s.64-1.12 1.28-.93c3.48-1.04 8.71-.4 11.96 1.6.53.32.7 1.02.39 1.56z"/></svg>
                                                    </SocialIcon>
                                                    <SocialIcon href={artist.socials.youtube} label={`${artist.name}'s YouTube`}>
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.582 7.042c-.225-.814-.88-1.468-1.697-1.695C18.265 5 12 5 12 5s-6.265 0-7.885.347c-.817.227-1.472.88-1.697 1.695C2 8.658 2 12 2 12s0 3.342.418 4.958c.225.815.88 1.468 1.697 1.695C5.735 19 12 19 12 19s6.265 0 7.885-.347c.817-.227 1.472.88 1.697-1.695C22 15.342 22 12 22 12s0-3.342-.418-4.958zM9.75 15V9l5.25 3-5.25 3z" /></svg>
                                                    </SocialIcon>
                                                    <SocialIcon href={artist.socials.instagram} label={`${artist.name}'s Instagram`}>
                                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.217.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.013 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.908 4.908 0 01-1.153 1.772 4.908 4.908 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.013-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.908 4.908 0 01-1.772-1.153 4.908 4.908 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428-.047-1.066-.06-1.405-.06-4.122s.013-3.056.06-4.122c.05-1.065.218-1.79.465-2.428a4.908 4.908 0 011.153-1.772A4.908 4.908 0 016.343 2.52c.637-.247 1.363.415 2.428-.465C9.83 2.01 10.16 2 12 2zm0 4.625a5.375 5.375 0 100 10.75 5.375 5.375 0 000-10.75zm0 8.875a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm4.875-9.875a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" /></svg>
                                                    </SocialIcon>
                                                </div>
                                                <span className="font-semibold text-brand-cyan group-hover:underline">
                                                    View Profile &rarr;
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                           </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center text-lg text-brand-light/70">Loading artists...</div>
                )}
            </div>
        </div>
    );
};

export default Artists;