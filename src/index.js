import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import './styles/tokens.css';

const root = createRoot(document.querySelector('#root'));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
