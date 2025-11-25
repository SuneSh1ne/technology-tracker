import { useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

export function useThemeEffect() {
    const { themeMode } = useApp();

    useEffect(() => {
        document.body.setAttribute('data-theme', themeMode);

        document.body.className = `theme-${themeMode}`;

        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', themeMode === 'dark' ? '#121212' : '#1976d2');
        }
    }, [themeMode]);
}

export default useThemeEffect;