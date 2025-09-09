import App from '../App.jsx';
import { createBrowserRouter } from 'react-router-dom';
import { staticLinks } from '../config/staticLinks';
import { dynamicLinks } from '../config/dynamicLinks';
import { HomePage } from '../pages/HomePage/HomePage';
import { QuizesPage } from '../pages/QuizesPage/QuizesPage.jsx';
import { QuizPage } from '../pages/QuizPage/QuizPage';
import { ResultPage } from '../pages/ResultPage/ResultPage';

export const router = createBrowserRouter([
  {
    path: staticLinks.main,
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: staticLinks.quizes, Component: QuizesPage },
      { path: dynamicLinks.quiz, Component: QuizPage },
      { path: dynamicLinks.result, Component: ResultPage },
    ],
  },
]);
