'use client';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCVStore } from '@/store/useCVStore';
import { DynamicListSection, DynamicListField } from '@/components/cv-builder/shared/DynamicListSection';

const REFERENCES_FIELDS: DynamicListField[] = [
    {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        placeholder: 'e.g., Dr. Jane Smith',
        required: true,
    },
    {
        name: 'title',
        label: 'Job Title / Relationship',
        type: 'text',
        placeholder: 'e.g., Former Manager at Google',
        required: true,
    },
    {
        name: 'company',
        label: 'Company / Organization',
        type: 'text',
        placeholder: 'e.g., Google Inc.',
        required: true,
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'jane.smith@company.com',
        required: true,
        validation: (value: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return {
                valid: emailRegex.test(value),
                message: !emailRegex.test(value) ? 'Invalid email format' : undefined,
            };
        },
    },
    {
        name: 'phone',
        label: 'Phone Number (Optional)',
        type: 'text',
        placeholder: '+1 234 567 8900',
        validation: (value: string) => {
            if (!value) return { valid: true };
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            return {
                valid: phoneRegex.test(value.replace(/[\s-]/g, '')),
                message: !phoneRegex.test(value.replace(/[\s-]/g, ''))
                    ? 'Invalid phone format (use international format)'
                    : undefined,
            };
        },
    },
];

export function ReferencesStep() {
    const cvStore = useCVStore();

    const handleAdd = () => {
        cvStore.addToArray('references', {
            id: uuidv4(),
            name: '',
            title: '',
            company: '',
            email: '',
            phone: '',
        });
    };

    const handleRemove = (id: string) => {
        cvStore.removeFromArray('references', id);
    };

    const handleUpdate = (id: string, field: string, value: any) => {
        cvStore.updateArrayItem('references', id, { [field]: value });
    };

    return (
        <div className="space-y-4">
            {/* Privacy Notice */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold text-amber-300 mb-2 flex items-center gap-2">
                    <span className="text-xl">🔒</span>
                    Privacy Notice
                </h3>
                <p className="text-sm text-gray-300">
                    References may not appear in the exported CV by default to protect privacy. You can choose
                    to include them or provide "References available upon request" instead.
                </p>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <span className="text-xl">🤝</span>
                    References Tips
                </h3>
                <p className="text-sm text-gray-300 mb-2">
                    Professional references can strengthen your application.
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Choose references who can speak to your professional abilities</li>
                    <li>• Always ask permission before listing someone as a reference</li>
                    <li>• Include their current title and company</li>
                    <li>• Provide accurate contact information</li>
                    <li>• 2-3 references is typically sufficient</li>
                </ul>
            </div>

            {/* Dynamic List Section */}
            <DynamicListSection
                title="Reference Entry"
                description="Add professional references"
                icon="🤝"
                items={cvStore.sections.references}
                fields={REFERENCES_FIELDS}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
                maxItems={10}
                emptyMessage="No references added yet. Click 'Add Reference Entry' to include professional references!"
            />
        </div>
    );
}
