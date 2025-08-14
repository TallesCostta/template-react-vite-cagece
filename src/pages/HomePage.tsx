// src/pages/HomePage.tsx
import { FC } from "react";
import useAppStore from "../shared/store/appStore";
import ModuleCard from "../shared/components/ui/ModuleCard";

const HomePage: FC = () => {
    const searchTerm = useAppStore((state) => state.searchTerm);
    const menuData = useAppStore((state) => state.menuData);

    const filteredModules = menuData?.modulos?.filter(module =>
        module.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8">
                {menuData?.modulos?.map((module, index) => (
                    <ModuleCard 
                        key={module.id} 
                        icon={module.icon} 
                        title={module.titulo} 
                        delay={index} 
                        path={module.path!} 
                    />
                ))}
                {menuData?.modulos?.length === 0 && (
                    <div className="col-span-full text-center py-16 bg-white/50 dark:bg-slate-800/50 rounded-lg shadow-md">
                        <i className="pi pi-search mx-auto text-gray-400 dark:text-gray-500" style={{ fontSize: "48px" }}></i>
                        <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Nenhum módulo encontrado</h3>
                        <p className="mt-1 text-gray-500 dark:text-gray-400">Tente ajustar os seus termos de pesquisa.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;