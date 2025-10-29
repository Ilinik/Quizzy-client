import { Header } from '@/components/commons/Header/Header.jsx';
import Loader from '@/components/commons/Loader/Loader.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@/hooks/useStore.js';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const QuizPage = observer(() => {
  const quizId = useParams().quizId;
  const quizStore = useStore().quiz;
  const navigate = useNavigate();

  useEffect(() => {
    quizStore.loadQuiz(quizId);
  }, [quizId]);

  if (quizStore.isLoading || !quizStore.currentQuiz) {
    return <Loader />;
  }

  return (
    <div>
      <Header showSearch={false} />
    </div>
  );
});

export default QuizPage;
