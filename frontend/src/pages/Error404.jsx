import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';
import { HiOutlineHome, HiOutlineArrowLeft } from 'react-icons/hi2';

const Error404 = () => {
  return (
    <AnimatedPage>
      <Helmet>
        <title>404 — Page Not Found | Dental Inlet</title>
        <meta name="description" content="The page you are looking for doesn't exist or has been moved. Let's get you back to your smile." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="min-h-screen flex items-center justify-center bg-secondary-light px-6">
        <div className="text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[12rem] font-black text-brand-teal/5 leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
          >
            404
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-black text-brand-teal mb-6 tracking-tight italic font-serif">
              Lost in the<br />clouds?
            </h1>
            <p className="text-xl text-secondary-dark/50 mb-12 font-light leading-relaxed">
              The page you are looking for doesn't exist or has been moved. Let's get you back to your smile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="inline-flex items-center justify-center gap-2 bg-brand-teal text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-brand-blue transition-all shadow-xl"
              >
                <HiOutlineHome size={20} /> Back to Home
              </Link>
              <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-teal text-brand-teal px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-brand-teal hover:text-white transition-all"
              >
                <HiOutlineArrowLeft size={20} /> Previous Page
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Error404;
