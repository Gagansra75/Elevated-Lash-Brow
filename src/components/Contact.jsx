import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaInstagram, FaFacebook, FaTiktok, FaPinterest } from 'react-icons/fa';

const Contact = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Message sent successfully! We'll get back to you soon.");
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have questions? We'd love to hear from you</p>
        </div>

        <div className="contact-container">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="contactName">Name *</label>
              <input
                type="text"
                id="contactName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Email *</label>
              <input
                type="email"
                id="contactEmail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactSubject">Subject *</label>
              <input
                type="text"
                id="contactSubject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactMessage">Message *</label>
              <textarea
                id="contactMessage"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-large">
              Send Message
            </button>
          </form>

          <div className="contact-info-section">
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              />
            </div>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="#" className="social-link" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <FaPinterest />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
