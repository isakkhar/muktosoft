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
};

const ServiceDetail = () => {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [site, setSite] = useState({});
    const [allServices, setAllServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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

                            <div className="service-detail-cta">
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
