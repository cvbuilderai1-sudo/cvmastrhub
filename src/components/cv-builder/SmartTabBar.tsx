'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { glowTransition, pulseAnimation, pulseTransition } from '@/lib/animations/tabAnimations';

export interface TabBarProps {
    activeStep: number;
    completedSteps: number[];
    partialSteps: number[];
    stepsWithErrors: number[];
    onStepClick: (stepId: number) => void;
}

const STEPS = [
    { id: 0, icon: '👤', label: 'Contact', description: 'Your personal details' },
    { id: 1, icon: '📝', label: 'Summary', description: 'Professional summary' },
    { id: 2, icon: '💼', label: 'Experience', description: 'Work history' },
    { id: 3, icon: '🎓', label: 'Education', description: 'Degrees & training' },
    { id: 4, icon: '⚡', label: 'Skills', description: 'Technical & soft skills' },
    { id: 5, icon: '🌍', label: 'Languages', description: 'Language proficiency' },
    { id: 6, icon: '🏆', label: 'Qualifications', description: 'Certifications & awards' },
    { id: 7, icon: '🤝', label: 'References', description: 'Professional references' },
    { id: 8, icon: '✅', label: 'Review', description: 'Final review & export' },
];

export function SmartTabBar({
    activeStep,
    completedSteps,
    partialSteps,
    stepsWithErrors,
    onStepClick,
}: TabBarProps) {
    const completionPercentage = Math.round((completedSteps.length / 9) * 100);

    return (
        <div className="w-full bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
            {/* Steps */}
            <div className="flex justify-center gap-2 md:gap-3 flex-wrap mb-6">
                {STEPS.map((step) => {
                    const isActive = activeStep === step.id;
                    const isCompleted = completedSteps.includes(step.id);
                    const hasError = stepsWithErrors.includes(step.id);
                    const isPartial = partialSteps.includes(step.id);

                    let statusIndicator = '○'; // Default: not visited
                    let statusColor = 'text-gray-500';
                    let bgColor = 'bg-gray-700/20';
                    let ringColor = '';

                    if (isActive) {
                        statusIndicator = '●';
                        statusColor = 'text-blue-400';
                        bgColor = 'bg-blue-500/20';
                        ringColor = 'ring-2 ring-blue-500/50';
                    } else if (isCompleted) {
                        statusIndicator = '✓';
                        statusColor = 'text-green-400';
                        bgColor = 'bg-green-500/10';
                    } else if (hasError) {
                        statusIndicator = '⚠️';
                        statusColor = 'text-red-400';
                        bgColor = 'bg-red-500/10';
                    } else if (isPartial) {
                        statusIndicator = '◐';
                        statusColor = 'text-orange-400';
                        bgColor = 'bg-orange-500/10';
                    }

                    return (
                        <motion.div
                            key={step.id}
                            animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <button
                                onClick={() => onStepClick(step.id)}
                                className={`
                  relative flex flex-col items-center gap-1 px-2 md:px-3 py-2 rounded-xl
                  transition-all duration-300 cursor-pointer group
                  ${bgColor}
                  ${ringColor}
                  ${isActive ? 'shadow-lg shadow-blue-500/20' : 'hover:bg-white/5'}
                `}
                            >
                                {/* Main icon + status indicator */}
                                <div className="relative">
                                    <motion.span
                                        className="text-xl md:text-2xl"
                                        animate={isActive ? pulseAnimation.animate : {}}
                                        transition={isActive ? pulseTransition : {}}
                                    >
                                        {step.icon}
                                    </motion.span>
                                    <span
                                        className={`absolute -top-1 -right-1 text-sm md:text-base ${statusColor}`}
                                    >
                                        {statusIndicator}
                                    </span>
                                </div>

                                {/* Label */}
                                <span
                                    className={`text-xs font-medium whitespace-nowrap ${isActive ? 'text-blue-300' : 'text-gray-300'
                                        }`}
                                >
                                    {step.label}
                                </span>

                                {/* Tooltip on hover */}
                                <div
                                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 
                             mb-2 px-3 py-2 bg-gray-900 rounded-lg text-xs 
                             whitespace-nowrap opacity-0 group-hover:opacity-100 
                             transition-opacity pointer-events-none z-10
                             border border-white/10 shadow-xl"
                                >
                                    {step.description}
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                        <div className="w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-white/10" />
                                    </div>
                                </div>

                                {/* Glow animation for active step */}
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-xl border-2 border-blue-400/50"
                                        animate={{
                                            opacity: [0.3, 0.6, 0.3],
                                        }}
                                        transition={glowTransition}
                                    />
                                )}
                            </button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Progress bar */}
            <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span className="font-medium">Overall Progress</span>
                    <span className="font-semibold text-blue-400">{completionPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{completedSteps.length} of 9 steps completed</span>
                    {partialSteps.length > 0 && (
                        <span className="text-orange-400">{partialSteps.length} partial</span>
                    )}
                </div>
            </div>
        </div>
    );
}
