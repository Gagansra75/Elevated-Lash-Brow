// ===== Global State Management =====
const AppState = {
    gallery: [],
    blogPosts: [],
    bookings: [],
    currentFilter: 'all'
};

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initGallery();
    initBlog();
    initBookingSystem();
    initMemberships();
    initContactForm();
    initNewsletterForm();
    loadSampleData();
});

// ===== Navigation & Smooth Scrolling =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -6px)' : '';
    });

    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Close mobile menu
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== Gallery Management =====
function initGallery() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const uploadBtn = document.getElementById('uploadBtn');
    const galleryUpload = document.getElementById('galleryUpload');
    const galleryCategory = document.getElementById('galleryCategory');

    // Gallery filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            AppState.currentFilter = filter;
            renderGallery();
        });
    });

    // Upload images
    uploadBtn.addEventListener('click', () => {
        const files = galleryUpload.files;
        const category = galleryCategory.value;

        if (files.length === 0) {
            showToast('Please select images to upload');
            return;
        }

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newImage = {
                    id: Date.now() + Math.random(),
                    url: e.target.result,
                    category: category,
                    date: new Date().toLocaleDateString()
                };
                AppState.gallery.push(newImage);
                renderGallery();
            };
            reader.readAsDataURL(file);
        });

        showToast('Images uploaded successfully!');
        galleryUpload.value = '';
    });
}

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    const filteredGallery = AppState.currentFilter === 'all' 
        ? AppState.gallery 
        : AppState.gallery.filter(item => item.category === AppState.currentFilter);

    if (filteredGallery.length === 0) {
        galleryGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; color: #666;">No images yet. Upload some beautiful work!</p>';
        return;
    }

    galleryGrid.innerHTML = filteredGallery.map(item => `
        <div class="gallery-item fade-in" data-category="${item.category}">
            <img src="${item.url}" alt="Gallery image">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        </div>
    `).join('');

    // Add click event for lightbox effect
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            openLightbox(img.src);
        });
    });
}

function openLightbox(imageSrc) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        cursor: pointer;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = 'max-width: 90%; max-height: 90%; border-radius: 10px; box-shadow: 0 20px 60px rgba(0,0,0,0.5);';
    
    lightbox.appendChild(img);
    document.body.appendChild(lightbox);
    
    lightbox.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
}

// ===== Blog Management =====
function initBlog() {
    const newBlogBtn = document.getElementById('newBlogBtn');
    const blogModal = document.getElementById('blogModal');
    const modalClose = blogModal.querySelector('.modal-close');
    const blogPostForm = document.getElementById('blogPostForm');

    newBlogBtn.addEventListener('click', () => {
        blogModal.classList.add('active');
        blogPostForm.reset();
    });

    modalClose.addEventListener('click', () => {
        blogModal.classList.remove('active');
    });

    blogModal.addEventListener('click', (e) => {
        if (e.target === blogModal) {
            blogModal.classList.remove('active');
        }
    });

    blogPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newPost = {
            id: Date.now(),
            title: document.getElementById('blogTitle').value,
            author: document.getElementById('blogAuthor').value,
            image: document.getElementById('blogImage').value || 'https://images.unsplash.com/photo-1583001308122-6fa8ff0dd8e9?w=800',
            excerpt: document.getElementById('blogExcerpt').value,
            content: document.getElementById('blogContent').value,
            date: new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })
        };

        AppState.blogPosts.unshift(newPost);
        renderBlog();
        blogModal.classList.remove('active');
        showToast('Blog post published successfully!');
    });
}

function renderBlog() {
    const blogGrid = document.getElementById('blogGrid');
    
    if (AppState.blogPosts.length === 0) {
        blogGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; color: #666;">No blog posts yet. Create your first post!</p>';
        return;
    }

    blogGrid.innerHTML = AppState.blogPosts.map(post => `
        <article class="blog-card fade-in">
            <img src="${post.image}" alt="${post.title}" class="blog-image">
            <div class="blog-content">
                <div class="blog-meta">
                    <span><i class="fas fa-user"></i> ${post.author}</span>
                    <span><i class="fas fa-calendar"></i> ${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-actions">
                    <button class="btn btn-outline" onclick="readBlogPost(${post.id})">Read More</button>
                    <button class="btn btn-outline" onclick="deleteBlogPost(${post.id})">Delete</button>
                </div>
            </div>
        </article>
    `).join('');
}

function readBlogPost(id) {
    const post = AppState.blogPosts.find(p => p.id === id);
    if (!post) return;

    const readModal = document.createElement('div');
    readModal.className = 'modal active';
    readModal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <span class="modal-close" onclick="this.closest('.modal').remove()">&times;</span>
            <img src="${post.image}" alt="${post.title}" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="margin-bottom: 10px;">${post.title}</h2>
            <div class="blog-meta" style="margin-bottom: 20px;">
                <span><i class="fas fa-user"></i> ${post.author}</span>
                <span><i class="fas fa-calendar"></i> ${post.date}</span>
            </div>
            <p style="line-height: 1.8; color: #666; white-space: pre-line;">${post.content}</p>
        </div>
    `;
    document.body.appendChild(readModal);

    readModal.addEventListener('click', (e) => {
        if (e.target === readModal) {
            readModal.remove();
        }
    });
}

function deleteBlogPost(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        AppState.blogPosts = AppState.blogPosts.filter(p => p.id !== id);
        renderBlog();
        showToast('Blog post deleted');
    }
}

// ===== Booking System =====
function initBookingSystem() {
    const bookingForm = document.getElementById('bookingForm');
    const bookingDate = document.getElementById('bookingDate');
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    bookingDate.setAttribute('min', today);

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const booking = {
            id: Date.now(),
            name: document.getElementById('bookingName').value,
            email: document.getElementById('bookingEmail').value,
            phone: document.getElementById('bookingPhone').value,
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value,
            service: document.getElementById('bookingService').value,
            notes: document.getElementById('bookingNotes').value,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        AppState.bookings.push(booking);
        
        // Show confirmation
        showBookingConfirmation(booking);
        bookingForm.reset();
    });
}

function showBookingConfirmation(booking) {
    const serviceName = document.querySelector(`#bookingService option[value="${booking.service}"]`).textContent;
    const date = new Date(booking.date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });

    const confirmationModal = document.createElement('div');
    confirmationModal.className = 'modal active';
    confirmationModal.innerHTML = `
        <div class="modal-content" style="text-align: center;">
            <span class="modal-close" onclick="this.closest('.modal').remove()">&times;</span>
            <div style="font-size: 4rem; color: #d4a574; margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 style="margin-bottom: 15px;">Booking Confirmed!</h2>
            <p style="color: #666; margin-bottom: 20px;">Thank you for your booking, ${booking.name}!</p>
            <div style="background: #f5e6d3; padding: 20px; border-radius: 10px; text-align: left;">
                <p><strong>Service:</strong> ${serviceName}</p>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${booking.time}</p>
                <p><strong>Confirmation sent to:</strong> ${booking.email}</p>
            </div>
            <button class="btn btn-primary" style="margin-top: 20px;" onclick="this.closest('.modal').remove()">Done</button>
        </div>
    `;
    document.body.appendChild(confirmationModal);

    confirmationModal.addEventListener('click', (e) => {
        if (e.target === confirmationModal) {
            confirmationModal.remove();
        }
    });

    showToast('Booking confirmed! Check your email for details.');
}

// ===== Membership Management =====
function initMemberships() {
    const membershipBtns = document.querySelectorAll('.btn-membership');
    
    membershipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.getAttribute('data-plan');
            showMembershipModal(plan);
        });
    });
}

function showMembershipModal(plan) {
    const planNames = {
        basic: 'Starter Beauty',
        popular: 'Beauty Enthusiast',
        premium: 'VIP Glamour'
    };
    
    const planPrices = {
        basic: '$79',
        popular: '$149',
        premium: '$249'
    };

    const membershipModal = document.createElement('div');
    membershipModal.className = 'modal active';
    membershipModal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close" onclick="this.closest('.modal').remove()">&times;</span>
            <h2 style="margin-bottom: 20px;">Subscribe to ${planNames[plan]}</h2>
            <p style="font-size: 2rem; color: #d4a574; margin-bottom: 20px;">${planPrices[plan]}/month</p>
            <form id="membershipForm">
                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" required>
                </div>
                <div class="form-group">
                    <label>Email *</label>
                    <input type="email" required>
                </div>
                <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" required>
                </div>
                <div class="form-group">
                    <label>Card Number *</label>
                    <input type="text" placeholder="1234 5678 9012 3456" required>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="form-group">
                        <label>Expiry Date *</label>
                        <input type="text" placeholder="MM/YY" required>
                    </div>
                    <div class="form-group">
                        <label>CVV *</label>
                        <input type="text" placeholder="123" required>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary btn-large" style="margin-top: 20px;">Complete Subscription</button>
            </form>
        </div>
    `;
    document.body.appendChild(membershipModal);

    const form = membershipModal.querySelector('#membershipForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        membershipModal.remove();
        showToast(`Successfully subscribed to ${planNames[plan]} plan!`);
    });

    membershipModal.addEventListener('click', (e) => {
        if (e.target === membershipModal) {
            membershipModal.remove();
        }
    });
}

// ===== Contact Form =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value,
            date: new Date().toISOString()
        };

        // Simulate sending message
        setTimeout(() => {
            showToast('Message sent successfully! We\'ll get back to you soon.');
            contactForm.reset();
        }, 500);
    });
}

// ===== Newsletter Form =====
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        showToast('Successfully subscribed to our newsletter!');
        newsletterForm.reset();
    });
}

// ===== Toast Notification =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== Load Sample Data =====
function loadSampleData() {
    // Sample Gallery Images
    AppState.gallery = [
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
    ];

    // Sample Blog Posts
    AppState.blogPosts = [
        {
            id: 1,
            title: 'The Ultimate Guide to Lash Extensions',
            author: 'Sarah Johnson',
            image: 'https://images.unsplash.com/photo-1583001308122-6fa8ff0dd8e9?w=800',
            excerpt: 'Everything you need to know about choosing the perfect lash extensions for your eye shape and lifestyle.',
            content: `Lash extensions have become increasingly popular as a beauty enhancement that saves time and creates stunning results. In this comprehensive guide, we'll explore everything you need to know about lash extensions.

What Are Lash Extensions?
Lash extensions are semi-permanent fibers that are attached to your natural lashes to create a fuller, longer look. They can last anywhere from 4-6 weeks with proper care.

Types of Lash Extensions:
1. Classic: One extension per natural lash for a natural look
2. Volume: Multiple lighter extensions per natural lash for drama
3. Hybrid: A combination of classic and volume techniques

Choosing the Right Style:
Your lash technician will help you choose the right length, curl, and thickness based on your eye shape, natural lashes, and desired look.

Aftercare Tips:
- Avoid water for 24-48 hours after application
- Use oil-free makeup remover
- Brush your lashes daily with a clean spoolie
- Avoid rubbing your eyes
- Schedule regular fills every 2-3 weeks

With proper care and maintenance, lash extensions can be a game-changer in your beauty routine!`,
            date: 'November 28, 2025'
        },
        {
            id: 2,
            title: 'Threading vs. Waxing: Which is Better for Your Brows?',
            author: 'Maria Garcia',
            image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=800',
            excerpt: 'Discover the differences between threading and waxing, and find out which method is best for achieving perfect brows.',
            content: `When it comes to shaping your eyebrows, two popular methods stand out: threading and waxing. Let's explore the pros and cons of each.

Threading Benefits:
- More precise hair removal
- Better for sensitive skin
- No chemicals or heat involved
- Creates cleaner, more defined lines
- Longer-lasting results

Waxing Benefits:
- Faster process for larger areas
- Good for removing fine hair
- Can shape brows quickly

Why We Recommend Threading:
At Elevated Lash & Brow, we specialize in threading because it offers superior precision and is gentler on your skin. Threading allows us to create perfectly shaped brows that complement your facial features.

Threading is an ancient technique that originated in Asia and the Middle East. It uses a twisted cotton thread to remove hair at the follicle level, which means results last longer than shaving or trimming.

Best Practices:
- Get threaded every 3-4 weeks
- Avoid sun exposure immediately after
- Apply aloe vera to soothe skin
- Let your brows grow out between appointments

Ready to experience the threading difference? Book your appointment today!`,
            date: 'November 25, 2025'
        },
        {
            id: 3,
            title: 'How to Care for Your Lashes: Expert Tips',
            author: 'Emily Chen',
            image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800',
            excerpt: 'Learn professional tips for maintaining healthy natural lashes and extending the life of your lash extensions.',
            content: `Whether you have natural lashes or extensions, proper care is essential for maintaining their health and beauty.

Natural Lash Care:
1. Remove makeup gently every night
2. Use a lash serum to promote growth
3. Avoid waterproof mascara daily
4. Never pull or rub your lashes
5. Eat a balanced diet rich in vitamins

Extension Care:
1. Keep them dry for the first 24-48 hours
2. Use oil-free products only
3. Brush them daily with a clean spoolie
4. Sleep on your back to avoid crushing
5. Avoid steam rooms and saunas

Common Mistakes to Avoid:
- Using oil-based products
- Picking or pulling at extensions
- Skipping regular fills
- Applying mascara to extensions (usually unnecessary!)
- Using eyelash curlers

Recommended Products:
We recommend using lash serums with biotin and peptides to strengthen your natural lashes. For extension wearers, invest in a good foaming lash cleanser.

Remember: Healthy natural lashes are the foundation for beautiful extensions!`,
            date: 'November 22, 2025'
        }
    ];

    renderGallery();
    renderBlog();
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
window.addEventListener('load', () => {
    const animateElements = document.querySelectorAll('.service-card, .membership-card, .info-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// ===== Performance Optimization =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Local Storage Management =====
function saveToLocalStorage() {
    localStorage.setItem('lashStoreGallery', JSON.stringify(AppState.gallery));
    localStorage.setItem('lashStoreBlog', JSON.stringify(AppState.blogPosts));
    localStorage.setItem('lashStoreBookings', JSON.stringify(AppState.bookings));
}

function loadFromLocalStorage() {
    const gallery = localStorage.getItem('lashStoreGallery');
    const blog = localStorage.getItem('lashStoreBlog');
    const bookings = localStorage.getItem('lashStoreBookings');

    if (gallery) AppState.gallery = JSON.parse(gallery);
    if (blog) AppState.blogPosts = JSON.parse(blog);
    if (bookings) AppState.bookings = JSON.parse(bookings);
}

// Auto-save every 30 seconds
setInterval(saveToLocalStorage, 30000);

// Save before page unload
window.addEventListener('beforeunload', saveToLocalStorage);

console.log('🎨 Elevated Lash & Brow Application Loaded Successfully!');
console.log('✨ Features: Gallery, Booking, Blog, Memberships, Contact');
