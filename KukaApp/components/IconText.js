import React from 'react';
import { View } from 'react-native';
import { Text, Icon, useTheme } from '@ui-kitten/components';

export const IconText = ({
  name,
  children,
  style,
  textAppearance = 'hint',
  iconFill = 'text-hint-color',
}) => {
  const theme = useTheme();

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      <Icon
        name={name}
        width={22}
        height={22}
        fill={theme[iconFill]}
        style={{ marginRight: 8 }}
      />
      <Text appearance={textAppearance}>{children}</Text>
    </View>
  );
};
