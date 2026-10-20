import {
    Code2,
    GraduationCap,
    Briefcase,
    Award,
    Rocket,
    Heart,
    Coffee,
    BookOpen,
    Zap,
    Database,
    Server,
    Cloud,
    Mail,
    MapPin,
    Phone,
    Linkedin, Twitter, Github
} from "lucide-react";

import { FiGithub, FiLinkedin, FiTwitter} from "react-icons/fi";

import {FaGithub, FaMedium, FaTwitter} from "react-icons/fa";

export const SKILLS_CATEGORIES = [
    {
        title: "Frontend Development",
        icon: Code2,
        description: "Crafting beautiful, responsive user interfaces",
        skills: [
            { name: "React", level: 95, color: "bg-blue-500" },
            { name: "TypeScript", level: 90, color: "bg-blue-600" },
            { name: "Next.js", level: 88, color: "bg-gray-800" },
            { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
            { name: "Framer Motion", level: 85, color: "bg-pink-600" },
        ],
    },
    {
        title: "Backend Development",
        icon: Server,
        description: "Building robust server-side applications",
        skills: [
            { name: "Node.js", level: 90, color: "bg-green-500" },
            { name: "Express.js", level: 88, color: "bg-gray-700" },
            { name: "Python", level: 85, color: "bg-yellow-500" },
            { name: "GraphQL", level: 80, color: "bg-pink-600" },
            { name: "REST APIs", level: 92, color: "bg-orange-500" },
        ],
    },
    {
        title: "Database Development",
        icon: Database,
        description: "Managing and optimizing data storage solutions",
        skills: [
            { name: "MySQL", level: 90, color: "bg-blue-500" },
            { name: "MongoDB", level: 88, color: "bg-green-600" },
            { name: "PostGreSQL", level: 85, color: "bg-indigo-500" },
            { name: "Firebase", level: 80, color: "bg-yellow-600" },
            { name: "SQL", level: 92, color: "bg-purple-500" },
        ],
    },
    {
        title: "DevOps",
        icon: Cloud,
        description: "Automating deployment and ensuring scalability",
        skills: [
            { name: "Docker", level: 90, color: "bg-blue-500" },
            { name: "AWS", level: 88, color: "bg-blue-600" },
            { name: "Vercel", level: 85, color: "bg-cyan-500" },
            { name: "Git", level: 80, color: "bg-pink-600" },
            { name: "CI/CD", level: 92, color: "bg-orange-500" },
        ],
    },
];

export const TECH_STACK = [
    "JavaScript",
    "HTML5",
    "CSS3",
    "Sass",
    "Webpack",
    "Vite",
    "Jest",
    "Cypress",
    "Figma",
    "Adobe XD",
    "Notion",
    "Slack",
];

export const STATS = [
    { number: "25+", label: "Projects Built", icon: Code2 },
    { number: "15+", label: "Happy Clients", icon: Heart },
    { number: "10+", label: "Live Websites", icon: Cloud },
    { number: "99%", label: "Performance Score", icon: Zap },
];

export const JOURNEY_STEPS = [
    {
        year: "2020",
        title: "Completed A/L in Engineering Technology",
        company: "Methodist Central College, Batticaloa",
        description: "Laid the foundation in problem-solving and analytical thinking through the Engineering Technology stream.",
        icon: GraduationCap,
        color: "bg-green-500",
    },
    {
        year: "2021",
        title: "Started Coding Journey",
        company: "Self-taught",
        description: "Began learning programming with HTML, CSS, JavaScript, and Java. Built small projects and explored software development fundamentals.",
        icon: Code2,
        color: "bg-blue-500",
    },
    {
        year: "2023",
        title: "BIT (Hons) in Network & Mobile Computing",
        company: "Horizon Campus",
        description: "Enrolled in undergraduate studies focusing on networking, mobile computing, and full-stack development.",
        icon: BookOpen,
        color: "bg-purple-500",
    },
    {
        year: "2024",
        title: "Web Development Training",
        company: "University of Moratuwa",
        description: "Completed structured web development training and strengthened the full-stack foundations that now support production product work.",
        icon: Rocket,
        color: "bg-orange-500",
    },
    {
        year: "2025",
        title: "Freelance Web & Mobile Developer",
        company: "Self-employed",
        description: "Delivered 5+ full-stack websites and mobile apps using React, Node.js, Firebase, and MongoDB. Improved client website performance and user experience.",
        icon: Briefcase,
        color: "bg-pink-500",
    }
];

export const PASSIONS = [
    {
        icon: Heart,
        title: "User Experience",
        description:"Crafting intuitive interfaces that users love",
    },
    {
        icon: Coffee,
        title: "Problem Solving",
        description:"Turning complex challenges into elegant solutions",
    },
    {
        icon: BookOpen,
        title: "Continuous Development",
        description: "Always exploring new technologies into web development solutions",
    }
];

export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: FaGithub,
        url: "https://github.com/sanjeev200009",
        color: "hover:text-gray-400",
        bgColor: "hover:bg-gray-800",
    },
    {
        name: "LinkedIn",
        icon: FiLinkedin,
        url: "http://www.linkedin.com/in/sivasuthakaran-sanjeev09",
        color: "hover:text-blue-400",
        bgColor: "hover:bg-blue-500/10",
    },
    {
        name: "Medium",
        icon: FaMedium,
        url: "https://medium.com/@sanjaysanjeev2000",
        color: "hover:text-black",
        bgColor: "hover:bg-gray-200/10",
    },
    {
        name: "Email",
        icon: Mail,
        url: "mailto:sanjaysanjeev2000@gmail.com",
        color: "hover:text-green-400",
        bgColor: "hover:bg-green-500/10",
    },
    {
        name: "Twitter",
        icon: FaTwitter,
        url: "https://twitter.com/sanjaysanjeev2000",
        color: "hover:text-sky-400",
        bgColor: "hover:bg-sky-500/10",
    },
];

export const REACT_APPLICATION = [
    {
        icon: MapPin,
        label: "Location",
        value: "Batticaloa, Sri Lanka",
    },
    {
        icon: Mail,
        label: "Email",
        value: "sanjaysanjeev2000@gmail.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+94 753 883 167",
    },
];
