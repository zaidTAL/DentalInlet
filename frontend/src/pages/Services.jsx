import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import AnimatedPage from '../components/AnimatedPage';
import ServiceCard from '../components/ServiceCard';
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
  const { items: services } = useSelector((state) => state.services);
  const [filter, setFilter] = useState('all');

  const filteredServices = filter === 'all' 
    ? services 
    : services.filter(service => service.category === filter);

  return (
    <AnimatedPage>
      <Helmet>
        <title>Our Services | Dental Inlet — Full-Service Corpus Christi Dentist</title>
        <meta name="description" content="Explore all dental services at Dental Inlet in Corpus Christi, TX. From cleanings and braces to veneers, implants, and emergency care — we do it all." />
        <meta property="og:title" content="Dental Services | Dental Inlet Corpus Christi" />
        <meta property="og:description" content="Full-range dental services in Corpus Christi, TX including cleanings, invisible braces, veneers, implants, whitening, and more. Book your consultation today." />
      </Helmet>
      <section className="pt-40 pb-20 bg-secondary-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-brand-teal mb-8 tracking-tight">
              Our <span className="italic text-brand-blue font-normal font-serif">Services.</span>
            </h1>
            <p className="text-xl text-secondary-dark/60 max-w-2xl leading-relaxed font-light">
              From routine maintenance to complex restorative work, we offer a full range of dental services tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Category Filter */}

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode='popLayout'>
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredServices.length === 0 && (
            <div className="text-center py-20">
              <p className="text-secondary-dark/40 text-xl font-light">No services found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Services;
