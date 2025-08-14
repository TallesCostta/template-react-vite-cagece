import { VITE_REACT_TITLE_SISTEMA, VITE_SIGLA_SISTEMA_SA2, VITE_CLIENT_ID, VITE_URL_AUTH, VITE_URL_SA2 } from './shared/constants';
import { useDarkMode } from './shared/hooks/useDarkMode';
import { useEffect } from 'react';
import { Sa2Auth } from 'react-sa2';
import { ToastProvider } from './app/providers/ToastProvider';
import AppRoutes from './app/routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';

/**
 * Componente raiz da aplicação.
 * Aplica o hook de dark mode e renderiza o roteador.
 */
function App() {
    useDarkMode();

    useEffect(() => {
        document.title = VITE_REACT_TITLE_SISTEMA;
    }, []);

    return (
        <Sa2Auth
            siglaSistema={VITE_SIGLA_SISTEMA_SA2}
            clientId={VITE_CLIENT_ID}
            urlAuth={VITE_URL_AUTH}
            urlSa2={VITE_URL_SA2}
        >
            <ToastProvider />
            <div className="min-h-screen font-sans bg-[#eff2f5] dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-500">
                <div className="relative z-10">
                    <BrowserRouter>
                    <AppRoutes />
                    </BrowserRouter>
                    
                </div>
            </div>
        </Sa2Auth>
    );
}

export default App;