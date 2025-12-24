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
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="hero-video"
      >
        <source src="/Coming Soon Elevated Lash & Brow.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay"></div>
      
      <div className="scroll-indicator">
        <span></span>
      </div>
    </section>
  );
};

export default Hero;
