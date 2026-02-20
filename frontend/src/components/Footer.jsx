import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = ({ site, logo }) => {
    const [services, setServices] = useState([]);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/services/')
            .then(res => setServices(res.data))
            .catch(err => console.error("Error fetching footer services:", err));
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8000/api/newsletter/', { email });
            setStatus({ type: 'success', message: res.data.message || 'Subscribed successfully!' });
            setEmail('');
        } catch (err) {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
            setTimeout(() => setStatus({ type: '', message: '' }), 5000);
        }
    };

    const s = site || {};
    const baseName = s.site_name && s.site_name_highlight
        ? s.site_name.replace(s.site_name_highlight, '')
        : 'Mukto';
    const highlight = s.site_name_highlight || 'Soft';

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="logo">
                            {logo ? (
                                <img src={logo} alt={s.site_name || 'Logo'} className="footer-logo-img" />
                            ) : (
                                <div className="logo-icon">{baseName.charAt(0)}</div>
                            )}
                            <div className="logo-text">{baseName}<span>{highlight}</span></div>
                        </div>
                        <p className="footer-desc">{s.footer_description || 'We help businesses transform their digital presence with custom software solutions.'}</p>
                        <div className="footer-social">
                            {s.facebook_url && (
                                <a href={s.facebook_url} target="_blank" rel="noreferrer" className="social-fb">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                            )}
                            {s.twitter_url && (
                                <a href={s.twitter_url} target="_blank" rel="noreferrer" className="social-x">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                </a>
                            )}
                            {s.linkedin_url && (
                                <a href={s.linkedin_url} target="_blank" rel="noreferrer" className="social-ln">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                </a>
                            )}
                            {s.instagram_url && (
                                <a href={s.instagram_url} target="_blank" rel="noreferrer" className="social-ig">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                            )}
                            {!s.facebook_url && !s.twitter_url && !s.linkedin_url && !s.instagram_url && (
                                <>
                                    <a href="#" className="social-fb">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                    </a>
                                    <a href="#" className="social-x">
                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                    </a>
                                    <a href="#" className="social-ln">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                                    </a>
                                    <a href="#" className="social-ig">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                    </a>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">→ Home</Link></li>
                            <li><Link to="/services">→ Services</Link></li>
                            <li><Link to="/about">→ About Us</Link></li>
                            <li><Link to="/portfolio">→ Portfolio</Link></li>
                            <li><Link to="/contact">→ Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Our Services</h4>
                        <ul>
                            {services.length > 0 ? (
                                services.slice(0, 5).map(service => (
                                    <li key={service.id}>
                                        <Link to={`/services/${service.slug}`}>→ {service.title}</Link>
                                    </li>
                                ))
                            ) : (
                                <>
                                    <li><Link to="/services">→ Web Development</Link></li>
                                    <li><Link to="/services">→ App Development</Link></li>
                                    <li><Link to="/services">→ Cloud Solutions</Link></li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="footer-col footer-newsletter">
                        <h4>Newsletter</h4>
                        <p>Subscribe to get the latest updates and news.</p>
                        <form onSubmit={handleSubscribe} className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Your Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? '...' : 'Subscribe'}
                            </button>
                        </form>
                        {status.message && (
                            <div className={`newsletter-status ${status.type}`}>
                                {status.message}
                            </div>
                        )}
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>{s.copyright_text || '© 2026 MuktoSoft. All rights reserved.'}</p>
                    <div className="footer-contact-summary">
                        <span>{s.phone}</span>
                        <span>|</span>
                        <span>{s.email}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
