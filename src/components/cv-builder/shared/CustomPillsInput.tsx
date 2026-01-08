'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CustomPillsInputProps {
    value: string[];
    onChange: (skills: string[]) => void;
    placeholder?: string;
    maxItems?: number;
    minLength?: number;
    maxLength?: number;
}

export function CustomPillsInput({
    value = [],
    onChange,
    placeholder = 'Type a skill and press Enter...',
    maxItems = 50,
    minLength = 2,
    maxLength = 30,
}: CustomPillsInputProps) {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    };

    const addSkill = () => {
        const trimmedValue = inputValue.trim();

        // Validation
        if (!trimmedValue) {
            setError(null);
            return;
        }

        if (trimmedValue.length < minLength) {
            setError(`Skill must be at least ${minLength} characters`);
            return;
        }

        if (trimmedValue.length > maxLength) {
            setError(`Skill must be less than ${maxLength} characters`);
            return;
        }

        // Check for duplicates (case-insensitive)
        const isDuplicate = value.some(
            (skill) => skill.toLowerCase() === trimmedValue.toLowerCase()
        );

        if (isDuplicate) {
            setError('This skill already exists');
            return;
        }

        // Check max items
        if (value.length >= maxItems) {
            setError(`Maximum ${maxItems} skills allowed`);
            return;
        }

        // Add skill
        onChange([...value, trimmedValue]);
        setInputValue('');
        setError(null);
    };

    const removeSkill = (index: number) => {
        const newSkills = value.filter((_, i) => i !== index);
        onChange(newSkills);
        setError(null);
    };

    const showWarning = value.length >= maxItems * 0.9;

    return (
        <div className="space-y-3">
            {/* Input Field */}
            <div>
                <div className="relative">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            setError(null);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={value.length >= maxItems}
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none
                            bg-white/10 text-white placeholder-gray-400 transition-all duration-300
                            ${error
                                ? 'border-red-500/50 focus:border-red-500'
                                : 'border-white/20 focus:border-blue-500'
                            }
                            disabled:opacity-50 disabled:cursor-not-allowed
                        `}
                    />
                    {inputValue && (
                        <button
                            onClick={addSkill}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 
                                bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md
                                transition-colors"
                        >
                            Add
                        </button>
                    )}
                </div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-xs text-red-400 mt-1"
                        >
                            {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Counter */}
                <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                        {value.length}/{maxItems} skills
                    </span>
                    {showWarning && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-orange-400"
                        >
                            ⚠️ Approaching limit
                        </motion.span>
                    )}
                </div>
            </div>

            {/* Pills Display */}
            {value.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-wrap gap-2 p-4 bg-white/5 border border-white/10 rounded-lg
                        backdrop-blur-sm min-h-[60px]"
                >
                    <AnimatePresence>
                        {value.map((skill, index) => (
                            <motion.div
                                key={`${skill}-${index}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                className="group relative"
                            >
                                <div
                                    className="flex items-center gap-2 px-3 py-1.5 
                                    bg-gradient-to-r from-blue-500/20 to-purple-500/20 
                                    border border-blue-500/30 rounded-full
                                    hover:from-blue-500/30 hover:to-purple-500/30
                                    transition-all duration-200"
                                >
                                    <span className="text-sm text-white font-medium">
                                        {skill}
                                    </span>
                                    <button
                                        onClick={() => removeSkill(index)}
                                        className="p-0.5 hover:bg-red-500/30 rounded-full transition-colors"
                                        aria-label={`Remove ${skill}`}
                                    >
                                        <X className="w-3 h-3 text-gray-300 hover:text-red-400" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="p-8 bg-white/5 border border-dashed border-white/20 rounded-lg text-center">
                    <p className="text-sm text-gray-400">
                        No skills added yet. Type a skill and press Enter to add.
                    </p>
                </div>
            )}
        </div>
    );
}
