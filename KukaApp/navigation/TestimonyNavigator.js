import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TestimoniesScreen } from '../screens/TestimoniesScreen';
import { AgendaItemScreen } from '../screens/AgendaItemScreen';

export const TestimonyNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Testimony History" component={TestimoniesScreen} />
      <Screen name="Agenda Item" component={AgendaItemScreen} />
    </Navigator>
  );
};
