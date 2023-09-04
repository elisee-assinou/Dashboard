import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-500 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">PowerCode</h2>
          <p className="text-sm">EPITECH-BENIN</p>
          <p className="text-sm">Cotonou, BENIN</p>
          <p className="text-sm">CODING ACADEMY</p>
          <p className="text-sm"></p>
        </div>
        <div className="text-center mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">CONTACTS</h2>
         
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">Suivez-nous</h2>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
