'use client';

import React, { useMemo } from 'react';
import { useCVStore, selectActiveStep, selectContact } from '@/store/useCVStore';
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { SmartTabBar } from './SmartTabBar';
import { SmartImageUploader } from '@/components/photo-editor';
import { PersonalStatementStep, WorkHistoryStep } from './steps';
import { detectAllCompletedSteps } from '@/lib/cv/stepCompletion';

const STEPS = [
    { id: 0, title: 'Contact Info', icon: '👤' },
    { id: 1, title: 'Summary', icon: '📝' },
    { id: 2, title: 'Work History', icon: '💼' },
    { id: 3, title: 'Education', icon: '🎓' },
    { id: 4, title: 'Skills', icon: '⚡' },
    { id: 5, title: 'Languages', icon: '🌍' },
    { id: 6, title: 'Qualifications', icon: '🏆' },
    { id: 7, title: 'References', icon: '✉️' },
    { id: 8, title: 'Review', icon: '✅' },
];

export const CVFormWizard = React.memo(() => {
    const activeStep = useCVStore(selectActiveStep);
    const contact = useCVStore(selectContact);
    const sections = useCVStore((state) => state.sections);
    const setMetadata = useCVStore((state) => state.setMetadata);
    const updateSection = useCVStore((state) => state.updateSection);
    const setPhotoTemporary = useCVStore((state) => state.setPhotoTemporary);
    const recalculateATS = useCVStore((state) => state.recalculateATS);

    // Detect completion status
    const { completed, partial } = useMemo(
        () => detectAllCompletedSteps(sections),
        [sections]
    );

    const handleNext = () => {
        if (activeStep < STEPS.length - 1) {
            setMetadata({ activeStep: activeStep + 1 });
            recalculateATS();
        }
    };

    const handlePrevious = () => {
        if (activeStep > 0) {
            setMetadata({ activeStep: activeStep - 1 });
        }
    };

    const handleStepClick = (stepId: number) => {
        setMetadata({ activeStep: stepId });
        recalculateATS();
    };

    const handleContactChange = (field: string, value: string) => {
        updateSection('contact', { [field]: value });
    };

    const handlePhotoSelect = (base64: string) => {
        setPhotoTemporary(base64);
    };

    return (
        <div className="h-full flex flex-col gap-4">
            {/* Smart Tab Bar */}
            <SmartTabBar
                activeStep={activeStep}
                completedSteps={completed}
                partialSteps={partial}
                stepsWithErrors={[]}
                onStepClick={handleStepClick}
            />

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto px-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{STEPS[activeStep].title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Step 0: Contact Info */}
                        {activeStep === 0 && (
                            <div className="space-y-6">
                                {/* Photo Upload */}
                                <div className="flex justify-center mb-6">
                                    <SmartImageUploader
                                        onPhotoSelect={handlePhotoSelect}
                                        currentPhoto={contact.photoBase64 || contact.photoUrl}
                                        size={128}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                        Full Name *
                                    </label>
                                    <Input
                                        value={contact.fullName}
                                        onChange={(e) => handleContactChange('fullName', e.target.value)}
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                        Professional Title *
                                    </label>
                                    <Input
                                        value={contact.title}
                                        onChange={(e) => handleContactChange('title', e.target.value)}
                                        placeholder="Senior Software Engineer"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">
                                            Email *
                                        </label>
                                        <Input
                                            type="email"
                                            value={contact.email}
                                            onChange={(e) => handleContactChange('email', e.target.value)}
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">
                                            Phone *
                                        </label>
                                        <Input
                                            type="tel"
                                            value={contact.phone}
                                            onChange={(e) => handleContactChange('phone', e.target.value)}
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-200 mb-2">
                                        Address
                                    </label>
                                    <Input
                                        value={contact.address}
                                        onChange={(e) => handleContactChange('address', e.target.value)}
                                        placeholder="City, Country"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">
                                            LinkedIn
                                        </label>
                                        <Input
                                            value={contact.linkedin}
                                            onChange={(e) => handleContactChange('linkedin', e.target.value)}
                                            placeholder="linkedin.com/in/johndoe"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-200 mb-2">
                                            Website
                                        </label>
                                        <Input
                                            value={contact.website}
                                            onChange={(e) => handleContactChange('website', e.target.value)}
                                            placeholder="johndoe.com"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 1: Personal Statement */}
                        {activeStep === 1 && <PersonalStatementStep />}

                        {/* Step 2: Work History */}
                        {activeStep === 2 && <WorkHistoryStep />}

                        {/* Other steps - Coming Soon */}
                        {activeStep > 2 && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">{STEPS[activeStep].icon}</div>
                                <h3 className="text-2xl font-semibold text-white mb-2">
                                    {STEPS[activeStep].title}
                                </h3>
                                <p className="text-gray-300">
                                    This section is coming soon. Continue to see the preview!
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Navigation Buttons */}
            <div className="backdrop-blur-lg bg-white/5 border-t border-white/20 px-6 py-4">
                <div className="flex items-center justify-between">
                    <Button
                        variant="secondary"
                        onClick={handlePrevious}
                        disabled={activeStep === 0}
                    >
                        ← Previous
                    </Button>

                    <div className="text-sm text-gray-300">
                        Step {activeStep + 1} of {STEPS.length}
                    </div>

                    <Button onClick={handleNext} disabled={activeStep === STEPS.length - 1}>
                        Next →
                    </Button>
                </div>
            </div>
        </div>
    );
});

CVFormWizard.displayName = 'CVFormWizard';
