import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
    return (
        <div>
            <Navbar />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>Our Services</h1>
                    <p>Comprehensive IT solutions tailored for your business</p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="services-section">
                <div className="container">
                    <div className="services-header">
                        <span className="section-subtitle">What We Offer</span>
                        <h2 className="section-title">Our Professional Services</h2>
                        <p className="section-desc">
                            We provide comprehensive IT solutions tailored to meet the unique challenges
                            of modern businesses across all industries.
                        </p>
                    </div>

                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                            </div>
                            <h3>Web Development</h3>
                            <p>Custom web applications and websites built with the latest technologies for optimal performance and user experience.</p>
                            <a href="#" className="service-link">Learn More →</a>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" /></svg>
                            </div>
                            <h3>App Development</h3>
                            <p>Native and cross-platform mobile applications designed to engage users and deliver seamless experiences.</p>
                            <a href="#" className="service-link">Learn More →</a>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                            </div>
                            <h3>Cloud Solutions</h3>
                            <p>Scalable cloud infrastructure and migration services to modernize your business operations effectively.</p>
                            <a href="#" className="service-link">Learn More →</a>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                            </div>
                            <h3>Cybersecurity</h3>
                            <p>Comprehensive security audits, penetration testing, and data protection strategies for your organization.</p>
                            <a href="#" className="service-link">Learn More →</a>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                            </div>
                            <h3>IT Consulting</h3>
                            <p>Expert strategic technology consulting to align IT infrastructure with your business objectives and goals.</p>
                            <a href="#" className="service-link">Learn More →</a>
                        </div>

                        <div className="service-card">
                            <div className="service-icon">
                                <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                            </div>
                            <h3>Digital Marketing</h3>
                            <p>Data-driven digital marketing strategies including SEO, social media, and content marketing services.</p>
                            <a href="#" className="service-link">Learn More →</a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Services;
