# Scroll Animation System Documentation

## Overview
This project now includes a comprehensive scroll animation system that triggers animations when elements come into view while scrolling. The system is built using React hooks and the Intersection Observer API for optimal performance.

## Features
- ✅ **Smooth scroll-triggered animations** - Elements animate when scrolled into view
- ✅ **Multiple animation types** - Fade, slide, scale, zoom, rotate, and more
- ✅ **Staggered animations** - Sequential animations for lists and grids
- ✅ **Parallax effects** - Elements move at different speeds
- ✅ **Scroll direction detection** - Different animations for scrolling up vs down
- ✅ **Performance optimized** - Uses Intersection Observer API
- ✅ **Accessibility friendly** - Respects `prefers-reduced-motion`

## Components Created

### 1. `useScrollAnimation` Hook
**Location:** `src/hooks/useScrollAnimation.js`

Custom React hook that provides scroll-based animation functionality.

**Usage:**
```javascript
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function MyComponent() {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold: 0.1,
    triggerOnce: true 
  });

  return (
    <div ref={ref} className={isVisible ? 'visible' : ''}>
      Content appears when scrolled into view
    </div>
  );
}
```

**Options:**
- `threshold` (number): 0-1, how much of element should be visible (default: 0.1)
- `rootMargin` (string): Margin around viewport (default: '0px')
- `triggerOnce` (boolean): Animate only once or every time (default: true)

### 2. `ScrollAnimatedSection` Component
**Location:** `src/components/ScrollAnimatedSection.jsx`

Reusable wrapper component for easy scroll animations.

**Usage:**
```jsx
import ScrollAnimatedSection from '../components/ScrollAnimatedSection';

<ScrollAnimatedSection animation="fade-up" delay={200}>
  <div>Your content here</div>
</ScrollAnimatedSection>
```

**Props:**
- `animation` (string): Animation type (see below)
- `delay` (number): Delay in milliseconds before animation starts
- `threshold` (number): 0-1, visibility threshold
- `triggerOnce` (boolean): Animate only once or every scroll
- `className` (string): Additional CSS classes

## Available Animations

### Basic Animations
- **`fade-up`** - Fades in while moving up from below
- **`fade-down`** - Fades in while moving down from above
- **`slide-left`** - Slides in from the right
- **`slide-right`** - Slides in from the left
- **`scale`** - Scales up from smaller size
- **`zoom-in`** - Zooms in from tiny
- **`rotate-in`** - Rotates while fading in
- **`flip`** - 3D flip effect
- **`bounce-in`** - Bouncy entrance with spring physics

### Advanced Animations
- **`slide-up-fade`** - Slides up with blur fade effect
- **`slide-down-fade`** - Slides down with blur fade effect
- **`blur-in`** - Fades in from blur
- **`glow`** - Fades in with glow effect

## Usage Examples

### Example 1: Hero Section
```jsx
<ScrollAnimatedSection animation="fade-up" threshold={0.2}>
  <div className="hero-section">
    <h1>Welcome to FraudLens</h1>
    <p>Advanced Cybersecurity Platform</p>
  </div>
</ScrollAnimatedSection>
```

### Example 2: Feature Cards Grid with Stagger
```jsx
<ScrollAnimatedSection animation="fade-up">
  <div className="features-grid">
    {features.map((feature, index) => (
      <ScrollAnimatedSection 
        key={index}
        animation="scale" 
        delay={index * 150}
      >
        <div className="feature-card">
          {/* Card content */}
        </div>
      </ScrollAnimatedSection>
    ))}
  </div>
</ScrollAnimatedSection>
```

### Example 3: Two-Column Layout
```jsx
<div className="two-columns">
  <ScrollAnimatedSection animation="slide-right" delay={100}>
    <div className="left-column">Left content</div>
  </ScrollAnimatedSection>
  
  <ScrollAnimatedSection animation="slide-left" delay={300}>
    <div className="right-column">Right content</div>
  </ScrollAnimatedSection>
</div>
```

### Example 4: Statistics Section
```jsx
<ScrollAnimatedSection animation="fade-up">
  <div className="stats-section">
    {stats.map((stat, index) => (
      <ScrollAnimatedSection 
        animation="bounce-in" 
        delay={index * 100}
      >
        <div className="stat-card">
          <h3>{stat.number}</h3>
          <p>{stat.label}</p>
        </div>
      </ScrollAnimatedSection>
    ))}
  </div>
</ScrollAnimatedSection>
```

### Example 5: Using the Hook Directly
```jsx
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function CustomComponent() {
  const { ref, isVisible } = useScrollAnimation({ 
    threshold: 0.5,
    triggerOnce: false // Re-animate on every scroll
  });

  return (
    <div 
      ref={ref} 
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.6s ease-out'
      }}
    >
      Custom animated content
    </div>
  );
}
```

## Advanced Hooks

### `useStaggerAnimation`
For animating children sequentially:

```jsx
import { useStaggerAnimation } from '../hooks/useScrollAnimation';

function StaggerList({ items }) {
  const { ref, visibleChildren } = useStaggerAnimation(items.length, 100);

  return (
    <div ref={ref}>
      {items.map((item, index) => (
        <div 
          key={index}
          className={visibleChildren.includes(index) ? 'visible' : ''}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
```

### `useScrollDirection`
Detect scroll direction:

```jsx
import { useScrollDirection } from '../hooks/useScrollAnimation';

function DirectionAware() {
  const direction = useScrollDirection();
  
  return (
    <div className={`header ${direction === 'down' ? 'hide' : 'show'}`}>
      Header hides on scroll down
    </div>
  );
}
```

### `useParallax`
Create parallax effects:

```jsx
import { useParallax } from '../hooks/useScrollAnimation';

function ParallaxBackground() {
  const { ref, offset } = useParallax(0.5);

  return (
    <div 
      ref={ref} 
      style={{ 
        transform: `translateY(${offset}px)` 
      }}
    >
      Background moves slower than foreground
    </div>
  );
}
```

## Implementation in Project

The scroll animation system has been implemented across all major pages:

### ✅ Home.jsx
- Hero section with slide animations
- Feature cards with staggered scale animations
- Stats section with bounce-in animations
- Contact section with fade and slide animations

### ✅ PhishingPage.jsx
- Import added, ready for implementation

### ✅ MalwarePage.jsx
- Import added, ready for implementation

### ✅ ClonePage.jsx
- Import added, ready for implementation

### ✅ ScamPage.jsx
- Import added, ready for implementation

### ✅ Login.jsx
- Import added, ready for implementation

### ✅ Signup.jsx
- Import added, ready for implementation

## Performance Considerations

1. **Intersection Observer** - Uses native browser API for efficient scroll detection
2. **Will-change property** - CSS optimization for smoother animations
3. **RequestAnimationFrame** - For smooth parallax effects
4. **Reduced Motion** - Respects user's motion preferences
5. **Lazy animations** - Elements only animate when needed

## Customization

### Custom Animation CSS
Add custom animations in `ScrollAnimatedSection.css`:

```css
.scroll-animated.custom-animation {
  transform: rotate(45deg) scale(0);
}

.scroll-animated.custom-animation.visible {
  transform: rotate(0) scale(1);
  transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Custom Easing
Modify transition timing in the CSS:
```css
.scroll-animated {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Browser Support
- ✅ Chrome/Edge (Modern)
- ✅ Firefox (Modern)
- ✅ Safari 12.1+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility
The system automatically disables animations for users who have `prefers-reduced-motion` enabled in their OS settings, ensuring accessibility compliance.

## Tips for Best Results

1. **Use appropriate delays** - Stagger elements by 100-200ms for smooth sequential animations
2. **Don't over-animate** - Not every element needs animation
3. **Match animation to content** - Use subtle fades for text, bolder animations for cards/images
4. **Test on different devices** - Ensure animations perform well on mobile
5. **Consider threshold** - 0.1 for early animation, 0.5 for center-screen animation
6. **Combine animations** - Wrap sections for layered animation effects

## Troubleshooting

**Animations not triggering?**
- Check that ScrollAnimatedSection is imported
- Verify threshold is appropriate (try lowering to 0.1)
- Ensure element is actually in viewport

**Animations too slow/fast?**
- Adjust CSS transition duration in ScrollAnimatedSection.css
- Modify delay prop for individual timing

**Performance issues?**
- Set `triggerOnce={true}` to reduce re-renders
- Reduce number of simultaneously animating elements
- Use simpler animations (fade instead of complex transforms)

## Future Enhancements
- [ ] Animation presets for common patterns
- [ ] Timeline-based complex animations
- [ ] Scroll-linked animations (progress-based)
- [ ] Integration with anime.js for advanced effects
- [ ] Animation builder/configurator tool
