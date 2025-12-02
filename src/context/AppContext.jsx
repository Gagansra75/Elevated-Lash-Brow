import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [gallery, setGallery] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [toast, setToast] = useState({ show: false, message: '' });

  // Load sample data on mount
  useEffect(() => {
    loadSampleData();
    loadFromLocalStorage();
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveToLocalStorage();
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [gallery, blogPosts, bookings]);

  const loadSampleData = () => {
    setGallery([
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1583001308122-6fa8ff0dd8e9?w=600',
        category: 'lashes',
        date: '2025-11-28'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600',
        category: 'lashes',
        date: '2025-11-27'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1612832021-e1e89fd57f4c?w=600',
        category: 'brows',
        date: '2025-11-26'
      },
      {
        id: 4,
        url: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600',
        category: 'lashes',
        date: '2025-11-25'
      },
      {
        id: 5,
        url: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=600',
        category: 'threading',
        date: '2025-11-24'
      },
      {
        id: 6,
        url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600',
        category: 'brows',
        date: '2025-11-23'
      }
    ]);

    setBlogPosts([
      {
        id: 1,
        title: 'The Ultimate Guide to Lash Extensions',
        author: 'Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1583001308122-6fa8ff0dd8e9?w=800',
        excerpt: 'Everything you need to know about choosing the perfect lash extensions for your eye shape and lifestyle.',
        content: `Lash extensions have become increasingly popular as a beauty enhancement that saves time and creates stunning results...`,
        date: 'November 28, 2025'
      },
      {
        id: 2,
        title: 'Threading vs. Waxing: Which is Better for Your Brows?',
        author: 'Maria Garcia',
        image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800',
        excerpt: 'Discover the differences between threading and waxing, and find out which method is best for achieving perfect brows.',
        content: `When it comes to shaping your eyebrows, two popular methods stand out...`,
        date: 'November 25, 2025'
      },
      {
        id: 3,
        title: 'How to Care for Your Lashes: Expert Tips',
        author: 'Emily Chen',
        image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800',
        excerpt: 'Learn professional tips for maintaining healthy natural lashes and extending the life of your lash extensions.',
        content: `Whether you have natural lashes or extensions, proper care is essential...`,
        date: 'November 22, 2025'
      }
    ]);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('lashStoreGallery', JSON.stringify(gallery));
    localStorage.setItem('lashStoreBlog', JSON.stringify(blogPosts));
    localStorage.setItem('lashStoreBookings', JSON.stringify(bookings));
  };

  const loadFromLocalStorage = () => {
    const savedGallery = localStorage.getItem('lashStoreGallery');
    const savedBlog = localStorage.getItem('lashStoreBlog');
    const savedBookings = localStorage.getItem('lashStoreBookings');

    if (savedGallery) setGallery(JSON.parse(savedGallery));
    if (savedBlog) setBlogPosts(JSON.parse(savedBlog));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const addGalleryImages = (images, category) => {
    const newImages = images.map(img => ({
      id: Date.now() + Math.random(),
      url: img,
      category: category,
      date: new Date().toLocaleDateString()
    }));
    setGallery(prev => [...prev, ...newImages]);
    showToast('Images uploaded successfully!');
  };

  const addBlogPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    setBlogPosts(prev => [newPost, ...prev]);
    showToast('Blog post published successfully!');
  };

  const deleteBlogPost = (id) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
    showToast('Blog post deleted');
  };

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const value = {
    gallery,
    blogPosts,
    bookings,
    currentFilter,
    toast,
    setCurrentFilter,
    addGalleryImages,
    addBlogPost,
    deleteBlogPost,
    addBooking,
    showToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
