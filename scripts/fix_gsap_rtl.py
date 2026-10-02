import re

with open('src/components/shared/motion/GsapMotion.tsx', 'r') as f:
    content = f.read()

# Fix StaggerTiltLeftOnView
old_tilt_left = """    const ctx = gsap.context(() => {
      // prepare transform origin for a subtle pivot effect
      gsap.set(items, {
        transformOrigin: "left center",
        willChange: "transform, opacity",
      });

      // create individual triggers so each card aimates as it scrolls into view
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -80, rotate: -6 },
          {
            opacity: 1,
            x: 0,
            rotate: 0,"""
new_tilt_left = """    const ctx = gsap.context(() => {
      const isRTL = typeof window !== 'undefined' && window.getComputedStyle(el).direction === 'rtl';
      const dirMultiplier = isRTL ? -1 : 1;
      
      // prepare transform origin for a subtle pivot effect
      gsap.set(items, {
        transformOrigin: isRTL ? "right center" : "left center",
        willChange: "transform, opacity",
      });

      // create individual triggers so each card aimates as it scrolls into view
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -80 * dirMultiplier, rotate: -6 * dirMultiplier },
          {
            opacity: 1,
            x: 0,
            rotate: 0,"""
content = content.replace(old_tilt_left, new_tilt_left)

# Fix StaggerTiltBottomLeftOnScroll
old_bottom_left = """    const ctx = gsap.context(() => {
      items.forEach((item, _index) => {
        gsap.set(item, {
          transformOrigin: "left bottom",
          willChange: "transform, opacity",
          force3D: true,
          opacity: 1, // Start invisible
          x: -150,
          y: 80,
          scale: 0.6,
        });

        gsap.fromTo(
          item,
          {
            opacity: 1, // Start from invisible
            x: -120,
            y: 80,
            scale: 0.6,
            skewY: 8,
          },
          {
            opacity: 1, // Fade in slowly
            x: 0,"""
new_bottom_left = """    const ctx = gsap.context(() => {
      const isRTL = typeof window !== 'undefined' && window.getComputedStyle(el).direction === 'rtl';
      const dirMultiplier = isRTL ? -1 : 1;
      
      items.forEach((item, _index) => {
        gsap.set(item, {
          transformOrigin: isRTL ? "right bottom" : "left bottom",
          willChange: "transform, opacity",
          force3D: true,
          opacity: 1, // Start invisible
          x: -150 * dirMultiplier,
          y: 80,
          scale: 0.6,
        });

        gsap.fromTo(
          item,
          {
            opacity: 1, // Start from invisible
            x: -120 * dirMultiplier,
            y: 80,
            scale: 0.6,
            skewY: 8 * dirMultiplier,
          },
          {
            opacity: 1, // Fade in slowly
            x: 0,"""
content = content.replace(old_bottom_left, new_bottom_left)

# Fix StaggerSlideInCards
old_slide_in = """    const ctx = gsap.context(() => {
      // set initial state for all cards
      gsap.set(cards, {
        transformOrigin: "center center",
        willChange: "transform, opacity",
        opacity: 0,
        x: -100,
        scale: 0.8,
        rotateY: -20,
      });

      // create staggered animation
      gsap.to(cards, {
        opacity: 1,
        x: 0,"""
new_slide_in = """    const ctx = gsap.context(() => {
      const isRTL = typeof window !== 'undefined' && window.getComputedStyle(el).direction === 'rtl';
      const dirMultiplier = isRTL ? -1 : 1;
      
      // set initial state for all cards
      gsap.set(cards, {
        transformOrigin: "center center",
        willChange: "transform, opacity",
        opacity: 0,
        x: -100 * dirMultiplier,
        scale: 0.8,
        rotateY: -20 * dirMultiplier,
      });

      // create staggered animation
      gsap.to(cards, {
        opacity: 1,
        x: 0,"""
content = content.replace(old_slide_in, new_slide_in)

with open('src/components/shared/motion/GsapMotion.tsx', 'w') as f:
    f.write(content)

print("GsapMotion updated!")
