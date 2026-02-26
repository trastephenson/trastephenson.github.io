import React, { createContext, useContext } from 'react';
import useVirtualScroll from '../hooks/useVirtualScroll';

const ScrollContext = createContext(null);

export function ScrollProvider({ children, viewMode = '3d' }) {
  const scroll = useVirtualScroll({ enabled: viewMode === '3d' });

  return (
    <ScrollContext.Provider value={scroll}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
}

export default ScrollContext;
