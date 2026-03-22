import Loader from '@/components/commons/Loader/Loader.jsx';
import { useStore } from '@/hooks/useStore.js';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import Layout from './components/layouts/Layout/Layout';

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
