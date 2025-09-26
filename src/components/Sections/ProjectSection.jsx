import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { PROJECTS, STATS } from "../../utils/data.js";
import { containerVariants, itemVariants } from "../../utils/Helper.js";

export default function ProjectSection() {
  const { isDarkMode } = useTheme();

  // Use the actual project images from data.js
  const projects = PROJECTS ?? [];

  return (
    <section
      id="work"
      className={`relative scroll-mt-16 md:scroll-mt-20 px-6 pt-8 md:pt-12 pb-16 transition-colors ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
  <div className="mx-auto max-w-5xl text-center">
        <p
          className={`mb-2 text-xs tracking-[0.22em] ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          SELECTED PROJECTS
        </p>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Things I’ve <span className="text-blue-500">built recently</span>
        </h2>
        <p
          className={`mt-3 text-sm sm:text-base ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          A mix of mobile, web, and desktop apps using modern stacks.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-10 grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {projects.map((proj) => (
          <motion.article
            key={proj.id}
            variants={itemVariants}
            className={`group relative overflow-hidden rounded-2xl border shadow-sm transition-colors ${
              isDarkMode
                ? "bg-gray-900/60 border-gray-800 hover:border-gray-700"
                : "bg-white/80 border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Image */}
            <div className="relative p-4">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-5">
              <h3 className="text-lg font-semibold">{proj.title}</h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } mt-2 text-sm leading-relaxed min-h-[3.5rem]`}
              >
                {proj.description}
              </p>

              {/* Tech stack */}
              <div className="mt-3 -mx-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap px-2 md:mx-0 md:px-0 md:flex-wrap md:whitespace-normal">
                {proj.tags?.map((t) => (
                  <span
                    key={t}
                    className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                      isDarkMode
                        ? "bg-gray-900/60 border-gray-800 text-gray-200"
                        : "bg-white/70 border-gray-200 text-gray-700"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover overlay with actions */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="pointer-events-auto absolute inset-0 flex items-center justify-center">
                <div className="flex gap-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <a
                    href={proj.liveURL || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a
                    href={proj.githubURL || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 hover:border-white transition-all duration-200 transform hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    GitHub Repo
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Statistics Section */}
      <div className="mx-auto mt-16 max-w-4xl">
        <div className="text-center mb-8">
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Want to see more of my work?
          </p>
          <button
            className={`mt-3 inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-medium transition-colors ${
              isDarkMode
                ? "border-gray-700 bg-gray-900/60 text-gray-200 hover:border-gray-600 hover:bg-gray-800/80"
                : "border-gray-300 bg-white/80 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            VIEW ALL PROJECTS
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {STATS.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                    isDarkMode
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-blue-500/10 text-blue-600"
                  }`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div
                  className={`text-2xl md:text-3xl font-bold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.number}
                </div>
                <div
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Subtle gradient decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-blue-500/5"
      />
    </section>
  );
}
