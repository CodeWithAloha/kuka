import React from 'react';
import { ScrollView } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import { differenceInCalendarDays, format } from 'date-fns';
import { TopNav } from '../components/TopNav';
import { IconText } from '../components/IconText';

export const AgendaScreen = ({ navigation, route }) => {
  console.log(route.params);

  const deadlineDays = differenceInCalendarDays(
    new Date(route.params.deadlineTime.toDate()),
    new Date()
  );

  const sessionDays = differenceInCalendarDays(
    new Date(route.params.sessionTime.toDate()),
    new Date()
  );

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout level="2" style={{ flex: 1 }}>
      <TopNav title={route.params.title} {...{ navigation, route }} />
      <Layout style={{ padding: 16 }}>
        <Text>{route.params.title}</Text>
        <IconText name="book-outline" style={{ marginTop: 16 }}>
          {route.params.billCode}
        </IconText>
        <IconText name="clock-outline" style={{ marginTop: 16 }}>
          {deadlineDays + ' days left to sumbit testimony'}
        </IconText>
      </Layout>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text>
          {'Hearing on ' +
            format(route.params.sessionTime.toDate(), 'MMMM d, yyyy') +
            ' (' +
            sessionDays +
            ' days from now)'}
        </Text>
        <Text>{route.params.description}</Text>
        <Button>Record Testimony</Button>
        {/* sign out button is temporary for testing purposes*/}
        <Button onPress={signOut}>Sign Out</Button>
      </ScrollView>
    </Layout>
  );
};
