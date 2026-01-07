// ============================================
// CV Builder - Type Definitions
// ============================================

export interface ContactSection {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    website: string;
    photoUrl: string; // ✅ URL فقط
    photoBase64?: string; // Temporary only, NOT persisted
}

export interface PersonalStatementSection {
    summary: string;
    aiGenerated: boolean;
    aiModel: 'groq' | 'openai';
}

export interface WorkHistoryEntry {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string; // YYYY-MM
    endDate: string | null;
    description: string;
    isCurrentRole: boolean;
    atsKeywords?: string[];
}

export interface EducationEntry {
    id: string;
    degree: string;
    school: string;
    field: string;
    startDate: string;
    endDate: string;
    grade?: string;
}

export interface SkillEntry {
    id: string;
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
    atsScore?: number;
}

export interface LanguageEntry {
    id: string;
    name: string;
    level: 'native' | 'fluent' | 'intermediate' | 'basic';
    levelScore: 1 | 2 | 3 | 4 | 5;
}

export interface QualificationEntry {
    id: string;
    title: string;
    issuer: string;
    date: string;
    credentialUrl?: string;
}

export interface ReferenceEntry {
    id: string;
    name: string;
    position: string;
    company: string;
    email: string;
    phone: string;
}

export interface ATSScore {
    overall: number;
    breakdown: {
        keywords: number;
        completeness: number;
        formatting: number;
        experience: number;
    };
    missingKeywords: string[];
    suggestions: string[];
    lastCalculated: number;
}

export interface CVMetadata {
    activeStep: number; // 0-8
    selectedTemplate: 'modern' | 'classic' | 'minimal';
    themeColor: string;
    language: 'en' | 'fr' | 'ar';
    lastSaved: number;
    version: number;
}

export interface CVSections {
    contact: ContactSection;
    personalStatement: PersonalStatementSection;
    workHistory: WorkHistoryEntry[];
    education: EducationEntry[];
    skills: SkillEntry[];
    languages: LanguageEntry[];
    qualifications: QualificationEntry[];
    references: ReferenceEntry[];
}

export interface CVStoreState {
    metadata: CVMetadata;
    sections: CVSections;
    atsScore: ATSScore;

    // Actions
    updateSection: <K extends keyof CVSections>(
        section: K,
        data: Partial<CVSections[K]>
    ) => void;

    addToArray: <K extends keyof Pick<CVSections, 'workHistory' | 'education' | 'skills' | 'languages' | 'qualifications' | 'references'>>(
        section: K,
        item: any
    ) => void;

    removeFromArray: <K extends keyof Pick<CVSections, 'workHistory' | 'education' | 'skills' | 'languages' | 'qualifications' | 'references'>>(
        section: K,
        id: string
    ) => void;

    updateArrayItem: <K extends keyof Pick<CVSections, 'workHistory' | 'education' | 'skills' | 'languages' | 'qualifications' | 'references'>>(
        section: K,
        id: string,
        data: any
    ) => void;

    setMetadata: (data: Partial<CVMetadata>) => void;
    setPhotoTemporary: (base64: string) => void;
    setPhotoUrl: (url: string) => void;
    recalculateATS: () => void;
    reset: () => void;
    loadFromSupabase: (data: any) => void;
}

// Template Types
export interface TemplateConfig {
    id: 'modern' | 'classic' | 'minimal';
    name: string;
    description: string;
    layout: 'single-column' | 'two-column';
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        text: string;
        background: string;
        border: string;
    };
    typography: {
        headingSize: string;
        bodySize: string;
        accentColor: string;
    };
    spacing: {
        sectionGap: string;
        lineHeight: string;
        marginTop: string;
    };
    features: {
        includePhoto: boolean;
        includeATS: boolean;
        includeLanguages: boolean;
        supportRTL: boolean;
        darkModeSupport: boolean;
    };
}

export interface CVPreviewProps {
    data: CVSections;
    config: TemplateConfig;
    atsScore: ATSScore;
}
