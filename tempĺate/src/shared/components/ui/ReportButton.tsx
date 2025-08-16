import React, { useState, useEffect, useRef, FC, MouseEvent } from 'react';
import { ReportActions } from '../../types';
import { Button } from 'primereact/button';

interface ReportButtonProps {
    actions: ReportActions;
}

const ReportButton: FC<ReportButtonProps> = ({ actions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside as unknown as EventListener);
        return () => document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                label="Relatórios"
                icon="pi pi-print"
                iconPos="right"
                className="p-button-secondary"
            />
            {isOpen && (
                <div className="absolute bottom-full right-0 mb-2 w-56 bg-white dark:bg-slate-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 animate-fade-in-up">
                    <div className="py-1">
                        {actions.onPrint && <Button onClick={() => { actions.onPrint!(); setIsOpen(false); }} label="Visualizar Impressão" icon="pi pi-print" className="w-full text-left p-button-text" />}
                        {actions.onExportPDF && <Button onClick={() => { actions.onExportPDF!(); setIsOpen(false); }} label="Exportar para PDF" icon="pi pi-file-pdf" className="w-full text-left p-button-text" />}
                        {actions.onExportExcel && <Button onClick={() => { actions.onExportExcel!(); setIsOpen(false); }} label="Exportar para Planilha" icon="pi pi-file-excel" className="w-full text-left p-button-text" />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportButton;
