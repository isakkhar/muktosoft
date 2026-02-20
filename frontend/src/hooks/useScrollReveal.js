import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollReveal = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(revealCallback, observerOptions);

        // Targeted elements for revelation
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => observer.observe(el));

        return () => {
            revealElements.forEach(el => observer.unobserve(el));
        };
    }, [pathname]); // Re-run on route changes
};

export default useScrollReveal;
