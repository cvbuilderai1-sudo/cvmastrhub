import { z } from 'zod';

// Contact Section Validation
export const contactValidationSchema = z.object({
    fullName: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .regex(/^[a-zA-Z\s\u0600-\u06FF\u0750-\u077F]+$/, 'Only letters and spaces allowed'),

    title: z.string()
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title too long'),

    email: z.string()
        .email('Invalid email format')
        .min(1, 'Email is required'),

    phone: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone format (use international format: +1234567890)')
        .min(1, 'Phone is required'),

    address: z.string()
        .min(5, 'Address must be at least 5 characters')
        .optional()
        .or(z.literal('')),

    linkedin: z.string()
        .url('Invalid LinkedIn URL')
        .includes('linkedin.com', { message: 'Must be a LinkedIn URL' })
        .optional()
        .or(z.literal('')),

    website: z.string()
        .url('Invalid website URL')
        .optional()
        .or(z.literal('')),

    middleName: z.string().optional(),
    phoneSecondary: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone format')
        .optional()
        .or(z.literal('')),
    twitter: z.string()
        .url('Invalid Twitter URL')
        .optional()
        .or(z.literal('')),
    portfolio: z.string()
        .url('Invalid portfolio URL')
        .optional()
        .or(z.literal('')),
    github: z.string()
        .url('Invalid GitHub URL')
        .includes('github.com', { message: 'Must be a GitHub URL' })
        .optional()
        .or(z.literal('')),
});

export type ContactValidation = z.infer<typeof contactValidationSchema>;

// Personal Statement Validation
export const personalStatementValidationSchema = z.object({
    summary: z.string()
        .min(50, 'Summary must be at least 50 characters')
        .max(500, 'Summary must be less than 500 characters'),
});

// Work History Validation
export const workHistoryValidationSchema = z.object({
    role: z.string().min(2, 'Role is required'),
    company: z.string().min(2, 'Company is required'),
    location: z.string().min(2, 'Location is required'),
    startDate: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid date format (YYYY-MM)'),
    endDate: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid date format (YYYY-MM)').nullable(),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    isCurrentRole: z.boolean(),
});

// Education Validation
export const educationValidationSchema = z.object({
    degree: z.string().min(2, 'Degree is required'),
    school: z.string().min(2, 'School is required'),
    field: z.string().min(2, 'Field of study is required'),
    startDate: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid date format (YYYY-MM)'),
    endDate: z.string().regex(/^\d{4}-\d{2}$/, 'Invalid date format (YYYY-MM)'),
    grade: z.string().optional(),
});

// Skill Validation
export const skillValidationSchema = z.object({
    name: z.string().min(2, 'Skill name is required'),
    level: z.number().min(1).max(5),
});

// Language Validation
export const languageValidationSchema = z.object({
    name: z.string().min(2, 'Language name is required'),
    level: z.enum(['native', 'fluent', 'intermediate', 'basic']),
    levelScore: z.number().min(1).max(5),
});

// Helper function to validate a single field
export function validateField<T>(
    schema: z.ZodSchema<T>,
    data: any,
    field: string
): { valid: boolean; error?: string } {
    try {
        schema.parse(data);
        return { valid: true };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fieldError = error.errors.find(e => e.path.includes(field));
            return {
                valid: false,
                error: fieldError?.message || 'Validation error',
            };
        }
        return { valid: false, error: 'Unknown error' };
    }
}
