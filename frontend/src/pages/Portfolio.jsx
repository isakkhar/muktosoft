import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:8000/api';

const PORTFOLIO_GRADIENTS = [
    'linear-gradient(135deg, #0e3545, #2196c8)',
    'linear-gradient(135deg, #153f55, #2196c8)',
    'linear-gradient(135deg, #0e3545, #35ade0)',
    'linear-gradient(135deg, #1a7ea8, #35ade0)',
    'linear-gradient(135deg, #0e3545, #2196c8)',
    'linear-gradient(135deg, #153f55, #35ade0)',
];

const Portfolio = () => {
    const [site, setSite] = useState({});
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/homepage/`)
            .then(res => {
                setSite(res.data.site_settings || {});
                const combinedPortfolio = [
                    ...(res.data.portfolio || []),
                    ...(res.data.projects || []).map(p => ({ ...p, tag: 'Project' }))
                ];
                setPortfolio(combinedPortfolio);
                setLoading(false);
                document.title = `Portfolio - ${res.data.site_settings?.site_name || 'MuktoSoft'}`;
            })
            .catch(err => {
                console.error('Error fetching portfolio:', err);
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
                        {portfolio.map((item, idx) => (
                            <div className="portfolio-card" key={item.id}>
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="portfolio-img" />
                                ) : (
                                    <div className="portfolio-img-placeholder" style={{ background: PORTFOLIO_GRADIENTS[idx % PORTFOLIO_GRADIENTS.length] }}>
                                        <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                            <line x1="8" y1="21" x2="16" y2="21" />
                                            <line x1="12" y1="17" x2="12" y2="21" />
                                        </svg>
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

            <Footer site={site} logo={site.logo} />
        </div>
    );
};

export default Portfolio;
