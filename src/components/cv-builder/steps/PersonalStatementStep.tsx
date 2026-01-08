'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCVStore } from '@/store/useCVStore';
import { useWordCounter } from '@/hooks/useWordCounter';

export function PersonalStatementStep() {
    const cvStore = useCVStore();
    const summary = cvStore.sections.personalStatement.summary;

    const { wordCount, charCount, status, statusColor, statusMessage, isValid } = useWordCounter(
        summary,
        {
            minWords: 50,
            maxWords: 200,
            recommendedMin: 50,
            recommendedMax: 150,
        }
    );

    const handleSummaryChange = (value: string) => {
        // Max 2000 characters
        if (value.length <= 2000) {
            cvStore.updateSection('personalStatement', { summary: value });
        }
    };

    return (
        <div className="space-y-6">
            {/* Tip Card */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 backdrop-blur-sm"
            >
                <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    Professional Summary Tip
                </h3>
                <p className="text-sm text-gray-300">
                    Write a compelling 50-150 word summary that highlights your professional value.
                    Recruiters often scan this first - make it count!
                </p>
            </motion.div>

            {/* Summary Textarea */}
            <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                    Professional Summary <span className="text-red-400">*</span>
                </label>
                <textarea
                    value={summary}
                    onChange={(e) => handleSummaryChange(e.target.value)}
                    placeholder="Write a compelling professional summary that showcases your expertise, key skills, and career goals..."
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none resize-none 
            bg-white/10 text-white placeholder-gray-400 transition-all duration-300
            ${isValid
                            ? 'border-green-500/50 focus:border-green-500'
                            : 'border-white/20 focus:border-blue-500'
                        }
            ${charCount > 1800 ? 'border-orange-500/50' : ''}
          `}
                    rows={8}
                />

                {/* Character & Word Count */}
                <div className="mt-3 flex justify-between items-center">
                    {/* Character Count */}
                    <span
                        className={`text-xs transition-colors ${charCount > 1800 ? 'text-orange-400' : 'text-gray-400'
                            }`}
                    >
                        {charCount}/2000 characters
                    </span>

                    {/* Word Count with Status */}
                    <motion.div
                        key={status}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2"
                    >
                        <span className={`text-sm font-medium ${statusColor} transition-colors`}>
                            {wordCount} words
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className={`text-xs ${statusColor} transition-colors`}>{statusMessage}</span>
                    </motion.div>
                </div>

                {/* Progress Bar */}
                <div className="mt-2 w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full transition-all duration-300 ${status === 'too-short'
                                ? 'bg-gray-500'
                                : status === 'perfect'
                                    ? 'bg-green-500'
                                    : status === 'getting-long'
                                        ? 'bg-orange-500'
                                        : 'bg-red-500'
                            }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((wordCount / 200) * 100, 100)}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            {/* AI Button Placeholder (for Task 3) */}
            <motion.button
                disabled
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600/50 to-pink-600/50 
                 text-white rounded-lg font-medium transition-all
                 disabled:opacity-50 disabled:cursor-not-allowed
                 border border-purple-500/30"
            >
                <span className="flex items-center justify-center gap-2">
                    <span className="text-xl">✨</span>
                    <span>Improve with AI</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Coming in Task 3</span>
                </span>
            </motion.button>

            {/* Helpful Tips */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Writing Tips:</h4>
                <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Start with your current role and years of experience</li>
                    <li>• Highlight 2-3 key skills or achievements</li>
                    <li>• Mention your career goals or what you're looking for</li>
                    <li>• Keep it concise and impactful</li>
                </ul>
            </div>
        </div>
    );
}
