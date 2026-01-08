'use client';

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCVStore } from '@/store/useCVStore';
import { DynamicListSection, DynamicListField } from '@/components/cv-builder/shared/DynamicListSection';

const QUALIFICATIONS_FIELDS: DynamicListField[] = [
    {
        name: 'title',
        label: 'Qualification / Award / Certification',
        type: 'text',
        placeholder: 'e.g., AWS Certified Solutions Architect',
        required: true,
    },
    {
        name: 'issuer',
        label: 'Issuing Organization',
        type: 'text',
        placeholder: 'e.g., Amazon Web Services',
        required: true,
    },
    {
        name: 'date',
        label: 'Date Issued',
        type: 'date',
        required: true,
    },
    {
        name: 'expiryDate',
        label: 'Expiry Date (Optional)',
        type: 'date',
        placeholder: 'Leave empty if no expiry',
    },
    {
        name: 'credentialId',
        label: 'Credential ID (Optional)',
        type: 'text',
        placeholder: 'e.g., ABC123XYZ',
    },
    {
        name: 'credentialUrl',
        label: 'Certificate URL (Optional)',
        type: 'url',
        placeholder: 'https://www.linkedin.com/learning/certificates/...',
        validation: (value: string) => {
            if (!value) return { valid: true };
            try {
                const url = new URL(value);
                return {
                    valid: url.protocol === 'https:',
                    message: url.protocol !== 'https:' ? 'URL must use HTTPS protocol' : undefined,
                };
            } catch {
                return { valid: false, message: 'Invalid URL format' };
            }
        },
    },
];

export function QualificationsStep() {
    const cvStore = useCVStore();

    const handleAdd = () => {
        cvStore.addToArray('qualifications', {
            id: uuidv4(),
            title: '',
            issuer: '',
            date: '',
            expiryDate: '',
            credentialId: '',
            credentialUrl: '',
        });
    };

    const handleRemove = (id: string) => {
        cvStore.removeFromArray('qualifications', id);
    };

    const handleUpdate = (id: string, field: string, value: any) => {
        cvStore.updateArrayItem('qualifications', id, { [field]: value });
    };

    return (
        <div className="space-y-4">
            {/* Info Card */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <span className="text-xl">🏆</span>
                    Certifications & Awards Tips
                </h3>
                <p className="text-sm text-gray-300 mb-2">
                    Showcase your professional certifications, awards, and achievements.
                </p>
                <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Include industry-recognized certifications (AWS, Google, Microsoft, etc.)</li>
                    <li>• Add professional awards and honors</li>
                    <li>• Include credential IDs and verification URLs when available</li>
                    <li>• List most recent or most relevant first</li>
                    <li>• Mention expiry dates for time-limited certifications</li>
                </ul>
            </div>

            {/* Dynamic List Section */}
            <DynamicListSection
                title="Qualification Entry"
                description="Add your certifications, awards, and achievements"
                icon="🏆"
                items={cvStore.sections.qualifications}
                fields={QUALIFICATIONS_FIELDS}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onUpdate={handleUpdate}
                maxItems={10}
                emptyMessage="No qualifications added yet. Click 'Add Qualification Entry' to showcase your achievements!"
            />
        </div>
    );
}
