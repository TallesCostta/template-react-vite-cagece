import React, { useState, useEffect, useRef, FC } from 'react';
import useAppStore from '../../store/appStore';
import ReportLayout from './ReportLayout';

const ReportModal: FC = () => {
    const { isOpen, title, columns, data } = useAppStore((state) => state.reportModal);
    const hideReportModal = useAppStore((state) => state.hideReportModal);
    const [currentPage, setCurrentPage] = useState(1);
    const reportContentRef = useRef<HTMLDivElement>(null);

    const ROWS_PER_PAGE = 15;
    const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);
    const paginatedData = data.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

    useEffect(() => {
        if (isOpen) {
            setCurrentPage(1);
        }
    }, [isOpen]);

    const handlePrint = () => {
        const printContent = reportContentRef.current;
        if (printContent) {
            const originalContents = document.body.innerHTML;
            const printSection = printContent.innerHTML;
            
            document.body.innerHTML = `
                <html>
                    <head>
                        <title>${title}</title>
                        <style>
                            @media print {
                                body { margin: 0; }
                                .print-section { margin: 1.5rem; }
                                table { width: 100%; border-collapse: collapse; }
                                th, td { border: 1px solid #ddd; padding: 8px; }
                                th { background-color: #f2f2f2; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="print-section">${printSection}</div>
                    </body>
                </html>
            `;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in no-print" onClick={hideReportModal}>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Visualizar Relatório</h2>
                    <button onClick={hideReportModal} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors"><i className="pi pi-times" style={{fontSize: '20px'}}></i></button>
                </header>

                <main className="flex-grow p-6 overflow-y-auto">
                    <div ref={reportContentRef}>
                        <ReportLayout title={title} columns={columns} data={paginatedData} />
                    </div>
                </main>

                <footer className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"><i className="pi pi-chevron-left" style={{fontSize: '16px'}}></i></button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50"><i className="pi pi-chevron-right" style={{fontSize: '16px'}}></i></button>
                    </div>
                    <button onClick={handlePrint} className="flex items-center justify-center gap-2 px-5 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors shadow-lg">
                        <i className="pi pi-print" style={{fontSize: '18px'}}></i>
                        Imprimir
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ReportModal;