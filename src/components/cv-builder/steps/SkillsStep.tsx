'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCVStore } from '@/store/useCVStore';
import { CustomPillsInput } from '../shared/CustomPillsInput';
import { Lightbulb, TrendingUp } from 'lucide-react';

export function SkillsStep() {
    const cvStore = useCVStore();
    const skills = cvStore.sections.skills || [];

    // Convert SkillEntry[] to string[] for CustomPillsInput
    const skillNames = useMemo(() => skills.map((s) => s.name), [skills]);

    const handleSkillsChange = (newSkills: string[]) => {
        // Convert string[] back to SkillEntry[]
        const skillEntries = newSkills.map((name, index) => {
            // Try to find existing skill to preserve level
            const existing = skills.find((s) => s.name === name);
            return {
                id: existing?.id || `skill-${Date.now()}-${index}`,
                name,
                level: (existing?.level || 3) as 1 | 2 | 3 | 4 | 5,
                atsScore: existing?.atsScore,
            };
        });

        // Update store by replacing entire skills array
        cvStore.updateSection('skills', skillEntries as any);
    };

    // ATS Optimization Tips
    const atsKeywords = useMemo(() => {
        const keywords = [
            'JavaScript',
            'TypeScript',
            'React',
            'Node.js',
            'Python',
            'AWS',
            'Docker',
            'Git',
        ];
        return keywords.filter((kw) => !skillNames.some((s) => s.toLowerCase().includes(kw.toLowerCase())));
    }, [skillNames]);

    const skillCount = skillNames.length;
    const isOptimal = skillCount >= 10 && skillCount <= 15;

    return (
        <div className="space-y-6">
            {/* Tip Card */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 backdrop-blur-sm"
            >
                <h3 className="font-semibold text-purple-300 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Skills Best Practices
                </h3>
                <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Prioritize 10-15 key skills relevant to your target role</li>
                    <li>• Use industry-standard keywords for ATS optimization</li>
                    <li>• Match skills to the job description you're applying for</li>
                    <li>• Include both technical and soft skills</li>
                </ul>
            </motion.div>

            {/* Skills Input */}
            <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                    Your Skills <span className="text-gray-400">(Optional)</span>
                </label>
                <CustomPillsInput
                    value={skillNames}
                    onChange={handleSkillsChange}
                    placeholder="Type a skill and press Enter..."
                    maxItems={50}
                    minLength={2}
                    maxLength={30}
                />
            </div>

            {/* Skill Count Status */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-4 rounded-lg border backdrop-blur-sm ${isOptimal
                        ? 'bg-green-500/10 border-green-500/30'
                        : skillCount > 15
                            ? 'bg-orange-500/10 border-orange-500/30'
                            : 'bg-blue-500/10 border-blue-500/30'
                    }`}
            >
                <div className="flex items-center gap-2 mb-2">
                    <TrendingUp
                        className={`w-5 h-5 ${isOptimal ? 'text-green-400' : skillCount > 15 ? 'text-orange-400' : 'text-blue-400'
                            }`}
                    />
                    <span
                        className={`font-semibold ${isOptimal ? 'text-green-300' : skillCount > 15 ? 'text-orange-300' : 'text-blue-300'
                            }`}
                    >
                        {isOptimal
                            ? '✓ Optimal Skill Count'
                            : skillCount > 15
                                ? '⚠️ Consider Reducing'
                                : '📝 Add More Skills'}
                    </span>
                </div>
                <p className="text-sm text-gray-300">
                    {isOptimal
                        ? 'Perfect! You have an optimal number of skills that won\'t overwhelm recruiters.'
                        : skillCount > 15
                            ? 'Too many skills can dilute your expertise. Focus on your strongest 10-15 skills.'
                            : skillCount === 0
                                ? 'Start adding your key skills to improve your CV\'s ATS score.'
                                : 'Add a few more relevant skills to strengthen your profile.'}
                </p>
            </motion.div>

            {/* ATS Optimization Suggestions */}
            {atsKeywords.length > 0 && skillCount > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-lg p-4"
                >
                    <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                        <span className="text-lg">🎯</span>
                        ATS Optimization Suggestions
                    </h4>
                    <p className="text-xs text-gray-400 mb-3">
                        Consider adding these popular keywords if relevant to your experience:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {atsKeywords.slice(0, 6).map((keyword) => (
                            <button
                                key={keyword}
                                onClick={() => handleSkillsChange([...skillNames, keyword])}
                                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 
                                    rounded-full text-xs text-gray-300 hover:text-white transition-all"
                            >
                                + {keyword}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Character Count Info */}
            <div className="text-xs text-gray-400 text-right">
                Total characters: {skillNames.join(', ').length}
            </div>
        </div>
    );
}
