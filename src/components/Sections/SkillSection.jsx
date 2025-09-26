import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.jsx";
import { SKILLS_CATEGORIES, TECH_STACK, STATS } from "../../utils/data.js";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function SkillBar({ name, level, color }) {
  const barRef = useRef(null);
  const { isDarkMode } = useTheme();
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}>{name}</span>
        <span className={`tabular-nums ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>{level}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        {/* Animated inner bar grows from 0 to target width when in view */}
        <motion.div
          ref={barRef}
          className={`h-2.5 rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          role="progressbar"
          aria-valuenow={level}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

function CategoryCard({ title, icon: Icon, description, skills, isDarkMode }) {
  return (
    <motion.div
      variants={itemVariants}
      className={`relative rounded-2xl border p-6 shadow-sm transition-colors ${
        isDarkMode ? "bg-gray-900/60 border-gray-800" : "bg-white/70 border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`grid h-10 w-10 place-items-center rounded-xl ${
            isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"
          }`}
        >
          {Icon ? <Icon size={20} /> : null}
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>{title}</h3>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{description}</p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {skills.map((s) => (
          <SkillBar key={s.name} name={s.name} level={s.level} color={s.color} />
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillSection() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="skills"
      className={`relative scroll-mt-20 md:scroll-mt-24 px-6 pt-6 md:pt-8 pb-16 transition-colors ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Heading */}
      <div className="mx-auto max-w-5xl text-center">
        <p className={`mb-2 text-xs tracking-[0.22em] ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          TECHNICAL EXPERTISE
        </p>
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
          <span>Skills &amp; </span>
          <span className="text-blue-500">Technologies</span>
        </h2>
        <p className={`mt-3 text-sm sm:text-base ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
          A comprehensive toolkit for building modern, scalable web applications from concept to deployment.
        </p>
      </div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2"
      >
        {SKILLS_CATEGORIES.map((cat) => (
          <CategoryCard key={cat.title} {...cat} isDarkMode={isDarkMode} />
        ))}
      </motion.div>

      {/* Also Working With */}
      <div className="mx-auto mt-12 max-w-5xl text-center">
        <h3 className={`text-sm sm:text-base font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
          Also Working With
        </h3>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-5 flex items-center gap-3 sm:gap-4 overflow-x-auto whitespace-nowrap -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap md:whitespace-normal md:justify-center scrollbar-none"
        >
          {TECH_STACK.map((tech) => (
            <motion.span
              key={tech}
              variants={itemVariants}
              className={`inline-flex px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm transition-colors shadow-sm border ${
                isDarkMode
                  ? "bg-gray-900/60 border-gray-800 text-gray-200 hover:border-gray-700"
                  : "bg-white/70 border-gray-200 text-gray-900 hover:border-gray-300"
              }`}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Stats Row */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto mt-10 max-w-6xl border-t border-gray-200 dark:border-gray-800 pt-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <motion.div key={s.label} variants={itemVariants} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-semibold text-blue-500">{s.number}</div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Subtle background gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-blue-500/5"
      />
    </section>
  );
}
