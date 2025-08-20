
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; delay: number }> = ({ icon, title, children, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, delay }}
        className="p-6 bg-brand-dark-secondary rounded-lg border border-brand-magenta/20 flex flex-col items-center text-center transition-all duration-300 hover:border-brand-magenta/60 hover:shadow-xl hover:shadow-brand-magenta/10"
    >
        <div className="text-brand-magenta mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-brand-light">{title}</h3>
        <p className="mt-2 text-gray-400">{children}</p>
    </motion.div>
);

const Services: React.FC = () => {
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzzvlvqy";
    const [status, setStatus] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus("Submitting...");

        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        }).then(response => {
            if (response.ok) {
                setStatus("Thank you for registering! We will be in touch soon.");
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                        setStatus(data["errors"].map((error: any) => error["message"]).join(", "));
                    } else {
                        setStatus("Oops! There was a problem submitting your registration.");
                    }
                });
            }
        }).catch(() => {
            setStatus("Oops! There was a problem submitting your registration.");
        }).finally(() => {
            setSubmitting(false);
            setTimeout(() => setStatus(""), 6000); // Clear status after 6 seconds
        });
    };

    return (
        <div className="py-16 sm:py-24 bg-brand-dark">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-brand-magenta mb-4" style={{ textShadow: '0 0 15px rgba(255, 0, 255, 0.5)' }}>SMC Digital Services</h1>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-16">
                        Your all-in-one solution for music distribution, rights management, and career growth. Built for the independent creator.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                    <FeatureCard delay={0.1} title="Global Music Distribution" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>}>
                        Release your music to Spotify, Apple Music, Instagram, TikTok, and 150+ other platforms worldwide.
                    </FeatureCard>
                    <FeatureCard delay={0.2} title="YouTube Content ID" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>}>
                        Earn money whenever your music is used in any video across YouTube. We find it and pay you.
                    </FeatureCard>
                    <FeatureCard delay={0.3} title="Royalty Collection" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}>
                        Comprehensive collection of all your publishing and mechanical royalties from around the world.
                    </FeatureCard>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="max-w-3xl mx-auto bg-brand-dark-secondary p-8 rounded-lg border border-brand-magenta/30"
                >
                    <h2 className="text-3xl font-bold text-center text-brand-light mb-8">Start Your Journey With SMC</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input type="hidden" name="_subject" value="New SMC Digital Services Registration!" />
                        <input type="text" name="_gotcha" style={{ display: 'none' }} />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="yourName" className="block text-sm font-medium text-brand-light">Your Name</label>
                                <input type="text" name="yourName" id="yourName" required className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md shadow-sm py-2 px-3 text-brand-light focus:outline-none focus:ring-brand-magenta focus:border-brand-magenta" />
                            </div>
                             <div>
                                <label htmlFor="artistName" className="block text-sm font-medium text-brand-light">Artist / Label Name</label>
                                <input type="text" name="artistName" id="artistName" required className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md shadow-sm py-2 px-3 text-brand-light focus:outline-none focus:ring-brand-magenta focus:border-brand-magenta" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-brand-light">Contact Email</label>
                            <input type="email" name="email" id="email" required className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md shadow-sm py-2 px-3 text-brand-light focus:outline-none focus:ring-brand-magenta focus:border-brand-magenta" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-brand-light">I am registering as a...</label>
                            <div className="mt-2 flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0">
                                <label className="flex items-center">
                                    <input type="radio" name="registrationType" value="Artist" className="form-radio h-4 w-4 text-brand-magenta bg-brand-dark border-gray-600 focus:ring-brand-magenta" required/>
                                    <span className="ml-2 text-brand-light">Artist</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="registrationType" value="Label" className="form-radio h-4 w-4 text-brand-magenta bg-brand-dark border-gray-600 focus:ring-brand-magenta" />
                                    <span className="ml-2 text-brand-light">Label</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="registrationType" value="Manager" className="form-radio h-4 w-4 text-brand-magenta bg-brand-dark border-gray-600 focus:ring-brand-magenta" />
                                    <span className="ml-2 text-brand-light">Manager</span>
                                </label>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-brand-light">Services interested in:</label>
                             <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                <label className="flex items-center">
                                    <input type="checkbox" name="service" value="Global Distribution" className="form-checkbox h-4 w-4 text-brand-magenta bg-brand-dark border-gray-600 rounded focus:ring-brand-magenta"/>
                                    <span className="ml-2 text-brand-light">Global Distribution</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" name="service" value="YouTube Content ID" className="form-checkbox h-4 w-4 text-brand-magenta bg-brand-dark border-gray-600 rounded focus:ring-brand-magenta" />
                                    <span className="ml-2 text-brand-light">YouTube Content ID</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" name="service" value="Royalty Collection" className="form-checkbox h-4 w-4 text-brand-magenta bg-brand-dark border-gray-600 rounded focus:ring-brand-magenta" />
                                    <span className="ml-2 text-brand-light">Royalty Collection</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="checkbox" name="service" value="Full Label Services" className="form-checkbox h-4 w-4 text-brand-magenta bg-brand-dark border-gray-600 rounded focus:ring-brand-magenta" />
                                    <span className="ml-2 text-brand-light">Full Label Services</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="musicLink" className="block text-sm font-medium text-brand-light">Link to Your Music (Optional)</label>
                            <input type="url" name="musicLink" id="musicLink" placeholder="Spotify, YouTube, SoundCloud, etc." className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md shadow-sm py-2 px-3 text-brand-light focus:outline-none focus:ring-brand-magenta focus:border-brand-magenta" />
                        </div>
                        
                         <div>
                            <label htmlFor="message" className="block text-sm font-medium text-brand-light">Tell us about your project (Optional)</label>
                            <textarea name="message" id="message" rows={4} placeholder="What are your goals? Any upcoming releases?" className="mt-1 block w-full bg-brand-dark border border-gray-600 rounded-md shadow-sm py-2 px-3 text-brand-light focus:outline-none focus:ring-brand-magenta focus:border-brand-magenta"></textarea>
                        </div>

                        <div>
                            <button type="submit" disabled={submitting} className="w-full px-8 py-3 text-lg font-semibold text-brand-dark bg-brand-magenta rounded-full shadow-lg hover:bg-fuchsia-500 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed">
                                {submitting ? 'Registering...' : 'Register for SMC Digital'}
                            </button>
                        </div>
                         {status && <p className="text-center text-brand-magenta mt-4">{status}</p>}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Services;