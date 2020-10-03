import React from 'react';
import { View } from 'react-native';
import { Text, Icon, useTheme } from '@ui-kitten/components';

export const IconText = ({ name, children, style, ...rest }) => {
  const theme = useTheme();

  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      <Icon
        name={name}
        width={24}
        height={24}
        fill={theme['text-hint-color']}
        style={{ marginRight: 8 }}
      />
      <Text>{children}</Text>
    </View>
  );
};
