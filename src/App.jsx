import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Booking from './components/Booking';
import Memberships from './components/Memberships';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';
import WelcomePopup from './components/WelcomePopup';
import ChatWidget from './components/ChatWidget';
import ScrollProgress from './components/ScrollProgress';
import CursorFollower from './components/CursorFollower';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollProgress />
        <CursorFollower />
        <Navbar />
        <Hero />
        <Gallery />
        <Services />
        <Booking />
        <Memberships />
        <Blog />
        <Contact />
        <Footer />
        <Toast />
        <WelcomePopup />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
