import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { StoreProvider } from '@/components/providers/StoreProvider.jsx';
import { router } from './routing/routes.jsx';

import './assets/styles/main.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </StrictMode>,
);
