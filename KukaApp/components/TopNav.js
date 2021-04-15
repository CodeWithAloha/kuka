import React from 'react';
import { View } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  useTheme,
  Text,
} from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BackIcon = props => {
  const theme = useTheme();
  return <Icon {...props} name="arrow-back" fill={theme['color-white']} />;
};

const BackAction = navigation => {
  return <TopNavigationAction onPress={navigation.goBack} icon={BackIcon} />;
};

export const TopNav = ({ navigation, title }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  // taking this approach because the verticalPadding in TopNavigation cannot be overriden by topPadding
  return (
    <View
      style={{
        paddingTop: insets.top,
        backgroundColor: theme['color-primary-default'],
      }}
    >
      <TopNavigation
        style={{
          backgroundColor: theme['color-primary-default'],
        }}
        accessoryLeft={() => BackAction(navigation)}
        title={title ? <Text appearance="alternative">{title}</Text> : null}
        alignment="center"
      />
    </View>
  );
};
