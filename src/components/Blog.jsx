import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FaUser, FaCalendar } from 'react-icons/fa';

const Blog = () => {
  const { blogPosts, addBlogPost, deleteBlogPost } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showReadModal, setShowReadModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    image: '',
    excerpt: '',
    content: ''
  });

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
      content: ''
    });
    setShowModal(false);
  };

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
          <p className="section-subtitle">Tips, trends, and insights from our experts</p>
        </div>

        <div className="blog-admin">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + New Blog Post
          </button>
        </div>

        <div className="blog-grid">
          {blogPosts.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px', color: '#666' }}>
              No blog posts yet. Create your first post!
            </p>
          ) : (
            blogPosts.map(post => (
              <article key={post.id} className="blog-card fade-in">
                <img src={post.image} alt={post.title} className="blog-image" />
                <div className="blog-content">
                  <div className="blog-meta">
                    <span><FaUser /> {post.author}</span>
                    <span><FaCalendar /> {post.date}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-actions">
                    <button className="btn btn-outline" onClick={() => handleReadMore(post)}>
                      Read More
                    </button>
                    <button className="btn btn-outline" onClick={() => handleDelete(post.id)}>
                      Delete
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 style={{ marginBottom: '30px' }}>New Blog Post</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="author">Author *</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="excerpt">Excerpt *</label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="2"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="8"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Publish Post
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Read Post Modal */}
      {showReadModal && selectedPost && (
        <div className="modal active" onClick={() => setShowReadModal(false)}>
          <div className="modal-content" style={{ maxWidth: '800px' }} onClick={(e) => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setShowReadModal(false)}>&times;</span>
            <img src={selectedPost.image} alt={selectedPost.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }} />
            <h2 style={{ marginBottom: '10px' }}>{selectedPost.title}</h2>
            <div className="blog-meta" style={{ marginBottom: '20px' }}>
              <span><FaUser /> {selectedPost.author}</span>
              <span><FaCalendar /> {selectedPost.date}</span>
            </div>
            <p style={{ lineHeight: '1.8', color: '#666', whiteSpace: 'pre-line' }}>{selectedPost.content}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
