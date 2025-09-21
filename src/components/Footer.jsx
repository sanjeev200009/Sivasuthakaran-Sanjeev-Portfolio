import React from "react";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { SOCIAL_LINKS } from "../utils/data.js";

const Footer = () => {
  const { isDarkMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative py-12 border-t ${
      isDarkMode 
        ? "bg-gray-950 border-gray-800 text-gray-300" 
        : "bg-gray-50 border-gray-200 text-gray-700"
    }`}>
      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700"
            : "bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-200 shadow-lg"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ArrowUp size={20} />
      </motion.button>

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Profile section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          {/* Name and title */}
          <div className="mb-4">
            <h3 className={`text-2xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Sivasuthakaran Sanjeev
            </h3>
            <p className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Crafting digital experiences with passion, precision, and a touch of magic.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {SOCIAL_LINKS.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border border-gray-700"
                      : "bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-200 shadow-sm hover:shadow-md"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <IconComponent size={20} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Divider with heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-8"
        >
          <div className={`h-px flex-1 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-300"
          }`}></div>
          <motion.div
            className="mx-4 p-2"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Heart 
              size={20} 
              className="text-red-500 fill-red-500" 
            />
          </motion.div>
          <div className={`h-px flex-1 ${
            isDarkMode ? "bg-gray-800" : "bg-gray-300"
          }`}></div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <p className={`text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}>
            © {currentYear} Time To Program. All rights reserved.
          </p>
          <p className={`text-xs ${
            isDarkMode ? "text-gray-500" : "text-gray-400"
          }`}>
            Built with React & Framer Motion • Designed with care
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;