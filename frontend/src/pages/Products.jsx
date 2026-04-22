import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:8000/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [site, setSite] = useState({});
    const [cta, setCta] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${API_URL}/homepage/`)
            .then(res => {
                setSite(res.data.site_settings || {});
                setProducts(res.data.products || []);
                setCta(res.data.cta || null);
                setLoading(false);
                document.title = `Products - ${res.data.site_settings?.site_name || 'MuktoSoft'}`;
            })
            .catch(err => {
                console.error('Error fetching products:', err);
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
                    <h1>Our Products</h1>
                    <p>Innovative software solutions to drive your business forward</p>
                </div>
            </section>

            {/* Products Grid */}
            <section className="products-section">
                <div className="container">
                    <div className="products-header">
                        <span className="section-subtitle">Ready-to-Use Solutions</span>
                        <h2 className="section-title">Enterprise-Grade Software</h2>
                        <p className="section-desc">
                            Explore our suite of powerful, scalable, and user-friendly applications designed to streamline your operations.
                        </p>
                    </div>

                    <div className="products-grid">
                        {products.map(product => (
                            <div className="product-card" key={product.id}>
                                <div className="product-logo-wrapper">
                                    {product.logo ? (
                                        <img src={product.logo} alt={product.title} className="product-logo" />
                                    ) : (
                                        <div className="product-logo-placeholder">{product.title.charAt(0)}</div>
                                    )}
                                </div>
                                <h3 className="product-title">{product.title}</h3>
                                {product.tagline && <span className="product-tagline">{product.tagline}</span>}
                                <p className="product-desc">{product.description}</p>

                                <div className="product-actions">
                                    <a href={`tel:${site.phone}`} className="btn-product-outline">
                                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.49-5.15-3.8-6.62-6.62l1.97-1.57c.23-.23.31-.56.25-.87-.36-1.11-.56-2.3-.56-3.53a1 1 0 0 0-1-1H4.05a1 1 0 0 0-1 1c0 9.39 7.61 17 17 17a1 1 0 0 0 1-1v-3.81a1 1 0 0 0-1-1z" />
                                        </svg>
                                        Call Now
                                    </a>
                                    <Link to={`/products/${product.slug}`} className="btn-product-primary">
                                        Try Free Demo
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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

export default Products;
