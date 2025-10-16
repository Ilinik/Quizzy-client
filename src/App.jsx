import Layout from './components/layouts/Layout/Layout';
import { Outlet } from 'react-router-dom';
import { useStore } from '@/hooks/useStore.js';
import { useEffect } from 'react';

export default function App() {
  const authStore = useStore().auth;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      authStore.checkAuth();
    }
  }, []);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
