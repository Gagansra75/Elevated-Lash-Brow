import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaCheck, FaTimes } from 'react-icons/fa';

const Memberships = () => {
  const { showToast } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 'basic',
      badge: 'Basic',
      name: 'Starter Beauty',
      price: '$79',
      features: [
        { text: '1 Lash Fill per month', included: true },
        { text: '1 Eyebrow Threading', included: true },
        { text: '10% off all products', included: true },
        { text: 'Priority booking', included: true },
        { text: 'No additional services', included: false }
      ]
    },
    {
      id: 'popular',
      badge: 'Popular',
      name: 'Beauty Enthusiast',
      price: '$149',
      featured: true,
      features: [
        { text: '2 Lash Fills per month', included: true },
        { text: '2 Eyebrow Threading', included: true },
        { text: '1 Brow Tinting', included: true },
        { text: '15% off all services', included: true },
        { text: 'Free consultation', included: true }
      ]
    },
    {
      id: 'premium',
      badge: 'Premium',
      name: 'VIP Glamour',
      price: '$249',
      features: [
        { text: 'Unlimited lash fills', included: true },
        { text: 'Unlimited threading', included: true },
        { text: '2 Full lash sets/year', included: true },
        { text: '20% off all services', included: true },
        { text: 'VIP treatment & gifts', included: true }
      ]
    }
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(`Successfully subscribed to ${selectedPlan.name} plan!`);
    setShowModal(false);
  };

  return (
    <section id="memberships" className="section memberships-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Membership Plans</h2>
          <p className="section-subtitle">Save more with our exclusive membership packages</p>
        </div>

        <div className="memberships-grid">
          {plans.map(plan => (
            <div key={plan.id} className={`membership-card ${plan.featured ? 'featured' : ''}`}>
              <div className="membership-badge">{plan.badge}</div>
              <h3>{plan.name}</h3>
              <div className="membership-price">
                <span className="price">{plan.price}</span>
                <span className="period">/month</span>
              </div>
              <ul className="membership-features">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    {feature.included ? <FaCheck /> : <FaTimes />}
                    {feature.text}
                  </li>
                ))}
              </ul>
              <button
                className={`btn ${plan.featured ? 'btn-primary' : 'btn-outline'} btn-membership`}
                onClick={() => handleSelectPlan(plan)}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedPlan && (
        <div className="modal active" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 style={{ marginBottom: '20px' }}>Subscribe to {selectedPlan.name}</h2>
            <p style={{ fontSize: '2rem', color: '#d4a574', marginBottom: '20px' }}>{selectedPlan.price}/month</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" required />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" required />
              </div>
              <div className="form-group">
                <label>Card Number *</label>
                <input type="text" placeholder="1234 5678 9012 3456" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div className="form-group">
                  <label>Expiry Date *</label>
                  <input type="text" placeholder="MM/YY" required />
                </div>
                <div className="form-group">
                  <label>CVV *</label>
                  <input type="text" placeholder="123" required />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-large" style={{ marginTop: '20px' }}>
                Complete Subscription
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Memberships;
