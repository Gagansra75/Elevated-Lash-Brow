import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    showToast('Successfully subscribed to our newsletter!');
    setEmail('');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Elevated Lash & Brow</h4>
            <p>Premium lash extensions and threading services with certified professionals dedicated to enhancing your natural beauty.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => scrollToSection('services')}>Services</button></li>
              <li><button onClick={() => scrollToSection('booking')}>Book Now</button></li>
              <li><button onClick={() => scrollToSection('memberships')}>Memberships</button></li>
              <li><button onClick={() => scrollToSection('blog')}>Blog</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p><FaPhone /> (555) 123-4567</p>
            <p><FaEnvelope /> info@elevatedlashandbrow.com</p>
            <p><FaMapMarkerAlt /> 123 Beauty Street, NY 10001</p>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <form onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Elevated Lash & Brow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
