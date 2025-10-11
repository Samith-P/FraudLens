import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './ScrollAnimatedSection.css';

/**
 * Reusable component for scroll-triggered animations
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.animation - Animation type (fade-up, fade-down, slide-left, slide-right, scale, etc.)
 * @param {number} props.delay - Animation delay in ms
 * @param {number} props.threshold - Intersection threshold (0-1)
 * @param {boolean} props.triggerOnce - Trigger animation only once
 * @param {string} props.className - Additional CSS classes
 */
const ScrollAnimatedSection = ({
  children,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  ...props
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce });

  return (
    <div
      ref={ref}
      className={`scroll-animated ${animation} ${isVisible ? 'visible' : ''} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollAnimatedSection;
