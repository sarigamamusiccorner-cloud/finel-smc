import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Type } from '@google/genai';
import { VibeSong } from '../types';

const VibeFinder: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [songs, setSongs] = useState<VibeSong[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);
        setError(null);
        setSongs([]);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `You are a music expert. A user wants a playlist based on this vibe: "${prompt}". Suggest 5 songs that match this vibe. The songs can be from any artist or genre. For each song, provide the title, artist, and a short, compelling reason why it fits the vibe.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            songs: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        title: { type: Type.STRING },
                                        artist: { type: Type.STRING },
                                        reason: { type: Type.STRING }
                                    },
                                    required: ["title", "artist", "reason"]
                                }
                            }
                        },
                        required: ["songs"]
                    }
                }
            });
            
            const result = JSON.parse(response.text);
            setSongs(result.songs || []);

        } catch (err) {
            console.error("Gemini API Error:", err);
            setError("Sorry, I couldn't find a vibe for that. Please try something else.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-16 sm:py-24 bg-brand-dark relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.1),transparent_70%)] -z-0"></div>
            <div className="container mx-auto px-6 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-cyan" style={{ textShadow: '0 0 15px rgba(0, 245, 255, 0.5)' }}>
                        Find Your Vibe
                    </h2>
                    <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                        Describe a mood, a scene, or an activity, and let our AI curate a personalized soundtrack for you.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4"
                >
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., 'Late night drive through the city'"
                        className="flex-grow bg-brand-dark-secondary border-2 border-brand-cyan/30 rounded-full shadow-sm py-3 px-6 text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan transition-colors"
                        aria-label="Describe your vibe"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !prompt.trim()}
                        className="px-8 py-3 text-lg font-semibold text-brand-dark bg-brand-cyan rounded-full shadow-lg shadow-brand-cyan/30 hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-600 disabled:shadow-none disabled:scale-100 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Curating...
                            </div>
                        ) : "Get Songs"}
                    </button>
                </motion.form>
                
                <div className="mt-12 max-w-4xl mx-auto">
                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="text-brand-red"
                            >
                                {error}
                            </motion.p>
                        )}
                        {songs.length > 0 && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
                            >
                                {songs.map((song, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
                                        className="bg-brand-dark-secondary p-6 rounded-lg border border-brand-cyan/20 flex flex-col"
                                    >
                                        <div>
                                            <h4 className="text-xl font-bold text-brand-light">{song.title}</h4>
                                            <p className="text-brand-cyan font-semibold">{song.artist}</p>
                                            <p className="text-gray-400 mt-2 text-sm">"{song.reason}"</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-brand-cyan/10">
                                            <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.title + ' ' + song.artist)}`} target="_blank" rel="noopener noreferrer" aria-label={`Play ${song.title} on YouTube`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                                                <span>YouTube</span>
                                            </a>
                                            <a href={`https://open.spotify.com/search/${encodeURIComponent(song.title + ' ' + song.artist)}`} target="_blank" rel="noopener noreferrer" aria-label={`Play ${song.title} on Spotify`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.183 14.226c-.23.363-.695.485-.933.248-2.175-1.432-4.92-1.758-8.24-.957-.456.11-.91-.17-.91-.643.0-.474.453-.752.909-.862 3.715-.89 6.843-.51 9.278 1.135.238.237.363.695.12 1.074zM17.5 13.12c-.28.45-.82.6-1.274.32-2.52-1.55-6.23-2.01-9.45-.98-.54.17-.98-.21-.98-.75s.44-.92.98-.98c3.67-1.02 7.84-.5 10.74 1.32.45.27.6.82.33 1.27zm.12-2.91c-.32.53-1.02.7-1.55.38-2.93-1.79-7.55-2.3-10.4-.98-.64.19-1.28-.28-1.28-.93s.64-1.12 1.28-.93c3.48-1.04 8.71-.4 11.96 1.6.53.32.7 1.02.39 1.56z"></path></svg>
                                                <span>Spotify</span>
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default VibeFinder;