import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TestimoniesScreen } from '../screens/TestimoniesScreen';
import { AgendaScreen } from '../screens/AgendaScreen';

export const TestimonyNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Testimony History" component={TestimoniesScreen} />
      <Screen name="Agenda" component={AgendaScreen} />
    </Navigator>
  );
};
