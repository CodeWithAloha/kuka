import React from 'react';
import {
  Icon,
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AgendaNavigator } from './AgendaNavigator';
import { TestimonyNavigator } from './TestimonyNavigator';
import { MyAccountNavigator } from './MyAccountNavigator';
import { HelpNavigator } from './HelpNavigator';

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab
      title="AGENDA"
      icon={props => <Icon {...props} name="home-outline" />}
    />
    <BottomNavigationTab
      title="TESTIMONIES"
      icon={props => <Icon {...props} name="message-circle-outline" />}
    />
    <BottomNavigationTab
      title="MY ACCOUNT"
      icon={props => <Icon {...props} name="person-outline" />}
    />
    <BottomNavigationTab
      title="HELP"
      icon={props => <Icon {...props} name="question-mark-circle-outline" />}
    />
  </BottomNavigation>
);

export const AuthNavigator = () => {
  const { Navigator, Screen } = createBottomTabNavigator();
  return (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Screen name="Agenda" component={AgendaNavigator} />
      <Screen name="Testimonies" component={TestimonyNavigator} />
      <Screen name="My Account" component={MyAccountNavigator} />
      <Screen name="Help" component={HelpNavigator} />
    </Navigator>
  );
};
