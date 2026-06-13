import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import BookNow from './pages/BookNow';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService'; // New
import Error404 from './pages/Error404';
import DoctorPortal from './pages/DoctorPortal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetails />} />
          <Route path="book-now" element={<BookNow />} />
          <Route path="ratings-reviews" element={<Reviews />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} /> {/* New */}
          
          {/* Doctor Protected Route */}
          <Route 
            path="doctor-portal" 
            element={
              <ProtectedRoute>
                <DoctorPortal />
              </ProtectedRoute>
            } 
          />

          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;
