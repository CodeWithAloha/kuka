import React from 'react';
import auth from '@react-native-firebase/auth';
import { View } from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { HeaderText } from '../components/HeaderText';

export const MyAccountScreen = ({ navigation, route }) => {
  const styles = useStyleSheet(themedStyles);

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveProfile = async() => {

  }

  return (
    <Layout styles={styles.container}>
      <HeaderText text="My Account" />
      <View style={styles.bodyContainer}>
        <Input
          label="NAME"
          placeholder="e.g. John Smith"
          style={styles.formField}
        />
        <Input
          label="EMAIL"
          placeholder="Email"
          disabled
          style={styles.formField}
        />
        <Input
          label="ZIP CODE"
          placeholder="i.e. 96817"
          style={styles.formField}
        />
        <Input
          label="GROUP NAME (IF LOBBYING)"
          placeholder="My Lobbying Group"
          style={styles.formField}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Button onPress={handleSaveProfile}>UPDATE ACCOUNT</Button>
        <Button
          appearance="outline"
          onPress={signOut}
          status="basic"
          style={{ marginTop: 10 }}
        >
          SIGN OUT
        </Button>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'red',
  },
  headerContainer: {
    padding: 24,
    minHeight: 234,
    backgroundColor: 'color-primary-default',
  },
  title: {
    marginTop: 16,
    fontWeight: '700',
    fontFamily: 'OpenSans-Bold',
    fontSize: 30,
  },
  formField: {
    marginTop: 10,
  },
  bodyContainer: {
    padding: 24,
  },
});
