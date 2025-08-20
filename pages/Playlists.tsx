import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Playlist } from '../types';
import PlaylistEmbed from '../components/PlaylistEmbed';

const Playlists: React.FC = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    useEffect(() => {
        fetch('./data/playlists.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch playlists.');
                return response.json();
            })
            .then(data => setPlaylists(data))
            .catch(error => console.error("Error loading playlists data:", error));
    }, []);

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
                    <h1 className="text-4xl md:text-5xl font-black text-brand-cyan">Our Curated Playlists</h1>
                    <p className="mt-2 text-lg text-gray-300">Soundtracks for every moment, handpicked by the SMC team.</p>
                </motion.div>

                {playlists.length > 0 ? (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {playlists.map((playlist, index) => (
                            <motion.div 
                                key={index}
                                variants={itemVariants}
                                className="bg-brand-dark-secondary rounded-lg overflow-hidden shadow-lg shadow-brand-cyan/10 border border-brand-cyan/20"
                            >
                                <img src={playlist.coverImage} alt={playlist.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-brand-light">{playlist.title}</h3>
                                    <p className="text-gray-400 mt-2 mb-4">{playlist.description}</p>
                                    <PlaylistEmbed url={playlist.url} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center text-lg text-gray-400">Loading playlists...</div>
                )}
            </div>
        </div>
    );
};

export default Playlists;