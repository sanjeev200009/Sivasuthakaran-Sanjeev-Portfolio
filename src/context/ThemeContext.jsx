import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize from inline script decision to avoid flicker
    const initial = (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
        ? 'dark'
        : (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || 'dark';
    const [theme, setTheme] = useState(initial);

    const toggleDarkMode = (targetMode) => {
        setTheme((prev) => {
            if (typeof targetMode === "string") return targetMode;
            return prev === "dark" ? "light" : "dark";
        });
    };

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            root.style.setProperty('color-scheme', 'dark');
            root.style.backgroundColor = '#0a0a0a';
        } else {
            root.classList.remove("dark");
            root.style.setProperty('color-scheme', 'light');
            root.style.backgroundColor = '#f8fafc';
        }
        try {
            localStorage.setItem("theme", theme);
        } catch {
            // no-op
        }
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{ isDarkMode: theme === "dark", toggleDarkMode, theme }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
