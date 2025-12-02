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

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
