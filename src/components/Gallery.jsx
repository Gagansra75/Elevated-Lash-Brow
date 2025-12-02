import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaSearchPlus } from 'react-icons/fa';

const Gallery = () => {
  const { gallery, currentFilter, setCurrentFilter, addGalleryImages } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('lashes');
  const [lightboxImage, setLightboxImage] = useState(null);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'lashes', label: 'Lash Extensions' },
    { id: 'threading', label: 'Threading' },
    { id: 'brows', label: 'Eyebrows' }
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrls.push(event.target.result);
        if (imageUrls.length === files.length) {
          addGalleryImages(imageUrls, selectedCategory);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const filteredGallery = currentFilter === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === currentFilter);

  return (
    <section id="gallery" className="section gallery-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Work</h2>
          <p className="section-subtitle">Transform your look with our expert services</p>
        </div>
        
        <div className="gallery-filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${currentFilter === filter.id ? 'active' : ''}`}
              onClick={() => setCurrentFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredGallery.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px', color: '#666' }}>
              No images yet. Upload some beautiful work!
            </p>
          ) : (
            filteredGallery.map(item => (
              <div
                key={item.id}
                className="gallery-item fade-in"
                onClick={() => setLightboxImage(item.url)}
              >
                <img src={item.url} alt="Gallery" />
                <div className="gallery-overlay">
                  <FaSearchPlus />
                </div>
              </div>
            ))
          )}
        </div>

        <div className="gallery-upload">
          <h3>Admin Upload</h3>
          <input
            type="file"
            id="galleryUpload"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="lashes">Lash Extensions</option>
            <option value="threading">Threading</option>
            <option value="brows">Eyebrows</option>
          </select>
          <button className="btn btn-primary" onClick={() => document.getElementById('galleryUpload').click()}>
            Upload Images
          </button>
        </div>
      </div>

      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <img src={lightboxImage} alt="Lightbox" />
        </div>
      )}
    </section>
  );
};

export default Gallery;
