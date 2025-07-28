import React from 'react';
import styled from 'styled-components';
import { getButtonColors } from '../../utils/buttonColors';

const StyledWrapper = styled.div`
  button {
   --glow-color: ${props => props.glowColor || 'rgb(209, 38, 197)'};
   --glow-spread-color: ${props => props.glowSpreadColor || 'rgba(209, 38, 197, 0.781)'};
   --enhanced-glow-color: ${props => props.enhancedGlowColor || 'rgb(231, 38, 219)'};
   --btn-color: ${props => props.btnColor || 'rgb(100, 20, 90)'};
   border: .25em solid var(--glow-color);
   padding: 1em 3em;
   color: var(--glow-color);
   font-size: 15px;
   font-weight: bold;
   background-color: var(--btn-color);
   border-radius: 1em;
   outline: none;
   box-shadow: 0 0 1em .25em var(--glow-color),
          0 0 4em 1em var(--glow-spread-color),
          inset 0 0 .75em .25em var(--glow-color);
   text-shadow: 0 0 .5em var(--glow-color);
   position: relative;
   transition: all 0.3s;
   cursor: pointer;
  }

  button::after {
   pointer-events: none;
   content: "";
   position: absolute;
   top: 120%;
   left: 0;
   height: 100%;
   width: 100%;
   background-color: var(--glow-spread-color);
   filter: blur(2em);
   opacity: .7;
   transform: perspective(1.5em) rotateX(35deg) scale(1, .6);
  }

  button:hover {
   color: var(--btn-color);
   background-color: var(--glow-color);
   box-shadow: 0 0 1em .25em var(--glow-color),
          0 0 4em 2em var(--glow-spread-color),
          inset 0 0 .75em .25em var(--glow-color);
  }

  button:active {
   box-shadow: 0 0 0.6em .25em var(--glow-color),
          0 0 2.5em 2em var(--glow-spread-color),
          inset 0 0 .5em .25em var(--glow-color);
  }
`;

const GlowingButton = ({ 
  children, 
  onClick, 
  type = "button",
  glowColor,
  glowSpreadColor,
  enhancedGlowColor,
  btnColor,
  theme = 'pink'
}) => {
  // Get theme colors if no custom colors provided
  const themeColors = getButtonColors(theme);
  const finalColors = {
    glowColor: glowColor || themeColors.glowColor,
    glowSpreadColor: glowSpreadColor || themeColors.glowSpreadColor,
    enhancedGlowColor: enhancedGlowColor || themeColors.enhancedGlowColor,
    btnColor: btnColor || themeColors.btnColor
  };

  return (
    <StyledWrapper {...finalColors}>
      <button type={type} onClick={onClick}>
        {children}
      </button>
    </StyledWrapper>
  );
};

export default GlowingButton; 