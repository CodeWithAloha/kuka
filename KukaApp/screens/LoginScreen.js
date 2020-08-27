import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Layout, Text, Input, Button} from '@ui-kitten/components';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

export const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [message, setMessage] = useState(null);

  const emailSignIn = async () => {
    try {
      setMessage(null);
      setInProgress(true);
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setMessage(error.message);
      console.error(error);
      setInProgress(false);
    }
  };

  const onGoogleSignIn = async () => {
    try {
      setMessage(null);
      setInProgress(true);
      const {idToken} = await GoogleSignin.signIn();
      const cred = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(cred);
    } catch (error) {
      setMessage(error.message);
      console.error(error);
      setInProgress(false);
    }
  };

  const onFacebookSignIn = async () => {
    try {
      setMessage(null);
      setInProgress(true);

      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      const cred = auth.FacebookAuthProvider.credential(data.accessToken);

      await auth().signInWithCredential(cred);
    } catch (error) {
      setMessage(error.message);
      console.error(error);
      setInProgress(false);
    }
  };

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Input
        value={email}
        label="EMAIL"
        placeholder="Email"
        onChangeText={(nextValue) => setEmail(nextValue)}
      />
      <Input
        value={password}
        label="PASSWORD"
        placeholder="Password"
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button onPress={emailSignIn} disabled={inProgress}>
        Sign In
      </Button>
      <GoogleSigninButton
        onPress={() => onGoogleSignIn()}
        disabled={inProgress}
      />
      <Button onPress={() => onFacebookSignIn()} disabled={inProgress}>
        Facebook
      </Button>
      <Text>
        Don't have an account?{' '}
        <Text status="primary" onPress={() => navigation.navigate('Email')}>
          Sign Up
        </Text>
      </Text>
      {message && <Text>{message}</Text>}
    </Layout>
  );
};
