import React from 'react';
import { Link } from 'react-router-dom';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; label: string }> = ({ href, children, label }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-gray-400 hover:text-brand-cyan transition-colors duration-300">
        {children}
    </a>
);

const FooterLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <li>
        <Link to={to} className="text-gray-400 hover:text-brand-light transition-colors duration-300">
            {children}
        </Link>
    </li>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-dark-secondary border-t border-brand-cyan/20 mt-16">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
                    {/* Column 1: Brand */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link to="/" aria-label="Go to Homepage">
                            <img 
                                src="https://iili.io/FyGFUCX.md.png" 
                                alt="Sarigama Music Corner Logo" 
                                className="h-12 w-auto mb-4" 
                            />
                        </Link>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Defining the Future of Sound. A premier music label for exceptional artistry.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-bold text-brand-light mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <FooterLink to="/">Home</FooterLink>
                            <FooterLink to="/about">About Us</FooterLink>
                            <FooterLink to="/music">Music</FooterLink>
                            <FooterLink to="/artists">Artists</FooterLink>
                            <FooterLink to="/events">Events</FooterLink>
                            <FooterLink to="/contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="font-bold text-brand-light mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-center justify-center md:justify-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <a href="mailto:sarigamamusiccorner@gmail.com" className="hover:text-brand-light transition-colors">
                                    sarigamamusiccorner@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center justify-center md:justify-start gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <a href="tel:+919961569470" className="hover:text-brand-light transition-colors">
                                    +91 9961569470
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Social */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="font-bold text-brand-light mb-4">Follow Us</h3>
                        <div className="flex space-x-6">
                            <SocialIcon href="https://instagram.com/sarigamamusiccorner" label="Instagram">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049 1.064.218 1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.343 2.525c.636-.247 1.363-.416 2.427-.465C9.793 2.013 10.147 2 12.315 2zm-1.002 6.37a4.625 4.625 0 100 9.25 4.625 4.625 0 000-9.25z" clipRule="evenodd" /><path d="M16.51 6.375a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" /></svg>
                            </SocialIcon>
                            <SocialIcon href="https://youtube.com/@_smc" label="YouTube">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814a2.506 2.506 0 0 1-1.768 1.768c-1.594.42-7.812.42-7.812.42s-6.218 0-7.812-.42a2.506 2.506 0 0 1-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814a2.506 2.506 0 0 1 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418zM9.5 15.5V8.5l6 3.5-6 3.5z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                            <SocialIcon href="https://spotify.com" label="Spotify">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-3.37 14.332a.75.75 0 01-1.06-1.06l3.182-3.182a.75.75 0 111.06 1.06l-3.182 3.182zm1.06-5.414l-3.182 3.182a.75.75 0 01-1.06-1.06L9.63 8.858a.75.75 0 011.06 1.06zm5.228-3.08a.75.75 0 010 1.06l-7.354 7.354a.75.75 0 01-1.06-1.06L14.918 8.838a.75._75 0 011.06 0z" clipRule="evenodd" /></svg>
                            </SocialIcon>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-brand-dark">
                <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Sarigama Music Corner. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;