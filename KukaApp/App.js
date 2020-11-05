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
import {
  ApplicationProvider,
  IconRegistry,
  useTheme,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginScreen } from './screens/LoginScreen';
import { EmailScreen } from './screens/EmailScreen';
import { AgendaItemsScreen } from './screens/AgendaItemsScreen';
import { AgendaScreen } from './screens/AgendaScreen';
import { CameraScreen } from './screens/CameraScreen';

GoogleSignin.configure({
  webClientId:
    '921635578637-ma0i915tikp1q0v9q9gmfuefvd8grom6.apps.googleusercontent.com',
});

export default () => {
  const { Navigator, Screen } = createStackNavigator();
  const theme = useTheme();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    return auth().onAuthStateChanged(authUser => {
      return authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
  });

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <SafeAreaProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: theme['background-basic-color-2'],
            }}
          >
            <NavigationContainer>
              <Navigator headerMode="none">
                {authUser ? (
                  <>
                    <Screen
                      name="Agenda Items"
                      component={AgendaItemsScreen}
                    ></Screen>
                    <Screen name="Agenda" component={AgendaScreen}></Screen>
                    <Screen name="Camera" component={CameraScreen}></Screen>
                  </>
                ) : (
                  <>
                    <Screen name="Login" component={LoginScreen} />
                    <Screen name="Email" component={EmailScreen} />
                  </>
                )}
              </Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};
