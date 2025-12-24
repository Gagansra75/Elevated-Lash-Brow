import { useState, useEffect } from 'react';
import { FaTimes, FaStar, FaGift } from 'react-icons/fa';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('hasSeenWelcomePopup');
    
    if (!hasSeenPopup) {
      // Show popup after 1.5 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcomePopup', 'true');
  };

  const handleClaim = () => {
    // Scroll to booking section
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="welcome-popup-overlay" onClick={handleClose}>
      <div className="welcome-popup" onClick={(e) => e.stopPropagation()}>
        <button className="welcome-close" onClick={handleClose}>
          <FaTimes />
        </button>
        
        <div className="welcome-sparkle">
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        <div className="welcome-content">
          <h2>Welcome to Elevated Lash & Brow! ✨</h2>
          <p className="welcome-subtitle">Where Beauty Meets Artistry</p>
          
          <div className="welcome-offer">
            <FaGift className="gift-icon" />
            <h3>Special First-Time Offer!</h3>
            <p className="offer-text">Get <span className="highlight">20% OFF</span> your first service</p>
            <p className="offer-code">Use code: <span className="code-badge">WELCOME20</span></p>
          </div>

          <div className="welcome-features">
            <div className="feature-item">
              <span className="check-icon">✓</span>
              <span>Certified Professionals</span>
            </div>
            <div className="feature-item">
              <span className="check-icon">✓</span>
              <span>Premium Products</span>
            </div>
            <div className="feature-item">
              <span className="check-icon">✓</span>
              <span>Personalized Service</span>
            </div>
          </div>

          <div className="welcome-actions">
            <button className="btn btn-primary btn-large" onClick={handleClaim}>
              Book Now & Save
            </button>
            <button className="btn btn-outline" onClick={handleClose}>
              Browse Services
            </button>
          </div>
        </div>

        <div className="welcome-decoration"></div>
      </div>
    </div>
  );
};

export default WelcomePopup;
