// src/hooks/useDarkMode.ts
import { useEffect } from 'react';
import useAppStore from '../../shared/store/appStore';

export const useDarkMode = () => {
    const isDarkMode = useAppStore((state) => state.isDarkMode);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDarkMode) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }, [isDarkMode]);
};
