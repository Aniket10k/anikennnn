import { createRoot } from 'react-dom/client';
import {createHashRouter, RouterProvider } from "react-router-dom";
import App from './components/App';
import TicTacToe from './components/tic-tac-toe/TicTacToe';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';


const router = createHashRouter([
  {
    path: "/anikennnn",
    element: (<App />),
  },
  {
    path: "/anikennnn/tic-tac-toe",
    element: <TicTacToe />
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
