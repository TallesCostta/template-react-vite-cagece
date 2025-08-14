import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import NotFound from '../../pages/PlaceholderPage';
import MainLayout from '../../shared/components/layout/MainLayout';
import IframePage from '../../shared/components/ui/IframePage';
import MenuService from '../../service/MenuService';
import { useSa2 } from 'react-sa2';
import useAppStore from '../../shared/store/appStore';
import SubMenuPage from '../../pages/SubMenuPage';

const AppRoutes: React.FC = () => {
  const menuData = useAppStore((state) => state.menuData);
  const setMenuData = useAppStore((state) => state.setMenuData);
  const { token, usuario } = useSa2();

  useEffect(() => {
    const loadMenuData = async () => {
      if (token && usuario?.usuLgnUsuario) {
        try {
          const data = await MenuService.getMenuData(token, usuario.usuLgnUsuario);
          setMenuData(data);
        } catch (error) {
          console.error("Falha ao carregar os dados do menu:", error);
        }
      }
    };

    loadMenuData();
  }, [token, usuario]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="iframe" element={<IframePage />} />
        {menuData?.rotas?.map((item) => (
          <Route
            key={item.id}
            path={item.path!}
            element={<SubMenuPage menuKey={item.path!} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;