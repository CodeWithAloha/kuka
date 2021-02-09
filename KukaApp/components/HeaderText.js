import React from 'react';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';

const themedStyles = StyleService.create({
  headerContainer: {
    backgroundColor: 'color-primary-default',
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    fontSize: 26,
    paddingTop: 20,
    paddingLeft: 18,
    paddingBottom: 10,
  },
});

export const HeaderText = ({ text }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Text style={styles.headerContainer} status="control" category="h2">
      {text}
    </Text>
  );
};
