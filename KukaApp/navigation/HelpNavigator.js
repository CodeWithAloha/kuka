import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HelpScreen } from '../screens/HelpScreen';

export const HelpNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator headerMode="none">
      <Screen name="My Testimonies" component={HelpScreen} />
    </Navigator>
  );
};
