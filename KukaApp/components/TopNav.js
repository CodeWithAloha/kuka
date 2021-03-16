import React from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  useTheme,
} from '@ui-kitten/components';

const BackIcon = props => {
  const theme = useTheme();
  return <Icon {...props} name="arrow-back" fill={theme['color-white']} />;
};

const BackAction = navigation => {
  return <TopNavigationAction onPress={navigation.goBack} icon={BackIcon} />;
};

export const TopNav = ({ navigation, route, noBackButton }) => {
  const theme = useTheme();
  return (
    <TopNavigation
      style={{ backgroundColor: theme['color-primary-default'] }}
      accessoryLeft={() => (noBackButton ? null : BackAction(navigation))}
      alignment="center"
    />
  );
};
