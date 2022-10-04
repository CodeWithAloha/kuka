import React from 'react';
import { View } from 'react-native';
import {
  Button,
  Divider,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { format } from 'date-fns';
import TestimonyStatusIcon from './TestimonyStatusIcon';
import BookIcon from '../../assets/images/book.svg';

/**
 *
 * @param title
 * @param billCode
 * @param position
 * @returns {JSX.Element}
 */
const Header = ({ title, billCode, position }) => {
  return (
    <View style={{ padding: 20, display: 'flex', flexDirection: 'row' }}>
      <View style={{ width: '90%' }}>
        <Text category="h6">{title}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 2 }}>
          <BookIcon style={{ marginRight: 5 }} fill="#8F9BB3" width={10} />
          <Text appearance="hint" style={{ fontSize: 12, lineHeight: 20 }}>
            {billCode}
          </Text>
        </View>
      </View>
      <View style={{ width: '10%' }}>
        <TestimonyStatusIcon userPosition={position} />
      </View>
    </View>
  );
};

/**
 *
 * @param agendaItem
 * @param navigation
 * @returns {JSX.Element}
 */
const Footer = ({ agendaItem, navigation }) => {
  const handlePress = () => {
    navigation.navigate('Agenda Item', agendaItem);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
      }}
    >
      <Button
        appearance="outline"
        status="info"
        size="small"
        onPress={handlePress}
      >
        AGENDA DETAILS
      </Button>
      <Button appearance="outline" size="small">
        TESTIMONY
      </Button>
    </View>
  );
};

/**
 *
 * @param history
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
export const TestimonyCard = ({ history, navigation }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.card}>
      <View>
        <Header
          title={history.agenda.title}
          billCode={history.agenda.billCode}
          position={history.testimony.position}
        />
      </View>
      <Divider />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 60,
        }}
      >
        <View style={styles.inlineTable}>
          <Text style={styles.inlineTableTitle}>Hearing Date</Text>
          <Text style={styles.inlineTableText}>
            {format(history.agenda.sessionTime.toDate(), 'MMM d, y')}
          </Text>
        </View>
        <View style={styles.inlineTable}>
          <Text style={styles.inlineTableTitle}>Testimony Submitted</Text>
          <Text style={styles.inlineTableText}>
            {format(history.testimony.createdAt.toDate(), 'MMM d, y')}
          </Text>
        </View>
      </View>
      <View>
        <Divider />
        <View>
          <Footer agendaItem={history.agenda} navigation={navigation} />
        </View>
      </View>
    </View>
  );
};

const themedStyles = StyleService.create({
  card: {
    borderRadius: 15,
    borderWidth: 0,
    margin: 20,
    marginBottom: 0,
    overflow: 'hidden',
    flex: 1,
    backgroundColor: 'white',
  },
  inlineTable: {
    width: '50%',
    alignItems: 'center',
  },
  inlineTableTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: '#8F9BB3',
  },
  inlineTableText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
  },
});

export default TestimonyCard;
