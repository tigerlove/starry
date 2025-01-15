import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import '@vscode/codicons/dist/codicon.css';
import Settings from './pages/Settings';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Settings />
  </React.StrictMode>
); 