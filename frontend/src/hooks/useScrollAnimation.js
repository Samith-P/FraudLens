import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-based animations
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin for intersection observer
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once
 * @returns {Object} - Ref and isVisible state
 */
export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        } else {
          // Reset animation when scrolling back (bidirectional support)
          if (!triggerOnce || !hasAnimated) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasAnimated]);

  return { ref, isVisible, hasAnimated };
};

/**
 * Hook for staggered children animations
 * @param {number} childrenCount - Number of children to animate
 * @param {number} staggerDelay - Delay between each child animation (ms)
 */
export const useStaggerAnimation = (childrenCount, staggerDelay = 100) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [visibleChildren, setVisibleChildren] = useState([]);

  useEffect(() => {
    if (isVisible && visibleChildren.length === 0) {
      // Trigger staggered animations
      for (let i = 0; i < childrenCount; i++) {
        setTimeout(() => {
          setVisibleChildren(prev => [...prev, i]);
        }, i * staggerDelay);
      }
    } else if (!isVisible) {
      setVisibleChildren([]);
    }
  }, [isVisible, childrenCount, staggerDelay, visibleChildren.length]);

  return { ref, visibleChildren, isVisible };
};

/**
 * Hook for scroll direction detection
 */
export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
};

/**
 * Hook for parallax scroll effect
 * @param {number} speed - Parallax speed factor
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const offsetValue = (scrolled - elementTop) * speed;
        setOffset(offsetValue);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return { ref, offset };
};
