import React, { createContext, useContext, useState, useEffect } from 'react';

const ColorThemeContext = createContext();

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
};

export const ColorThemeProvider = ({ children }) => {
  const [themeColors, setThemeColors] = useState({
    primary: 'rgb(209, 38, 197)',
    secondary: 'rgb(0, 212, 255)',
    accent: 'rgb(255, 0, 179)'
  });

  // Function to generate matching glow colors
  const generateGlowColors = (baseColor) => {
    // Parse RGB values
    const rgbMatch = baseColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (!rgbMatch) return null;

    const [, r, g, b] = rgbMatch.map(Number);
    
    return {
      glowColor: baseColor,
      glowSpreadColor: `rgba(${r}, ${g}, ${b}, 0.781)`,
      enhancedGlowColor: `rgb(${Math.min(255, r + 22)}, ${Math.min(255, g + 22)}, ${Math.min(255, b + 22)})`,
      btnColor: `rgb(${Math.max(0, r - 109)}, ${Math.max(0, g - 18)}, ${Math.max(0, b - 107)})`
    };
  };

  // Function to detect background gradient colors
  const detectBackgroundColors = () => {
    // You can customize this to detect different background patterns
    // For now, we'll use the pink-to-cyan gradient from your card
    const gradientColors = [
      'rgb(255, 0, 179)',  // Pink
      'rgba(0, 212, 255, 1)'  // Cyan
    ];
    
    return gradientColors;
  };

  useEffect(() => {
    const colors = detectBackgroundColors();
    if (colors.length > 0) {
      setThemeColors({
        primary: colors[0],
        secondary: colors[1],
        accent: colors[0]
      });
    }
  }, []);

  const getGlowColors = (colorType = 'primary') => {
    const baseColor = themeColors[colorType];
    return generateGlowColors(baseColor) || {
      glowColor: 'rgb(209, 38, 197)',
      glowSpreadColor: 'rgba(209, 38, 197, 0.781)',
      enhancedGlowColor: 'rgb(231, 38, 219)',
      btnColor: 'rgb(100, 20, 90)'
    };
  };

  const value = {
    themeColors,
    getGlowColors,
    setThemeColors
  };

  return (
    <ColorThemeContext.Provider value={value}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export default ColorThemeProvider; 