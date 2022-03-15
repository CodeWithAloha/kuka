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
    <Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Screen name="Agenda Navigator" component={AgendaNavigator} />
      <Screen name="Testimony Navigator" component={TestimonyNavigator} />
      <Screen name="My Account Navigator" component={MyAccountNavigator} />
      <Screen name="Help Navigator" component={HelpNavigator} />
    </Navigator>
  );
};
