import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
    return (
        <div>
            <Navbar />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>About Us</h1>
                    <p>Learn more about Mukto Soft and our mission</p>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-image-wrapper">
                            <div className="about-image-main">
                                <div className="about-img-placeholder" style={{ background: 'linear-gradient(135deg, #e0f0f8 0%, #c5dff0 50%, #2196c8 100%)' }}>
                                    <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                            </div>
                            <div className="about-experience-badge">
                                <span className="badge-number">10+</span>
                                <span className="badge-text">Years Experience</span>
                            </div>
                        </div>

                        <div className="about-content">
                            <span className="section-subtitle">About Mukto Soft</span>
                            <h2 className="section-title">We Are Trusted IT Solutions Provider</h2>
                            <p className="about-text">
                                With over a decade of experience, Mukto Soft has been at the forefront of
                                technology innovation. We help businesses transform their digital presence
                                and achieve operational excellence through custom software solutions.
                            </p>
                            <p className="about-text">
                                Our team of seasoned professionals brings expertise across diverse
                                technology domains, ensuring we deliver solutions that are not just
                                technically sound but also aligned with your business strategy.
                            </p>

                            <div className="about-features">
                                <div className="about-feature-item">
                                    <div className="check-icon">
                                        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="3" /></svg>
                                    </div>
                                    <span>Expert Development Team</span>
                                </div>
                                <div className="about-feature-item">
                                    <div className="check-icon">
                                        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="3" /></svg>
                                    </div>
                                    <span>24/7 Technical Support</span>
                                </div>
                                <div className="about-feature-item">
                                    <div className="check-icon">
                                        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="3" /></svg>
                                    </div>
                                    <span>Agile Methodology</span>
                                </div>
                                <div className="about-feature-item">
                                    <div className="check-icon">
                                        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="3" /></svg>
                                    </div>
                                    <span>Quality Assurance</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-section">
                <div className="container">
                    <div className="why-grid">
                        <div>
                            <span className="section-subtitle">Why Choose Us</span>
                            <h2 className="section-title">Reasons to Trust Mukto Soft</h2>
                            <p className="section-desc" style={{ marginBottom: '40px' }}>
                                We combine innovation, experience, and dedication to deliver
                                technology solutions that make a real difference for your business.
                            </p>
                        </div>
                        <div className="why-list">
                            <div className="why-item">
                                <div className="why-number">01</div>
                                <div className="why-item-content">
                                    <h4>Expert Team</h4>
                                    <p>Our talented developers and designers bring years of industry experience to every project.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-number">02</div>
                                <div className="why-item-content">
                                    <h4>Cutting-Edge Technology</h4>
                                    <p>We leverage the latest tools, frameworks, and methodologies to build future-proof solutions.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-number">03</div>
                                <div className="why-item-content">
                                    <h4>Client-Centric Approach</h4>
                                    <p>We prioritize understanding your unique needs and delivering solutions that exceed expectations.</p>
                                </div>
                            </div>
                            <div className="why-item">
                                <div className="why-number">04</div>
                                <div className="why-item-content">
                                    <h4>Ongoing Support</h4>
                                    <p>Our commitment doesn't end at delivery — we provide continuous support and maintenance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Projects Completed</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">150+</div>
                            <div className="stat-label">Happy Clients</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Team Members</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-number">10+</div>
                            <div className="stat-label">Years Experience</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
