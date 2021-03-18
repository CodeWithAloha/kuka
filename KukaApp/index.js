/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { STORYBOOK } from '@env';

// Should we show storybook instead of our app?
let RootComponent = App;
if (STORYBOOK === 'true') {
  // Only include Storybook if we're in dev mode
  const { StorybookUIRoot } = require('./storybook');
  RootComponent = StorybookUIRoot;
}

AppRegistry.registerComponent(appName, () => RootComponent);
