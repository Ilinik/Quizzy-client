import App from '../App.jsx';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage.jsx';
import QuizzesPage from '../pages/QuizesPage/QuizesPage.jsx';
import QuizPage from '../pages/QuizPage/QuizPage.jsx';
import ResultPage from '../pages/ResultPage/ResultPage.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import { staticLinks } from '../config/staticLinks';
import { dynamicLinks } from '../config/dynamicLinks';
import MinimalLayout from '@/components/layouts/MinimalLayout/MinimalLayout.jsx';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: staticLinks.main, element: <HomePage /> },
      { path: staticLinks.quizzes, element: <QuizzesPage /> },
      { path: dynamicLinks.quiz, element: <QuizPage /> },
      { path: dynamicLinks.result, element: <ResultPage /> },
    ],
  },
  {
    element: <MinimalLayout />,
    children: [{ path: '*', element: <NotFound /> }],
  },
]);
