import React from 'react';
import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
} from 'lucide-react'; // Import social media icons

const Footer = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com', // Replace with actual Facebook URL
      icon: <Facebook className="h-6 w-6 text-white hover:text-blue-200 transition-colors" />,
    },
    {
      name: 'Twitter',
      url: 'https://www.twitter.com', // Replace with actual Twitter URL
      icon: <Twitter className="h-6 w-6 text-white hover:text-blue-200 transition-colors" />,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com', // Replace with actual Instagram URL
      icon: <Instagram className="h-6 w-6 text-white hover:text-pink-200 transition-colors" />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com',
      icon: <Linkedin className="h-6 w-6 text-white hover:text-blue-400 transition-colors" />,
    },
    {
      name: 'Mail',
      url: 'mailto:info@example.com',  // Replace with your email
      icon: <Mail className="h-6 w-6 text-white hover:text-green-200 transition-colors" />,
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="bg-gradient-to-r from-gray-900 to-black text-white py-8 md:py-12" // Modern dark gradient
      id="footer" >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-lg font-semibold">Connect With Us</p>
            <p className="text-gray-300 text-sm mt-2">
              Follow us on our social media channels for the latest updates and
              news.
            </p>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} ChatbotX. All rights reserved. |
          <a href="/privacy" className="hover:text-white ml-4 transition-colors">
            Privacy Policy
          </a>
          |
          <a href="/terms" className="hover:text-white ml-4 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
