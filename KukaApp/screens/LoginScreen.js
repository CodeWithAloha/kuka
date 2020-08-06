import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Layout, Text } from '@ui-kitten/components';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

export const LoginScreen = () => {
  const [inProgress, setInProgress] = useState(false);

  const onGoogleSignIn = async () => {
    try {
      setInProgress(true);
      const { idToken } = await GoogleSignin.signIn();
      const cred = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(cred);
    } catch (error) {
      console.error(error);
      setInProgress(true);
    }
  }

  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Login Screen</Text>
    <GoogleSigninButton onPress={() => onGoogleSignIn()} disabled={inProgress} />
  </Layout>
}