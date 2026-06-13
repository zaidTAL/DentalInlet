import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <AnimatedPage>
      <Helmet>
        <title>Terms of Service | Dental Inlet</title>
        <meta name="description" content="Dental Inlet's Terms of Service. Understand the terms governing your use of our website and dental services in Corpus Christi, TX." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="pt-40 pb-20 bg-secondary-light">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-brand-teal mb-8 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-secondary-dark/40 uppercase tracking-widest font-bold text-xs mb-12">
              Last Updated: June 1, 2026
            </p>
          </motion.div>

          <div className="prose prose-lg max-w-none text-secondary-dark/70 font-light leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-brand-teal">1. Acceptance of Terms</h2>
              <p>By accessing and using the website of Dental Inlet ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site or services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-teal">2. Not Medical Advice</h2>
              <p>The content on this website, including text, graphics, and images, is for informational purposes only. It is not intended to be a substitute for professional medical or dental advice, diagnosis, or treatment. Always seek the advice of your dentist or other qualified health provider with any questions you may have regarding a medical condition.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-teal">3. Appointment Policy</h2>
              <p>Requests for appointments made through our website are subject to confirmation by our staff. We reserve the right to cancel or reschedule appointments. Please provide at least 24 hours notice for any cancellations to avoid potential fees.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-teal">4. Limitation of Liability</h2>
              <p>In no event shall Dental Inlet be liable for any damages arising out of the use or inability to use the materials on this website, even if we have been notified of the possibility of such damage.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-teal">5. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of the State of Texas, United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that State.</p>
            </section>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default TermsOfService;
