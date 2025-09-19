import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sun, Moon, X, Menu } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const Navbar = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    return (
        <motion.nav
            style={{ opacity: 1 }}
            className={`fixed top-0 w-full z-50 px-6 py-4 ${
                isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"
            } backdrop-blur-md border-b ${
                isDarkMode ? "border-gray-800" : "border-gray-200"
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo + Title */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => scrollSection("home")}
                >
                    <Code2 size={26} className="text-blue-500" />
                    <span
                        className={`text-lg font-semibold ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        Time to Progress
                    </span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {["Home", "Skills", "Work", "About", "Contact"].map(
                        (item, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ y: -2 }}
                                onClick={() => scrollSection(item.toLowerCase())}
                                className={`text-sm uppercase tracking-wider transition-colors ${
                                    isDarkMode
                                        ? "text-gray-400 hover:text-white"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                {item}
                            </motion.button>
                        )
                    )}

                    {/* Dark Mode Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                            toggleDarkMode(isDarkMode ? "light" : "dark")
                        }
                        className={`p-2 rounded-full transition-colors ${
                            isDarkMode
                                ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.button>
                </div>

                {/* Mobile menu buttons */}
                <div className="md:hidden flex items-center space-x-4">
                    {/* Dark Mode Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleDarkMode(isDarkMode ? "light" : "dark")}
                        className={`p-2 rounded-full transition-colors ${
                            isDarkMode
                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                        }`}
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.button>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-2 rounded-full transition-colors ${
                            isDarkMode
                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                        }`}
                    >
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>
            </div>

            {/* mobile menu*/}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className={`md:hidden mt-4 p-4 rounded-lg ${
                            isDarkMode ? "bg-gray-900" : "bg-white"
                        } border ${
                            isDarkMode ? "border-gray-800" : "border-gray-200"
                        }`}
                    >
                        {/* Mobile nav items go here */}
                        {["Home", "Skills", "Work", "About", "Contact"].map((item, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => scrollSection(item.toLowerCase())}
                                className={`block w-full text-left py-2 text-sm uppercase tracking-wider transition-colors ${
                                    isDarkMode
                                        ? "text-gray-300 hover:text-white"
                                        : "text-gray-700 hover:text-gray-900"
                                }`}
                            >
                                {item}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>



        </motion.nav>
    );
};

export default Navbar;
