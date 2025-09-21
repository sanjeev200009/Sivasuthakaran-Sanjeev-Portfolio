import React from 'react';
import {ThemeProvider} from "./context/ThemeContext.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/Sections/HeroSection.jsx";
import SkillSection from "./components/Sections/SkillSection.jsx";
import ProjectSection from './components/Sections/ProjectSection.jsx';
import AboutSection from './components/Sections/AboutSection.jsx';
const App = () => {
    return (
        <ThemeProvider>
            <div className="min-h-screen">
                <Navbar/>
                <HeroSection/>
                <SkillSection/>
                <ProjectSection/>
                <AboutSection/>
            </div>
        </ThemeProvider>
    );
};
export default App;