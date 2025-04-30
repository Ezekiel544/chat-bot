import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import IMG from './asset/chatbot-icon.png';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const menuLinks = [
    { name: 'home', target: 'hero' }, 
    { name: 'features', target: 'features' },
    { name: 'about', target: 'about' },
    { name: 'contact', target: 'footer' }, 
  ];

  // Define your color options - add more if you like
  const bgOptions = {
    white: 'bg-white',
    lightBlue: 'bg-blue-100',
    gradientBlue: 'bg-gradient-to-r from-blue-100 to-purple-100',
    gray: 'bg-gray-100',
  };

  const [bgColor, setBgColor] = useState(bgOptions.white); // Default background

  return (
    <motion.nav
      className={`${bgColor} fixed w-full shadow-md z-50`} // Use dynamic class
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center py-2 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600 cursor-pointer">
          <img src={IMG} alt="chatbot-icon" width={60} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              to={link.target} // Use the target property
              smooth={true}
              duration={500}
              spy={true}
              offset={link.target === 'footer' ? 0 : -70} // Adjusted offset for footer
              activeClass="text-blue-600 font-bold"
              className="cursor-pointer text-gray-700 hover:text-blue-600 transition font-medium"
            >
              {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg z-40 md:hidden overflow-y-auto"
          >
            {/* Cancel (X) button inside the menu */}
            <div className="flex justify-end p-6">
              <button onClick={toggleMenu} className="text-gray-700">
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col items-center space-y-8 mt-10">
              {menuLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.target}  // Use the target property
                    smooth={true}
                    duration={500}
                    spy={true}
                    offset={link.target === 'footer' ? 0 : -70} //  Adjusted offset for footer
                    activeClass="text-blue-600 font-bold"
                    className="cursor-pointer text-gray-700 hover:text-blue-600 transition text-xl font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
