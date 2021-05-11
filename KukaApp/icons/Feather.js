import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export const FeatherIconsPack = {
  name: 'feather',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy(
    {},
    {
      get(target, name) {
        return IconProvider(name);
      },
    }
  );
}

const IconProvider = name => ({
  toReactElement: props => FeatherIcon({ name, ...props }),
});

function FeatherIcon(props) {
  const { name, style } = props;
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  let size = height;
  if (props.size) {
    size = props.size;
    iconStyle.width = size;
    iconStyle.height = size;
  }
  return <Icon name={name} size={size} color={tintColor} style={iconStyle} />;
}
