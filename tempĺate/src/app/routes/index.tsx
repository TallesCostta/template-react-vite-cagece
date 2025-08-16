// src/routes/index.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../../shared/components/layout/MainLayout';
import HomePage from '../../pages/HomePage';
import IframePage from '../../shared/components/ui/IframePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'iframe', element: <IframePage /> },
        ],
    },
]);

export const AppRouter = () => <RouterProvider router={router} />;