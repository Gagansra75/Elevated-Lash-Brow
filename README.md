# Elevated Lash & Brow - React Application

A modern, feature-rich single-page application for a premium lash and brow beauty studio built with React and Vite.

## 🌟 Features

- **Hero Section** - Beautiful background with call-to-action buttons
- **Gallery** - Image gallery with category filters and admin upload
- **Services** - Showcase of all lash and threading services with pricing
- **Booking System** - Complete appointment booking with confirmation
- **Memberships** - Three-tier membership plans with payment modal
- **Blog** - Create, read, and delete blog posts
- **Contact** - Contact form with Google Maps integration
- **Responsive Design** - Fully optimized for mobile, tablet, and desktop
- **Local Storage** - Automatic data persistence
- **Toast Notifications** - User-friendly feedback system

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **React Icons** - Icon library
- **Context API** - State management
- **CSS3** - Custom styling with animations

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Gallery.jsx
│   ├── Services.jsx
│   ├── Booking.jsx
│   ├── Memberships.jsx
│   ├── Blog.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── Toast.jsx
├── context/           # Context providers
│   └── AppContext.jsx
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Backend Integration (Future)

This application is structured to easily integrate with a backend:

1. **API Service Layer** - Add `src/services/api.js` for API calls
2. **Backend Options:**
   - Node.js + Express
   - Firebase
   - Supabase
   - Any REST API

3. **Database Integration:**
   - MongoDB for gallery, blog, bookings
   - PostgreSQL for relational data
   - Firebase Firestore for real-time updates

## 📝 Environment Variables

Create a `.env` file for production:

```env
VITE_API_URL=your_api_url
VITE_GOOGLE_MAPS_KEY=your_maps_key
```

## 🎨 Customization

- **Colors**: Edit CSS variables in `src/index.css`
- **Content**: Modify component files directly
- **Images**: Replace URLs in components or add to `public/` folder

## 📱 Features to Add

- [ ] User authentication
- [ ] Admin dashboard
- [ ] Payment integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Review system
- [ ] Real-time availability

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is private and for personal use.

## 👤 Author

Elevated Lash & Brow
- Email: info@elevatedlashandbrow.com
- Phone: (555) 123-4567

---

Built with ❤️ using React + Vite
