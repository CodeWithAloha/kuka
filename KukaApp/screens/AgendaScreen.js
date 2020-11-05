import React from 'react';
import { ScrollView } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import { differenceInCalendarDays, format } from 'date-fns';
import { TopNav } from '../components/TopNav';
import { IconText } from '../components/IconText';

export const AgendaScreen = ({ navigation, route }) => {
  const { deadlineTime, sessionTime } = route.params;
  const deadlineDate = new Date(deadlineTime.toDate());
  const sessionDate = new Date(sessionTime.toDate());

  const now = new Date();
  let deadlineDays;
  let sessionDays;
  if (now < deadlineDate) {
    deadlineDays = differenceInCalendarDays(deadlineDate, now);
    sessionDays = differenceInCalendarDays(sessionDate, now);
  } else {
    sessionDays = differenceInCalendarDays(now, sessionDate);
  }

  const record = () => {
    navigation.navigate('Camera');
  };

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
        {!!deadlineDays && (
          <IconText name="clock-outline" style={{ marginTop: 16 }}>
            {deadlineDays + ' days left to submit testimony'}
          </IconText>
        )}
      </Layout>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text>{`Hearing on ${format(
          sessionDate,
          'MMMM d, yyyy'
        )} (${sessionDays}d ${deadlineDays ? 'from now' : 'ago'})\n`}</Text>
        <Text>{route.params.description}</Text>
        <Button onPress={record}>Record Testimony</Button>
        {/* sign out button is temporary for testing purposes*/}
        <Button onPress={signOut}>Sign Out</Button>
      </ScrollView>
    </Layout>
  );
};
