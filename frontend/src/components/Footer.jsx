import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Section Liens */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/offers" className="text-gray-400 hover:text-white">Find an Alternation</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-white">Community</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Section Ressources */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Section Réseaux sociaux */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">LinkedIn</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Wolf Street. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
