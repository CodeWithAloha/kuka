import React from 'react';
import { View } from 'react-native';
import {
  Button,
  Divider,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { Bar } from 'react-native-progress';
import TestimonyStatusIcon from './TestimonyStatusIcon';
import BookIcon from '../../assets/images/book.svg';

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

const Footer = () => (
  <View
    style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 15,
    }}
  >
    <Button appearance="outline" status="basic" size="small">
      HEARING DETAILS
    </Button>
    <Button appearance="outline" size="small">
      TESTIMONY
    </Button>
  </View>
);

/**
 *
 * @param agendaItem
 * @param testimony
 * @param uploadPercentComplete, floating point 0% = 0.0, 50% = 0.5, 100% = 1.0
 * @returns {JSX.Element}
 * @constructor
 */
export const TestimonyCard = ({
  agendaItem,
  testimony,
  uploadPercentComplete,
}) => {
  const styles = useStyleSheet(themedStyles);
  const position = uploadPercentComplete < 1.0 ? 'sync' : testimony.position;

  return (
    <View style={styles.card}>
      <View>
        <Header
          title={agendaItem.title}
          billCode={agendaItem.billCode}
          position={position}
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
          <Text style={styles.inlineTableText}>Sept 30, 2020</Text>
        </View>
        {uploadPercentComplete ? (
          <View style={styles.inlineTable}>
            <Text style={styles.inlineTableTitle}>Uploading Testimony</Text>
            <View style={{ padding: 9 }}>
              <Bar
                progress={uploadPercentComplete}
                width={130}
                borderWidth={0}
                unfilledColor="#EDF1F7"
                color="#0089A8"
              />
            </View>
          </View>
        ) : (
          <View style={styles.inlineTable}>
            <Text style={styles.inlineTableTitle}>Testimony Submitted</Text>
            <Text style={styles.inlineTableText}>Jul 23, 2020</Text>
          </View>
        )}
      </View>
      <View>
        <Divider />
        <View>
          <Footer />
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
