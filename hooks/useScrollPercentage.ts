import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useScrollPercentage = (): number => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setScrollPercentage(self.progress * 100);
      },
    });

    return () => trigger.kill();
  }, []);

  return Math.round(scrollPercentage);
};

export default useScrollPercentage;
