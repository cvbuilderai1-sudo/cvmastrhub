'use client';

import React from 'react';
import { useCVStore, selectATSScore, selectSelectedTemplate } from '@/store/useCVStore';
import { getTemplateConfig } from '@/lib/templates/configs';
import { ModernTemplate } from '@/components/templates';

export const CVPreviewPanel = React.memo(() => {
    const sections = useCVStore((state) => state.sections);
    const atsScore = useCVStore(selectATSScore);
    const selectedTemplate = useCVStore(selectSelectedTemplate);

    const config = getTemplateConfig(selectedTemplate);

    return (
        <div className="h-full flex flex-col">
            {/* ATS Score Bar */}
            <div className="sticky top-0 z-10 backdrop-blur-lg bg-white/10 border-b border-white/20 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-semibold text-white mb-1">ATS Score</h3>
                        <div className="flex items-center gap-4">
                            <div className="text-3xl font-bold text-white">{atsScore.overall}%</div>
                            <div className="flex-1">
                                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                                        style={{ width: `${atsScore.overall}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-xs text-gray-300 mt-1">
                                    <span>Keywords: {atsScore.breakdown.keywords}%</span>
                                    <span>Complete: {atsScore.breakdown.completeness}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* A4 Preview Container */}
            <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="max-w-4xl mx-auto">
                    {/* A4 Paper */}
                    <div
                        className="bg-white shadow-2xl"
                        style={{
                            width: '210mm',
                            minHeight: '297mm',
                            maxWidth: '100%',
                            margin: '0 auto',
                            transform: 'scale(0.85)',
                            transformOrigin: 'top center',
                        }}
                    >
                        {selectedTemplate === 'modern' && (
                            <ModernTemplate data={sections} config={config} atsScore={atsScore} />
                        )}
                        {/* TODO: Add Classic and Minimal templates */}
                    </div>
                </div>
            </div>
        </div>
    );
});

CVPreviewPanel.displayName = 'CVPreviewPanel';
