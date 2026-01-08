'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideInFromLeft } from '@/lib/animations/tabAnimations';

export interface ValidationFeedbackProps {
    stepId: number;
    errors: Record<string, string>;
    hasUnsavedChanges?: boolean;
}

export function ValidationFeedback({
    stepId,
    errors,
    hasUnsavedChanges = false,
}: ValidationFeedbackProps) {
    const errorCount = Object.keys(errors).length;

    if (errorCount === 0 && !hasUnsavedChanges) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={slideInFromLeft}
                className="mb-4"
            >
                {/* Unsaved changes indicator */}
                {hasUnsavedChanges && errorCount === 0 && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm">
                        <div className="flex items-center gap-2 text-sm text-amber-400">
                            <span className="text-lg">💾</span>
                            <span className="font-medium">Unsaved changes</span>
                        </div>
                    </div>
                )}

                {/* Validation errors */}
                {errorCount > 0 && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">⚠️</span>
                            <div className="flex-1">
                                <div className="text-sm font-semibold text-red-400 mb-2">
                                    {errorCount} validation issue{errorCount !== 1 ? 's' : ''} found
                                </div>
                                <ul className="space-y-2">
                                    {Object.entries(errors).map(([field, message]) => (
                                        <motion.li
                                            key={field}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="flex items-start gap-2 text-xs text-red-300"
                                        >
                                            <span className="text-red-500 mt-0.5">•</span>
                                            <div>
                                                <span className="font-medium capitalize">
                                                    {field.replace(/([A-Z])/g, ' $1').trim()}:
                                                </span>{' '}
                                                <span>{message}</span>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
    );
}

// Success feedback component
export interface SuccessFeedbackProps {
    message: string;
    show: boolean;
}

export function SuccessFeedback({ message, show }: SuccessFeedbackProps) {
    if (!show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 backdrop-blur-sm"
            >
                <div className="flex items-center gap-2 text-sm text-green-400">
                    <span className="text-lg">✓</span>
                    <span className="font-medium">{message}</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
