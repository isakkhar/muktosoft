import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:8000/api';

const SERVICE_ICONS = {
    web: <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    mobile: <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="12" y1="18" x2="12.01" y2="18" stroke="currentColor" strokeWidth="2" /></svg>,
    cloud: <svg viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    security: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    consulting: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    marketing: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" fill="none" stroke="currentColor" strokeWidth="2" /></svg>,
    check: <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
};

const PROCESS_ICONS = {
    search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    pencil: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    rocket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
};

const ServiceDetail = () => {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [site, setSite] = useState({});
    const [allServices, setAllServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(false);

        // Fetch service detail and homepage data (for navbar/footer)
        Promise.all([
            axios.get(`${API_URL}/services/${slug}/`),
            axios.get(`${API_URL}/homepage/`)
        ])
            .then(([serviceRes, homepageRes]) => {
                setService(serviceRes.data);
                setSite(homepageRes.data.site_settings || {});
                setAllServices(homepageRes.data.services || []);
                setLoading(false);
                document.title = `${serviceRes.data.title} - ${homepageRes.data.site_settings?.site_name || 'MuktoSoft'}`;
            })
            .catch(err => {
                console.error('Error fetching service:', err);
                setError(true);
                setLoading(false);
            });
    }, [slug]);

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

    if (error || !service) {
        return (
            <div>
                <Navbar siteName={site.site_name} siteHighlight={site.site_name_highlight} logo={site.logo} />
                <section className="page-banner">
                    <div className="container">
                        <h1>Service Not Found</h1>
                        <p>The service you're looking for doesn't exist.</p>
                    </div>
                </section>
                <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
                    <Link to="/services" className="btn-primary">← Back to Services</Link>
                </div>
                <Footer site={site} logo={site.logo} />
            </div>
        );
    }

    // Other services for sidebar
    const otherServices = allServices.filter(s => s.slug !== slug);

    return (
        <div>
            <Navbar siteName={site.site_name} siteHighlight={site.site_name_highlight} logo={site.logo} />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>{service.title}</h1>
                    <p>{service.description}</p>
                </div>
            </section>

            {/* Service Detail Content */}
            <section className="service-detail-section">
                <div className="container">
                    <div className="service-detail-grid">
                        {/* Main Content */}
                        <div className="service-detail-main">
                            {service.image && (
                                <div className="service-detail-image">
                                    <img src={service.image} alt={service.title} />
                                </div>
                            )}

                            <div className="service-detail-icon-large">
                                {SERVICE_ICONS[service.icon] || SERVICE_ICONS.web}
                            </div>

                            <div className="service-detail-content">
                                <h2>About This Service</h2>
                                {service.detail_description ? (
                                    service.detail_description.split('\n').map((para, idx) => (
                                        <p key={idx}>{para}</p>
                                    ))
                                ) : (
                                    <p>{service.description}</p>
                                )}
                            </div>

                            {/* Service Features */}
                            {service.features && service.features.length > 0 && (
                                <div className="service-features-grid mt-4">
                                    <h3>Core Features</h3>
                                    <div className="features-list">
                                        {service.features.map(feature => (
                                            <div className="feature-item" key={feature.id}>
                                                <div className="feature-icon">
                                                    {SERVICE_ICONS[feature.icon] || SERVICE_ICONS.check}
                                                </div>
                                                <div className="feature-text">
                                                    <h4>{feature.title}</h4>
                                                    <p>{feature.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Service Workflow */}
                            {service.steps && service.steps.length > 0 && (
                                <div className="service-workflow mt-5">
                                    <h3>Our Process</h3>
                                    <div className="workflow-timeline">
                                        {service.steps.map((step, idx) => (
                                            <div className="workflow-step" key={step.id}>
                                                <div className="step-number">{idx + 1}</div>
                                                <div className="step-content">
                                                    <div className="step-icon">
                                                        {PROCESS_ICONS[step.icon] || PROCESS_ICONS.search}
                                                    </div>
                                                    <h4>{step.title}</h4>
                                                    <p>{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tech Stack */}
                            {service.tech_stack && service.tech_stack.length > 0 && (
                                <div className="service-tech-stack mt-5">
                                    <h3>Technologies We Use</h3>
                                    <div className="tech-stack-grid">
                                        {service.tech_stack.map(tech => (
                                            <div className="tech-item" key={tech.id}>
                                                {tech.icon ? (
                                                    <div className="tech-icon-wrapper">
                                                        {tech.icon.startsWith('http') ? (
                                                            <img src={tech.icon} alt={tech.name} />
                                                        ) : (
                                                            <span className="tech-icon-key">{tech.icon}</span>
                                                        )}
                                                    </div>
                                                ) : null}
                                                <span>{tech.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Service Specific FAQ */}
                            {service.faqs && service.faqs.length > 0 && (
                                <div className="service-faq-section mt-5">
                                    <h3>Common Questions</h3>
                                    <div className="faq-list">
                                        {service.faqs.map(faq => (
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
                            )}

                            {/* Service Specific Testimonials */}
                            {service.testimonials && service.testimonials.length > 0 && (
                                <div className="service-testimonials mt-5">
                                    <h3>What Clients Say</h3>
                                    <div className="testimonials-list">
                                        {service.testimonials.map(t => (
                                            <div className="testimonial-card-simple" key={t.id}>
                                                <div className="testimonial-rating">
                                                    {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                                                </div>
                                                <p className="testimonial-text">"{t.text}"</p>
                                                <div className="testimonial-author">
                                                    {t.image && <img src={t.image} alt={t.name} className="author-img" />}
                                                    <div className="author-info">
                                                        <strong>{t.name}</strong>
                                                        <span>{t.role}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="service-detail-cta mt-5">
                                <h3>Interested in {service.title}?</h3>
                                <p>Let's discuss how we can help your business grow with our {service.title.toLowerCase()} solutions.</p>
                                <Link to="/contact" className="btn-primary">
                                    Get a Free Quote
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="service-detail-sidebar">
                            <div className="sidebar-card">
                                <h4>Our Services</h4>
                                <ul className="sidebar-services-list">
                                    {allServices.map(s => (
                                        <li key={s.id} className={s.slug === slug ? 'active' : ''}>
                                            <Link to={`/services/${s.slug}`}>
                                                <span className="sidebar-service-icon">
                                                    {SERVICE_ICONS[s.icon] || SERVICE_ICONS.web}
                                                </span>
                                                {s.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="sidebar-card sidebar-contact">
                                <h4>Need Help?</h4>
                                <p>Contact us for a free consultation about your project requirements.</p>
                                <div className="sidebar-contact-info">
                                    <span>📞 {site.phone || '+880 1234-567890'}</span>
                                    <span>📧 {site.email || 'info@muktosoft.com'}</span>
                                </div>
                                <Link to="/contact" className="btn-outline" style={{ width: '100%', textAlign: 'center', marginTop: '16px' }}>Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer site={site} logo={site.logo} />
        </div>
    );
};

export default ServiceDetail;
