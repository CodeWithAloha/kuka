import React from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
} from '@ui-kitten/components';

const BackIcon = props => <Icon {...props} name="arrow-back" />;

const BackAction = navigation => {
  return <TopNavigationAction onPress={navigation.goBack} icon={BackIcon} />;
};

export const TopNav = ({ navigation, route, noBackButton }) => {
  return (
    <TopNavigation
      accessoryLeft={() => (noBackButton ? null : BackAction(navigation))}
      title={route.name}
      alignment="center"
    />
  );
};
