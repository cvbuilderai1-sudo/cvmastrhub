'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCVStore } from '@/store/useCVStore';
import { LanguageProficiencySelector } from '../shared/LanguageProficiencySelector';
import { Globe, Lightbulb } from 'lucide-react';
import type { LanguageEntry } from '@/lib/types/cv.types';

export function LanguagesStep() {
    const cvStore = useCVStore();
    const languages = cvStore.sections.languages || [];

    const handleLanguagesChange = (newLanguages: LanguageEntry[]) => {
        cvStore.updateSection('languages', newLanguages as any);
    };

    const languageCount = languages.length;

    return (
        <div className="space-y-6">
            {/* Tip Card */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-4 backdrop-blur-sm"
            >
                <h3 className="font-semibold text-cyan-300 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Language Best Practices
                </h3>
                <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Always include your native language</li>
                    <li>• List languages most relevant to the job first</li>
                    <li>• Be honest about your proficiency level</li>
                    <li>• Include languages even at basic level if relevant</li>
                </ul>
            </motion.div>

            {/* Languages Selector */}
            <div>
                <label className="block text-sm font-medium text-gray-200 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Languages <span className="text-gray-400">(Optional)</span>
                </label>
                <LanguageProficiencySelector
                    value={languages}
                    onChange={handleLanguagesChange}
                    maxLanguages={10}
                />
            </div>

            {/* Language Count Status */}
            {languageCount > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-lg border backdrop-blur-sm ${languageCount >= 2
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-blue-500/10 border-blue-500/30'
                        }`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span
                            className={`font-semibold ${languageCount >= 2 ? 'text-green-300' : 'text-blue-300'
                                }`}
                        >
                            {languageCount >= 2
                                ? '✓ Great Language Profile'
                                : '📝 Consider Adding More'}
                        </span>
                    </div>
                    <p className="text-sm text-gray-300">
                        {languageCount >= 2
                            ? 'Excellent! Multilingual candidates are highly valued in today\'s global market.'
                            : 'Adding more languages can make you stand out, especially for international roles.'}
                    </p>
                </motion.div>
            )}

            {/* Proficiency Level Guide */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4"
            >
                <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <span className="text-lg">📊</span>
                    Proficiency Level Guide
                </h4>
                <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                        <div className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded text-white font-medium whitespace-nowrap">
                            Native (5)
                        </div>
                        <p className="text-gray-400">First language or equivalent fluency</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="px-2 py-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded text-white font-medium whitespace-nowrap">
                            Fluent (4)
                        </div>
                        <p className="text-gray-400">Can work professionally without difficulty</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white font-medium whitespace-nowrap">
                            Professional (3)
                        </div>
                        <p className="text-gray-400">Can handle most work situations</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded text-white font-medium whitespace-nowrap">
                            Intermediate (2)
                        </div>
                        <p className="text-gray-400">Can communicate in familiar situations</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="px-2 py-0.5 bg-gradient-to-r from-gray-500 to-slate-500 rounded text-white font-medium whitespace-nowrap">
                            Basic (1)
                        </div>
                        <p className="text-gray-400">Elementary knowledge and simple phrases</p>
                    </div>
                </div>
            </motion.div>

            {/* Tips for International Roles */}
            {languageCount >= 3 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-4"
                >
                    <p className="text-sm text-amber-200 flex items-center gap-2">
                        <span className="text-xl">🌟</span>
                        <span>
                            <strong>Impressive!</strong> Your multilingual skills are a major asset for international
                            companies and global roles.
                        </span>
                    </p>
                </motion.div>
            )}
        </div>
    );
}
