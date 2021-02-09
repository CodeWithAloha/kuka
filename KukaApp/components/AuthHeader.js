import React from 'react';
import KukaLogo from '../assets/images/kuka_logo_no_text.svg';
import { StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';

export const AuthHeader = ({ titleText, leadText }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.headerContainer}>
      <KukaLogo width={103} height={81} />
      <Text category="h1" status="control" style={styles.titleText}>
        {titleText}
      </Text>
      <Text style={styles.leadText} category="s1" status="control">
        {leadText}
      </Text>
    </View>
  );
};

const themedStyles = StyleService.create({
  headerContainer: {
    padding: 24,
    minHeight: 234,
    backgroundColor: 'color-primary-default',
  },
  titleText: {
    marginTop: 16,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    fontSize: 30,
  },
  leadText: {
    marginTop: 3,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    fontWeight: '400',
  },
});
