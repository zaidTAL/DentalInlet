import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import inletLogo from '../assets/inletLogo.jpeg';
import { logout } from '../store/slices/authSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navLinks = isAuthenticated 
    ? [
        { name: 'Dashboard', href: '/doctor-portal' },
        { name: 'Services', href: '/services' },
        { name: 'About', href: '/about' },
      ]
    : [
        { name: 'Services', href: '/services' },
        { name: 'About', href: '/about' },
        { name: 'Reviews', href: '/ratings-reviews' },
        { name: 'Contact', href: '/contact' },
      ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-lg border-b border-black/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={inletLogo} alt="Dental Inlet" className="w-10 h-10 object-cover rounded-full transition-transform group-hover:scale-110" />
          <span className="font-serif font-bold text-lg text-brand-teal tracking-tight">Dental Inlet</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.href} 
                className="text-[0.8rem] uppercase tracking-widest text-secondary-dark/60 hover:text-brand-blue transition-colors font-medium"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="bg-brand-orange text-white px-6 py-2.5 rounded-full text-[0.8rem] uppercase tracking-widest font-semibold hover:bg-brand-teal transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/book-now" 
                className="bg-brand-teal text-white px-6 py-2.5 rounded-full text-[0.8rem] uppercase tracking-widest font-semibold hover:bg-brand-blue transition-all transform hover:-translate-y-0.5"
              >
                Book a Visit
              </Link>
            )}
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-brand-teal" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-black/5 md:hidden"
          >
            <ul className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-lg font-medium text-secondary-dark hover:text-brand-blue block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                {isAuthenticated ? (
                  <button 
                    onClick={handleLogout}
                    className="w-full bg-brand-orange text-white text-center py-3 rounded-xl font-semibold transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <Link 
                    to="/book-now" 
                    className="bg-brand-teal text-white block text-center py-3 rounded-xl font-semibold hover:bg-brand-blue transition-colors"
                  >
                    Book a Visit
                  </Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
