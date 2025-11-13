import { WhiteTile } from '../../components/commons/WhiteTile/WhiteTile';
import PageTitle from '@/components/commons/PageTitle/PageTitle.jsx';

const HomePage = () => {
  return (
    <WhiteTile>
      <PageTitle
        title="Главная страница"
        subtitle="Следите за прогрессом, улучшайте результаты и проходите новые квизы"
      />
    </WhiteTile>
  );
};

export default HomePage;
