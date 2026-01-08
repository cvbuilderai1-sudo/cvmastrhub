import { useEffect, useRef, useState } from 'react';
import { useCVStore } from '@/store/useCVStore';

export interface UseAutoSaveOptions {
    debounceMs?: number;
    onSave?: () => void;
    onError?: (error: Error) => void;
}

export function useAutoSave(options: UseAutoSaveOptions = {}) {
    const {
        debounceMs = 500,
        onSave,
        onError,
    } = options;

    const cvStore = useCVStore();
    const saveTimeoutRef = useRef<NodeJS.Timeout>();
    const lastSavedRef = useRef<string>('');
    const [isSaving, setIsSaving] = useState(false);
    const [lastSavedTime, setLastSavedTime] = useState<number>(Date.now());

    useEffect(() => {
        // Convert current state to JSON
        const currentState = JSON.stringify({
            sections: cvStore.sections,
            metadata: cvStore.metadata,
        });

        // Only save if state actually changed
        if (currentState === lastSavedRef.current) {
            return;
        }

        lastSavedRef.current = currentState;
        setIsSaving(true);

        // Clear existing timeout
        clearTimeout(saveTimeoutRef.current);

        // Debounce save
        saveTimeoutRef.current = setTimeout(async () => {
            try {
                // Save to localStorage (instant)
                const storeData = {
                    state: {
                        sections: cvStore.sections,
                        metadata: cvStore.metadata,
                        atsScore: cvStore.atsScore,
                    },
                    version: 1,
                    lastSaved: Date.now(),
                };

                localStorage.setItem('cv-builder-storage', JSON.stringify(storeData));

                // Update last saved time
                setLastSavedTime(Date.now());
                setIsSaving(false);

                // Trigger callback
                onSave?.();

                // TODO: Trigger Supabase sync (debounced separately)
                console.log('📦 Auto-saved to localStorage');
            } catch (error) {
                const err = error instanceof Error ? error : new Error('Save failed');
                console.error('Auto-save failed:', err);
                setIsSaving(false);
                onError?.(err);
            }
        }, debounceMs);

        // Cleanup timeout on unmount
        return () => {
            clearTimeout(saveTimeoutRef.current);
        };
    }, [cvStore.sections, cvStore.metadata, cvStore.atsScore, debounceMs, onSave, onError]);

    return {
        isSaving,
        lastSavedTime,
    };
}
