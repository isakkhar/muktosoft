import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './components/ScrollReveal.css';
import axios from 'axios';
import ScrollToTop from './components/ScrollToTop';
import BackToTop from './components/BackToTop';
import FloatingContact from './components/FloatingContact';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CustomCursor from './components/CustomCursor';
import useScrollReveal from './hooks/useScrollReveal';

function App() {
  const [site, setSite] = useState({});
  useScrollReveal();

  useEffect(() => {
    axios.get('http://localhost:8000/api/site-settings/1/')
      .then(res => setSite(res.data))
      .catch(err => console.error("Error fetching site settings:", err));
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <FloatingContact phoneNumber={site.phone} />
      <Chatbot />
      <BackToTop />
    </>
  );
}

export default App;
