import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Button,
  StyleService,
  Text,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';
import { differenceInCalendarDays, format } from 'date-fns';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TopNav } from '../components/TopNav';
import { IconText } from '../components/IconText';
import { Header } from '../components/Header';

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
    launchCamera(
      {
        mediaType: 'video',
        videoQuality: 'high',
        durationLimit: 90,
        saveToPhotos: true,
      },
      res => {
        if (!res.didCancel) {
          navigation.navigate('Review Testimony', {
            agendaId: route.params.id,
            uri: res.assets[0].uri,
          });
        }
      }
    );
  };

  const openLibrary = () => {
    launchImageLibrary({ mediaType: 'video', durationLimit: 90 }, res => {
      if (!res.didCancel) {
        navigation.navigate('Review Testimony', {
          agendaId: route.params.id,
          uri: res.assets[0].uri,
        });
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <TopNav {...{ navigation, route }} />
      <ScrollView>
        <Header text={route.params.title} />
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
          <Text style={{ fontWeight: '500', marginTop: 16 }} appearance="hint">
            {`Hearing on ${format(
              sessionDate,
              'MMMM d, yyyy'
            )} (${sessionDays}d ${deadlineDays ? 'from now' : 'ago'})\n`}
          </Text>
          <Text>{route.params.description}</Text>
        </View>
      </ScrollView>
      {navigation.getState().routeNames[0] === 'Agenda Items' && (
        <View
          style={{
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            onPress={record}
            accessoryLeft={props => <Icon {...props} name="video-outline" />}
          >
            Record
          </Button>
          <Button
            appearance="outline"
            onPress={openLibrary}
            accessoryLeft={props => <Icon {...props} name="folder-outline" />}
          >
            Choose...
          </Button>
        </View>
      )}
    </View>
  );
};
