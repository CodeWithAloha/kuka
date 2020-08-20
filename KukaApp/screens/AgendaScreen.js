import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';

export const AgendaScreen = () => {
  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Agenda</Text>
    <Button onPress={signOut}>Sign Out</Button>
  </ Layout>
}