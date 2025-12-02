import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sendBookingConfirmation } from '../services/emailService';
import { FaClock, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';

const Booking = () => {
  const { addBooking, showToast } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    notes: ''
  });

  const services = [
    { value: 'classic-lashes', label: 'Classic Lash Extensions - From $80' },
    { value: 'volume-lashes', label: 'Volume Lash Extensions - From $120' },
    { value: 'hybrid-lashes', label: 'Hybrid Lash Extensions - From $100' },
    { value: 'lash-fill', label: 'Lash Fills & Touch-ups - From $60' },
    { value: 'eyebrow-threading', label: 'Eyebrow Threading - From $15' },
    { value: 'brow-tinting', label: 'Brow Tinting & Shaping - From $25' }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add booking to local state
      const booking = addBooking(formData);
      
      // Send email confirmation to Rupindersra9@gmail.com
      await sendBookingConfirmation({
        ...formData,
        service: getServiceName(formData.service)
      });

      // Show confirmation modal
      setConfirmedBooking({ ...formData, id: booking.id });
      setShowConfirmation(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        notes: ''
      });

      showToast('Booking confirmed! Confirmation email sent.');
    } catch (error) {
      console.error('Booking error:', error);
      showToast('Booking saved! We will contact you shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getServiceName = (value) => {
    const service = services.find(s => s.value === value);
    return service ? service.label : value;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="booking" className="section booking-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Book Your Appointment</h2>
          <p className="section-subtitle">Schedule your transformation today</p>
        </div>

        <div className="booking-container">
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Preferred Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={today}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="time">Preferred Time *</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="service">Service *</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Service</option>
                  {services.map(service => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Special Requests / Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>

          <div className="booking-info">
            <div className="info-card">
              <FaClock />
              <h4>Business Hours</h4>
              <p>Monday - Friday: 9AM - 7PM<br />Saturday: 10AM - 6PM<br />Sunday: Closed</p>
            </div>
            <div className="info-card">
              <FaPhoneAlt />
              <h4>Call Us</h4>
              <p>(555) 123-4567</p>
            </div>
            <div className="info-card">
              <FaMapMarkerAlt />
              <h4>Visit Us</h4>
              <p>123 Beauty Street<br />Seattle, WA 98101</p>
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && confirmedBooking && (
        <div className="modal active" onClick={() => setShowConfirmation(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <span className="modal-close" onClick={() => setShowConfirmation(false)}>&times;</span>
            <div style={{ fontSize: '4rem', color: '#d4a574', marginBottom: '20px' }}>
              <FaCheckCircle />
            </div>
            <h2 style={{ marginBottom: '15px' }}>Booking Confirmed!</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Thank you for your booking, {confirmedBooking.name}!</p>
            <div style={{ background: '#f5e6d3', padding: '20px', borderRadius: '10px', textAlign: 'left' }}>
              <p><strong>Service:</strong> {getServiceName(confirmedBooking.service)}</p>
              <p><strong>Date:</strong> {formatDate(confirmedBooking.date)}</p>
              <p><strong>Time:</strong> {confirmedBooking.time}</p>
              <p><strong>Confirmation sent to:</strong> {confirmedBooking.email}</p>
            </div>
            <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => setShowConfirmation(false)}>
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Booking;
