import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaUser, FaCalendar, FaClock, FaTag, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

const Blog = () => {
  const { blogPosts, addBlogPost, deleteBlogPost } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showReadModal, setShowReadModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    excerpt: '',
    content: '',
    category: 'Tips & Tricks',
    readTime: '5'
  });

  const categories = ['All', 'Tips & Tricks', 'Trends', 'Tutorials', 'Product Reviews', 'Before & After'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlogPost(formData);
    setFormData({
      title: '',
      author: '',
      image: '',
      excerpt: '',
      content: '',
      category: 'Tips & Tricks',
      readTime: '5'
    });
    setShowModal(false);
  };

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  const handleReadMore = (post) => {
    setSelectedPost(post);
    setShowReadModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogPost(id);
    }
  };

  return (
    <section id="blog" className="section blog-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Beauty Blog</h2>
          <p className="section-subtitle">Your guide to perfect lashes and brows</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="blog-controls">
          <div className="blog-search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="blog-categories">
            {categories.map(category => (
              <button
                key={category}
                className={`category-tag ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <FaEdit /> New Post
          </button>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <article className="blog-featured fade-in" onClick={() => handleReadMore(featuredPost)}>
            <div className="featured-image-wrapper">
              <img src={featuredPost.image} alt={featuredPost.title} />
              <div className="featured-overlay">
                <span className="featured-badge">Featured</span>
                <span className="category-badge">{featuredPost.category || 'Beauty'}</span>
              </div>
            </div>
            <div className="featured-content">
              <h2>{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              <div className="blog-meta-modern">
                <span><FaUser /> {featuredPost.author}</span>
                <span><FaCalendar /> {featuredPost.date}</span>
                <span><FaClock /> {featuredPost.readTime || '5'} min read</span>
              </div>
              <div className="featured-actions">
                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); handleReadMore(featuredPost); }}>
                  Read Article
                </button>
                <button className="btn-icon" onClick={(e) => { e.stopPropagation(); handleDelete(featuredPost.id); }}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Regular Posts Grid */}
        <div className="blog-grid-modern">
          {regularPosts.length === 0 && !featuredPost ? (
            <div className="blog-empty">
              <h3>No posts yet</h3>
              <p>Start sharing your beauty insights by creating your first blog post!</p>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Create First Post
              </button>
            </div>
          ) : (
            regularPosts.map(post => (
              <article key={post.id} className="blog-card-modern fade-in">
                <div className="card-image-wrapper" onClick={() => handleReadMore(post)}>
                  <img src={post.image} alt={post.title} />
                  <div className="card-overlay">
                    <span className="category-badge">{post.category || 'Beauty'}</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3 onClick={() => handleReadMore(post)}>{post.title}</h3>
                  <p className="card-excerpt">{post.excerpt}</p>
                  <div className="blog-meta-modern">
                    <div className="meta-left">
                      <span><FaUser /> {post.author}</span>
                      <span><FaClock /> {post.readTime || '5'} min</span>
                    </div>
                    <button className="btn-icon delete-btn" onClick={() => handleDelete(post.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* New Post Modal */}
      {showModal && (
        <div className="modal active" onClick={() => setShowModal(false)}>
          <div className="modal-content blog-modal" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 style={{ marginBottom: '10px' }}>Create New Post</h2>
            <p style={{ color: '#999', marginBottom: '30px', fontSize: '0.9rem' }}>Share your beauty expertise with the world</p>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Post Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="e.g., 10 Tips for Perfect Lash Extensions"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="author">Author Name *</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    placeholder="Your name"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="Tips & Tricks">Tips & Tricks</option>
                    <option value="Trends">Trends</option>
                    <option value="Tutorials">Tutorials</option>
                    <option value="Product Reviews">Product Reviews</option>
                    <option value="Before & After">Before & After</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="image">Featured Image URL *</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="readTime">Read Time (minutes) *</label>
                  <input
                    type="number"
                    id="readTime"
                    name="readTime"
                    placeholder="5"
                    min="1"
                    max="60"
                    value={formData.readTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="excerpt">Short Description *</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="A brief summary of your post (150-200 characters)"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Full Content *</label>
                <textarea
                  id="content"
                  name="content"
                  placeholder="Write your full blog post here..."
                  value={formData.content}
                  onChange={handleChange}
                  rows="10"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-large">
                Publish Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Read Post Modal */}
      {showReadModal && selectedPost && (
        <div className="modal active" onClick={() => setShowReadModal(false)}>
          <div className="modal-content blog-reader" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setShowReadModal(false)}>&times;</span>
            
            <div className="reader-header">
              <span className="category-badge large">{selectedPost.category || 'Beauty'}</span>
              <h1 className="reader-title">{selectedPost.title}</h1>
              
              <div className="reader-meta">
                <div className="author-info">
                  <div className="author-avatar">
                    {selectedPost.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="author-name">{selectedPost.author}</div>
                    <div className="post-date">{selectedPost.date}</div>
                  </div>
                </div>
                <div className="read-time">
                  <FaClock /> {selectedPost.readTime || '5'} min read
                </div>
              </div>
            </div>

            <img 
              src={selectedPost.image} 
              alt={selectedPost.title} 
              className="reader-image"
            />
            
            <div className="reader-content">
              <p className="reader-excerpt">{selectedPost.excerpt}</p>
              <div className="content-divider"></div>
              <div className="reader-body">{selectedPost.content}</div>
            </div>

            <div className="reader-footer">
              <button className="btn btn-outline" onClick={() => setShowReadModal(false)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={() => {
                setShowReadModal(false);
                setTimeout(() => {
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}>
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
