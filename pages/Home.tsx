
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpotifyEmbed from '../components/SpotifyEmbed';
import VibeFinder from '../components/VibeFinder';
import { Song, NewsPost, Artist, Playlist } from '../types';

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; delay: number }> = ({ icon, title, children, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay }}
        className="p-8 bg-brand-dark rounded-lg border border-brand-cyan/20 flex flex-col items-center text-center transition-all duration-300 hover:border-brand-cyan/60 hover:shadow-2xl hover:shadow-brand-cyan/20 hover:-translate-y-2"
    >
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-cyan/20 text-brand-cyan mb-6">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-brand-light">{title}</h3>
        <p className="mt-4 text-gray-400">{children}</p>
    </motion.div>
);

const PhilosophyCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; delay: number }> = ({ icon, title, children, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay }}
        className="p-8 bg-brand-dark-secondary rounded-lg border border-brand-cyan/20 flex flex-col items-center text-center backdrop-blur-sm transition-all duration-300 hover:border-brand-cyan/60 hover:shadow-2xl hover:shadow-brand-cyan/20 hover:-translate-y-2"
    >
        <div className="text-brand-cyan mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-brand-light">{title}</h3>
        <p className="mt-4 text-gray-400">{children}</p>
    </motion.div>
);


const Home: React.FC = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [latestNews, setLatestNews] = useState<NewsPost[]>([]);

    useEffect(() => {
        fetch('./data/songs.json')
            .then(res => res.json())
            .then(data => setSongs(data.slice(0, 6)))
            .catch(err => console.error("Failed to fetch songs:", err));

        fetch('./data/playlists.json')
            .then(res => res.json())
            .then(data => setPlaylists(data.slice(0, 3)))
            .catch(err => console.error("Failed to fetch playlists:", err));

        fetch('./data/news.json')
            .then(res => res.json())
            .then(data => setLatestNews(data.slice(0, 3)))
            .catch(err => console.error("Failed to fetch news:", err));
    }, []);

    return (
        <>
            {/* Hero Section */}
            <div className="relative h-screen min-h-[700px] flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-brand-dark -z-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,245,255,0.15),transparent_60%)]"></div>
                
                <div className="container mx-auto px-6 relative">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-light drop-shadow-lg"
                    >
                        Defining the Future of Sound
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-4 text-xl md:text-2xl font-semibold text-brand-cyan"
                    >
                        Sarigama Music Corner
                    </motion.p>
                     <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-4 text-md md:text-lg text-gray-300 max-w-3xl mx-auto"
                    >
                        A premier music label dedicated to producing exceptional sound and elevating the next generation of artists.
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/music" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-brand-dark bg-brand-cyan rounded-md shadow-lg shadow-brand-cyan/30 hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-cyan/50">
                            Explore Music
                        </Link>
                        <Link to="/join" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-brand-light border-2 border-brand-cyan rounded-md hover:bg-brand-cyan hover:text-brand-dark transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-cyan/50">
                            Join SMC
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Latest Releases Section */}
            <div className="py-16 sm:py-24 bg-brand-dark-secondary">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-cyan">Latest Releases</h2>
                        <p className="mt-2 text-lg text-gray-300">The freshest sounds from Sarigama Music Corner.</p>
                    </motion.div>
                    {songs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {songs.map((song, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.7, delay: index * 0.1 }}
                                >
                                    <SpotifyEmbed spotifyUrl={song.spotifyUrl} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">Loading releases...</p>
                    )}
                </div>
            </div>

            {/* Curated Playlists Section */}
            {playlists.length > 0 && (
                <div className="py-16 sm:py-24 bg-brand-dark">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-cyan">Curated Playlists</h2>
                            <p className="mt-2 text-lg text-gray-300">Handpicked collections for every mood and moment.</p>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {playlists.map((playlist, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="bg-brand-dark-secondary rounded-lg overflow-hidden shadow-lg shadow-brand-cyan/10 border border-brand-cyan/20 flex flex-col group transition-all duration-300 hover:border-brand-cyan/60 hover:shadow-2xl hover:shadow-brand-cyan/20 hover:-translate-y-2"
                                >
                                    <div className="overflow-hidden relative">
                                        <img src={playlist.coverImage} alt={playlist.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-brand-light">{playlist.title}</h3>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <p className="text-gray-400 flex-grow">{playlist.description}</p>
                                        <Link to={`/playlists`} className="font-semibold text-brand-cyan self-start group-hover:underline mt-4">
                                            Listen Now &rarr;
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                         <div className="text-center mt-12">
                             <Link to="/playlists" className="inline-block px-8 py-3 text-lg font-semibold text-brand-dark bg-brand-cyan rounded-md shadow-lg shadow-brand-cyan/30 hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-cyan/50">
                                View All Playlists
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Our Philosophy Section */}
            <div className="py-16 sm:py-24 bg-brand-dark-secondary relative overflow-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full bg-brand-dark-secondary">
                    <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#005f63,transparent)]"></div>
                </div>
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-4xl font-bold text-brand-cyan mb-12"
                    >
                        The Philosophy
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PhilosophyCard delay={0.1} title="Artistic Freedom" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}>
                            Empowering artists to explore their unique sound without creative constraints, fostering genuine and groundbreaking music.
                        </PhilosophyCard>
                        <PhilosophyCard delay={0.2} title="Unmatched Quality" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 12l4.293 4.293a1 1 0 010 1.414L12 20m0 0l-2.293-2.293a1 1 0 010-1.414L14 12l-4.293-4.293a1 1 0 010-1.414L12 4z" /></svg>}>
                            From production to mastering, an obsession with quality is paramount. Every release meets the highest standards of audio excellence.
                        </PhilosophyCard>
                        <PhilosophyCard delay={0.3} title="Global Reach" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l1.414-1.414a1 1 0 011.414 0l1.414 1.414M2 11h20M12 21v-2m0-10V5" /></svg>}>
                            Connecting artists with a worldwide audience, ensuring their music transcends borders and cultures.
                        </PhilosophyCard>
                    </div>
                </div>
            </div>

            <VibeFinder />

            {/* SMC for Creators Section */}
            <div className="py-16 sm:py-24 bg-brand-dark-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,255,0.1),transparent_70%)] -z-0"></div>
                <div className="container mx-auto px-6 text-center relative">
                    <motion.h2
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-4xl font-bold text-brand-magenta"
                        style={{ textShadow: '0 0 15px rgba(255, 0, 255, 0.5)' }}
                    >
                        SMC for Creators
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto"
                    >
                        Digital services designed to empower independent artists and labels. Take control of your music career with our global distribution and rights management platform.
                    </motion.p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="p-8 bg-brand-dark rounded-lg border border-brand-magenta/30 flex flex-col items-center text-center transition-all duration-300 hover:border-brand-magenta/70 hover:shadow-2xl hover:shadow-brand-magenta/20"
                        >
                            <h3 className="text-2xl font-bold text-brand-light">For Artists</h3>
                            <p className="mt-4 text-gray-400 flex-grow">Release your music worldwide, collect royalties, and manage your rights with our all-in-one platform.</p>
                            <Link to="/services" className="mt-6 inline-block px-6 py-3 font-semibold text-brand-dark bg-brand-magenta rounded-md shadow-lg shadow-brand-magenta/30 hover:bg-fuchsia-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-magenta/50">
                                Register Now
                            </Link>
                        </motion.div>
                        <motion.div
                             initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="p-8 bg-brand-dark rounded-lg border border-brand-magenta/30 flex flex-col items-center text-center transition-all duration-300 hover:border-brand-magenta/70 hover:shadow-2xl hover:shadow-brand-magenta/20"
                        >
                            <h3 className="text-2xl font-bold text-brand-light">For Labels</h3>
                            <p className="mt-4 text-gray-400 flex-grow">Streamline your distribution, manage your catalog, and access detailed analytics for your entire roster.</p>
                            <Link to="/services" className="mt-6 inline-block px-6 py-3 font-semibold text-brand-dark bg-brand-magenta rounded-md shadow-lg shadow-brand-magenta/30 hover:bg-fuchsia-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-magenta/50">
                                Register Now
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
            
            {/* From Our Newsdesk Section */}
            {latestNews.length > 0 && (
                <div className="py-16 sm:py-24 bg-brand-dark">
                    <div className="container mx-auto px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-brand-cyan">From The Studio</h2>
                             <p className="mt-2 text-lg text-gray-300">The latest stories and announcements from Sarigama Music Corner.</p>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {latestNews.map((post, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="bg-brand-dark-secondary rounded-lg overflow-hidden shadow-lg shadow-brand-cyan/10 border border-brand-cyan/20 flex flex-col group transition-all duration-300 hover:border-brand-cyan/60 hover:shadow-2xl hover:shadow-brand-cyan/20 hover:-translate-y-2"
                                >
                                    <div className="overflow-hidden">
                                        <img src={post.image} alt={post.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <p className="text-sm text-brand-cyan font-semibold">{post.date}</p>
                                        <h3 className="text-xl font-bold text-brand-light mt-2 flex-grow">{post.title}</h3>
                                        <Link to={`/news/${post.slug}`} className="font-semibold text-brand-cyan self-start group-hover:underline mt-4">
                                            Read More &rarr;
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

             {/* Final CTA Section */}
            <div className="py-16 sm:py-24 bg-brand-dark-secondary">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-cyan">Join the Movement</h2>
                        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                            SMC is always looking for passionate artists ready to redefine the future of music. If you have what it takes, your submission is welcome.
                        </p>
                        <div className="mt-8">
                            <Link to="/join" className="inline-block px-10 py-4 text-lg font-semibold text-brand-dark bg-brand-cyan rounded-md shadow-lg shadow-brand-cyan/30 hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-cyan/50">
                                Submit Your Music
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Home;
