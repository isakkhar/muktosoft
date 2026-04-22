import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WorkRoadmap from '../components/WorkRoadmap';

const API_URL = 'http://localhost:8000/api';

const SERVICE_ICONS = {
    web: <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    mobile: <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" /></svg>,
    cloud: <svg viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    security: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    consulting: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    marketing: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
};

const Services = () => {
    const [services, setServices] = useState([]);
    const [site, setSite] = useState({});
    const [workProcess, setWorkProcess] = useState([]);
    const [whyChoose, setWhyChoose] = useState([]);
    const [stats, setStats] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [clientLogos, setClientLogos] = useState([]);
    const [roadmapSteps, setRoadmapSteps] = useState([]);
    const [cta, setCta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/homepage/`)
            .then(res => {
                setSite(res.data.site_settings || {});
                setServices(res.data.services || []);
                setWorkProcess(res.data.work_process || []);
                setWhyChoose(res.data.why_choose || []);
                setStats(res.data.stats || []);
                setTestimonials(res.data.testimonials || []);
                setFaqs(res.data.faqs || []);
                setClientLogos(res.data.client_logos || []);
                setRoadmapSteps(res.data.roadmap_steps || []);
                setCta(res.data.cta || null);
                setLoading(false);
                document.title = `Services - ${res.data.site_settings?.site_name || 'MuktoSoft'}`;
            })
            .catch(err => {
                console.error('Error fetching services:', err);
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

    return (
        <div>
            <Navbar siteName={site.site_name} siteHighlight={site.site_name_highlight} logo={site.logo} />

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
                        {services.map(service => (
                            <div className="service-card" key={service.id}>
                                <div className="service-icon">
                                    {SERVICE_ICONS[service.icon] || SERVICE_ICONS.web}
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <Link to={`/services/${service.slug}`} className="service-link">Learn More →</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Work - New Roadmap */}
            <WorkRoadmap data={roadmapSteps} />

            {/* Why Choose Our Services */}
            {whyChoose.length > 0 && (
                <section className="why-section">
                    <div className="container">
                        <div className="why-grid">
                            <div>
                                <span className="section-subtitle">Why Choose Us</span>
                                <h2 className="section-title">Why Our Services Stand Out</h2>
                                <p className="section-desc" style={{ marginBottom: '40px' }}>
                                    We combine innovation, experience, and dedication to deliver
                                    technology solutions that make a real difference.
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
            )}

            {/* Stats */}
            {stats.length > 0 && (
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
            )}

            {/* Testimonials */}
            {testimonials.length > 0 && (
                <section className="testimonials-section">
                    <div className="container">
                        <div className="testimonials-header">
                            <span className="section-subtitle">What Clients Say</span>
                            <h2 className="section-title">Client Testimonials</h2>
                        </div>

                        <div className="testimonials-grid">
                            {testimonials.map(t => (
                                <div className="testimonial-card" key={t.id}>
                                    <div className="testimonial-quote">"</div>
                                    <p className="testimonial-text">{t.text}</p>
                                    <div className="testimonial-stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
                                    <div className="testimonial-author">
                                        {t.image ? (
                                            <img className="testimonial-avatar-img" src={t.image} alt={t.name} />
                                        ) : (
                                            <div className="testimonial-avatar">{t.avatar_letter || t.name.charAt(0)}</div>
                                        )}
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
            )}

            {/* Client Logos */}
            {clientLogos.length > 0 && (
                <section className="clients-section">
                    <div className="container">
                        <div className="services-header">
                            <span className="section-subtitle">Trusted By</span>
                            <h2 className="section-title">Our Clients & Partners</h2>
                        </div>

                        <div className="clients-grid">
                            {clientLogos.map(client => (
                                <div className="client-logo-card" key={client.id}>
                                    {client.url ? (
                                        <a href={client.url} target="_blank" rel="noreferrer">
                                            <img src={client.logo} alt={client.name} />
                                        </a>
                                    ) : (
                                        <img src={client.logo} alt={client.name} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {faqs.length > 0 && (
                <section className="faq-section">
                    <div className="container">
                        <div className="services-header">
                            <span className="section-subtitle">Got Questions?</span>
                            <h2 className="section-title">Frequently Asked Questions</h2>
                        </div>

                        <div className="faq-list">
                            {faqs.map(faq => (
                                <div className={`faq-item ${openFaq === faq.id ? 'active' : ''}`} key={faq.id} onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}>
                                    <div className="faq-question">
                                        <h4>{faq.question}</h4>
                                        <span className="faq-toggle">
                                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                                                {openFaq === faq.id ? (
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                ) : (
                                                    <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>
                                                )}
                                            </svg>
                                        </span>
                                    </div>
                                    {openFaq === faq.id && (
                                        <div className="faq-answer">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>{cta?.title || 'Need a Custom Solution?'}</h2>
                        <p>{cta?.description || "Let's discuss how our services can help your business grow with the right technology."}</p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn-primary">{cta?.button_text || 'Get In Touch'}</Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer site={site} logo={site.logo} />
        </div>
    );
};

export default Services;
