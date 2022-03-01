import { createTheme as createMuiTheme } from '@material-ui/core/styles';
import type { Theme as MuiTheme } from '@material-ui/core/styles';
import type {
  Palette as MuiPalette,
  TypeBackground as MuiTypeBackground,
} from '@material-ui/core/styles/createPalette';

interface Palette extends MuiPalette {
  background: MuiTypeBackground;
}

export interface Theme extends MuiTheme {
  name: string;
  palette: Palette;
}

interface ThemeOptions {
  typography?: Record<string, any>;
  overrides?: Record<string, any>;
  palette?: Record<string, any>;
}

const themesOptions: ThemeOptions = {
  typography: {
    h1: {
      fontWeight: 400,
      fontSize: 40,
    },
    h2: {
      fontWeight: 400,
      fontSize: 30,
    },
    h3: {
      fontWeight: 400,
      fontSize: 24,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 16,
    },
    h6: {
      fontSize: 14,
    },

  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          '-moz-osx-font-smoothing': 'grayscale',
          height: '100%',
          width: '100%',
          WebkitFontSmoothing: 'antialiased',
        },
        body: {
          height: '100%',
          width: '100%',
        },
        '#root': {
          height: '100%',
          width: '100%',
        },
      },
    },
    MuiLinearProgress: {
      root: {
        overflow: 'hidden',
      },
    },
  },
  palette: {
    primary: {
      main: '#5D1B45',
    },
    secondary: {
      main: '#0089A8',
    },

  },
};

export const createTheme = () => createMuiTheme(
  themesOptions,
);
