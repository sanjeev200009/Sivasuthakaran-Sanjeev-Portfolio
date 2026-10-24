import React, {useState} from 'react';
import {ThemeProvider} from "./context/ThemeContext.jsx";
import Preloader from "./components/Preloader.jsx";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/Sections/HeroSection.jsx";
import TrustedBuildersSection from "./components/Sections/TrustedBuildersSection.jsx";
import SkillSection from "./components/Sections/SkillSection.jsx";
import ProjectSection from './components/Sections/ProjectSection.jsx';
import AboutSection from './components/Sections/AboutSection.jsx';
import ContactSection from './components/Sections/ContactSection.jsx';
import Footer from './components/Footer.jsx';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <ThemeProvider>
            {isLoading && <Preloader onComplete={() => setIsLoading(false)}/>}
            <div
                className="min-h-screen"
                aria-hidden={isLoading ? "true" : undefined}
                inert={isLoading ? true : undefined}
            >
                    <Navbar/>
                    <HeroSection/>
                    <TrustedBuildersSection/>
                    <SkillSection/>
                    <ProjectSection/>
                    <AboutSection/>
                    <ContactSection/>
                    <Footer/>
                </div>
        </ThemeProvider>
    );
};
export default App;
