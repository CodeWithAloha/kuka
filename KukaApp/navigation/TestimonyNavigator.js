import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TestimoniesScreen } from '../screens/TestimoniesScreen';

export const TestimonyNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator headerMode="none">
      <Screen name="My Testimonies" component={TestimoniesScreen} />
    </Navigator>
  );
};
