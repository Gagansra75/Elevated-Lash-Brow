const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="section hero-section">
      {/* Background Image */}
      <img 
        src="/lashes.jpg" 
        alt="Lash extensions background" 
        className="hero-video"
      />
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 className="hero-title">Elevated Lash & Brow</h1>
        <p className="hero-subtitle">Where Beauty Meets Perfection</p>
        <p className="hero-description">
          Experience luxury lash extensions, expert threading, and precision brow shaping. 
          Transform your look with our professional beauty services.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => scrollToSection('booking')}>
            Book Appointment
          </button>
          <button className="btn btn-secondary" onClick={() => scrollToSection('services')}>
            Our Services
          </button>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span></span>
      </div>
    </section>
  );
};

export default Hero;
