import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:8000/api';

const SERVICE_ICONS = {
    web: <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    mobile: <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" /></svg>,
    cloud: <svg viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    security: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    consulting: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    marketing: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
};

const PORTFOLIO_GRADIENTS = [
    'linear-gradient(135deg, #0d3a4a, #1B91BC)',
    'linear-gradient(135deg, #153f55, #1B91BC)',
    'linear-gradient(135deg, #0d3a4a, #2daad6)',
    'linear-gradient(135deg, #167a9e, #2daad6)',
    'linear-gradient(135deg, #0d3a4a, #1B91BC)',
    'linear-gradient(135deg, #153f55, #2daad6)',
];

const Home = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/homepage/`)
            .then(res => {
                setData(res.data);
                setLoading(false);
                // Update page title and favicon dynamically
                if (res.data.site_settings) {
                    document.title = `${res.data.site_settings.site_name} - IT Solutions & Technology Services`;
                    if (res.data.site_settings.favicon) {
                        const link = document.querySelector("link[rel='icon']") || document.createElement('link');
                        link.rel = 'icon';
                        link.href = res.data.site_settings.favicon;
                        document.head.appendChild(link);
                    }
                }
            })
            .catch(err => {
                console.error('Error fetching homepage data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)' }}>
                <div style={{ textAlign: 'center' }}>
                    <div className="loading-spinner"></div>
                    <p style={{ marginTop: 16, color: 'var(--body-text)' }}>Loading...</p>
                </div>
            </div>
        );
    }

    const site = data?.site_settings || {};
    const hero = data?.hero || {};
    const services = data?.services || [];
    const about = data?.about || {};
    const stats = data?.stats || [];
    const heroCards = data?.hero_cards || [];
    const portfolio = data?.portfolio || [];
    const whyChoose = data?.why_choose || [];
    const testimonials = data?.testimonials || [];
    const cta = data?.cta || {};

    // Icon mapping for floating cards
    const CARD_ICONS = {
        bolt: <svg viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="none" stroke="white" strokeWidth="2" /></svg>,
        check: <svg viewBox="0 0 24 24" fill="white"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="white" strokeWidth="2" /><polyline points="22 4 12 14.01 9 11.01" fill="none" stroke="white" strokeWidth="2" /></svg>,
        users: <svg viewBox="0 0 24 24" fill="white"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="white" strokeWidth="2" /><circle cx="9" cy="7" r="4" fill="none" stroke="white" strokeWidth="2" /></svg>,
        shield: <svg viewBox="0 0 24 24" fill="white"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="white" strokeWidth="2" /></svg>,
        cloud: <svg viewBox="0 0 24 24" fill="white"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="none" stroke="white" strokeWidth="2" /></svg>,
        code: <svg viewBox="0 0 24 24" fill="white"><polyline points="16 18 22 12 16 6" fill="none" stroke="white" strokeWidth="2" /><polyline points="8 6 2 12 8 18" fill="none" stroke="white" strokeWidth="2" /></svg>,
        star: <svg viewBox="0 0 24 24" fill="white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="none" stroke="white" strokeWidth="2" /></svg>,
        rocket: <svg viewBox="0 0 24 24" fill="white"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill="none" stroke="white" strokeWidth="2" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill="none" stroke="white" strokeWidth="2" /></svg>,
    };

    return (
        <div>
            <Navbar siteName={site.site_name} siteHighlight={site.site_name_highlight} logo={site.logo} />

            {/* ==================== HERO SECTION ==================== */}
            <section className="hero">
                {/* Floating Clouds */}
                <div className="cloud cloud-1">
                    <svg viewBox="0 0 200 80" fill="rgba(27,145,188,0.07)"><path d="M170 60H30c-16.6 0-30-11.2-30-25s13.4-25 30-25c1.7 0 3.3.1 4.9.4C41.7 4.2 52.4 0 64 0c17.1 0 31.6 10.5 37.3 25.2C105.1 23.1 109.4 22 114 22c13.3 0 24.3 8.7 27.5 20.3 2.8-1.5 6-2.3 9.5-2.3 11 0 20 8.1 20 18s-9 18-20 18h1z" /></svg>
                </div>
                <div className="cloud cloud-2">
                    <svg viewBox="0 0 200 80" fill="rgba(27,145,188,0.05)"><path d="M170 60H30c-16.6 0-30-11.2-30-25s13.4-25 30-25c1.7 0 3.3.1 4.9.4C41.7 4.2 52.4 0 64 0c17.1 0 31.6 10.5 37.3 25.2C105.1 23.1 109.4 22 114 22c13.3 0 24.3 8.7 27.5 20.3 2.8-1.5 6-2.3 9.5-2.3 11 0 20 8.1 20 18s-9 18-20 18h1z" /></svg>
                </div>
                <div className="cloud cloud-3">
                    <svg viewBox="0 0 200 80" fill="rgba(27,145,188,0.06)"><path d="M170 60H30c-16.6 0-30-11.2-30-25s13.4-25 30-25c1.7 0 3.3.1 4.9.4C41.7 4.2 52.4 0 64 0c17.1 0 31.6 10.5 37.3 25.2C105.1 23.1 109.4 22 114 22c13.3 0 24.3 8.7 27.5 20.3 2.8-1.5 6-2.3 9.5-2.3 11 0 20 8.1 20 18s-9 18-20 18h1z" /></svg>
                </div>
                <div className="cloud cloud-4">
                    <svg viewBox="0 0 200 80" fill="rgba(27,145,188,0.04)"><path d="M170 60H30c-16.6 0-30-11.2-30-25s13.4-25 30-25c1.7 0 3.3.1 4.9.4C41.7 4.2 52.4 0 64 0c17.1 0 31.6 10.5 37.3 25.2C105.1 23.1 109.4 22 114 22c13.3 0 24.3 8.7 27.5 20.3 2.8-1.5 6-2.3 9.5-2.3 11 0 20 8.1 20 18s-9 18-20 18h1z" /></svg>
                </div>
                <div className="cloud cloud-5">
                    <svg viewBox="0 0 200 80" fill="rgba(27,145,188,0.08)"><path d="M170 60H30c-16.6 0-30-11.2-30-25s13.4-25 30-25c1.7 0 3.3.1 4.9.4C41.7 4.2 52.4 0 64 0c17.1 0 31.6 10.5 37.3 25.2C105.1 23.1 109.4 22 114 22c13.3 0 24.3 8.7 27.5 20.3 2.8-1.5 6-2.3 9.5-2.3 11 0 20 8.1 20 18s-9 18-20 18h1z" /></svg>
                </div>

                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span className="hero-badge-dot"></span>
                            {hero.badge_text || 'Welcome to Mukto Soft'}
                        </div>
                        <h1>
                            {hero.title_line1}{' '}
                            <span className="highlight">{hero.title_highlight}</span>{' '}
                            {hero.title_line2}
                        </h1>
                        <p className="hero-desc">{hero.description}</p>
                        <div className="hero-buttons">
                            <Link to={hero.button_primary_link || '/contact'} className="btn-primary">
                                {hero.button_primary_text || 'Get Started'}
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </Link>
                            <Link to={hero.button_secondary_link || '/services'} className="btn-outline">
                                {hero.button_secondary_text || 'Our Services'}
                            </Link>
                        </div>
                    </div>

                    <div className="hero-visual">
                        <div className="hero-graphic">
                            <div className="hero-circle-outer"></div>
                            <div className="hero-circle-inner"></div>
                            <div className="hero-center-icon">
                                <svg viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="white" strokeWidth="2" /></svg>
                            </div>

                            {heroCards.map((card, idx) => (
                                <div className={`hero-floating-card hero-floating-card-${idx + 1}`} key={card.id}>
                                    <div className="floating-icon">
                                        {CARD_ICONS[card.icon] || CARD_ICONS.bolt}
                                    </div>
                                    <div className="floating-text">
                                        <strong>{card.title}</strong>
                                        <span>{card.subtitle}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== SERVICES SECTION ==================== */}
            <section className="services-section">
                <div className="container">
                    <div className="services-header">
                        <span className="section-subtitle">Our Services</span>
                        <h2 className="section-title">What We Offer</h2>
                        <p className="section-desc">Comprehensive IT solutions tailored to meet the unique challenges of modern businesses.</p>
                    </div>

                    <div className="services-grid">
                        {services.map(service => (
                            <div className="service-card" key={service.id}>
                                <div className="service-icon">
                                    {SERVICE_ICONS[service.icon] || SERVICE_ICONS.web}
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <a href="#" className="service-link">Learn More →</a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== ABOUT SECTION ==================== */}
            <section className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-image-wrapper">
                            <div className="about-image-main">
                                {about.image ? (
                                    <img src={about.image} alt="About" style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '20px' }} />
                                ) : (
                                    <div className="about-img-placeholder" style={{ background: 'linear-gradient(135deg, #e0f0f8 0%, #c5dff0 50%, #1B91BC 100%)' }}>
                                        <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                            <circle cx="9" cy="7" r="4" />
                                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="about-experience-badge">
                                <span className="badge-number">{about.experience_years || '10+'}</span>
                                <span className="badge-text">{about.experience_label || 'Years Experience'}</span>
                            </div>
                        </div>

                        <div className="about-content">
                            <span className="section-subtitle">{about.subtitle || 'About Mukto Soft'}</span>
                            <h2 className="section-title">{about.title || 'We Are Trusted IT Solutions Provider'}</h2>
                            <p className="about-text">{about.description}</p>
                            {about.description2 && <p className="about-text">{about.description2}</p>}

                            <div className="about-features">
                                {[about.feature1, about.feature2, about.feature3, about.feature4].filter(Boolean).map((feat, i) => (
                                    <div className="about-feature-item" key={i}>
                                        <div className="check-icon">
                                            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="3" /></svg>
                                        </div>
                                        <span>{feat}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== STATS SECTION ==================== */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map(stat => (
                            <div className="stat-item" key={stat.id}>
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== PORTFOLIO SECTION ==================== */}
            <section className="portfolio-section">
                <div className="container">
                    <div className="portfolio-header">
                        <span className="section-subtitle">Our Works</span>
                        <h2 className="section-title">Recent Case Studies</h2>
                        <p className="section-desc">Explore our portfolio of successful projects.</p>
                    </div>

                    <div className="portfolio-grid">
                        {portfolio.map((item, idx) => (
                            <div className="portfolio-card" key={item.id}>
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="portfolio-img" />
                                ) : (
                                    <div className="portfolio-img-placeholder" style={{ background: PORTFOLIO_GRADIENTS[idx % PORTFOLIO_GRADIENTS.length] }}>
                                        <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                                    </div>
                                )}
                                <div className="portfolio-overlay">
                                    <span className="portfolio-tag">{item.tag}</span>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== WHY CHOOSE US SECTION ==================== */}
            <section className="why-section">
                <div className="container">
                    <div className="why-grid">
                        <div>
                            <span className="section-subtitle">Why Choose Us</span>
                            <h2 className="section-title">Reasons to Trust {site.site_name || 'Mukto Soft'}</h2>
                            <p className="section-desc" style={{ marginBottom: '40px' }}>
                                We combine innovation, experience, and dedication to deliver technology solutions that make a real difference.
                            </p>
                        </div>
                        <div className="why-list">
                            {whyChoose.map((item, idx) => (
                                <div className="why-item" key={item.id}>
                                    <div className="why-number">{String(idx + 1).padStart(2, '0')}</div>
                                    <div className="why-item-content">
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== TESTIMONIALS SECTION ==================== */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="testimonials-header">
                        <span className="section-subtitle">Testimonials</span>
                        <h2 className="section-title">What Our Clients Say</h2>
                        <p className="section-desc">Hear from businesses we've helped succeed.</p>
                    </div>

                    <div className="testimonials-grid">
                        {testimonials.map(t => (
                            <div className="testimonial-card" key={t.id}>
                                <div className="testimonial-quote">"</div>
                                <p className="testimonial-text">{t.text}</p>
                                <div className="testimonial-stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{t.avatar_letter || t.name.charAt(0)}</div>
                                    <div className="testimonial-info">
                                        <strong>{t.name}</strong>
                                        <span>{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== CTA SECTION ==================== */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>{cta.title || "Ready to Transform Your Business?"}</h2>
                    <p>{cta.description || "Let's discuss how our solutions can help you grow."}</p>
                    <Link to={cta.button_link || '/contact'} className="btn-white">
                        {cta.button_text || 'Start a Project'}
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                    </Link>
                </div>
            </section>

            <Footer site={site} />
        </div>
    );
};

export default Home;
