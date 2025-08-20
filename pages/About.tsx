
import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => {
    return (
        <div className="bg-brand-dark-secondary p-6 rounded-lg border border-brand-cyan/20 text-center flex flex-col items-center transition-all duration-300 hover:border-brand-cyan/60 hover:shadow-xl hover:shadow-brand-cyan/10 hover:-translate-y-1 h-full">
            <div className="text-brand-cyan mb-4">{icon}</div>
            <h4 className="text-xl font-bold text-brand-light mb-2">{title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
        </div>
    );
};

const About: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    return (
        <div className="py-16 sm:py-24 bg-brand-dark">
            <div className="container mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-black text-center text-brand-cyan mb-4">A Singular Vision</h1>
                    <p className="text-center text-lg text-gray-300 max-w-3xl mx-auto mb-12">
                        Crafting the sonic landscapes of tomorrow, today.
                    </p>
                </motion.div>
                
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <motion.div 
                        className="lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-brand-light mb-4">A Personal Approach to Music</h2>
                        <p className="text-gray-400 leading-relaxed mb-4">
                            Sarigama Music Corner was born from a singular vision: to be a true partner for artists. The label operates on the belief that great music comes from a place of freedom and support. Its mission is to provide artists with all the tools they need—from world-class production to global distribution—so they can focus on what they do best: creating.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            SMC is more than just a label; it's a dedicated launchpad for talent. It exists to support artists through every step of their journey, offering guidance, managing copyrights, and helping them navigate the complexities of the music industry. For SMC, success is measured by the growth of its artists and the impact their music has on the world.
                        </p>
                    </motion.div>
                    <motion.div 
                        className="lg:w-1/2 flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="p-4 border-2 border-brand-cyan rounded-lg shadow-2xl shadow-brand-cyan/20 bg-gradient-to-br from-gray-900 to-brand-dark">
                            <img src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4npwsF_peyGl6HIExtDh5LuKfdkaJf6MBh37gJ6ylSZz7oc48fEpSSBMDdmpdlEK1zZN7co738wivdxz94MfnSWNOXakG-dScI7-gRunWtfbX5DV6-Yhf_6qLjwl4oB6LSmukRukTon9_0um=s680-w680-h510-rw" alt="Muhammed Sufiyan" className="rounded-lg object-cover" />
                        </div>
                    </motion.div>
                </div>

                {/* Our Services Section */}
                <div className="mt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-brand-light">Services</h2>
                        <p className="text-lg text-gray-300 mt-2">Comprehensive support for the modern artist.</p>
                    </motion.div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <ServiceCard title="Music Production" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>}>
                            From initial concept to final track, the creative process is guided to produce exceptional, high-quality music.
                        </ServiceCard>
                        <ServiceCard title="Mixing & Mastering" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>}>
                            Expert engineering polishes every track to achieve a professional, broadcast-ready sound with optimal clarity and depth.
                        </ServiceCard>
                        <ServiceCard title="Recording" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>}>
                            Access to professional recording environments to capture pristine audio performances.
                        </ServiceCard>
                         <ServiceCard title="Global Distribution" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l1.414-1.414a1 1 0 011.414 0l1.414 1.414M2 11h20M12 21v-2m0-10V5" /></svg>}>
                            Music is delivered to hundreds of digital stores and streaming platforms worldwide, including Spotify, Apple Music, and more.
                        </ServiceCard>
                        <ServiceCard title="Copyright Management" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>}>
                            Protecting creative works by managing rights and royalties to ensure artists are properly credited and compensated.
                        </ServiceCard>
                         <ServiceCard title="Artist Support" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}>
                            More than a label, a partner. Helping artists navigate the industry and providing the guidance needed to grow a career.
                        </ServiceCard>
                    </motion.div>
                </div>

                <div className="mt-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-brand-light mb-4">The Mind Behind the Music</h2>
                        <h3 className="text-2xl font-semibold text-brand-cyan mb-4">Muhammed Sufiyan - Founder & Producer</h3>
                        <p className="text-gray-400 leading-relaxed max-w-3xl mx-auto">
                           Muhammed Sufiyan, the young visionary behind SMC, founded the label out of a passion that took root at an early age. His journey is fueled by a deep fascination with fusing traditional rhythms and modern electronic soundscapes. This passion evolved into a mission to push the boundaries of music. Sufiyan's hands-on approach and keen ear for talent are the driving forces behind the label's success, ensuring that every project aligns with the core values of authenticity and innovation.
                        </p>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default About;