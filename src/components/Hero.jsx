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
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1 className="hero-title animate-fade-in">Elevate Your Natural Beauty</h1>
        <p className="hero-subtitle animate-fade-in">Premium Lash Extensions & Threading Services</p>
        <div className="hero-buttons animate-fade-in">
          <button onClick={() => scrollToSection('booking')} className="btn btn-primary">
            Book Appointment
          </button>
          <button onClick={() => scrollToSection('gallery')} className="btn btn-secondary">
            View Gallery
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
