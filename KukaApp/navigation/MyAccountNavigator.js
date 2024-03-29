import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyAccountScreen } from '../screens/MyAccountScreen';

export const MyAccountNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="My Account" component={MyAccountScreen} />
    </Navigator>
  );
};
