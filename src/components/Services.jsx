import { FaEye, FaStar, FaMagic, FaSpa, FaPaintBrush, FaRedo } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaEye />,
      title: 'Classic Lash Extensions',
      description: 'Natural-looking lashes that enhance your eyes beautifully',
      price: 'From $80',
      link: '#booking'
    },
    {
      icon: <FaStar />,
      title: 'Volume Lash Extensions',
      description: 'Fuller, dramatic lashes with multiple extensions per natural lash',
      price: 'From $120',
      link: '#booking'
    },
    {
      icon: <FaMagic />,
      title: 'Hybrid Lash Extensions',
      description: 'Perfect blend of classic and volume techniques',
      price: 'From $100',
      link: '#booking'
    },
    {
      icon: <FaSpa />,
      title: 'Eyebrow Threading',
      description: 'Precise hair removal for perfectly shaped brows',
      price: 'From $15',
      link: '#booking'
    },
    {
      icon: <FaPaintBrush />,
      title: 'Brow Tinting & Shaping',
      description: 'Define and enhance your brows with professional tinting',
      price: 'From $25',
      link: '#booking'
    },
    {
      icon: <FaRedo />,
      title: 'Lash Fills & Touch-ups',
      description: 'Maintain your beautiful lashes with regular fills',
      price: 'From $60',
      link: '#booking'
    }
  ];

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Professional beauty treatments tailored for you</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-price">{service.price}</span>
              <button onClick={scrollToBooking} className="btn btn-outline">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
