// Button color configuration - modify these to change all button colors
export const buttonColors = {
  // Pink theme (matches your card)
  pink: {
    glowColor: 'rgb(209, 38, 197)',
    glowSpreadColor: 'rgba(209, 38, 197, 0.781)',
    enhancedGlowColor: 'rgb(231, 38, 219)',
    btnColor: 'rgb(100, 20, 90)'
  },
  
  // Cyan theme (alternative)
  cyan: {
    glowColor: 'rgb(0, 212, 255)',
    glowSpreadColor: 'rgba(0, 212, 255, 0.781)',
    enhancedGlowColor: 'rgb(22, 234, 255)',
    btnColor: 'rgb(0, 100, 120)'
  },
  
  // Purple theme
  purple: {
    glowColor: 'rgb(138, 43, 226)',
    glowSpreadColor: 'rgba(138, 43, 226, 0.781)',
    enhancedGlowColor: 'rgb(160, 65, 248)',
    btnColor: 'rgb(60, 20, 100)'
  },
  
  // Green theme
  green: {
    glowColor: 'rgb(0, 255, 127)',
    glowSpreadColor: 'rgba(0, 255, 127, 0.781)',
    enhancedGlowColor: 'rgb(22, 255, 149)',
    btnColor: 'rgb(0, 100, 50)'
  }
};

// Default theme (change this to switch all buttons)
export const defaultTheme = 'pink';

// Get colors for current theme
export const getButtonColors = (theme = defaultTheme) => {
  return buttonColors[theme] || buttonColors.pink;
}; 