import type { CVSections, CVMetadata, ATSScore } from '../types/cv.types';

export const defaultContact = {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: '',
    photoUrl: '',
};

export const defaultPersonalStatement = {
    summary: '',
    aiGenerated: false,
    aiModel: 'groq' as const,
};

export const defaultMetadata: CVMetadata = {
    activeStep: 0,
    selectedTemplate: 'modern',
    themeColor: '#3b82f6',
    language: 'en',
    lastSaved: Date.now(),
    version: 1,
};

export const defaultATSScore: ATSScore = {
    overall: 0,
    breakdown: {
        keywords: 0,
        completeness: 0,
        formatting: 0,
        experience: 0,
    },
    missingKeywords: [],
    suggestions: [],
    lastCalculated: Date.now(),
};

export const defaultSections: CVSections = {
    contact: defaultContact,
    personalStatement: defaultPersonalStatement,
    workHistory: [],
    education: [],
    skills: [],
    languages: [],
    qualifications: [],
    references: [],
};

export const defaultCVState = {
    metadata: defaultMetadata,
    sections: defaultSections,
    atsScore: defaultATSScore,
};
