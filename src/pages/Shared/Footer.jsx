import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} <span className="text-orange-500 font-medium">JARVIS</span> • Academic Management System
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;