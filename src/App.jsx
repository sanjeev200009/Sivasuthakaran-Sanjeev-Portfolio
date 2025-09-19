import React from 'react';
import {ThemeProvider} from "./context/ThemeContext.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/Sections/HeroSection.jsx";

const App = () => {
    return (
        <ThemeProvider>
            <div className="min-h-screen">
                <Navbar/>
                <HeroSection/>
            </div>
        </ThemeProvider>
    );
};
export default App;