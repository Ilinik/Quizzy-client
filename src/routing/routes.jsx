import App from '../App.jsx';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage.jsx';
import QuizzesPage from '../pages/QuizzesPage/QuizzesPage.jsx';
import QuizPage from '../pages/QuizPage/QuizPage.jsx';
import ResultPage from '../pages/ResultPage/ResultPage.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import { staticLinks } from '../config/staticLinks';
import { dynamicLinks } from '../config/dynamicLinks';
import MinimalLayout from '@/components/layouts/MinimalLayout/MinimalLayout.jsx';
import WelcomePage from '../pages/WelcomePage/WelcomePage.jsx';
import RegistrationPage from '@/pages/RegistrationPage/RegistrationPage.jsx';
import LoginPage from '@/pages/LoginPage/LoginPage.jsx';
import PrivateRoute from '@/routing/PrivateRoute.jsx';
import PublicRoute from '@/routing/PublicRoute.jsx';
import CreateQuizPage from '@/pages/CreateQuizPage/CreateQuizPage.jsx';
import CreateQuestionPage from '@/pages/CreateQuestionPage/CreateQuestionPage.jsx';
import MyQuizzesPage from '@/pages/MyQuizzesPage/MyQuizzesPage.jsx';
import PlayPage from '@/pages/PlayPage/PlayPage.jsx';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { path: staticLinks.quizzes, element: <QuizzesPage /> },
          { path: staticLinks.myQuizzes, element: <MyQuizzesPage /> },
        ],
      },
    ],
  },

  {
    element: <MinimalLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { path: staticLinks.createQuiz, element: <CreateQuizPage /> },
          {
            path: dynamicLinks.createQuizQuestions,
            element: <CreateQuestionPage />,
          },
          { path: dynamicLinks.quiz, element: <QuizPage /> },
          { path: dynamicLinks.question, element: <PlayPage /> },
          { path: dynamicLinks.result, element: <ResultPage /> },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: staticLinks.welcome, element: <WelcomePage /> },
          { path: staticLinks.register, element: <RegistrationPage /> },
          { path: staticLinks.login, element: <LoginPage /> },
        ],
      },
    ],
  },

  { path: '*', element: <NotFound /> },
]);
