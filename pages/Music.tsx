
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Song } from '../types';
import SpotifyEmbed from '../components/SpotifyEmbed';

const Music: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [selectedSong, setSelectedSong] = useState<number | null>(null);

    useEffect(() => {
        fetch('./data/songs.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch songs.');
                return response.json();
            })
            .then(data => setSongs(data))
            .catch(error => console.error("Error loading songs data:", error));
    }, []);

    const handleToggleSong = (index: number) => {
        setSelectedSong(selectedSong === index ? null : index);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <div className="py-16 sm:py-24 bg-brand-dark">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-brand-cyan">Our Discography</h1>
                    <p className="mt-2 text-lg text-gray-300">Explore the complete collection of sounds from SMC.</p>
                </motion.div>

                {songs.length > 0 ? (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto space-y-3"
                    >
                        {songs.map((song, index) => (
                            <motion.div 
                                key={index}
                                variants={itemVariants}
                                className="bg-brand-dark-secondary rounded-lg overflow-hidden border border-brand-cyan/20 transition-colors hover:border-brand-cyan/40"
                            >
                                <button 
                                    onClick={() => handleToggleSong(index)}
                                    className="w-full p-4 sm:p-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-lg"
                                    aria-expanded={selectedSong === index}
                                    aria-controls={`song-embed-${index}`}
                                >
                                    <div className="flex items-center gap-4 sm:gap-6">
                                        <span className="text-lg font-bold text-gray-500 w-8 text-center">{String(index + 1).padStart(2, '0')}</span>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-brand-light">{song.title}</h3>
                                            <p className="text-gray-400 mt-1 text-xs sm:text-sm">{song.description}</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: selectedSong === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-brand-cyan flex-shrink-0 ml-4"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {selectedSong === index && (
                                        <motion.div
                                            id={`song-embed-${index}`}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1, transition: { height: { duration: 0.4, ease: "easeInOut" }, opacity: { duration: 0.3, delay: 0.1 } } }}
                                            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.4, ease: "easeInOut" }, opacity: { duration: 0.2 } } }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-4 sm:p-6 sm:pt-2">
                                                <SpotifyEmbed spotifyUrl={song.spotifyUrl} />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center text-lg text-gray-400">Loading music...</div>
                )}
            </div>
        </div>
    );
};

export default Music;
