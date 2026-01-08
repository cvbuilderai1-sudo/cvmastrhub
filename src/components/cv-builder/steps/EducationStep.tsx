'use client';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCVStore } from '@/store/useCVStore';
import { DynamicListSection, DynamicListField } from '@/components/cv-builder/shared/DynamicListSection';

const EDUCATION_FIELDS: DynamicListField[] = [
    {
        name: 'school',
        label: 'Institution Name',
        type: 'text',
        placeholder: 'e.g., Harvard University',
        required: true,
    },
    {
        name: 'degree',
        label: 'Degree',
        type: 'select',
        required: true,
        options: [
            { value: 'high-school', label: 'High School Diploma' },
            { value: 'bachelors', label: "Bachelor's Degree" },
            { value: 'masters', label: "Master's Degree" },
            { value: 'phd', label: 'PhD / Doctorate' },
            { value: 'diploma', label: 'Diploma' },
            { value: 'certificate', label: 'Certificate' },
            { value: 'associate', label: "Associate's Degree" },
        ],
    },
    {
        name: 'field',
        label: 'Field of Study',
        type: 'text',
        placeholder: 'e.g., Computer Science',
        required: true,
    },
    {
        name: 'startDate',
        label: 'Start Date',
        type: 'date',
        required: true,
    },
    {
        name: 'endDate',
        label: 'End Date',
        type: 'date',
        placeholder: 'Leave empty if currently studying',
    },
    {
        name: 'grade',
        label: 'GPA / Grade (Optional)',
        type: 'text',
        placeholder: 'e.g., 3.8 GPA or First Class Honours',
    },
];

export function EducationStep() {
    const cvStore = useCVStore();

    const handleAdd = () => {
        cvStore.addToArray('education', {
            id: uuidv4(),
            degree: '',
            school: '',
            field: '',
            startDate: '',
            endDate: '',
            grade: '',
        });
    };

    const handleRemove = (id: string) => {
        cvStore.removeFromArray('education', id);
    };

    const handleUpdate = (id: string, field: string, value: any) => {
        cvStore.updateArrayItem('education', id, { [field]: value });
    };

    return (
        <div className="space-y-4">
            {/* Info Card */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <span className="text-xl">🎓</span>
                    Education Tips
                </h3>
                <p className="text-sm text-gray-300 mb-2">
                    List your educational background in reverse chronological order (most recent first).
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Include relevant coursework, honors, or awards</li>
                    <li>• Mention your GPA if it's above 3.5 (or equivalent)</li>
                    <li>• Include certifications and online courses if relevant</li>
                    <li>• For ongoing education, leave the end date empty</li>
                </ul>
            </div>

            {/* Dynamic List Section */}
            <DynamicListSection
                title="Education Entry"
                description="Add your educational background"
                icon="🎓"
                items={cvStore.sections.education}
                fields={EDUCATION_FIELDS}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
                maxItems={10}
                emptyMessage="No education entries added yet. Click 'Add Education Entry' to get started!"
            />
        </div>
    );
}
