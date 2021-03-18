import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { withKnobs } from '@storybook/addon-knobs';
import { loadStories } from './storyLoader';
import StoryScreen from './components/StoryScreen';
import * as React from 'react';
import ThemeProvider from './decorators/ThemeProvider';
import './rn-addons';

// enables knobs for all stories
addDecorator(withKnobs);
// Add our Screen wrapper to all stories
addDecorator(story => <StoryScreen>{story()}</StoryScreen>);
// UI Library Provider
addDecorator(ThemeProvider);

// import stories
configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
export const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

export default StorybookUIRoot;
