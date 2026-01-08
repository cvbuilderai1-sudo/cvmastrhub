import type { CVSections } from '@/lib/types/cv.types';

export interface StepCompletionRules {
    stepId: number;
    requiredFields: string[];
    minContentLength?: Record<string, number>;
    customValidator?: (sections: CVSections) => boolean;
}

export const STEP_COMPLETION_RULES: Record<number, StepCompletionRules> = {
    0: {
        stepId: 0,
        requiredFields: ['fullName', 'email'],
        customValidator: (sections) => {
            const { contact } = sections;
            return (
                contact.fullName.length >= 2 &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
            );
        },
    },
    1: {
        stepId: 1,
        requiredFields: ['summary'],
        minContentLength: { summary: 50 },
        customValidator: (sections) => {
            return sections.personalStatement.summary.length >= 50;
        },
    },
    2: {
        stepId: 2,
        requiredFields: ['workHistory'],
        customValidator: (sections) => sections.workHistory.length > 0,
    },
    3: {
        stepId: 3,
        requiredFields: ['education'],
        customValidator: (sections) => sections.education.length > 0,
    },
    4: {
        stepId: 4,
        requiredFields: ['skills'],
        customValidator: (sections) => sections.skills.length >= 3, // At least 3 skills
    },
    5: {
        stepId: 5,
        requiredFields: ['languages'],
        customValidator: (sections) => sections.languages.length > 0,
    },
    6: {
        stepId: 6,
        requiredFields: [], // Optional
        customValidator: () => true,
    },
    7: {
        stepId: 7,
        requiredFields: [], // Optional
        customValidator: () => true,
    },
    8: {
        stepId: 8,
        requiredFields: [], // Review only
        customValidator: () => true,
    },
};

export type StepStatus = 'completed' | 'partial' | 'empty';

export function detectStepCompletion(
    stepId: number,
    sections: CVSections
): StepStatus {
    const rules = STEP_COMPLETION_RULES[stepId];
    if (!rules) return 'empty';

    // Check required fields
    let requiredFieldsCount = 0;

    for (const field of rules.requiredFields) {
        if (field === 'fullName' || field === 'email') {
            const value = sections.contact[field as keyof typeof sections.contact];
            if (typeof value === 'string' && value.trim().length > 0) {
                requiredFieldsCount++;
            }
        } else if (field === 'summary') {
            if (sections.personalStatement.summary.trim().length > 0) {
                requiredFieldsCount++;
            }
        } else if (field === 'workHistory' || field === 'education' || field === 'skills' || field === 'languages') {
            const array = sections[field];
            if (Array.isArray(array) && array.length > 0) {
                requiredFieldsCount++;
            }
        }
    }

    // Check minimum content length
    let minLengthSatisfied = true;
    if (rules.minContentLength) {
        for (const [field, minLen] of Object.entries(rules.minContentLength)) {
            if (field === 'summary') {
                if (sections.personalStatement.summary.length < minLen) {
                    minLengthSatisfied = false;
                    break;
                }
            }
        }
    }

    // Run custom validator
    const customValidationPassed = rules.customValidator?.(sections) ?? true;

    if (
        requiredFieldsCount === rules.requiredFields.length &&
        minLengthSatisfied &&
        customValidationPassed
    ) {
        return 'completed';
    } else if (requiredFieldsCount > 0) {
        return 'partial';
    } else {
        return 'empty';
    }
}

export function detectAllCompletedSteps(sections: CVSections): {
    completed: number[];
    partial: number[];
    empty: number[];
} {
    const completed: number[] = [];
    const partial: number[] = [];
    const empty: number[] = [];

    for (let i = 0; i < 9; i++) {
        const status = detectStepCompletion(i, sections);

        if (status === 'completed') {
            completed.push(i);
        } else if (status === 'partial') {
            partial.push(i);
        } else {
            empty.push(i);
        }
    }

    return { completed, partial, empty };
}

export function getCompletionPercentage(sections: CVSections): number {
    const { completed } = detectAllCompletedSteps(sections);
    return Math.round((completed.length / 9) * 100);
}
