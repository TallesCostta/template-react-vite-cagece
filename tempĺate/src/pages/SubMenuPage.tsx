// src/pages/SubMenuPage.tsx
import { FC } from 'react';
import { subMenus } from '../app/routes/mockData';
import PageHeader from '../shared/components/ui/PageHeader';
import ModuleCard from '../shared/components/ui/ModuleCard';
import useAppStore from '../shared/store/appStore';

interface SubMenuPageProps {
    menuKey: string;
}

const SubMenuPage: FC<SubMenuPageProps> = ({ menuKey }) => {
    const menuData = useAppStore((state) => state.menuData);
    const subMenuData = menuData?.subMenus?.[menuKey] || { title: "Menu não encontrado", icon: 'pi pi-exclamation-triangle', items: [] };

    return (
        <div className="animate-fade-in">
            <PageHeader title={subMenuData.title} icon={subMenuData.icon} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-8">
                {subMenuData.items.map((item, index) => (
                    <ModuleCard 
                        key={item.id} 
                        icon={item.icon} 
                        title={item.titulo} 
                        delay={index} 
                        path={item.path} 
                    />
                ))}
            </div>
        </div>
    );
};

export default SubMenuPage;
