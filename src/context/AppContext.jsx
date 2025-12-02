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
    const savedGallery = localStorage.getItem('lashStoreGallery');
    
    // Only load from localStorage if it exists, otherwise load your new images
    if (savedGallery) {
      const parsed = JSON.parse(savedGallery);
      // Check if it's the old sample data (starts with https)
      if (parsed.length > 0 && parsed[0].url.startsWith('https')) {
        // Clear old sample data and load new images
        localStorage.removeItem('lashStoreGallery');
        loadSampleData();
      } else {
        setGallery(parsed);
      }
    } else {
      loadSampleData();
    }
    
    // Load other data
    const savedBlog = localStorage.getItem('lashStoreBlog');
    const savedBookings = localStorage.getItem('lashStoreBookings');
    if (savedBlog) setBlogPosts(JSON.parse(savedBlog));
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const saveInterval = setInterval(() => {
      saveToLocalStorage();
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [gallery, blogPosts, bookings]);

  const loadSampleData = () => {
    // Load your actual lash images from public/gallery folder
    const lashImages = [
      'IMG_1614.JPG', 'IMG_1617.JPG', 'IMG_1618.JPG', 'IMG_1620.JPG',
      'IMG_1622.JPG', 'IMG_1623.JPG', 'IMG_1630.JPG', 'IMG_1631.JPG',
      'IMG_1637.JPG', 'IMG_1638.JPG', 'IMG_1639.JPG', 'IMG_1643.JPG',
      'IMG_1645.JPG', 'IMG_1647.JPG', 'IMG_1648.JPG', 'IMG_1650.JPG',
      'IMG_1652.JPG', 'IMG_1653.JPG'
    ];

    const galleryData = lashImages.map((image, index) => ({
      id: index + 1,
      url: `/gallery/${image}`,
      category: 'lashes',
      date: new Date(2025, 10, 28 - index).toLocaleDateString()
    }));

    setGallery(galleryData);

    setBlogPosts([
      {
        id: 1,
        title: 'The Ultimate Guide to Lash Extensions',
        author: 'Sarah Johnson',
        image: '/gallery/IMG_1622.JPG',
        excerpt: 'Everything you need to know about choosing the perfect lash extensions for your eye shape and lifestyle.',
        content: `Lash extensions have become increasingly popular as a beauty enhancement that saves time and creates stunning results. Whether you're looking for a natural look or dramatic volume, understanding the different types of extensions is key to achieving your desired results.

Classic lash extensions offer a natural enhancement, with one extension applied to each natural lash. They're perfect for those who want subtle definition and length without too much drama.

Volume lashes create a fuller, more glamorous look by applying multiple ultra-fine extensions to each natural lash. This technique is ideal for those with sparse lashes or anyone wanting a more dramatic effect.

Hybrid lashes combine both classic and volume techniques, offering the best of both worlds with texture and dimension.

Remember, proper aftercare is essential for maintaining your lash extensions. Avoid oil-based products, be gentle when cleansing, and brush your lashes daily to keep them looking their best!`,
        date: 'November 28, 2025',
        category: 'Tutorials',
        readTime: '7'
      },
      {
        id: 2,
        title: 'Threading vs. Waxing: Which is Better for Your Brows?',
        author: 'Maria Garcia',
        image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800',
        excerpt: 'Discover the differences between threading and waxing, and find out which method is best for achieving perfect brows.',
        content: `When it comes to shaping your eyebrows, two popular methods stand out: threading and waxing. Both have their unique advantages, and the best choice depends on your skin type, pain tolerance, and desired results.

Threading is an ancient hair removal technique that uses twisted cotton thread to remove hair from the follicle. It's incredibly precise, making it ideal for creating clean, defined brow shapes. Threading is also gentle on sensitive skin and doesn't use any chemicals or heat.

Waxing, on the other hand, removes hair in larger sections, making it faster for covering more area. It can be more efficient for shaping and cleaning up larger areas around the brows. However, it can be harsher on sensitive skin.

For most clients with sensitive skin or those who want precise shaping, we recommend threading. It's gentler, more accurate, and creates beautiful, crisp lines. Plus, the results last just as long as waxing – typically 3-4 weeks!`,
        date: 'November 25, 2025',
        category: 'Tips & Tricks',
        readTime: '5'
      },
      {
        id: 3,
        title: 'How to Care for Your Lashes: Expert Tips',
        author: 'Emily Chen',
        image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800',
        excerpt: 'Learn professional tips for maintaining healthy natural lashes and extending the life of your lash extensions.',
        content: `Whether you have natural lashes or extensions, proper care is essential for maintaining their health and beauty. Here are our top expert tips for lash care that will keep your eyes looking gorgeous.

First and foremost, be gentle! Your lashes are delicate, so avoid rubbing your eyes and be careful when removing makeup. Use a gentle, oil-free makeup remover and pat – don't rub.

If you have lash extensions, avoid oil-based products completely. Oil breaks down the adhesive, causing your extensions to fall out prematurely. Stick to oil-free cleansers, makeup, and skincare products.

Brush your lashes daily with a clean spoolie brush. This keeps them looking neat and prevents tangling. For extensions, brush them gently from mid-length to tips.

Stay away from steam and excessive heat for the first 24-48 hours after getting extensions. This allows the adhesive to fully cure.

Sleep on your back when possible to avoid crushing your lashes against the pillow. If you're a side sleeper, consider using a silk pillowcase to reduce friction.

Schedule regular fills every 2-3 weeks to maintain your extensions. This keeps them looking full and beautiful while protecting your natural lashes.

Finally, give your natural lashes a break every few months. Taking a short break from extensions allows your natural lashes to rest and rejuvenate.`,
        date: 'November 22, 2025',
        category: 'Tips & Tricks',
        readTime: '6'
      }
    ]);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('lashStoreGallery', JSON.stringify(gallery));
    localStorage.setItem('lashStoreBlog', JSON.stringify(blogPosts));
    localStorage.setItem('lashStoreBookings', JSON.stringify(bookings));
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
