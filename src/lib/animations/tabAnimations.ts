import type { Variants } from 'framer-motion';

// Step tab animations
export const stepTabVariants: Variants = {
    enter: { opacity: 0, scale: 0.9, y: -10 },
    center: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 10 },
};

// Glow animation for active step
export const glowAnimation: Variants = {
    animate: {
        boxShadow: [
            '0 0 0 0 rgba(59, 130, 246, 0.4)',
            '0 0 0 10px rgba(59, 130, 246, 0)',
        ],
    },
};

export const glowTransition = {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
};

// Pulse animation for current step
export const pulseAnimation: Variants = {
    animate: {
        scale: [1, 1.05, 1],
    },
};

export const pulseTransition = {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut',
};

// Slide in from left
export const slideInFromLeft: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
};

// Slide in from right
export const slideInFromRight: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
};

// Fade in
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.3 },
    },
};

// Scale in
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
};

// Toast notification animation
export const toastAnimation: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
        opacity: 0,
        y: 20,
        scale: 0.9,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
};

// Progress bar animation
export const progressBarAnimation = {
    initial: { width: 0 },
    animate: (percentage: number) => ({
        width: `${percentage}%`,
        transition: { duration: 0.5, ease: 'easeOut' },
    }),
};
