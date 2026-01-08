'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCVStore } from '@/store/useCVStore';
import {
    Download,
    FileJson,
    Edit,
    CheckCircle2,
    Circle,
    AlertCircle,
    TrendingUp,
    Sparkles,
} from 'lucide-react';

export function ReviewStep() {
    const cvStore = useCVStore();
    const { sections, atsScore, metadata } = cvStore;

    // Calculate completion for each section
    const sectionCompletion = useMemo(() => {
        const completions = {
            contact: 0,
            personalStatement: 0,
            workHistory: 0,
            education: 0,
            skills: 0,
            languages: 0,
            qualifications: 0,
            references: 0,
        };

        // Contact Info (0-100%)
        const contact = sections.contact;
        let contactScore = 0;
        if (contact.fullName) contactScore += 25;
        if (contact.title) contactScore += 25;
        if (contact.email) contactScore += 25;
        if (contact.phone) contactScore += 25;
        completions.contact = contactScore;

        // Personal Statement (0-100%)
        const statement = sections.personalStatement.summary;
        const wordCount = statement.split(/\s+/).filter(Boolean).length;
        completions.personalStatement = statement
            ? Math.min((wordCount / 150) * 100, 100)
            : 0;

        // Work History (0-100%)
        completions.workHistory = sections.workHistory.length > 0 ? 100 : 0;

        // Education (0-100%)
        completions.education = sections.education.length > 0 ? 100 : 0;

        // Skills (0-100%)
        const skillCount = sections.skills.length;
        completions.skills = skillCount > 0 ? Math.min((skillCount / 15) * 100, 100) : 0;

        // Languages (0-100%)
        completions.languages = sections.languages.length > 0 ? 100 : 0;

        // Qualifications (0-100%)
        completions.qualifications = sections.qualifications.length > 0 ? 100 : 0;

        // References (0-100%)
        completions.references = sections.references.length > 0 ? 100 : 0;

        return completions;
    }, [sections]);

    // Calculate overall completion
    const overallCompletion = useMemo(() => {
        const values = Object.values(sectionCompletion);
        return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
    }, [sectionCompletion]);

    // Generate improvement suggestions
    const suggestions = useMemo(() => {
        const tips: string[] = [];

        if (sectionCompletion.contact < 100) {
            tips.push('Complete all contact information fields for better visibility');
        }
        if (sectionCompletion.personalStatement < 50) {
            tips.push('Expand your personal statement to 50-150 words');
        }
        if (sectionCompletion.workHistory === 0) {
            tips.push('Add at least one work experience entry');
        }
        if (sectionCompletion.skills < 50) {
            tips.push('Add 10-15 key skills to improve ATS score');
        }
        if (sectionCompletion.education === 0) {
            tips.push('Include your educational background');
        }
        if (sectionCompletion.languages === 0) {
            tips.push('Add languages to stand out for international roles');
        }

        if (tips.length === 0) {
            tips.push('Your CV looks great! Consider downloading it as PDF.');
        }

        return tips;
    }, [sectionCompletion]);

    // ATS Score color
    const atsColor =
        atsScore.overall >= 75
            ? 'text-green-400'
            : atsScore.overall >= 50
                ? 'text-orange-400'
                : 'text-red-400';

    const atsBgColor =
        atsScore.overall >= 75
            ? 'from-green-500/20 to-emerald-500/20 border-green-500/30'
            : atsScore.overall >= 50
                ? 'from-orange-500/20 to-yellow-500/20 border-orange-500/30'
                : 'from-red-500/20 to-pink-500/20 border-red-500/30';

    // Handle JSON export
    const handleExportJSON = () => {
        const dataStr = JSON.stringify({ sections, metadata, atsScore }, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `cv-backup-${Date.now()}.json`;
        link.click();
        URL.revokeObjectURL(url);
    };

    // Navigate to specific step
    const goToStep = (stepIndex: number) => {
        cvStore.setMetadata({ activeStep: stepIndex });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
            >
                <h2 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="w-8 h-8 text-yellow-400" />
                    Review Your CV
                </h2>
                <p className="text-gray-300">
                    Check your CV completeness and ATS score before exporting
                </p>
            </motion.div>

            {/* Overall Completion */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Overall Completion</h3>
                    <span className="text-3xl font-bold text-purple-300">{overallCompletion}%</span>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${overallCompletion}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />
                </div>
            </motion.div>

            {/* ATS Score Display */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`bg-gradient-to-r ${atsBgColor} border rounded-lg p-6 backdrop-blur-sm`}
            >
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-1">ATS Score</h3>
                        <p className="text-sm text-gray-300">
                            {atsScore.overall >= 75
                                ? 'Excellent - Ready for submission!'
                                : atsScore.overall >= 50
                                    ? 'Good - Consider improvements'
                                    : 'Needs work - Follow suggestions below'}
                        </p>
                    </div>
                    <div className="text-center">
                        <div className={`text-5xl font-bold ${atsColor}`}>{atsScore.overall}%</div>
                        <TrendingUp className={`w-6 h-6 mx-auto mt-1 ${atsColor}`} />
                    </div>
                </div>

                {/* ATS Breakdown */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-white/5 rounded p-3">
                        <p className="text-xs text-gray-400 mb-1">Keywords</p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500"
                                    style={{ width: `${atsScore.breakdown.keywords}%` }}
                                />
                            </div>
                            <span className="text-sm font-medium text-white">
                                {atsScore.breakdown.keywords}%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white/5 rounded p-3">
                        <p className="text-xs text-gray-400 mb-1">Completeness</p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500"
                                    style={{ width: `${atsScore.breakdown.completeness}%` }}
                                />
                            </div>
                            <span className="text-sm font-medium text-white">
                                {atsScore.breakdown.completeness}%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white/5 rounded p-3">
                        <p className="text-xs text-gray-400 mb-1">Formatting</p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-purple-500"
                                    style={{ width: `${atsScore.breakdown.formatting}%` }}
                                />
                            </div>
                            <span className="text-sm font-medium text-white">
                                {atsScore.breakdown.formatting}%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white/5 rounded p-3">
                        <p className="text-xs text-gray-400 mb-1">Experience</p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500"
                                    style={{ width: `${atsScore.breakdown.experience}%` }}
                                />
                            </div>
                            <span className="text-sm font-medium text-white">
                                {atsScore.breakdown.experience}%
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Section Completion Checklist */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm"
            >
                <h3 className="text-lg font-semibold text-white mb-4">Section Checklist</h3>
                <div className="space-y-3">
                    {[
                        { name: 'Contact Info', key: 'contact', step: 0 },
                        { name: 'Personal Statement', key: 'personalStatement', step: 1 },
                        { name: 'Work History', key: 'workHistory', step: 2 },
                        { name: 'Education', key: 'education', step: 3 },
                        { name: 'Skills', key: 'skills', step: 4 },
                        { name: 'Languages', key: 'languages', step: 5 },
                        { name: 'Qualifications', key: 'qualifications', step: 6 },
                        { name: 'References', key: 'references', step: 7 },
                    ].map((section) => {
                        const completion = sectionCompletion[section.key as keyof typeof sectionCompletion];
                        const isComplete = completion === 100;
                        const isPartial = completion > 0 && completion < 100;

                        return (
                            <div
                                key={section.key}
                                className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer group"
                                onClick={() => goToStep(section.step)}
                            >
                                <div className="flex items-center gap-3">
                                    {isComplete ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    ) : isPartial ? (
                                        <AlertCircle className="w-5 h-5 text-orange-400" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-gray-500" />
                                    )}
                                    <span className="text-white font-medium">{section.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`text-sm font-medium ${isComplete
                                                ? 'text-green-400'
                                                : isPartial
                                                    ? 'text-orange-400'
                                                    : 'text-gray-500'
                                            }`}
                                    >
                                        {Math.round(completion)}%
                                    </span>
                                    <Edit className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Improvement Suggestions */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm"
            >
                <h3 className="text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Improvement Suggestions
                </h3>
                <ul className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="text-blue-400 mt-0.5">•</span>
                            <span>{suggestion}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {/* Export JSON */}
                <button
                    onClick={handleExportJSON}
                    className="flex items-center justify-center gap-2 px-6 py-3 
                        bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600
                        text-white rounded-lg font-medium transition-all"
                >
                    <FileJson className="w-5 h-5" />
                    Export as JSON
                </button>

                {/* Download PDF (Disabled) */}
                <div className="relative group">
                    <button
                        disabled
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 
                            bg-gradient-to-r from-purple-500 to-pink-500 
                            text-white rounded-lg font-medium 
                            opacity-50 cursor-not-allowed"
                    >
                        <Download className="w-5 h-5" />
                        Download PDF
                    </button>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 
                        bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 
                        transition-opacity whitespace-nowrap pointer-events-none">
                        Coming in Task 4
                    </div>
                </div>
            </motion.div>

            {/* Success Message */}
            {overallCompletion === 100 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 
                        rounded-lg p-6 text-center"
                >
                    <div className="text-5xl mb-3">🎉</div>
                    <h3 className="text-2xl font-bold text-green-300 mb-2">Perfect CV!</h3>
                    <p className="text-gray-300">
                        Your CV is 100% complete and ready to impress recruiters. Great job!
                    </p>
                </motion.div>
            )}
        </div>
    );
}
