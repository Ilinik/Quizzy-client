import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import { staticLinks } from '@/config/staticLinks.js';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = observer(() => {
  const { isAuth } = useStore().auth;

  return !isAuth ? <Outlet /> : <Navigate to={staticLinks.main} />;
});

export default PublicRoute;
