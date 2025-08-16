// src/pages/PlaceholderPage.tsx
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../shared/components/ui/PageHeader';
import { modules, subMenus } from '../app/routes/mockData';

const PlaceholderPage: FC = () => {
    const location = useLocation();
    
    // Encontra o título da página atual nos menus e submenus
    const allItems = [...modules, ...Object.values(subMenus).flatMap(menu => menu.items)];
    const currentItem = allItems.find(item => item.path === location.pathname);
    const title = currentItem ? currentItem.title : "Página não encontrada";

    return (
        <div className="animate-fade-in">
            <PageHeader title={title} />
            <div className="flex flex-col items-center justify-center text-center p-16 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 dark:border-slate-700/80">
                <i className="pi pi-box text-cyan-500 mb-6" style={{ fontSize: '64px' }}></i>
                <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">Em Desenvolvimento</h2>
                <p className="mt-2 max-w-md text-slate-500 dark:text-slate-400">
                    Esta funcionalidade está a ser preparada e estará disponível em breve. Agradecemos a sua compreensão.
                </p>
            </div>
        </div>
    );
};

export default PlaceholderPage;
