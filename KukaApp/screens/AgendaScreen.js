import React from 'react';
import { ScrollView } from 'react-native';
import {
  Button,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { differenceInCalendarDays, format } from 'date-fns';
import { TopNav } from '../components/TopNav';
import { IconText } from '../components/IconText';
import { HeaderText } from '../components/HeaderText';

const themedStyles = StyleService.create({
  headerIcon: {
    paddingLeft: 16,
    paddingBottom: 16,
    backgroundColor: 'color-primary-default',
  },
});

export const AgendaScreen = ({ navigation, route }) => {
  const styles = useStyleSheet(themedStyles);
  const { deadlineTime, sessionTime } = route.params;
  // TODO: deadline should be a couple business days before session
  const deadlineDate = new Date(sessionTime.toDate());
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

  return (
    <Layout level="2" style={{ flex: 1 }}>
      <TopNav title={route.params.title} {...{ navigation, route }} />
      <Layout>
        <HeaderText text={route.params.title} />
        <IconText name="book-outline" style={styles.headerIcon}>
          {route.params.billCode}
        </IconText>
        {!!deadlineDays && (
          <IconText name="clock-outline" style={styles.headerIcon}>
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
        <Button>Record Testimony</Button>
        {/* sign out button is temporary for testing purposes*/}
      </ScrollView>
    </Layout>
  );
};
