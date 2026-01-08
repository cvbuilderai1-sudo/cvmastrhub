'use client';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCVStore } from '@/store/useCVStore';
import { DynamicListSection, DynamicListField } from '@/components/cv-builder/shared/DynamicListSection';

const WORK_HISTORY_FIELDS: DynamicListField[] = [
    {
        name: 'role',
        label: 'Job Title',
        type: 'text',
        placeholder: 'e.g., Senior Software Engineer',
        required: true,
    },
    {
        name: 'company',
        label: 'Company / Employer',
        type: 'text',
        placeholder: 'e.g., Google',
        required: true,
    },
    {
        name: 'location',
        label: 'Location',
        type: 'text',
        placeholder: 'e.g., San Francisco, CA',
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
        placeholder: 'Leave empty if current position',
    },
    {
        name: 'isCurrentRole',
        label: 'Currently Working Here',
        type: 'checkbox',
        placeholder: 'I currently work here',
    },
    {
        name: 'description',
        label: 'Key Achievements & Responsibilities',
        type: 'textarea',
        placeholder: 'Describe your key achievements, responsibilities, and impact...\n\nTip: Use bullet points for better readability:\n• Led team of 5 developers\n• Increased performance by 40%\n• Implemented new CI/CD pipeline',
        required: true,
    },
];

export function WorkHistoryStep() {
    const cvStore = useCVStore();

    const handleAdd = () => {
        cvStore.addToArray('workHistory', {
            id: uuidv4(),
            role: '',
            company: '',
            location: '',
            startDate: '',
            endDate: null,
            description: '',
            isCurrentRole: false,
            atsKeywords: [],
        });
    };

    const handleRemove = (id: string) => {
        cvStore.removeFromArray('workHistory', id);
    };

    const handleUpdate = (id: string, field: string, value: any) => {
        // If marking as current role, clear end date
        if (field === 'isCurrentRole' && value === true) {
            cvStore.updateArrayItem('workHistory', id, {
                [field]: value,
                endDate: null,
            });
        } else {
            cvStore.updateArrayItem('workHistory', id, { [field]: value });
        }
    };

    return (
        <div className="space-y-4">
            {/* Info Card */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <span className="text-xl">💼</span>
                    Work Experience Tips
                </h3>
                <p className="text-sm text-gray-300 mb-2">
                    List your work experience in reverse chronological order (most recent first).
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Focus on achievements and impact, not just responsibilities</li>
                    <li>• Use action verbs (Led, Developed, Implemented, Increased)</li>
                    <li>• Quantify results when possible (e.g., "Increased sales by 30%")</li>
                    <li>• Include relevant keywords for ATS optimization</li>
                </ul>
            </div>

            {/* Dynamic List Section */}
            <DynamicListSection
                title="Work Experience Entry"
                description="Add your professional work history"
                icon="💼"
                items={cvStore.sections.workHistory}
                fields={WORK_HISTORY_FIELDS}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
                maxItems={15}
                emptyMessage="No work experience added yet. Click 'Add Work Experience Entry' to get started!"
            />
        </div>
    );
}
