import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { CVStoreState, CVSections } from '@/lib/types/cv.types';
import { defaultCVState } from '@/lib/defaults/cvDefaults';

// Debounced Supabase sync (3 seconds)
let supabaseSyncTimeout: NodeJS.Timeout | null = null;
const syncToSupabase = (state: any) => {
    if (supabaseSyncTimeout) {
        clearTimeout(supabaseSyncTimeout);
    }

    supabaseSyncTimeout = setTimeout(() => {
        console.log('🔄 Syncing to Supabase (debounced 3s):', {
            metadata: state.metadata,
            sectionsCount: {
                workHistory: state.sections.workHistory.length,
                education: state.sections.education.length,
                skills: state.sections.skills.length,
            },
        });
        // TODO: Actual Supabase sync will be implemented later
    }, 3000);
};

// ATS Score Calculator
const calculateATSScore = (sections: CVSections) => {
    const { contact, personalStatement, workHistory, education, skills } = sections;

    // Completeness score (0-100)
    let completeness = 0;
    if (contact.fullName) completeness += 10;
    if (contact.email) completeness += 10;
    if (contact.phone) completeness += 10;
    if (personalStatement.summary) completeness += 15;
    if (workHistory.length > 0) completeness += 20;
    if (education.length > 0) completeness += 15;
    if (skills.length > 0) completeness += 20;

    // Keywords score (based on skills and work history)
    const keywordCount = skills.length + workHistory.reduce((acc, job) => {
        return acc + (job.atsKeywords?.length || 0);
    }, 0);
    const keywords = Math.min(100, keywordCount * 5);

    // Formatting score (always 100 for now)
    const formatting = 100;

    // Experience score
    const experience = Math.min(100, workHistory.length * 25);

    // Overall score
    const overall = Math.round(
        (completeness * 0.3) + (keywords * 0.3) + (formatting * 0.2) + (experience * 0.2)
    );

    // Missing keywords suggestions
    const missingKeywords: string[] = [];
    if (skills.length < 5) missingKeywords.push('Add more skills');
    if (workHistory.length === 0) missingKeywords.push('Add work experience');
    if (!personalStatement.summary) missingKeywords.push('Add professional summary');

    return {
        overall,
        breakdown: {
            keywords,
            completeness,
            formatting,
            experience,
        },
        missingKeywords,
        suggestions: missingKeywords,
        lastCalculated: Date.now(),
    };
};

export const useCVStore = create<CVStoreState>()(
    persist(
        (set, get) => ({
            ...defaultCVState,

            // Update a section
            updateSection: (section, data) => {
                set((state) => {
                    const newState = {
                        ...state,
                        sections: {
                            ...state.sections,
                            [section]: Array.isArray(state.sections[section])
                                ? state.sections[section]
                                : { ...state.sections[section], ...data },
                        },
                        metadata: {
                            ...state.metadata,
                            lastSaved: Date.now(),
                        },
                    };

                    syncToSupabase(newState);
                    return newState;
                });
            },

            // Add item to array section
            addToArray: (section, item) => {
                set((state) => {
                    const newItem = { ...item, id: item.id || uuidv4() };
                    const newState = {
                        ...state,
                        sections: {
                            ...state.sections,
                            [section]: [...(state.sections[section] as any[]), newItem],
                        },
                        metadata: {
                            ...state.metadata,
                            lastSaved: Date.now(),
                        },
                    };

                    syncToSupabase(newState);
                    return newState;
                });
            },

            // Remove item from array section
            removeFromArray: (section, id) => {
                set((state) => {
                    const newState = {
                        ...state,
                        sections: {
                            ...state.sections,
                            [section]: (state.sections[section] as any[]).filter(
                                (item: any) => item.id !== id
                            ),
                        },
                        metadata: {
                            ...state.metadata,
                            lastSaved: Date.now(),
                        },
                    };

                    syncToSupabase(newState);
                    return newState;
                });
            },

            // Update item in array section
            updateArrayItem: (section, id, data) => {
                set((state) => {
                    const newState = {
                        ...state,
                        sections: {
                            ...state.sections,
                            [section]: (state.sections[section] as any[]).map((item: any) =>
                                item.id === id ? { ...item, ...data } : item
                            ),
                        },
                        metadata: {
                            ...state.metadata,
                            lastSaved: Date.now(),
                        },
                    };

                    syncToSupabase(newState);
                    return newState;
                });
            },

            // Set metadata
            setMetadata: (data) => {
                set((state) => ({
                    ...state,
                    metadata: {
                        ...state.metadata,
                        ...data,
                        lastSaved: Date.now(),
                    },
                }));
            },

            // Set photo temporarily (not persisted)
            setPhotoTemporary: (base64) => {
                set((state) => ({
                    ...state,
                    sections: {
                        ...state.sections,
                        contact: {
                            ...state.sections.contact,
                            photoBase64: base64,
                        },
                    },
                }));
            },

            // Set photo URL (persisted)
            setPhotoUrl: (url) => {
                set((state) => {
                    const newState = {
                        ...state,
                        sections: {
                            ...state.sections,
                            contact: {
                                ...state.sections.contact,
                                photoUrl: url,
                                photoBase64: undefined, // Clear temporary
                            },
                        },
                        metadata: {
                            ...state.metadata,
                            lastSaved: Date.now(),
                        },
                    };

                    syncToSupabase(newState);
                    return newState;
                });
            },

            // Recalculate ATS score
            recalculateATS: () => {
                set((state) => ({
                    ...state,
                    atsScore: calculateATSScore(state.sections),
                }));
            },

            // Reset to default
            reset: () => {
                set(defaultCVState);
            },

            // Load from Supabase
            loadFromSupabase: (data) => {
                set({
                    ...data,
                    metadata: {
                        ...data.metadata,
                        lastSaved: Date.now(),
                    },
                });
            },
        }),
        {
            name: 'cv-builder-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                metadata: state.metadata,
                sections: {
                    ...state.sections,
                    contact: {
                        ...state.sections.contact,
                        photoBase64: undefined, // ✅ Exclude photoBase64 from persistence
                    },
                },
                atsScore: state.atsScore,
            }),
        }
    )
);

// ============================================
// Selectors (for performance optimization)
// ============================================

export const selectContact = (state: CVStoreState) => state.sections.contact;
export const selectPersonalStatement = (state: CVStoreState) => state.sections.personalStatement;
export const selectWorkHistory = (state: CVStoreState) => state.sections.workHistory;
export const selectEducation = (state: CVStoreState) => state.sections.education;
export const selectSkills = (state: CVStoreState) => state.sections.skills;
export const selectLanguages = (state: CVStoreState) => state.sections.languages;
export const selectQualifications = (state: CVStoreState) => state.sections.qualifications;
export const selectReferences = (state: CVStoreState) => state.sections.references;
export const selectATSScore = (state: CVStoreState) => state.atsScore;
export const selectMetadata = (state: CVStoreState) => state.metadata;
export const selectActiveStep = (state: CVStoreState) => state.metadata.activeStep;
export const selectSelectedTemplate = (state: CVStoreState) => state.metadata.selectedTemplate;
