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
                                <a href="tel:+911234567890" className="hover:text-brand-light transition-colors">
                                    +91 123 456 7890
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Social */}
                    <div>
                        <h3 className="font-bold text-brand-light mb-4">Follow Us</h3>
                        <div className="flex justify-center md:justify-start space-x-6">
                            <SocialIcon href="https://open.spotify.com/artist/1h3k52p5NotPsgkI5lSj6h" label="Spotify">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm4.183 14.226c-.23.363-.695.485-.933.248-2.175-1.432-4.92-1.758-8.24-.957-.456.11-.91-.17-.91-.643.0-.474.453-.752.909-.862 3.715-.89 6.843-.51 9.278 1.135.238.237.363.695.12 1.074zM17.5 13.12c-.28.45-.82.6-1.274.32-2.52-1.55-6.23-2.01-9.45-.98-.54.17-.98-.21-.98-.75s.44-.92.98-.98c3.67-1.02 7.84-.5 10.74 1.32.45.27.6.82.33 1.27zm.12-2.91c-.32.53-1.02.7-1.55.38-2.93-1.79-7.55-2.3-10.4-.98-.64.19-1.28-.28-1.28-.93s.64-1.12 1.28-.93c3.48-1.04 8.71-.4 11.96 1.6.53.32.7 1.02.39 1.56z"/></svg>
                            </SocialIcon>
                            <SocialIcon href="https://youtube.com" label="YouTube">
                                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.582 7.042c-.225-.814-.88-1.468-1.697-1.695C18.265 5 12 5 12 5s-6.265 0-7.885.347c-.817.227-1.472.88-1.697 1.695C2 8.658 2 12 2 12s0 3.342.418 4.958c.225.815.88 1.468 1.697 1.695C5.735 19 12 19 12 19s6.265 0 7.885-.347c.817-.227 1.472.88 1.697-1.695C22 15.342 22 12 22 12s0-3.342-.418-4.958zM9.75 15V9l5.25 3-5.25 3z" /></svg>
                            </SocialIcon>
                            <SocialIcon href="https://instagram.com" label="Instagram">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.217.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122s-.013 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.908 4.908 0 01-1.153 1.772 4.908 4.908 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06s-3.056-.013-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.908 4.908 0 01-1.772-1.153 4.908 4.908 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428-.047-1.066-.06-1.405-.06-4.122s.013-3.056.06-4.122c.05-1.065.218-1.79.465-2.428a4.908 4.908 0 011.153-1.772A4.908 4.908 0 016.343 2.52c.637-.247 1.363.415 2.428-.465C9.83 2.01 10.16 2 12 2zm0 4.625a5.375 5.375 0 100 10.75 5.375 5.375 0 000-10.75zm0 8.875a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm4.875-9.875a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" /></svg>
                            </SocialIcon>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-brand-cyan/20 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Sarigama Music Corner. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
