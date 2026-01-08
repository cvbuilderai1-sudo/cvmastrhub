import { useEffect, useState } from 'react';

export function useDarkMode() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Check localStorage
        const saved = localStorage.getItem('darkMode');

        const shouldBeDark = saved ? saved === 'true' : prefersDark;
        setIsDark(shouldBeDark);

        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggle = () => {
        const newValue = !isDark;
        setIsDark(newValue);
        localStorage.setItem('darkMode', String(newValue));

        if (newValue) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const enable = () => {
        setIsDark(true);
        localStorage.setItem('darkMode', 'true');
        document.documentElement.classList.add('dark');
    };

    const disable = () => {
        setIsDark(false);
        localStorage.setItem('darkMode', 'false');
        document.documentElement.classList.remove('dark');
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return { isDark: false, toggle, enable, disable, mounted: false };
    }

    return { isDark, toggle, enable, disable, mounted: true };
}
