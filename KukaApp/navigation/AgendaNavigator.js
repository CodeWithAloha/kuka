import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AgendaItemsScreen } from '../screens/AgendaItemsScreen';
import { AgendaItemScreen } from '../screens/AgendaItemScreen';
import { ReviewScreen } from '../screens/ReviewScreen';

export const AgendaNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Agenda Items" component={AgendaItemsScreen} />
      <Screen name="Agenda Item" component={AgendaItemScreen} />
      <Screen name="Review Testimony" component={ReviewScreen} />
    </Navigator>
  );
};
