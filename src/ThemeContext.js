import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  // const [primaryColor, setPrimaryColor] = useState('#5271ff');
  // const [secondaryColor, setSecondaryColor] = useState('#FFFFFF');
  const [primaryColor, setPrimaryColor] = useState('#1a2b55');
  const [secondaryColor, setSecondaryColor] = useState('white');
  const [navbarHeight, setNavbarHeight] = useState(30);
  const [pathHeight, setPathbarHeight] = useState(30);
  const [apiLinks , setapiLinks] = useState('https://crystalsolutions.com.pk/complaint');
  
  // Toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Define theme-related values
  const theme = {
    isDarkMode,
    toggleTheme,
    primaryColor,
    secondaryColor,
    navbarHeight,
    pathHeight,
    apiLinks,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
