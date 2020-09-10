import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
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
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarProvider
          dense
          maxSnack={3}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Router history={history}>
            <AuthProvider>
              <ScrollReset />
              {renderRoutes(routes)}
            </AuthProvider>
          </Router>
        </SnackbarProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
