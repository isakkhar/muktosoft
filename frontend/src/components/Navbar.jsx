import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ siteName, siteHighlight, logo }) => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const baseName = siteName && siteHighlight
        ? siteName.replace(siteHighlight, '')
        : 'Mukto';
    const highlight = siteHighlight || 'Soft';

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

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

                <div className="nav-right-container">
                    <ul className="nav-links">
                        <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
                        <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
                        <li><Link to="/services" className={isActive('/services') ? 'active' : ''}>Services</Link></li>
                        <li><Link to="/products" className={isActive('/products') ? 'active' : ''}>Products</Link></li>
                        <li><Link to="/contact" className="nav-cta">Contact Us</Link></li>
                    </ul>

                    <button className="mobile-menu-btn">
                        ☰
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
