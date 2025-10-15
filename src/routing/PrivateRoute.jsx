import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import { staticLinks } from '@/config/staticLinks.js';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = observer(() => {
  const { isAuth } = useStore().auth;

  return isAuth ? <Outlet /> : <Navigate to={staticLinks.welcome} />;
});

export default PrivateRoute;
