import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent.');
        setForm({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div>
            <Navbar />

            {/* Page Banner */}
            <section className="page-banner">
                <div className="container">
                    <h1>Contact Us</h1>
                    <p>Get in touch with us for any inquiries</p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info">
                            <span className="section-subtitle">Get In Touch</span>
                            <h2 className="section-title">Let's Talk About Your Project</h2>
                            <p className="about-text">
                                Have a question or want to work together? Fill out the form and we'll
                                get back to you as soon as possible.
                            </p>

                            <div className="contact-details">
                                <div className="contact-detail-card">
                                    <div className="contact-detail-icon">
                                        <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                                    </div>
                                    <div className="contact-detail-text">
                                        <h4>Our Location</h4>
                                        <p>Dhaka, Bangladesh</p>
                                    </div>
                                </div>
                                <div className="contact-detail-card">
                                    <div className="contact-detail-icon">
                                        <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                                    </div>
                                    <div className="contact-detail-text">
                                        <h4>Phone Number</h4>
                                        <p>+880 1234-567890</p>
                                    </div>
                                </div>
                                <div className="contact-detail-card">
                                    <div className="contact-detail-icon">
                                        <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="2" /><polyline points="22,6 12,13 2,6" fill="none" stroke="currentColor" strokeWidth="2" /></svg>
                                    </div>
                                    <div className="contact-detail-text">
                                        <h4>Email Address</h4>
                                        <p>info@muktosoft.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-wrapper">
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <textarea name="message" placeholder="Your Message" rows="6" value={form.message} onChange={handleChange} required></textarea>
                                </div>
                                <button type="submit" className="btn-primary">
                                    Send Message
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
