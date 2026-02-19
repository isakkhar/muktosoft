import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Portfolio = () => {
    return (
        <div>
            <Navbar />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>Our Portfolio</h1>
                    <p>Explore our successful projects and case studies</p>
                </div>
            </section>

            {/* Portfolio Grid */}
            <section className="portfolio-section">
                <div className="container">
                    <div className="portfolio-header">
                        <span className="section-subtitle">Our Works</span>
                        <h2 className="section-title">Recent Case Studies</h2>
                        <p className="section-desc">
                            Explore our portfolio of successful projects that showcase our expertise
                            and commitment to delivering excellence.
                        </p>
                    </div>

                    <div className="portfolio-grid">
                        <div className="portfolio-card">
                            <div className="portfolio-img-placeholder" style={{ background: 'linear-gradient(135deg, #0e3545, #2196c8)' }}>
                                <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                            </div>
                            <div className="portfolio-overlay">
                                <span className="portfolio-tag">Web App</span>
                                <h3>E-Commerce Platform</h3>
                                <p>Full-stack marketplace solution</p>
                            </div>
                        </div>

                        <div className="portfolio-card">
                            <div className="portfolio-img-placeholder" style={{ background: 'linear-gradient(135deg, #153f55, #2196c8)' }}>
                                <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
                            </div>
                            <div className="portfolio-overlay">
                                <span className="portfolio-tag">Mobile</span>
                                <h3>FinTech Banking App</h3>
                                <p>Mobile banking solution</p>
                            </div>
                        </div>

                        <div className="portfolio-card">
                            <div className="portfolio-img-placeholder" style={{ background: 'linear-gradient(135deg, #0e3545, #35ade0)' }}>
                                <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>
                            </div>
                            <div className="portfolio-overlay">
                                <span className="portfolio-tag">Cloud</span>
                                <h3>Cloud Infrastructure</h3>
                                <p>Enterprise cloud migration</p>
                            </div>
                        </div>

                        <div className="portfolio-card">
                            <div className="portfolio-img-placeholder" style={{ background: 'linear-gradient(135deg, #1a7ea8, #35ade0)' }}>
                                <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            </div>
                            <div className="portfolio-overlay">
                                <span className="portfolio-tag">Security</span>
                                <h3>Security Platform</h3>
                                <p>Enterprise cybersecurity system</p>
                            </div>
                        </div>

                        <div className="portfolio-card">
                            <div className="portfolio-img-placeholder" style={{ background: 'linear-gradient(135deg, #0e3545, #2196c8)' }}>
                                <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                            </div>
                            <div className="portfolio-overlay">
                                <span className="portfolio-tag">Analytics</span>
                                <h3>Data Analytics Dashboard</h3>
                                <p>Business intelligence system</p>
                            </div>
                        </div>

                        <div className="portfolio-card">
                            <div className="portfolio-img-placeholder" style={{ background: 'linear-gradient(135deg, #153f55, #35ade0)' }}>
                                <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33" /></svg>
                            </div>
                            <div className="portfolio-overlay">
                                <span className="portfolio-tag">SaaS</span>
                                <h3>HR Management System</h3>
                                <p>Cloud-based HR platform</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Portfolio;
