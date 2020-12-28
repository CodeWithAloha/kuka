/**
 * Kuka React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginScreen } from './screens/LoginScreen';
import { EmailScreen } from './screens/EmailScreen';
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen';
import { EnterTheCodeScreen } from './screens/EnterTheCodeScreen';
import { AuthNavigator } from './navigation/AuthNavigator';
import { NewPasswordScreen } from './screens/NewPasswordScreen';
import { default as theme } from './app-theme.json';
import { default as mapping } from './app-mapping.json';

GoogleSignin.configure({
  webClientId:
    '921635578637-ma0i915tikp1q0v9q9gmfuefvd8grom6.apps.googleusercontent.com',
});

export default () => {
  const { Navigator, Screen } = createStackNavigator();
  // const theme = useTheme();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    return auth().onAuthStateChanged(authUser => {
      return authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
  });

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: theme['background-basic-color-2'],
            }}
          >
            <StatusBar />
            <NavigationContainer>
              {authUser ? (
                <AuthNavigator />
              ) : (
                <Navigator headerMode="none">
                  <Screen name="Login" component={LoginScreen} />
                  <Screen name="Email" component={EmailScreen} />
                  <Screen
                    name="Forgot Password"
                    component={ForgotPasswordScreen}
                  />
                  <Screen
                    name="Enter the code"
                    component={EnterTheCodeScreen}
                  />
                  <Screen name="New Password" component={NewPasswordScreen} />
                </Navigator>
              )}
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};
