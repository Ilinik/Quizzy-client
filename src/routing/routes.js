import { createBrowserRouter } from 'react-router-dom';
import { staticLinks } from '../config/staticLinks';
import { dynamicLinks } from '../config/dynamicLinks';

import App from '../App.jsx';
import { HomePage } from '../pages/HomePage/HomePage';
import { QuizPage } from '../pages/QuizPage/QuizPage';
import { ResultPage } from '../pages/ResultPage/ResultPage';

export const router = createBrowserRouter([
  {
    path: staticLinks.main,
    Component: App,
    children: [
      { index: true, Component: HomePage },
      { path: dynamicLinks.quiz, Component: QuizPage },
      { path: dynamicLinks.result, Component: ResultPage },
    ],
  },
]);
