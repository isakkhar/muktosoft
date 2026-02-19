import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ site }) => {
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
                            <div className="logo-icon">{baseName.charAt(0)}</div>
                            <div className="logo-text">{baseName}<span>{highlight}</span></div>
                        </div>
                        <p>{s.footer_description || 'We help businesses transform their digital presence with custom software solutions.'}</p>
                        <div className="footer-social">
                            {s.facebook_url && <a href={s.facebook_url} target="_blank" rel="noreferrer">f</a>}
                            {s.twitter_url && <a href={s.twitter_url} target="_blank" rel="noreferrer">𝕏</a>}
                            {s.linkedin_url && <a href={s.linkedin_url} target="_blank" rel="noreferrer">in</a>}
                            {s.instagram_url && <a href={s.instagram_url} target="_blank" rel="noreferrer">📷</a>}
                            {!s.facebook_url && !s.twitter_url && !s.linkedin_url && !s.instagram_url && (
                                <>
                                    <a href="#">f</a>
                                    <a href="#">𝕏</a>
                                    <a href="#">in</a>
                                    <a href="#">📷</a>
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
                            <li><a href="#">→ Web Development</a></li>
                            <li><a href="#">→ App Development</a></li>
                            <li><a href="#">→ Cloud Solutions</a></li>
                            <li><a href="#">→ Cybersecurity</a></li>
                            <li><a href="#">→ IT Consulting</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Contact Info</h4>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon">
                                <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                            </div>
                            <span>{s.address || 'Dhaka, Bangladesh'}</span>
                        </div>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon">
                                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                            </div>
                            <span>{s.phone || '+880 1234-567890'}</span>
                        </div>
                        <div className="footer-contact-item">
                            <div className="footer-contact-icon">
                                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2" /><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                            </div>
                            <span>{s.email || 'info@muktosoft.com'}</span>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>{s.copyright_text || '© 2026 MuktoSoft. All rights reserved.'}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
