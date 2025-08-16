// src/api/mockData.ts
import { Module, SubMenu } from '../../shared/types';

export const modules: Module[] = [
  { id: 'exemplo', titulo: "Exemplo", icon: 'pi pi-box', path: '', hasSubMenu: true },
];

export const subMenus: Record<string, SubMenu> = {
    'exemplo': {
            titulo: "Exemplo",
            icon: 'pi pi-box',
            items: [
                { id: 'acessarHome', titulo: "Acessar a Home", icon: 'pi pi-box', path: '' }
            ]
        },
};
