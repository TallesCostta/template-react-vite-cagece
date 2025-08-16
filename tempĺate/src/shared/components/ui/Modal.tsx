import React, { FC } from 'react';

interface ModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
}

/**
 * Componente de modal para exibir alertas e notificações ao usuário.
 */
const Modal: FC<ModalProps> = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 md:p-8 max-w-sm w-full text-center" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Aviso do Sistema</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">{message}</p>
                <button onClick={onClose} className="absolute top-2 right-2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full transition-colors"><i className="pi pi-times" style={{ fontSize: '20px' }}></i></button>
                <button onClick={onClose} className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-semibold">Fechar</button>
            </div>
        </div>
    );
};

export default Modal;