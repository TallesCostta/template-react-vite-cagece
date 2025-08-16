import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { PortalRotas } from '../types';

interface ReportModalState {
    isOpen: boolean;
    title: string;
    columns: any[];
    data: any[];
}

interface AppState {
    reportModal: ReportModalState;
    showReportModal: (payload: Omit<ReportModalState, 'isOpen'>) => void;
    hideReportModal: () => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    modal: { isOpen: boolean; message: string; };
    showAlert: (message: string) => void;
    hideAlert: () => void;
    menuData: PortalRotas | null;
    setMenuData: (data: PortalRotas) => void;
}

const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            reportModal: { isOpen: false, title: '', columns: [], data: [] },
            showReportModal: (payload) => set({ reportModal: { ...payload, isOpen: true } }),
            hideReportModal: () => set((state) => ({ reportModal: { ...state.reportModal, isOpen: false } })),
            isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
            toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
            searchTerm: '',
            setSearchTerm: (term) => set({ searchTerm: term }),
            modal: { isOpen: false, message: '' },
            showAlert: (message) => set({ modal: { isOpen: true, message } }),
            hideAlert: () => set({ modal: { isOpen: false, message: '' } }),
            menuData: null,
            setMenuData: (data) => set(() => ({ menuData: data })),
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage),
            /* partialize: (state) => ({
                isDarkMode: state.isDarkMode,
                menuData: state.menuData
            }), */
        }
    )
);

export default useAppStore;