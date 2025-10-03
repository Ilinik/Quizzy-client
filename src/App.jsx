import Layout from './components/layouts/Layout/Layout';
import { StoreProvider } from '@/components/providers/StoreProvider.jsx';

export default function App() {
  return (
    <StoreProvider>
      <Layout />
    </StoreProvider>
  );
}
