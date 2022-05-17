import React from 'react';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const themedStyles = StyleService.create({
  headerContainer: {
    backgroundColor: 'color-primary-default',
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    fontSize: 26,
    paddingLeft: 18,
    paddingBottom: 10,
  },
});

export const Header = ({ inset, text }) => {
  const insets = useSafeAreaInsets();
  const styles = useStyleSheet(themedStyles);

  return (
    <Text
      style={{
        ...styles.headerContainer,
        paddingTop: inset ? insets.top : null,
      }}
      category="h2"
      appearance="alternative"
    >
      {text}
    </Text>
  );
};
