import React from 'react';
import './WorkRoadmap.css';

const DEFAULT_ROADMAP_DATA = [
  {
    step: "01",
    title: "Discovery & Consultation",
    desc: "Understand the client's vision, goals, & challenges.",
    items: [{ text: "Initial Meeting" }, { text: "Requirements Gathering" }, { text: "Market Research" }]
  },
  {
    step: "02",
    title: "Design & Development",
    desc: "Develop initial wireframes and user flow diagrams.",
    items: [{ text: "Wireframing" }, { text: "Advanced Design" }, { text: "Feedback Loop" }]
  },
  {
    step: "03",
    title: "Quality Assurance",
    desc: "Perform multiple testing cycles to ensure quality and stability.",
    items: [{ text: "Testing" }, { text: "Bug Fixing" }, { text: "User Acceptance Testing" }]
  },
  {
    step: "04",
    title: "Launch & Support",
    desc: "Deploy with confidence and ensure smooth post-launch support.",
    items: [{ text: "Deployment" }, { text: "Monitoring" }, { text: "Ongoing Support" }]
  },
  {
    step: "05",
    title: "Scale & Growth",
    desc: "Use real data to refine strategy and unlock long-term growth.",
    items: [{ text: "Analytics Review" }, { text: "Optimization" }, { text: "Scale Initiatives" }]
  }
];

const WorkRoadmap = ({ data }) => {
  // Use data from API if available, otherwise use defaults
  const displayData = data && data.length > 0 ? data : DEFAULT_ROADMAP_DATA;

  return (
    <section className="roadmap-section">
      {/* Decorative Background Shapes */}
      <div className="roadmap-bg-shape shape-1"></div>
      <div className="roadmap-bg-shape shape-2"></div>
      
      <div className="container">
        <div className="services-header">
          <span className="section-subtitle">Working Plan</span>
          <h2 className="section-title">Our Project Roadmap</h2>
          <p className="section-desc">A structured approach to bringing your vision to life with precision and excellence.</p>
        </div>

        <div className="roadmap-grid">
          {displayData.map((item, index) => (
            <div 
              className="roadmap-card" 
              key={index}
              style={{ '--delay': `${index * 0.15}s` }}
            >
              <div className="roadmap-step">
                <span>Step</span>
                <strong>{String(index + 1).padStart(2, '0')}</strong>
              </div>
              
              <div className="roadmap-icon-wrapper">
                <div className="roadmap-line"></div>
                <div className="roadmap-check-icon-outer">
                  <div className="roadmap-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="roadmap-content">
                <div className="card-glass-glow"></div>
                <h3>{item.title}</h3>
                <p>{item.description || item.desc}</p>
                <ul className="roadmap-list">
                  {item.items && item.items.map((li, i) => (
                    <li key={i}>
                      <span className="li-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      {li.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkRoadmap;
