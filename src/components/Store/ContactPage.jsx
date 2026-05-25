import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Clock, 
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import './StoreStyles.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "What is your delivery time?",
      a: "Orders within Karachi are delivered within 24-48 hours, while deliveries to other cities across Pakistan take 3-5 working days."
    },
    {
      q: "Can I exchange or return my order?",
      a: "Yes! If the product is damaged or has sizing issues, you can easily claim an exchange or refund within 7 days of delivery."
    },
    {
      q: "Is Cash on Delivery (COD) available?",
      a: "Yes, Cash on Delivery (COD) is available all over Pakistan with no additional hidden charges."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Simulate form submission
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="store-contact-container">
      {/* Hero Header */}
      <div className="contact-hero-section">
        <span className="contact-subtitle">Get In Touch</span>
        <h1 className="contact-title">Contact Us</h1>
        <div className="store-section-line"></div>
        <p className="contact-desc">
          If you have any questions, exchange requests, or corporate inquiries, 
          please reach out to us using the form below. We will get back to you as soon as possible!
        </p>
      </div>

      {/* Info Cards Row */}
      <div className="contact-info-grid">
        <div className="contact-info-card">
          <div className="info-icon-box">
            <MapPin size={24} />
          </div>
          <h3>Visit Our Outlet</h3>
          <p>123 Premium Luxe Way, Suite 400, Clifton, Karachi, Pakistan</p>
        </div>

        <div className="contact-info-card">
          <div className="info-icon-box">
            <Phone size={24} />
          </div>
          <h3>Call Us Anytime</h3>
          <p className="info-phone">+92 (300) 123-4567</p>
          <p className="info-phone">+92 (21) 987-6543</p>
        </div>

        <div className="contact-info-card">
          <div className="info-icon-box">
            <Mail size={24} />
          </div>
          <h3>Email Support</h3>
          <p>support@ecovibe.com</p>
          <p>inquiries@ecovibe.com</p>
        </div>
      </div>

      {/* Main Interactive Form & Hours Grid */}
      <div className="contact-form-layout">
        {/* Form Container */}
        <div className="contact-form-card">
          <h2>Send Us a Message</h2>
          {submitted ? (
            <div className="contact-success-alert">
              <CheckCircle size={32} />
              <div>
                <h4>Message Sent Successfully!</h4>
                <p>We have received your message. Our team will contact you within 24 hours. Thank you!</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="premium-contact-form">
              <div className="form-group-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Anum Fatima" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="anum@example.com" 
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Exchange Request, Size Issue" 
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  placeholder="Type your question or message here..." 
                  required 
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                <span>Send Message</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Operating Hours Box */}
        <div className="contact-hours-card">
          <div className="hours-header">
            <Clock size={22} />
            <h2>Operational Hours</h2>
          </div>
          <div className="hours-list">
            <div className="hours-row">
              <span>Monday - Friday</span>
              <span>09:00 AM - 08:00 PM</span>
            </div>
            <div className="hours-row">
              <span>Saturday</span>
              <span>10:00 AM - 06:00 PM</span>
            </div>
            <div className="hours-row Sunday">
              <span>Sunday</span>
              <span className="closed-tag">Closed</span>
            </div>
          </div>
          <div className="hours-footer">
            <p>Note: Our online customer support agents are active 24/7 on WhatsApp and Email!</p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="contact-faq-section">
        <div className="faq-header">
          <HelpCircle size={24} />
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${activeFaq === idx ? 'active' : ''}`}
              onClick={() => toggleFaq(idx)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
              {activeFaq === idx && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
