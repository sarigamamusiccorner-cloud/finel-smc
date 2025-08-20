import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
    // IMPORTANT: This endpoint is now set to the user's provided URL.
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzzvlvqy";

    const [status, setStatus] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus("Sending...");

        const form = e.target as HTMLFormElement;
        const data = new FormData(form);

        fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                setStatus("Thanks for your message! We'll get back to you soon.");
                form.reset();
            } else {
                response.json().then(data => {
                    if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
                        setStatus(data["errors"].map((error: any) => error["message"]).join(", "));
                    } else {
                        setStatus("Oops! There was a problem submitting your form.");
                    }
                });
            }
        }).catch(() => {
            setStatus("Oops! There was a problem submitting your form.");
        }).finally(() => {
            setSubmitting(false);
            setTimeout(() => setStatus(""), 5000); // Clear status after 5 seconds
        });
    };

    return (
        <div className="py-16 sm:py-24 bg-brand-dark">
            <div className="container mx-auto px-6 max-w-2xl">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-brand-cyan">Get In Touch</h1>
                    <p className="mt-2 text-lg text-gray-300">Questions, collaborations, or just want to say hi? Drop us a line.</p>
                </motion.div>

                <motion.form 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    {/* Honeypot field for anti-spam */}
                    <input type="text" name="_gotcha" style={{ display: 'none' }} />

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-light">Your Name</label>
                        <input type="text" name="name" id="name" required className="mt-1 block w-full bg-brand-dark-secondary border border-gray-600 rounded-md shadow-sm py-2 px-3 text-brand-light focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-light">Your Email</label>
                        <input type="email" name="email" id="email" required className="mt-1 block w-full bg-brand-dark-secondary border border-gray-600 rounded-md shadow-sm py-2 px-3 text-brand-light focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-brand-light">Message</label>
                        <textarea name="message" id="message" rows={5} required className="mt-1 block w-full bg-brand-dark-secondary border border-gray-600 rounded-md shadow-sm py-2 px-3 text-brand-light focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan"></textarea>
                    </div>
                    <div>
                        <button type="submit" disabled={submitting} className="w-full px-8 py-3 text-lg font-semibold text-brand-dark bg-brand-cyan rounded-full shadow-lg hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed">
                            {submitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                    {status && <p className="text-center text-brand-cyan mt-4">{status}</p>}
                </motion.form>
            </div>
        </div>
    );
};

export default Contact;