import type { TemplateConfig } from '@/lib/types/cv.types';

export const ModernTemplate: TemplateConfig = {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, professional modern design with gradient accents',
    layout: 'single-column',
    colors: {
        primary: '#1f2937',
        secondary: '#6b7280',
        accent: '#3b82f6',
        text: '#111827',
        background: '#ffffff',
        border: '#e5e7eb',
    },
    typography: {
        headingSize: '1.8rem',
        bodySize: '0.95rem',
        accentColor: '#3b82f6',
    },
    spacing: {
        sectionGap: '1.5rem',
        lineHeight: '1.6',
        marginTop: '0.5rem',
    },
    features: {
        includePhoto: true,
        includeATS: true,
        includeLanguages: true,
        supportRTL: true,
        darkModeSupport: true,
    },
};

export const ClassicTemplate: TemplateConfig = {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional professional layout with serif fonts',
    layout: 'two-column',
    colors: {
        primary: '#000000',
        secondary: '#4b5563',
        accent: '#059669',
        text: '#1f2937',
        background: '#ffffff',
        border: '#d1d5db',
    },
    typography: {
        headingSize: '1.6rem',
        bodySize: '0.9rem',
        accentColor: '#059669',
    },
    spacing: {
        sectionGap: '1.2rem',
        lineHeight: '1.5',
        marginTop: '0.4rem',
    },
    features: {
        includePhoto: true,
        includeATS: false,
        includeLanguages: true,
        supportRTL: true,
        darkModeSupport: false,
    },
};

export const MinimalTemplate: TemplateConfig = {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design with maximum whitespace',
    layout: 'single-column',
    colors: {
        primary: '#0f172a',
        secondary: '#64748b',
        accent: '#8b5cf6',
        text: '#1e293b',
        background: '#ffffff',
        border: '#cbd5e1',
    },
    typography: {
        headingSize: '1.5rem',
        bodySize: '0.9rem',
        accentColor: '#8b5cf6',
    },
    spacing: {
        sectionGap: '2rem',
        lineHeight: '1.7',
        marginTop: '0.6rem',
    },
    features: {
        includePhoto: false,
        includeATS: true,
        includeLanguages: true,
        supportRTL: true,
        darkModeSupport: true,
    },
};
