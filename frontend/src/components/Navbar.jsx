import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ siteName, siteHighlight, logo }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Derive the "base" and "highlight" parts of the name
    const baseName = siteName && siteHighlight
        ? siteName.replace(siteHighlight, '')
        : 'Mukto';
    const highlight = siteHighlight || 'Soft';

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="logo">
                    {logo ? (
                        <img src={logo} alt={siteName || 'Logo'} />
                    ) : (
                        <div className="logo-icon">{baseName.charAt(0)}</div>
                    )}
                    <div className="logo-text">{baseName}<span>{highlight}</span></div>
                </Link>

                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/contact" className="nav-cta">Contact Us</Link></li>
                </ul>

                <button className="mobile-menu-btn">
                    ☰
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
