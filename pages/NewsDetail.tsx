import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { NewsPost } from '../types';

const NewsDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<NewsPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data/news.json')
            .then(res => res.json())
            .then((data: NewsPost[]) => {
                const foundPost = data.find(p => p.slug === slug);
                setPost(foundPost || null);
            })
            .catch(err => console.error("Failed to fetch news post:", err))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return <div className="text-center py-24 text-brand-cyan">Loading article...</div>;
    }

    if (!post) {
        return (
            <div className="text-center py-24">
                <h1 className="text-3xl font-bold text-brand-red">Post not found</h1>
                <p className="text-gray-400 mt-4">The article you're looking for does not exist.</p>
                <Link to="/news" className="inline-block mt-8 px-6 py-2 text-brand-dark bg-brand-cyan rounded-full hover:bg-cyan-300">
                    Back to News
                </Link>
            </div>
        );
    }

    return (
        <div className="py-16 sm:py-24 bg-brand-dark">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="mb-8">
                        <Link to="/news" className="text-brand-cyan hover:underline">&larr; Back to News</Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-brand-light mb-4">{post.title}</h1>
                    <p className="text-brand-cyan font-semibold mb-6">{post.date}</p>
                    <img src={post.image} alt={post.title} className="w-full rounded-lg mb-8 aspect-video object-cover" />
                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed space-y-4">
                        <p>{post.content}</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NewsDetail;