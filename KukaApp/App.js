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
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginScreen } from './screens/LoginScreen';
import { AgendaScreen } from './screens/AgendaScreen';

GoogleSignin.configure({ webClientId: '921635578637-ma0i915tikp1q0v9q9gmfuefvd8grom6.apps.googleusercontent.com' });

export default () => {
  const { Navigator, Screen } = createStackNavigator();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    return auth().onAuthStateChanged(
      authUser => {
        return authUser ? setAuthUser(authUser) : setAuthUser(null);
      }
    )
  });

  return <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigator>{authUser ?
            <Screen name="Agenda" component={AgendaScreen}></Screen> :
            <Screen name="Login" component={LoginScreen} />
          }
          </Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ApplicationProvider>
  </>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
