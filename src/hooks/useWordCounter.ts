import { useState, useEffect, useMemo } from 'react';

export interface WordCounterConfig {
    minWords: number;
    maxWords: number;
    recommendedMin: number;
    recommendedMax: number;
}

export interface WordCounterResult {
    wordCount: number;
    charCount: number;
    status: 'too-short' | 'perfect' | 'getting-long' | 'too-long';
    statusColor: string;
    statusMessage: string;
    isValid: boolean;
}

const DEFAULT_CONFIG: WordCounterConfig = {
    minWords: 50,
    maxWords: 200,
    recommendedMin: 50,
    recommendedMax: 150,
};

export function useWordCounter(
    text: string,
    config: Partial<WordCounterConfig> = {}
): WordCounterResult {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    const [debouncedText, setDebouncedText] = useState(text);

    // Debounce text updates (300ms)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedText(text);
        }, 300);

        return () => clearTimeout(timeout);
    }, [text]);

    const result = useMemo(() => {
        const trimmedText = debouncedText.trim();
        const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
        const charCount = debouncedText.length;

        let status: WordCounterResult['status'];
        let statusColor: string;
        let statusMessage: string;
        let isValid: boolean;

        if (wordCount < finalConfig.recommendedMin) {
            status = 'too-short';
            statusColor = 'text-gray-500';
            statusMessage = `Add ${finalConfig.recommendedMin - wordCount} more words`;
            isValid = false;
        } else if (wordCount >= finalConfig.recommendedMin && wordCount <= finalConfig.recommendedMax) {
            status = 'perfect';
            statusColor = 'text-green-500';
            statusMessage = 'Perfect length! ✓';
            isValid = true;
        } else if (wordCount > finalConfig.recommendedMax && wordCount <= finalConfig.maxWords) {
            status = 'getting-long';
            statusColor = 'text-orange-500';
            statusMessage = 'Getting long, consider shortening';
            isValid = true;
        } else {
            status = 'too-long';
            statusColor = 'text-red-500';
            statusMessage = `Too long! Remove ${wordCount - finalConfig.maxWords} words`;
            isValid = false;
        }

        return {
            wordCount,
            charCount,
            status,
            statusColor,
            statusMessage,
            isValid,
        };
    }, [debouncedText, finalConfig]);

    return result;
}
