import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  MapPin, 
  Mail, 
  Phone, 
  Calendar,
  X,
  User,
  MessageSquare,
  CalendarDays,
  Clock,
  Star,
  CheckCircle
} from "lucide-react";
import { EMAIL_CONFIG } from '../../config/emailjs.js';
import { useTheme } from "../../context/ThemeContext.jsx";
import { SOCIAL_LINKS, REACT_APPLICATION } from "../../utils/data.js";
import { containerVariants, itemVariants } from "../../utils/Helper.js";

export default function ContactSection() {
  const { isDarkMode } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    message: ''
  });

  // Form handlers for contact form
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Web3Forms - Simple and reliable email service
      console.log('Sending email via Web3Forms...');
      
      const formData = new FormData();
      formData.append('access_key', EMAIL_CONFIG.ACCESS_KEY || 'demo'); // Use demo for testing
      formData.append('name', contactForm.name);
      formData.append('email', contactForm.email);
      formData.append('message', contactForm.message);
      formData.append('subject', 'New Portfolio Contact from ' + contactForm.name);
      formData.append('from_name', contactForm.name);
      
      // Send to Web3Forms API
      const response = await fetch(EMAIL_CONFIG.API_URL, {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        console.log('Email sent successfully via Web3Forms!');
        
        // Show success popup
        setShowSuccessPopup(true);
        setContactForm({ name: '', email: '', message: '' });
        
        // Hide success popup after 3 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 3000);
      } else {
        throw new Error(result.message || 'Failed to send email');
      }

    } catch (error) {
      console.error('Error sending email:', error);
      alert('Sorry, there was an error sending your message. Please try again or contact me directly at sanjaysanjeev2000@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form handlers for schedule modal
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    console.log('Schedule Form Data:', scheduleForm);
    alert('Thank you! I\'ll get back to you within 24 hours to confirm the meeting.');
    setIsModalOpen(false);
    setScheduleForm({ name: '', email: '', date: '', time: '', message: '' });
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <section
      id="contact"
      className={`relative scroll-mt-16 md:scroll-mt-20 px-6 py-16 md:py-24 transition-colors ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <p
            className={`mb-2 text-xs tracking-[0.22em] uppercase ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            LET'S CONNECT
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Get In <span className="text-blue-500">Touch</span>
          </h2>
          <p
            className={`mt-4 text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Ready to start your next project? Let's discuss how we can bring your ideas to life.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left Side - Contact Form */}
          <motion.div variants={itemVariants}>
            <div
              className={`p-8 rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-900/60 border-gray-800"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold mb-6">Send me a message</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      required
                      placeholder="Your Name"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                      placeholder="Email Address"
                      className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows={4}
                    placeholder="Your Message"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full px-6 py-3 rounded-lg font-medium shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      SENDING...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      SEND MESSAGE
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right Side - Contact Info & Social */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Information */}
            <div
              className={`p-8 rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-950/60 border-gray-800"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {REACT_APPLICATION.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-500/10 text-blue-600"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {info.label}
                        </p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Follow Me */}
            <div
              className={`p-8 rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-900/60 border-gray-800"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold mb-6">Follow Me</h3>
              <div className="grid grid-cols-2 gap-4">
                {SOCIAL_LINKS.slice(0, 4).map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 ${
                        isDarkMode
                          ? "bg-gray-700/60 border-gray-600 hover:border-gray-500 hover:bg-gray-700"
                          : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm font-medium">{social.name}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Availability Status */}
              <div
                className={`mt-6 p-4 rounded-lg ${
                  isDarkMode ? "bg-green-500/10 border border-green-500/20" : "bg-green-50 border border-green-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div>
                    <h4 className={`font-medium ${isDarkMode ? "text-green-400" : "text-green-700"}`}>
                      Available for work
                    </h4>
                    <p className={`text-xs ${isDarkMode ? "text-green-300" : "text-green-600"}`}>
                      I'm currently available for freelance projects and full-time opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Schedule a Call Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className={`p-8 rounded-2xl border text-center ${
              isDarkMode
                ? "bg-gray-950/60 border-gray-800"
                : "bg-white/80 border-gray-200"
            }`}
          >
            <div className="mb-6">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-500/10 text-blue-600"
                }`}
              >
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prefer a quick call?</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Sometimes a conversation is worth a thousand messages. Feel free to schedule a call
                to discuss your project.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openModal}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 mb-4"
            >
              Schedule a Call
            </motion.button>

            <div className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
              Or email me directly at{" "}
              <a
                href="mailto:sanjaysanjeev2000@gmail.com"
                className={`font-medium ${isDarkMode ? "text-blue-400" : "text-blue-600"} hover:underline`}
              >
                sanjaysanjeev2000@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`max-w-sm w-full rounded-2xl p-8 shadow-2xl text-center ${
                isDarkMode ? "bg-gray-950 border border-gray-700" : "bg-white border border-gray-200"
              }`}
            >
              {/* Star Animation */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                className="relative mx-auto mb-4"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" }
                  }}
                  className="w-16 h-16 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                >
                  <Star className="w-8 h-8 text-white fill-white" />
                </motion.div>
                
                {/* Sparkle effects */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1, 0], 
                      opacity: [0, 1, 0],
                      x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                      y: [0, Math.sin(i * 60 * Math.PI / 180) * 40]
                    }}
                    transition={{ 
                      delay: 0.5 + i * 0.1,
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
                  />
                ))}
              </motion.div>

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", duration: 0.5 }}
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-500/10 text-green-600"
                }`}
              >
                <CheckCircle className="w-6 h-6" />
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="text-xl font-bold mb-2">Thank You! ✨</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Your message has been sent successfully! I'll get back to you within 24 hours.
                </p>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 2 }}
                className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule Call Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className={`w-full max-w-md rounded-2xl p-6 shadow-2xl ${
                isDarkMode ? "bg-gray-950 border border-gray-700" : "bg-white border border-gray-200"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-500/10 text-blue-600"
                  }`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold">Schedule a Call</h3>
                </div>
                <button
                  onClick={closeModal}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isDarkMode ? "hover:bg-gray-800 text-gray-400" : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Full Name
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-3 w-4 h-4 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`} />
                    <input
                      type="text"
                      name="name"
                      value={scheduleForm.name}
                      onChange={handleScheduleChange}
                      required
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-colors ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-3 w-4 h-4 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`} />
                    <input
                      type="email"
                      name="email"
                      value={scheduleForm.email}
                      onChange={handleScheduleChange}
                      required
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-colors ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Date and Time Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Preferred Date
                    </label>
                    <div className="relative">
                      <CalendarDays className={`absolute left-3 top-3 w-4 h-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`} />
                      <input
                        type="date"
                        name="date"
                        value={scheduleForm.date}
                        onChange={handleScheduleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Time
                    </label>
                    <div className="relative">
                      <Clock className={`absolute left-3 top-3 w-4 h-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`} />
                      <input
                        type="time"
                        name="time"
                        value={scheduleForm.time}
                        onChange={handleScheduleChange}
                        required
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-colors ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-600 text-white focus:border-blue-500"
                            : "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Message (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className={`absolute left-3 top-3 w-4 h-4 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`} />
                    <textarea
                      name="message"
                      value={scheduleForm.message}
                      onChange={handleScheduleChange}
                      rows={3}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-colors resize-none ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      placeholder="Tell me about your project or what you'd like to discuss..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 mt-6"
                >
                  Send Request
                </motion.button>
              </form>

              {/* Footer Note */}
              <p className={`text-xs text-center mt-4 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                I'll get back to you within 24 hours to confirm the meeting details.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}