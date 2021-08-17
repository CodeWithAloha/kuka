import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AgendaItemsScreen } from '../screens/AgendaItemsScreen';
import { AgendaScreen } from '../screens/AgendaScreen';
import { ReviewScreen } from '../screens/ReviewScreen';

export const AgendaNavigator = () => {
  const { Navigator, Screen } = createStackNavigator();
  return (
    <Navigator headerMode="none">
      <Screen name="Agenda Items" component={AgendaItemsScreen} />
      <Screen name="Agenda" component={AgendaScreen} />
      <Screen name="Review Testimony" component={ReviewScreen} />
    </Navigator>
  );
};
