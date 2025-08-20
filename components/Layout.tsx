
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
// Note: In a real project, install framer-motion with `npm install framer-motion`
import { motion, AnimatePresence } from 'framer-motion'; 
import Header from './Header';
import Footer from './Footer';

const PageTransition = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

const Layout: React.FC = () => {
    const location = useLocation();
    
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <PageTransition key={location.pathname}>
                        <Outlet />
                    </PageTransition>
                </AnimatePresence>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;