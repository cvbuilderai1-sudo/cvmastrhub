'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import type { LanguageEntry } from '@/lib/types/cv.types';

interface LanguageProficiencySelectorProps {
    value: LanguageEntry[];
    onChange: (languages: LanguageEntry[]) => void;
    maxLanguages?: number;
}

const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'hi', name: 'Hindi' },
    { code: 'tr', name: 'Turkish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'pl', name: 'Polish' },
];

const PROFICIENCY_LEVELS = [
    { level: 'native', score: 5, label: 'Native Speaker', color: 'from-green-500 to-emerald-500' },
    { level: 'fluent', score: 4, label: 'Fluent', color: 'from-blue-500 to-cyan-500' },
    { level: 'professional', score: 3, label: 'Professional', color: 'from-purple-500 to-pink-500' },
    { level: 'intermediate', score: 2, label: 'Intermediate', color: 'from-orange-500 to-yellow-500' },
    { level: 'basic', score: 1, label: 'Basic', color: 'from-gray-500 to-slate-500' },
] as const;

export function LanguageProficiencySelector({
    value = [],
    onChange,
    maxLanguages = 10,
}: LanguageProficiencySelectorProps) {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedProficiency, setSelectedProficiency] = useState<'native' | 'fluent' | 'intermediate' | 'basic' | 'professional'>('intermediate');
    const [error, setError] = useState<string | null>(null);

    const availableLanguages = LANGUAGES.filter(
        (lang) => !value.some((v) => v.name === lang.name)
    );

    const handleAddLanguage = () => {
        if (!selectedLanguage) {
            setError('Please select a language');
            return;
        }

        if (value.length >= maxLanguages) {
            setError(`Maximum ${maxLanguages} languages allowed`);
            return;
        }

        const languageName = LANGUAGES.find((l) => l.code === selectedLanguage)?.name || selectedLanguage;
        const proficiencyData = PROFICIENCY_LEVELS.find((p) => p.level === selectedProficiency);

        const newLanguage: LanguageEntry = {
            id: `lang-${Date.now()}`,
            name: languageName,
            level: selectedProficiency,
            levelScore: proficiencyData?.score || 3 as 1 | 2 | 3 | 4 | 5,
        };

        onChange([...value, newLanguage]);
        setSelectedLanguage('');
        setSelectedProficiency('intermediate');
        setError(null);
    };

    const handleRemoveLanguage = (id: string) => {
        onChange(value.filter((lang) => lang.id !== id));
        setError(null);
    };

    const getProficiencyColor = (level: string) => {
        return PROFICIENCY_LEVELS.find((p) => p.level === level)?.color || 'from-gray-500 to-slate-500';
    };

    const getProficiencyLabel = (level: string) => {
        return PROFICIENCY_LEVELS.find((p) => p.level === level)?.label || level;
    };

    return (
        <div className="space-y-4">
            {/* Add Language Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Language Selector */}
                <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                        Language
                    </label>
                    <select
                        value={selectedLanguage}
                        onChange={(e) => {
                            setSelectedLanguage(e.target.value);
                            setError(null);
                        }}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg
                            text-white focus:outline-none focus:border-blue-500 transition-colors"
                        disabled={availableLanguages.length === 0}
                    >
                        <option value="" className="bg-gray-800">
                            Select language...
                        </option>
                        {availableLanguages.map((lang) => (
                            <option key={lang.code} value={lang.code} className="bg-gray-800">
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Proficiency Selector */}
                <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                        Proficiency Level
                    </label>
                    <select
                        value={selectedProficiency}
                        onChange={(e) => setSelectedProficiency(e.target.value as any)}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg
                            text-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        {PROFICIENCY_LEVELS.map((prof) => (
                            <option key={prof.level} value={prof.level} className="bg-gray-800">
                                {prof.label} (Level {prof.score})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Add Button */}
                <div className="flex items-end">
                    <button
                        onClick={handleAddLanguage}
                        disabled={!selectedLanguage || value.length >= maxLanguages}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500
                            hover:from-blue-600 hover:to-purple-600 text-white rounded-lg
                            font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Language
                    </button>
                </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs text-red-400"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Languages List */}
            {value.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-300">
                            Your Languages ({value.length}/{maxLanguages})
                        </span>
                    </div>

                    <AnimatePresence>
                        {value.map((lang) => (
                            <motion.div
                                key={lang.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center justify-between p-3 bg-white/5 border border-white/10
                                    rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-2xl">🌍</div>
                                    <div>
                                        <p className="font-medium text-white">{lang.name}</p>
                                        <div
                                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium
                                                bg-gradient-to-r ${getProficiencyColor(lang.level)} text-white mt-1`}
                                        >
                                            {getProficiencyLabel(lang.level)} (Level {lang.levelScore})
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleRemoveLanguage(lang.id)}
                                    className="p-2 hover:bg-red-500/20 rounded-full transition-colors
                                        opacity-0 group-hover:opacity-100"
                                    aria-label={`Remove ${lang.name}`}
                                >
                                    <X className="w-4 h-4 text-red-400" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="p-8 bg-white/5 border border-dashed border-white/20 rounded-lg text-center">
                    <p className="text-sm text-gray-400">
                        No languages added yet. Select a language and proficiency level to add.
                    </p>
                </div>
            )}
        </div>
    );
}
