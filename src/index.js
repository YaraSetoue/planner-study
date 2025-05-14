import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme'; // Arquivo de tema centralizado
import { ptBR } from 'date-fns/locale';
import { setDefaultOptions } from 'date-fns';

// Configura locale padrão para date-fns
setDefaultOptions({ locale: ptBR });

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);