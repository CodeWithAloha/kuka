import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Formik } from 'formik';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';

import { Header } from '../components/Header';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const MyAccountScreen = ({ navigation, route }) => {
  const styles = useStyleSheet(themedStyles);
  const user = auth().currentUser;
  const profileRef = firestore().collection('users').doc(user.uid);
  const [profile, setProfile] = useState();

  useEffect(() => {
    (async () => {
      setProfile(await profileRef.get());
    })();
  }, []);

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout styles={styles.container}>
      <Header text="My Account" />
      {profile ? (
        <Formik
          initialValues={{ ...profile }}
          onSubmit={async values => {
            console.log(values);
            await profileRef.set({
              ...values,
            });
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <>
              <View style={styles.bodyContainer}>
                <Input
                  label="NAME"
                  style={styles.formField}
                  value={user.displayName}
                  disabled
                />
                <Input
                  label="EMAIL"
                  disabled
                  style={styles.formField}
                  value={user.email}
                />
                <Input
                  label="ZIP CODE"
                  placeholder="i.e. 96817"
                  style={styles.formField}
                  value={values.zipCode}
                  onChangeText={handleChange('zipCode')}
                />
                <Input
                  label="GROUP NAME (IF LOBBYING)"
                  placeholder="My Lobbying Group"
                  onChangeText={handleChange('lobbyGroup')}
                  value={values.lobbyGroup}
                  style={styles.formField}
                />
              </View>
              <View style={styles.bodyContainer}>
                <Button onPress={handleSubmit}>UPDATE ACCOUNT</Button>
                <Button
                  appearance="outline"
                  onPress={signOut}
                  status="basic"
                  style={{ marginTop: 10 }}
                >
                  SIGN OUT
                </Button>
              </View>
            </>
          )}
        </Formik>
      ) : (
        <ActivityIndicator />
      )}
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
