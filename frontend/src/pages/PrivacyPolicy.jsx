import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedPage from '../components/AnimatedPage';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <AnimatedPage>
      <Helmet>
        <title>Privacy Policy | Dental Inlet</title>
        <meta name="description" content="Dental Inlet's Privacy Policy. Learn how we collect, use, and protect your personal and health information in compliance with HIPAA." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section className="pt-40 pb-20 bg-secondary-light">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-black text-brand-teal mb-8 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-secondary-dark/40 uppercase tracking-widest font-bold text-xs mb-12">
              Last Updated: June 1, 2026
            </p>
          </motion.div>

          <div className="prose prose-lg max-w-none text-secondary-dark/70 font-light leading-relaxed space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-brand-teal">1. Introduction</h2>
              <p>Dental Inlet ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-teal">2. Information We Collect</h2>
              <p>We may collect personal information that you provide to us, such as:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, and phone number when you request an appointment.</li>
                <li>Health information you provide in the "notes" section of our booking form.</li>
                <li>Feedback and ratings you submit via our reviews section.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-teal">3. HIPAA Compliance</h2>
              <p>As a healthcare provider in the United States, we are subject to the Health Insurance Portability and Accountability Act (HIPAA). We maintain strict administrative, technical, and physical safeguards to protect your Protected Health Information (PHI). We do not share your health information with third parties for marketing purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-teal">4. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Schedule and manage your dental appointments.</li>
                <li>Communicate with you regarding your dental care.</li>
                <li>Improve our website and clinical services.</li>
                <li>Respond to your inquiries via our contact form.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-teal">5. Data Security</h2>
              <p>We implement industry-standard security measures to protect your data. However, please note that no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security of information transmitted to our website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-teal">6. Contact Us</h2>
              <p>If you have questions about this Privacy Policy or our data practices, please contact us at info@dentalinlet.com or at our clinic address in Corpus Christi, TX.</p>
            </section>
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
};

export default PrivacyPolicy;
