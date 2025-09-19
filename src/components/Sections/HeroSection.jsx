import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion"

import {
    ArrowDown,
    Mail,
} from "lucide-react"

import { FiGithub, FiLinkedin } from "react-icons/fi"
import { useTheme } from "../../context/ThemeContext.jsx";

import PROFILE_PIC from "../../assets/images/profile.jpg"

function HeroSection() {
    const { isDarkMode } = useTheme();
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, -100]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
            },
        },
    };

    const imageVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.5,
            },
        },
    };

    return (
        <div
            className={`min-h-screen transition-all duration-500 ${
                isDarkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
            }`}
        >
            {/* hero section */}
            <motion.section id="home" style={{ y: heroY }} className="min-h-screen flex items-center justify-center relative px-6 pt-10 ">
                <div className="absolute inset-0 overflow-hidden ">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className={`absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${
                            isDarkMode ? "bg-blue-500" : "bg-blue-400"
                        }`}
                    />
                    <motion.div
                        animate={{
                            scale: [1.1, 1, 1.1],
                            rotate: [360, 180, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className={`absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl opacity-10 ${
                            isDarkMode ? "bg-purple-500" : "bg-purple-400"
                        }`}
                    />
                </div>

                <div className="max-w-7xl mx-auto w-full z-10 mt-20">
                    {/* mobile layout - Centered */}
                    <div className="block lg:hidden">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="text-center"
                        >
                            {/* Profile Image - Mobile */}
                            <motion.div variants={imageVariants} className="mb-8">
                                <div className="w-32 h-32 mx-auto relative">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className={`w-full h-32 rounded-2xl overflow-hidden border-4 ${
                                            isDarkMode ? "border-gray-800" : "border-gray-300"
                                        } shadow-2xl`}
                                    >
                                        <img
                                            src={PROFILE_PIC}
                                            alt="profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>

                                    {/* Decorative ring */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="absolute -inset-2 rounded-2xl border border-blue-500/20"
                                    />
                                    {/* Second rotating ring */}
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{
                                            duration: 30,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        className="absolute -inset-4 rounded-2xl border border-purple-500/10"
                                    />
                                    {/* Tech stack overlay - Mobile */}
                                    <div
                                        className={`absolute -top-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-xs shadow-md pointer-events-none ${
                                            isDarkMode
                                                ? "bg-gray-900/80 text-gray-200"
                                                : "bg-white/80 text-gray-700"
                                        }`}
                                    >
                                        <span>React</span>
                                        <span className={isDarkMode ? "text-gray-500" : "text-gray-400"}>•</span>
                                        <span>Node.js</span>
                                        <span className={isDarkMode ? "text-gray-500" : "text-gray-400"}>•</span>
                                        <span>TypeScript</span>
                                        <span className={isDarkMode ? "text-gray-500" : "text-gray-400"}>•</span>
                                        <span>MongoDB</span>
                                    </div>
                                    {/* Animated blobs behind photo - Mobile */}
                                    <motion.div
                                        aria-hidden
                                        className={`absolute -top-3 -left-3 w-16 h-16 rounded-full blur-2xl opacity-30 ${
                                            isDarkMode ? "bg-blue-500" : "bg-blue-400"
                                        }`}
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 6, repeat: Infinity }}
                                        style={{ zIndex: 0 }}
                                    />
                                    <motion.div
                                        aria-hidden
                                        className={`absolute -bottom-3 -right-3 w-14 h-14 rounded-full blur-2xl opacity-30 ${
                                            isDarkMode ? "bg-purple-500" : "bg-purple-400"
                                        }`}
                                        animate={{ scale: [1.1, 1, 1.1] }}
                                        transition={{ duration: 7, repeat: Infinity }}
                                        style={{ zIndex: 0 }}
                                    />
                                </div>
                            </motion.div>


                            <motion.div
                                variants={textVariants}
                                className={`text-5xl uppercase tracking-widest ${
                                    isDarkMode ? "text-gray-500" : "text-gray-600"
                                } mb-4`}
                            >
                                Full stack Developer
                            </motion.div>

                        <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-light mb-6 leading-tight">
                            <span
                                className={`${
                                    isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                            >
                                Building digital
                            </span>
                            <span className="text-blue-500 font-medium ml-2"> experiences</span>
                            <br />
                            <span
                                className={`${
                                    isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                            >
                                that matter
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className={`text-base md:text-lg ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            } mb-8 max-w-xl mx-auto font-light leading-relaxed`}
                        >
                            I craft beautiful, functional web applications with
                            modern technologies and thoughtful user experiences.
                        </motion.p>

                        {/* CTA - Buttons - Mobile */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 ">
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => scrollToSection("work")}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300"
                            >
                                View Work
                            </motion.button>
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => scrollToSection("contact")}
                                className={`border ${
                                    isDarkMode
                                        ? "border-gray-700 hover:border-gray-600 text-gray-300"
                                        : "border-gray-300 hover:border-gray-400 text-gray-700"
                                } px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300`}
                            >
                                Get in Touch
                            </motion.button>
                            <a
                                href="/cv.pdf"
                                download
                                className={`inline-flex items-center justify-center px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                                    isDarkMode
                                        ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                }`}
                            >
                                Download CV
                            </a>
                        </motion.div>

                        {/* Social links - mobile*/}
                        <motion.div variants={itemVariants} className="flex justify-center space-x-6 mb-8 ">
                            {[
                                { icon: FiGithub, href: "#" },
                                { icon: FiLinkedin, href: "#" },
                                { icon: Mail, href: "#" },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    className={`p-3 rounded-full transition-colors ${
                                        isDarkMode
                                            ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                                    }`}
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* Motivation line - mobile*/}
                        <motion.div
                            variants={itemVariants}
                            className="flex justify-center items-center gap-6 text-xs uppercase text-center flex-wrap"
                        >
                            <span className={isDarkMode ? "text-gray-500" : "text-gray-600"}>
                                Design Responsively
                            </span>
                            <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>•</span>
                            <span className={isDarkMode ? "text-gray-500" : "text-gray-600"}>
                                Build Consistently
                            </span>
                            <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>•</span>
                            <span className={isDarkMode ? "text-gray-500" : "text-gray-600"}>
                                Ship Confidently
                            </span>
                        </motion.div>

                        {/* end of mobile text-center container */}
                    </motion.div>

                    </div>

                    {/* desktop layout - Two columns */}
                    <div className="hidden lg:grid grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="space-y-6"
                        >
                            <motion.div
                                variants={textVariants}
                                className={`text-2xl uppercase tracking-widest ${
                                    isDarkMode ? "text-gray-500" : "text-gray-600"
                                }`}
                            >
                                Full stack Developer
                            </motion.div>

                            <motion.h1
                                variants={itemVariants}
                                className="text-5xl xl:text-6xl font-light leading-tight"
                            >
                                <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                                    Building digital
                                </span>
                                <span className="text-blue-500 font-medium ml-2">experiences</span>
                                <br />
                                <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                                    that matter
                                </span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className={`text-lg ${
                                    isDarkMode ? "text-gray-300" : "text-gray-700"
                                } max-w-xl font-light leading-relaxed`}
                            >
                                I craft beautiful, functional web applications with modern
                                technologies and thoughtful user experiences.
                            </motion.p>

                            <motion.div
                                variants={itemVariants}
                                className="flex flex-wrap items-center gap-4"
                            >
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => scrollToSection("work")}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300"
                                >
                                    View Work
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => scrollToSection("contact")}
                                    className={`border ${
                                        isDarkMode
                                            ? "border-gray-700 hover:border-gray-600 text-gray-300"
                                            : "border-gray-300 hover:border-gray-400 text-gray-700"
                                    } px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300`}
                                >
                                    Get in Touch
                                </motion.button>
                                <a
                                    href="/cv.pdf"
                                    download
                                    className={`inline-flex items-center justify-center px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                                        isDarkMode
                                            ? "bg-gray-800 hover:bg-gray-700 text-gray-100"
                                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                    }`}
                                >
                                    Download CV
                                </a>
                            </motion.div>

                            {/* Social links under buttons - Desktop */}
                            <motion.div variants={itemVariants} className="flex items-center gap-3 mt-4">
                                {[
                                    { icon: FiGithub, href: "#" },
                                    { icon: FiLinkedin, href: "#" },
                                    { icon: Mail, href: "#" },
                                ].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        whileHover={{ y: -3, scale: 1.1 }}
                                        className={`p-3 rounded-full transition-colors ${
                                            isDarkMode
                                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                                        }`}
                                    >
                                        <social.icon size={20} />
                                    </motion.a>
                                ))}
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                className="flex items-center gap-6 text-xs uppercase tracking-widest flex-wrap"
                            >
                                <span className={isDarkMode ? "text-gray-500" : "text-gray-600"}>
                                    Design Responsively
                                </span>
                                <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>•</span>
                                <span className={isDarkMode ? "text-gray-500" : "text-gray-600"}>
                                    Build Consistently
                                </span>
                                <span className={isDarkMode ? "text-gray-700" : "text-gray-400"}>•</span>
                                <span className={isDarkMode ? "text-gray-500" : "text-gray-600"}>
                                    Ship Confidently
                                </span>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="flex justify-end"
                        >
                            <motion.div variants={imageVariants} className="relative">
                                {/* Tech stack overlay - Desktop */}
                                <div
                                    className={`absolute -top-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-1.5 rounded-full text-xs shadow-md pointer-events-none ${
                                        isDarkMode
                                            ? "bg-gray-900/80 text-gray-200"
                                            : "bg-white/80 text-gray-700"
                                    }`}
                                >
                                    <span>React</span>
                                    <span className={isDarkMode ? "text-gray-500" : "text-gray-400"}>•</span>
                                    <span>Node.js</span>
                                    <span className={isDarkMode ? "text-gray-500" : "text-gray-400"}>•</span>
                                    <span>TypeScript</span>
                                    <span className={isDarkMode ? "text-gray-500" : "text-gray-400"}>•</span>
                                    <span>MongoDB</span>
                                </div>
                                <div
                                    className={`w-[22rem] h-[22rem] xl:w-[26rem] xl:h-[26rem] rounded-2xl overflow-hidden border-4 shadow-2xl ${
                                        isDarkMode ? "border-gray-800" : "border-gray-300"
                                    }`}
                                >
                                    <img
                                        src={PROFILE_PIC}
                                        alt="profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Animated blobs behind photo - Desktop */}
                                <motion.div
                                    aria-hidden
                                    className={`absolute -top-6 -left-6 w-24 h-24 rounded-full blur-3xl opacity-30 ${
                                        isDarkMode ? "bg-blue-500" : "bg-blue-400"
                                    }`}
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 8, repeat: Infinity }}
                                    style={{ zIndex: 0 }}
                                />
                                <motion.div
                                    aria-hidden
                                    className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full blur-3xl opacity-30 ${
                                        isDarkMode ? "bg-purple-500" : "bg-purple-400"
                                    }`}
                                    animate={{ scale: [1.1, 1, 1.1] }}
                                    transition={{ duration: 9, repeat: Infinity }}
                                    style={{ zIndex: 0 }}
                                />
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-3 rounded-2xl border border-blue-500/20"
                                />
                                {/* Second rotating ring - Desktop */}
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                                    className="absolute -inset-5 rounded-2xl border border-purple-500/10"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <ArrowDown
                        size={20}
                        className={isDarkMode ? "text-gray-600" : "text-gray-400"}
                        />

                </motion.div>
            </motion.section>
        </div>
    );
}

export default HeroSection;
