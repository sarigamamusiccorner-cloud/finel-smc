import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NewsPost } from '../types';

const News: React.FC = () => {
    const [posts, setPosts] = useState<NewsPost[]>([]);
    
    useEffect(() => {
        fetch('./data/news.json')
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch news.');
                return response.json();
            })
            .then(data => setPosts(data))
            .catch(error => console.error("Error loading news data:", error));
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
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
                    <h1 className="text-4xl md:text-5xl font-black text-brand-cyan">News & Events</h1>
                    <p className="mt-2 text-lg text-gray-300">The latest updates from Sarigama Music Corner.</p>
                </motion.div>
                
                {posts.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {posts.map((post, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-brand-dark-secondary rounded-lg overflow-hidden shadow-lg shadow-brand-cyan/10 border border-brand-cyan/20 flex flex-col group"
                            >
                                <div className="overflow-hidden">
                                    <img src={post.image} alt={post.title} className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-sm text-brand-cyan font-semibold">{post.date}</p>
                                    <h3 className="text-xl font-bold text-brand-light mt-2 flex-grow">{post.title}</h3>
                                    <p className="text-gray-400 mt-2 mb-4">{post.excerpt}</p>
                                    <Link to={`/news/${post.slug}`} className="font-semibold text-brand-cyan self-start group-hover:underline">Read More &rarr;</Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center text-lg text-gray-400">Loading news...</div>
                )}
            </div>
        </div>
    );
};

export default News;