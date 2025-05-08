import { useEffect } from 'react';

export const useScrollToSection = (sectionId) => {
  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sectionId]);
}; 