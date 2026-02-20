import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:8000/api';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [site, setSite] = useState({});
    const [loading, setLoading] = useState(true);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        // Fetch site settings first/parallel
        axios.get(`${API_URL}/homepage/`)
            .then(res => setSite(res.data.site_settings || {}))
            .catch(err => console.error(err));

        // Fetch product details
        axios.get(`${API_URL}/products/${slug}/`)
            .then(res => {
                setProduct(res.data);
                document.title = `${res.data.title} - MuktoSoft`;
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <Navbar siteName={site.site_name} siteHighlight={site.site_name_highlight} logo={site.logo} />
                <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <h2>Product Not Found</h2>
                    <Link to="/products" className="btn-primary">Back to Products</Link>
                </div>
                <Footer site={site} logo={site.logo} />
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <Navbar siteName={site.site_name} siteHighlight={site.site_name_highlight} logo={site.logo} />

            {/* Product Hero */}
            <section className="product-hero">
                <div className="container">
                    <div className="product-hero-content">
                        <div className="product-hero-text">
                            <span className="product-badge">New Release</span>
                            <h1>{product.title}</h1>
                            <p className="hero-tagline">{product.tagline}</p>
                            <p className="hero-desc">{product.description}</p>
                            <div className="hero-actions">
                                {product.demo_link && (
                                    <a href={product.demo_link} target="_blank" rel="noreferrer" className="btn-primary">Live Demo</a>
                                )}
                                <Link to="/contact" className="btn-outline-white">Request Quote</Link>
                            </div>
                        </div>
                        <div className="product-hero-image-wrapper">
                            {product.hero_image ? (
                                <img src={product.hero_image} alt={product.title} className="product-hero-img" />
                            ) : (
                                <div className="hero-placeholder">{product.title}</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="product-overview section-padding">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-subtitle">Overview</span>
                        <h2 className="section-title">Why Choose {product.title}?</h2>
                    </div>
                    <div className="overview-content">
                        <p>{product.detail_description}</p>
                    </div>
                </div>
            </section>

            {/* Features */}
            {product.features && product.features.length > 0 && (
                <section className="product-features section-padding bg-light">
                    <div className="container">
                        <div className="section-header text-center">
                            <span className="section-subtitle">Features</span>
                            <h2 className="section-title">Key Capabilities</h2>
                        </div>
                        <div className="features-grid">
                            {product.features.map(feature => (
                                <div className="feature-card" key={feature.id}>
                                    <div className="feature-icon-wrapper">
                                        {/* Icon rendering logic can be improved with a mapper */}
                                        <div className="feature-icon-circle">Create</div>
                                    </div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Screenshots */}
            {product.screenshots && product.screenshots.length > 0 && (
                <section className="product-screenshots section-padding">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-title">See It In Action</h2>
                        </div>
                        <div className="screenshots-gallery">
                            {product.screenshots.map(screen => (
                                <div className="screenshot-item" key={screen.id}>
                                    <img src={screen.image} alt={screen.caption || 'Screenshot'} />
                                    {screen.caption && <p className="screenshot-caption">{screen.caption}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Tech Stack */}
            {product.tech_stack && product.tech_stack.length > 0 && (
                <section className="product-tech section-padding bg-dark text-white">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-title text-white">Built With Modern Tech</h2>
                        </div>
                        <div className="tech-stack-grid">
                            {product.tech_stack.map(tech => (
                                <div className="tech-item" key={tech.id}>
                                    <span className="tech-name">{tech.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {product.faqs && product.faqs.length > 0 && (
                <section className="product-faq section-padding">
                    <div className="container">
                        <div className="section-header text-center">
                            <h2 className="section-title">Frequently Asked Questions</h2>
                        </div>
                        <div className="faq-list limit-width">
                            {product.faqs.map(faq => (
                                <div className={`faq-item ${openFaq === faq.id ? 'active' : ''}`} key={faq.id} onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}>
                                    <div className="faq-question">
                                        <h4>{faq.question}</h4>
                                        <span className="faq-toggle">{openFaq === faq.id ? '-' : '+'}</span>
                                    </div>
                                    {openFaq === faq.id && <div className="faq-answer"><p>{faq.answer}</p></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Get Started?</h2>
                        <p>Detailed documentation and support are just a click away.</p>
                        <div className="cta-buttons">
                            <Link to="/contact" className="btn-primary">Contact Sales</Link>
                            {product.brochure_file && (
                                <a href={product.brochure_file} className="btn-outline-white" download>Download Brochure</a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer site={site} logo={site.logo} />
        </div>
    );
};

export default ProductDetail;
