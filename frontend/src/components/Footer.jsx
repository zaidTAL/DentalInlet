import React from 'react';
import inletLogo from '../assets/inletLogo.jpeg';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope } from 'react-icons/hi2';

const Footer = () => {
  return (
    <footer className="bg-brand-teal text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={inletLogo} alt="Dental Inlet" className="w-10 h-10 object-cover rounded-full" />
            <span className="font-serif font-bold text-lg tracking-tight">Dental Inlet</span>
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Providing expert, compassionate dental care to the Corpus Christi community.
          </p>
          {/* <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-teal transition-all">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-teal transition-all">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-teal transition-all">
              <FaTwitter size={18} />
            </a>
          </div> */}
        </div>

        <div className="space-y-6">
          <h4 className="font-serif text-lg font-bold">Quick Links</h4>
          <ul className="space-y-4">
            {['Home', 'Services', 'About', 'Reviews', 'Book Now', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-white/60 hover:text-brand-blue text-sm transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-serif text-lg font-bold">Services</h4>
          <ul className="space-y-4">
            {[
              { name: 'Dental Cleaning', slug: 'dental-cleaning' },
              { name: 'Invisible Braces', slug: 'invisible-braces' },
              { name: 'Veneers / Dental Jewellery', slug: 'veneers' },
              { name: 'Dentures', slug: 'dentures' },
              { name: 'Dental Implants', slug: 'dental-implants' },
              { name: 'Teeth Whitening', slug: 'teeth-whitening' },
              { name: 'Wisdom Teeth Extraction', slug: 'wisdom-teeth-extraction' },
              { name: 'Laughing Gas Sedation', slug: 'laughing-gas-sedation' }
            ].map((service) => (
              <li key={service.slug}>
                <Link to={`/services/${service.slug}`} className="text-white/60 hover:text-brand-blue text-sm transition-colors">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="font-serif text-lg font-bold">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm text-white/60">
              <HiOutlineMapPin className="text-brand-blue flex-shrink-0" size={18} />
              <span>5792 Weber Rd, Corpus Christi, TX 78413</span>
            </li>
            <li className="flex gap-3 text-sm text-white/60">
              <HiOutlinePhone className="text-brand-blue flex-shrink-0" size={18} />
              <span>(361) 878-5628</span>
            </li>
            <li className="flex gap-3 text-sm text-white/60">
              <HiOutlineEnvelope className="text-brand-blue flex-shrink-0" size={18} />
              <span>info@dentalinlet.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/40 text-xs">
          © 2026 Dental Inlet. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link to="/privacy-policy" className="text-white/40 hover:text-white text-xs transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-white/40 hover:text-white text-xs transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
