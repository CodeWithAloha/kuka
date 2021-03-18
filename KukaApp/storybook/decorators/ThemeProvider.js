import React from 'react';
import {
  ApplicationProvider as ThemeProvider,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import theme from '../../app-theme.json';

export default Story => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ThemeProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      {Story()}
    </ThemeProvider>
  </>
);
