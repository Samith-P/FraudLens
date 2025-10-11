/* ================================================
   ANIME.JS QUICK REFERENCE - FraudLens Animations
   ================================================ */

// Import Anime.js
import anime from 'animejs/lib/anime.es.js';

/* ===============================================
   BASIC SYNTAX
   =============================================== */

// Simple animation
anime({
  targets: '.element',
  translateX: 250,
  rotate: '1turn',
  duration: 800
});

// From-To animation
anime({
  targets: '.element',
  translateX: [-100, 0],  // From -100 to 0
  opacity: [0, 1],
  duration: 1000
});

/* ===============================================
   EASING FUNCTIONS (as used in FraudLens)
   =============================================== */

// Exponential - Smooth deceleration (for slides)
easing: 'easeOutExpo'

// Elastic - Bouncy effect (for cards/items)
easing: 'easeOutElastic(1, .6)'  // amplitude, period

// Quadratic - Smooth acceleration/deceleration
easing: 'easeInOutQuad'

/* ===============================================
   STAGGER - Sequential Animations
   =============================================== */

// Stagger with delay
anime({
  targets: '.feature-item',
  translateY: [60, 0],
  opacity: [0, 1],
  delay: anime.stagger(150)  // 150ms between each
});

// Stagger with start delay
anime({
  targets: '.button',
  opacity: [0, 1],
  delay: anime.stagger(150, {start: 400})  // Start after 400ms
});

/* ===============================================
   TRANSFORM PROPERTIES
   =============================================== */

// Translate
translateX: [value]  // Horizontal
translateY: [value]  // Vertical

// Scale
scale: [0.5, 1]  // From 50% to 100%

// Rotate
rotate: ['-180deg', '0deg']
rotate: '1turn'  // 360 degrees

// Combined
transform: ['translateY(20px) scale(0.8)', 'translateY(0) scale(1)']

/* ===============================================
   COMMON PATTERNS IN FRAUDLENS
   =============================================== */

// 1. Hero Text Animation
anime({
  targets: '.hero-text h1',
  translateX: [-100, 0],
  opacity: [0, 1],
  duration: 1200,
  easing: 'easeOutExpo'
});

// 2. Card Entrance (Bounce)
anime({
  targets: '.feature-item',
  translateY: [60, 0],
  scale: [0.8, 1],
  opacity: [0, 1],
  duration: 1200,
  easing: 'easeOutElastic(1, .6)'
});

// 3. Icon Rotation
anime({
  targets: '.icon',
  rotate: [0, 360],
  duration: 1000,
  easing: 'easeInOutQuad'
});

// 4. Staggered List Items
anime({
  targets: '.list-item',
  translateX: [-20, 0],
  opacity: [0, 1],
  duration: 600,
  delay: anime.stagger(100),
  easing: 'easeOutExpo'
});

// 5. Counter Animation
anime({
  targets: element,
  innerHTML: [0, targetValue],
  duration: 2000,
  easing: 'easeOutExpo',
  round: 1  // Round to whole numbers
});

// 6. Pulse Effect (Loop)
anime({
  targets: '.icon',
  scale: [1, 1.2, 1],
  duration: 1000,
  easing: 'easeInOutQuad',
  loop: 3
});

/* ===============================================
   CALLBACKS
   =============================================== */

anime({
  targets: '.element',
  opacity: [0, 1],
  duration: 1000,
  complete: function() {
    // Run after animation completes
    console.log('Animation done!');
  }
});

/* ===============================================
   INTERSECTION OBSERVER INTEGRATION
   =============================================== */

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo'
      });
    }
  });
};

const observer = new IntersectionObserver(observerCallback, {
  threshold: 0.1
});

observer.observe(element);

/* ===============================================
   TIMING PARAMETERS
   =============================================== */

duration: 1000        // Animation length in ms
delay: 500            // Delay before start
endDelay: 500         // Delay after end
loop: true            // Infinite loop
loop: 3               // Loop 3 times
direction: 'alternate' // Reverse on loop
autoplay: true        // Start immediately (default)

/* ===============================================
   PERFORMANCE TIPS
   =============================================== */

// 1. Use transform and opacity (GPU accelerated)
✅ translateX, translateY, scale, rotate, opacity
❌ left, top, width, height, margin

// 2. Avoid animating too many elements at once
// Use stagger to spread out the work

// 3. Clean up observers on unmount
return () => {
  observer.disconnect();
};

/* ===============================================
   COMBINING ANIMATIONS
   =============================================== */

// Slide + Fade + Scale
anime({
  targets: '.card',
  translateY: [60, 0],
  scale: [0.8, 1],
  opacity: [0, 1],
  duration: 1200,
  easing: 'easeOutElastic(1, .6)'
});

// Multi-element choreography
anime({
  targets: '.header',
  translateY: [-40, 0],
  opacity: [0, 1],
  duration: 1000,
  easing: 'easeOutExpo'
});

anime({
  targets: '.content',
  translateX: [-80, 0],
  opacity: [0, 1],
  duration: 1200,
  delay: 400,  // Start after header
  easing: 'easeOutExpo'
});

/* ===============================================
   USEFUL EASING CURVES
   =============================================== */

// Linear
'linear'

// Ease In/Out (Quad, Cubic, Quart, Quint)
'easeInQuad', 'easeOutQuad', 'easeInOutQuad'
'easeInCubic', 'easeOutCubic', 'easeInOutCubic'

// Exponential (Best for slides)
'easeInExpo', 'easeOutExpo', 'easeInOutExpo'

// Elastic (Best for bouncy effects)
'easeInElastic(amplitude, period)'
'easeOutElastic(1, .6)'  // Common in FraudLens

// Back (Overshoot)
'easeInBack', 'easeOutBack', 'easeInOutBack'

// Bounce
'easeInBounce', 'easeOutBounce', 'easeInOutBounce'

/* ===============================================
   CSS + ANIME.JS COORDINATION
   =============================================== */

// Set initial state in CSS
.element {
  opacity: 0;
  transform: translateY(50px);
}

// Animate with Anime.js
anime({
  targets: '.element',
  translateY: [50, 0],
  opacity: [0, 1],
  duration: 1000
});

// Hover effects stay in CSS for performance
.element:hover {
  transform: translateY(-10px);
  transition: transform 0.3s ease;
}

/* ===============================================
   RESOURCES
   =============================================== */

// Official Documentation
https://animejs.com/documentation/

// Easing Visualizer
https://easings.net/

// Examples and Demos
https://animejs.com/

// CDN (if not using npm)
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js"></script>
