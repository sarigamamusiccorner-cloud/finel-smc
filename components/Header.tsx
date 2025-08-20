import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const Logo = () => (
    <NavLink to="/" className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md" aria-label="Go to Homepage">
        <img 
            src="https://iili.io/FyGFUCX.md.png" 
            alt="Sarigama Music Corner Logo" 
            className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" 
        />
    </NavLink>
);


const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void; end?: boolean }> = ({ to, children, onClick, end }) => {
    return (
        <NavLink
            to={to}
            end={end}
            onClick={onClick}
            className={({ isActive }) =>
                `relative group block md:inline-block px-4 py-3 transition-colors duration-300 hover:text-brand-cyan ${isActive ? 'text-brand-cyan' : 'text-brand-light'}`
            }
        >
            {({ isActive }) => (
                <>
                    {children}
                    <span className={`absolute bottom-1.5 left-0 w-full h-0.5 bg-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 ${isActive ? 'scale-x-100' : ''}`}></span>
                </>
            )}
        </NavLink>
    );
};

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navItems = [
        { path: '/', label: 'Home', end: true },
        { path: '/about', label: 'About' },
        { 
            label: 'Explore', 
            isDropdown: true,
            subItems: [
                { path: '/music', label: 'Music' },
                { path: '/artists', label: 'Artists' },
                { path: '/playlists', label: 'Playlists' },
                { path: '/events', label: 'Events' },
            ] 
        },
        { path: '/news', label: 'News' },
        { path: '/join', label: 'Join Us' },
        { path: '/contact', label: 'Contact' },
    ];
    
    const dropdownVariants: Variants = {
        hidden: { opacity: 0, y: -10, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    };

    const mobileMenuVariants: Variants = {
        closed: { opacity: 0, y: -20, transition: { when: "afterChildren" } },
        open: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
    };
    
    const mobileNavItemVariants: Variants = {
        closed: { opacity: 0, y: -10 },
        open: { opacity: 1, y: 0 },
    };

    const locationIsActive = (paths: string[]) => paths.some(path => location.pathname.startsWith(path));

    return (
        <header className="sticky top-0 z-50 bg-brand-dark/90 backdrop-blur-lg shadow-lg shadow-brand-cyan/10">
            <nav className="container mx-auto px-6 py-2 flex justify-between items-center">
                <Logo />
                <div className="hidden md:flex items-center space-x-2">
                    {navItems.map(item => 
                        item.isDropdown ? (
                            <div 
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => setIsExploreOpen(true)}
                                onMouseLeave={() => setIsExploreOpen(false)}
                            >
                                <button
                                    className={`relative group block md:inline-block px-4 py-3 transition-colors duration-300 hover:text-brand-cyan focus:outline-none ${locationIsActive(['/music', '/artists', '/playlists', '/events']) ? 'text-brand-cyan' : 'text-brand-light'}`}
                                >
                                    {item.label}
                                    <span className={`absolute bottom-1.5 left-0 w-full h-0.5 bg-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 ${locationIsActive(['/music', '/artists', '/playlists', '/events']) ? 'scale-x-100' : ''}`}></span>
                                </button>
                                <AnimatePresence>
                                    {isExploreOpen && (
                                        <motion.div
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="hidden"
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-brand-dark-secondary rounded-md shadow-lg border border-brand-cyan/20"
                                        >
                                            <div className="py-1">
                                                {item.subItems?.map(subItem => (
                                                    <Link key={subItem.path} to={subItem.path} className="block px-4 py-2 text-sm text-brand-light hover:bg-brand-dark hover:text-brand-cyan transition-colors">
                                                        {subItem.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <NavItem key={item.path} to={item.path!} end={item.end}>{item.label}</NavItem>
                        )
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none p-2" aria-label="Open menu" aria-expanded={isOpen}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </nav>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="md:hidden bg-brand-dark/95 absolute w-full"
                    >
                        <div className="flex flex-col items-center py-4">
                            {navItems.map(item => 
                                item.isDropdown ? (
                                    <div key={item.label} className="w-full text-center">
                                         <span className={`font-bold py-3 block ${locationIsActive(['/music', '/artists', '/playlists', '/events']) ? 'text-brand-cyan' : 'text-brand-light'}`}>{item.label}</span>
                                         <div className="pl-4 border-l-2 border-brand-cyan/30 ml-[calc(50%-1px)]">
                                             {item.subItems?.map(subItem => (
                                                <NavItem key={subItem.path} to={subItem.path} onClick={() => setIsOpen(false)}>{subItem.label}</NavItem>
                                             ))}
                                         </div>
                                    </div>
                                ) : (
                                    <motion.div key={item.path} variants={mobileNavItemVariants} className="w-full text-center">
                                        <NavItem to={item.path!} end={item.end} onClick={() => setIsOpen(false)}>{item.label}</NavItem>
                                    </motion.div>
                                )
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;