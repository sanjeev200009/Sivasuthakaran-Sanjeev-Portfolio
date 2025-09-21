import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { JOURNEY_STEPS, PASSIONS, SOCIAL_LINKS } from "../../utils/data.js";
import { containerVariants, itemVariants } from "../../utils/Helper.js";

export default function AboutSection() {
  const { isDarkMode } = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  // Mission statement
  const missionText = `I believe technology should be a bridge that connects people and solves real-world problems. My passion lies in crafting digital experiences that are not just functional, but delightful and accessible to everyone.

When I'm not coding, you'll find me exploring new frameworks, contributing to open source, or mentoring aspiring developers. I love the constant evolution of web technologies and the endless possibilities they bring to create meaningful digital experiences.`;

  return (
    <section
      id="about"
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
            GET TO KNOW ME
          </p>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            About <span className="text-blue-500">Me</span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
        >
          {/* Left Side - Mission & Passion */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* My Mission */}
            <div
              className={`relative p-8 rounded-2xl border transition-colors ${
                isDarkMode
                  ? "bg-gray-900/60 border-gray-800"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
                >
                  <span className="text-white text-lg">🎯</span>
                </motion.div>
                <h3 className="text-xl font-semibold">My Mission</h3>
              </div>
              <div className="space-y-4 text-sm leading-relaxed">
                {missionText.split('\n\n').map((paragraph, index) => (
                  <p
                    key={index}
                    className={isDarkMode ? "text-gray-300" : "text-gray-600"}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* What I Love Building */}
            <div
              className={`p-8 rounded-2xl border transition-colors ${
                isDarkMode
                  ? "bg-gray-900/60 border-gray-800"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              <h3 className="text-xl font-semibold mb-6">What I Love Building</h3>
              <div className="grid gap-4">
                {PASSIONS.map((passion, index) => {
                  const IconComponent = passion.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-3 group cursor-pointer"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                          isDarkMode
                            ? "bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30"
                            : "bg-blue-500/10 text-blue-600 group-hover:bg-blue-500/20"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{passion.title}</h4>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {passion.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Signature */}
            <div className="text-center">
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Crafted with passion by
              </p>
              <div className="mt-2 space-y-1">
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Sivasuthakaran Sanjeev
                </p>
                <p className={`text-sm ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                  Full Stack Developer
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Developer Journey Timeline */}
          <motion.div variants={itemVariants}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">My Developer Journey</h3>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Always exploring new technologies and best practices
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-30 h-full" />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-8"
              >
                {JOURNEY_STEPS.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = index <= activeStep;
                  const isLastStep = index === JOURNEY_STEPS.length - 1;

                  return (
                    <div key={index} className="relative">
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        onHoverStart={() => setActiveStep(index)}
                        className={`relative z-10 flex items-start gap-6 p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                          isDarkMode
                            ? isActive 
                              ? "bg-gray-800 border border-gray-700 shadow-lg" 
                              : "bg-gray-900/95 hover:bg-gray-800"
                            : isActive
                              ? "bg-white border border-gray-200 shadow-lg"
                              : "bg-gray-50 hover:bg-white"
                        }`}
                      >
                        {/* Timeline Dot */}
                        <div className={`relative z-10 w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-7 h-7 text-white" />
                          {isActive && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                              className="absolute inset-0 rounded-full border-2 border-white/30"
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{step.title}</h4>
                            <span
                              className={`text-sm font-medium px-3 py-1 rounded-full ${
                                isDarkMode
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-blue-500/10 text-blue-600"
                              }`}
                            >
                              {step.year}
                            </span>
                          </div>
                          <p
                            className={`text-sm font-medium mb-2 ${
                              isDarkMode ? "text-blue-400" : "text-blue-600"
                            }`}
                          >
                            {step.company}
                          </p>
                          <p
                            className={`text-sm leading-relaxed ${
                              isDarkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {step.description}
                          </p>
                        </div>
                      </motion.div>

                      {/* Subtle Flow Arrow - Very Minimal */}
                      {!isLastStep && (
                        <div className="absolute left-7 -bottom-3 z-0 w-2 h-4 flex items-center justify-center">
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: [0, isDarkMode ? 0.15 : 0.3, 0] }}
                            transition={{ 
                              delay: 0.5 + index * 0.1,
                              duration: 4,
                              repeat: Infinity,
                              repeatDelay: 3
                            }}
                            viewport={{ once: false }}
                            className="w-0 h-0 border-l-[2px] border-r-[2px] border-t-[4px] border-l-transparent border-r-transparent"
                            style={{
                              borderTopColor: isDarkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.4)'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact & Social Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}