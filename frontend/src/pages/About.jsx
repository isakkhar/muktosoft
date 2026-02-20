import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const API_URL = 'http://localhost:8000/api';

const VALUE_ICONS = {
    star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
    heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
    shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
    lightbulb: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></svg>,
    handshake: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
};

const PROCESS_ICONS = {
    search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>,
    pencil: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
    rocket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
};

const About = () => {
    const [site, setSite] = useState({});
    const [about, setAbout] = useState(null);
    const [stats, setStats] = useState([]);
    const [whyChoose, setWhyChoose] = useState([]);
    const [team, setTeam] = useState([]);
    const [coreValues, setCoreValues] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [clientLogos, setClientLogos] = useState([]);
    const [workProcess, setWorkProcess] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [cta, setCta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        axios.get(`${API_URL}/homepage/`)
            .then(res => {
                setSite(res.data.site_settings || {});
                setAbout(res.data.about || null);
                setStats(res.data.stats || []);
                setWhyChoose(res.data.why_choose || []);
                setTeam(res.data.team_members || []);
                setCoreValues(res.data.core_values || []);
                setTimeline(res.data.timeline || []);
                setClientLogos(res.data.client_logos || []);
                setWorkProcess(res.data.work_process || []);
                setFaqs(res.data.faqs || []);
                setCta(res.data.cta || null);
                setLoading(false);
                document.title = `About - ${res.data.site_settings?.site_name || 'MuktoSoft'}`;
            })
            .catch(err => {
                console.error('Error:', err);
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
                    <h1>About Us</h1>
                    <p>Learn more about {site.site_name || 'Mukto Soft'} and our mission</p>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-image-wrapper">
                            <div className="about-image-main">
                                {about?.image ? (
                                    <img src={about.image} alt="About" style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '20px' }} />
                                ) : (
                                    <div className="about-img-placeholder" style={{ background: 'linear-gradient(135deg, #e0f0f8 0%, #c5dff0 50%, #2196c8 100%)' }}>
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
                                <span className="badge-number">{about?.experience_years || '10+'}</span>
                                <span className="badge-text">{about?.experience_label || 'Years Experience'}</span>
                            </div>
                        </div>

                        <div className="about-content">
                            <span className="section-subtitle">About {site.site_name || 'Mukto Soft'}</span>
                            <h2 className="section-title">{about?.title || 'We Are Trusted IT Solutions Provider'}</h2>
                            <p className="about-text">{about?.description || 'With over a decade of experience, we have been at the forefront of technology innovation.'}</p>
                            {about?.description2 && <p className="about-text">{about.description2}</p>}

                            <div className="about-features">
                                {[about?.feature1, about?.feature2, about?.feature3, about?.feature4].filter(Boolean).map((f, i) => (
                                    <div className="about-feature-item" key={i}>
                                        <div className="check-icon">
                                            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" strokeWidth="3" /></svg>
                                        </div>
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mission-vision-section">
                <div className="container">
                    <div className="services-header">
                        <span className="section-subtitle">Our Purpose</span>
                        <h2 className="section-title">Mission & Vision</h2>
                    </div>

                    <div className="mission-vision-grid">
                        <div className="mv-card mv-mission">
                            <div className="mv-icon">
                                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="white" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <circle cx="12" cy="12" r="6" />
                                    <circle cx="12" cy="12" r="2" />
                                </svg>
                            </div>
                            <h3>{about?.mission_title || 'Our Mission'}</h3>
                            <p>{about?.mission_description || 'To empower businesses with innovative software solutions that drive growth, efficiency, and digital transformation.'}</p>
                        </div>

                        <div className="mv-card mv-vision">
                            <div className="mv-icon">
                                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <h3>{about?.vision_title || 'Our Vision'}</h3>
                            <p>{about?.vision_description || 'To be the leading technology partner for businesses worldwide, creating impactful digital experiences that shape the future.'}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            {coreValues.length > 0 && (
                <section className="core-values-section">
                    <div className="container">
                        <div className="services-header">
                            <span className="section-subtitle">What Drives Us</span>
                            <h2 className="section-title">Our Core Values</h2>
                            <p className="section-desc">The principles that guide everything we do.</p>
                        </div>

                        <div className="values-grid">
                            {coreValues.map(value => (
                                <div className="value-card" key={value.id}>
                                    <div className="value-icon">
                                        {VALUE_ICONS[value.icon] || VALUE_ICONS.star}
                                    </div>
                                    <h4>{value.title}</h4>
                                    <p>{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Why Choose Us */}
            {whyChoose.length > 0 && (
                <section className="why-section">
                    <div className="container">
                        <div className="why-grid">
                            <div>
                                <span className="section-subtitle">Why Choose Us</span>
                                <h2 className="section-title">Reasons to Trust {site.site_name || 'Mukto Soft'}</h2>
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

            {/* How We Work */}
            {workProcess.length > 0 && (
                <section className="work-process-section">
                    <div className="container">
                        <div className="services-header">
                            <span className="section-subtitle">Our Process</span>
                            <h2 className="section-title">How We Work</h2>
                            <p className="section-desc">A streamlined process to deliver quality results every time.</p>
                        </div>

                        <div className="process-grid">
                            {workProcess.map((step, idx) => (
                                <div className="process-card" key={step.id}>
                                    <div className="process-step-number">{String(idx + 1).padStart(2, '0')}</div>
                                    <div className="process-icon">
                                        {PROCESS_ICONS[step.icon] || PROCESS_ICONS.search}
                                    </div>
                                    <h4>{step.title}</h4>
                                    <p>{step.description}</p>
                                    {idx < workProcess.length - 1 && <div className="process-connector"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Company Timeline */}
            {timeline.length > 0 && (
                <section className="timeline-section">
                    <div className="container">
                        <div className="services-header">
                            <span className="section-subtitle">Our Journey</span>
                            <h2 className="section-title">Company Timeline</h2>
                            <p className="section-desc">Key milestones that shaped who we are today.</p>
                        </div>

                        <div className="timeline-container">
                            {timeline.map((item, idx) => (
                                <div className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`} key={item.id}>
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-card">
                                        <span className="timeline-year">{item.year}</span>
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Team Section */}
            {team.length > 0 && (
                <section className="team-section">
                    <div className="container">
                        <div className="services-header">
                            <span className="section-subtitle">Our Team</span>
                            <h2 className="section-title">Meet Our Experts</h2>
                            <p className="section-desc">Our talented team of professionals brings diverse expertise to deliver exceptional results.</p>
                        </div>

                        <div className="team-grid">
                            {team.map(member => (
                                <div className="team-card" key={member.id}>
                                    <div className="team-card-image">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} />
                                        ) : (
                                            <div className="team-card-placeholder">
                                                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                    <circle cx="12" cy="7" r="4" />
                                                </svg>
                                            </div>
                                        )}
                                        {member.linkedin_url && (
                                            <div className="team-card-overlay">
                                                <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="team-social-link">
                                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2">
                                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                        <rect x="2" y="9" width="4" height="12" />
                                                        <circle cx="4" cy="4" r="2" />
                                                    </svg>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="team-card-info">
                                        <h4>{member.name}</h4>
                                        <p>{member.role}</p>
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

            {/* Stats */}
            <section className="stats-section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.length > 0 ? (
                            stats.map(stat => (
                                <div className="stat-item" key={stat.id}>
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="stat-item"><div className="stat-number">500+</div><div className="stat-label">Projects Completed</div></div>
                                <div className="stat-item"><div className="stat-number">150+</div><div className="stat-label">Happy Clients</div></div>
                                <div className="stat-item"><div className="stat-number">50+</div><div className="stat-label">Team Members</div></div>
                                <div className="stat-item"><div className="stat-number">10+</div><div className="stat-label">Years Experience</div></div>
                            </>
                        )}
                    </div>
                </div>
            </section>

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
                        <h2>{cta?.title || 'Ready to Start Your Project?'}</h2>
                        <p>{cta?.description || "Let's discuss how we can help your business grow with the right technology solutions."}</p>
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

export default About;
