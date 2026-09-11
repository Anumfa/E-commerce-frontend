import React from 'react';
import { 
  Heart, 
  Award, 
  Sparkles, 
  Leaf, 
  Users, 
  ShieldCheck 
} from 'lucide-react';
import './StoreStyles.css';

const AboutUsPage = () => {
  const values = [
    {
      icon: Sparkles,
      title: "Exquisite Craftsmanship",
      desc: "Every single piece is designed and selected with absolute precision, offering only the finest premium luxury essentials."
    },
    {
      icon: Leaf,
      title: "Sustainable Fashion",
      desc: "We prioritize ethical sourcing and eco-friendly manufacturing processes to preserve the environment for future generations."
    },
    {
      icon: Award,
      title: "Uncompromised Quality",
      desc: "We stand by our products. We use premium high-density fabrics and materials to ensure longevity and timeless elegance."
    }
  ];

  const team = [
    {
      name: "Sophia Sterling",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop"
    },
    {
      name: "Arman Malik",
      role: "Lead Product Designer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop"
    },
    {
      name: "Elena Rostova",
      role: "Head of Sustainability",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop"
    }
  ];

  return (
    <div className="store-about-container">
      {/* Hero Header */}
      <div className="about-hero-section">
        <span className="about-subtitle">Our Heritage</span>
        <h1 className="about-title">The EcoVibe Story</h1>
        <div className="store-section-line"></div>
        <p className="about-desc">
          Redefining premium modern lifestyle with ethical choices, high-end materials, 
          and minimal environmental footprint since 2021.
        </p>
      </div>

      {/* Hero Banner Image */}
      <div className="about-hero-image">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
          alt="The EcoVibe team designing premium sustainable essentials"
          loading="eager"
          decoding="async"
        />
        <div className="about-hero-image-badge">
          <Sparkles size={16} />
          <span>Crafted with care since 2021</span>
        </div>
      </div>

      {/* Brand Story Split Section */}
      <div className="about-split-section">
        <div className="about-split-image">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&fit=crop" 
            alt="Our elegant workplace design" 
            className="split-img"
          />
        </div>
        <div className="about-split-text">
          <span className="section-label">How We Started</span>
          <h2>A Vision to Balance Style and Planet</h2>
          <p>
            EcoVibe was born from a simple realization: high-end luxury products shouldn't come at the cost of our planet. We started as a boutique design workshop in Karachi, crafting premium items using sustainable fabrics and eco-friendly techniques.
          </p>
          <p>
            Today, we are a global family. We partner with expert local weavers and ethical manufacturers who share our passion for premium textures and green practices. Every design is carefully scrutinized, assuring that style meets substance seamlessly.
          </p>
          <div className="about-split-stats">
            <div className="about-stat-item">
              <span className="stat-num">15k+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="about-stat-item">
              <span className="stat-num">98%</span>
              <span className="stat-label">Eco Materials</span>
            </div>
            <div className="about-stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Fair Trade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="about-values-section">
        <div className="values-header">
          <Heart size={24} className="value-heart-icon" />
          <h2>Values That Define Us</h2>
        </div>
        <div className="values-grid">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div className="value-card" key={idx}>
                <div className="value-icon-box">
                  <Icon size={24} />
                </div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Profiles Section */}
      <div className="about-team-section">
        <div className="team-header">
          <Users size={24} className="team-icon" />
          <h2>Meet the Creative Minds</h2>
          <p>The visionaries and innovators making premium sustainable fashion a reality.</p>
        </div>
        <div className="team-grid">
          {team.map((member, idx) => (
            <div className="team-card" key={idx}>
              <div className="member-image-box">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <span className="member-role">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
