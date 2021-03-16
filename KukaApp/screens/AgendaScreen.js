import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
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

  const record = () => {
    navigation.navigate('Camera');
  };

  return (
    <ScrollView>
      <TopNav title={route.params.title} {...{ navigation, route }} />
      <HeaderText text={route.params.title} />
      <IconText
        name="book-outline"
        style={styles.headerIcon}
        iconFill="color-white"
        textAppearance="alternative"
      >
        {route.params.billCode}
      </IconText>
      {!!deadlineDays && (
        <IconText
          name="clock-outline"
          style={styles.headerIcon}
          iconFill="color-white"
          textAppearance="alternative"
        >
          {deadlineDays + ' days left to submit testimony'}
        </IconText>
      )}
      <View style={{ padding: 16 }}>
        <Button onPress={record}>RECORD TESTIMONY</Button>
        <Text style={{ fontWeight: '500', marginTop: 16 }} appearance="hint">
          {`Hearing on ${format(
            sessionDate,
            'MMMM d, yyyy'
          )} (${sessionDays}d ${deadlineDays ? 'from now' : 'ago'})\n`}
        </Text>
        <Text>{route.params.description}</Text>
        <Button onPress={record}>RECORD TESTIMONY</Button>
      </View>
    </ScrollView>
  );
};
