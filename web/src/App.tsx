import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import ScrollReset from './components/ScrollReset';
import { AuthProvider } from './contexts/AuthContext';
import { createTheme } from './theme';
import routes, { renderRoutes } from './routes';

const history = createBrowserHistory();

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <SnackbarProvider
          dense
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <AuthProvider>
            <Router history={history}>
              <ScrollReset />
              {renderRoutes(routes)}
            </Router>
          </AuthProvider>
        </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
