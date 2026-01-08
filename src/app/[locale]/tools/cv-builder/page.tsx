'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { CVFormWizard, CVPreviewPanel } from '@/components/cv-builder';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useToast } from '@/hooks/useToast';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function CVBuilderPage({ params }: { params: { locale: string } }) {
    const { showToast } = useToast();
    const { isDark, toggle: toggleDarkMode, mounted } = useDarkMode();

    // Auto-save hook
    const { isSaving, lastSavedTime } = useAutoSave({
        debounceMs: 500,
        onSave: () => {
            showToast({
                type: 'success',
                message: '✓ Saved',
                duration: 1500,
            });
        },
        onError: (error) => {
            showToast({
                type: 'error',
                message: `Save failed: ${error.message}`,
                duration: 3000,
            });
        },
    });

    // Format last saved time
    const lastSavedText = useMemo(() => {
        if (!lastSavedTime) return 'Never';

        const now = Date.now();
        const diff = now - lastSavedTime;

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        return new Date(lastSavedTime).toLocaleTimeString();
    }, [lastSavedTime]);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <div className="backdrop-blur-lg bg-white/10 border-b border-white/20 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/${params.locale}`}
                            className="text-white/70 hover:text-white transition-colors"
                        >
                            ← Back
                        </Link>
                        <h1 className="text-2xl font-bold text-white">CV Builder</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Auto-save indicator */}
                        <div className="flex items-center gap-2 text-sm">
                            {isSaving ? (
                                <span className="text-amber-400 flex items-center gap-2">
                                    <span className="animate-spin">⏳</span>
                                    Saving...
                                </span>
                            ) : (
                                <span className="text-gray-400">
                                    Last saved: {lastSavedText}
                                </span>
                            )}
                        </div>

                        {/* Dark mode toggle */}
                        {mounted && (
                            <button
                                onClick={toggleDarkMode}
                                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            >
                                {isDark ? '☀️' : '🌙'}
                            </button>
                        )}

                        {/* Action buttons */}
                        <button className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all">
                            💾 Save
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all">
                            📥 Export PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Split View Layout */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left Panel - Form (40%) */}
                <div className="w-full lg:w-2/5 border-r border-white/20 overflow-hidden">
                    <CVFormWizard />
                </div>

                {/* Right Panel - Preview (60%) */}
                <div className="w-full lg:w-3/5 overflow-hidden">
                    <CVPreviewPanel />
                </div>
            </div>
        </div>
    );
}
