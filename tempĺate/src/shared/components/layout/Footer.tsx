import { FC } from 'react';
import { VITE_VERSION_SISTEMA, VITE_BUILD_NUMBER } from '../../constants';

const Footer: FC = () => {
    return (
        <footer className="text-center py-4">
            <p className="text-slate-500 dark:text-slate-400 text-[10px] opacity-40">
                © {new Date().getFullYear()} CAGECE. Todos os direitos reservados. | 
                <a 
                    href="#" 
                    onClick={(e) => e.preventDefault()} 
                    className="text-cyan-600 dark:text-cyan-400 hover:underline ml-1"
                >
                    Política de Privacidade
                </a>
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-[9px] opacity-40">
            Versão: {VITE_VERSION_SISTEMA}  Build: {VITE_BUILD_NUMBER}
            </p>
        </footer>
    );
};

export default Footer;