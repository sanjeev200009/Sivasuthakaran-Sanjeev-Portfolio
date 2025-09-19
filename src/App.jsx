import React from 'react';
import {ThemeProvider} from "./context/ThemeContext.jsx";
import Navbar from "./components/Sections/Navbar.jsx";

const App = () => {
    return (
        <ThemeProvider>
       <div>
           <Navbar/>
       </div>
        </ThemeProvider>
    );
};
export default App;