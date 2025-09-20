import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize from inline script decision to avoid flicker
    const initial = (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
        ? 'dark'
        : (localStorage.getItem('theme') || 'light');
    const [isDarkMode, toggleDarkMode] = useState(initial);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode === "dark") {
            root.classList.add("dark");
            root.style.setProperty('color-scheme', 'dark');
            root.style.backgroundColor = '#0a0a0a'; // gray-950
        } else {
            root.classList.remove("dark");
            root.style.setProperty('color-scheme', 'light');
            root.style.backgroundColor = '#f9fafb'; // gray-50
        }
        localStorage.setItem("theme", isDarkMode);
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider
            value={{ isDarkMode: isDarkMode === "dark", toggleDarkMode }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
