import Layout from './components/layouts/Layout/Layout';
import { Outlet } from 'react-router-dom';
import { useStore } from '@/hooks/useStore.js';
import Loader from '@/components/commons/Loader/Loader.jsx';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  const authStore = useStore().auth;

  if (authStore.isLoading) {
    return (
      <div className="loaderWrapper">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
});

export default App;
