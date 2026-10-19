import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import OddaCaseStudy from './pages/OddaCaseStudy';
import './styles.css';

const isOddaCaseStudy = window.location.pathname.replace(/\/$/, '') === '/work/odda-care';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isOddaCaseStudy ? <OddaCaseStudy /> : <App />}
  </React.StrictMode>,
);
