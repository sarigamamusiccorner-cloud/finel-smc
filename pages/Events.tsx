import React from 'react';
import { motion } from 'framer-motion';
import { Event } from '../types';

const Events: React.FC = () => {
    return (
        <div className="py-16 sm:py-24 bg-brand-dark min-h-[60vh] flex items-center">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block p-4 bg-brand-dark-secondary rounded-full mb-6 border border-brand-cyan/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-brand-cyan">More Events Coming Soon</h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                        There are no events scheduled at the moment. We're busy in the studio cooking up new sounds and planning our next live experiences.
                    </p>
                    <p className="mt-2 text-lg text-gray-300 max-w-2xl mx-auto">
                        Follow us on our social channels to be the first to know about upcoming shows!
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Events;
