import React from 'react';
import { ScrollView, View } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { HeaderText } from '../../components/HeaderText';
import { TopNav } from '../../components/TopNav';
import TestimonyCard from './TestimonyCard';

export const TestimoniesScreen = ({ navigation, route }) => {
  const styles = useStyleSheet(themedStyles);

  // Barebones data
  const fakeAgendaItem = {
    title:
      'DIRECTOR OF FINANCE, informing of the acceptance of a Warranty Deed ',
    billCode: 'CC 20-468',
  };

  const fakeTestimony = {
    testimonySubmitDate: '2020-01-01',
    position: 'APPROVE',
  };

  const fakeDisapprove = {
    ...fakeTestimony,
    position: 'DISAPPROVE',
  };

  const fakeComment = {
    ...fakeTestimony,
    position: 'COMMENT',
  };

  return (
    <View style={styles.container}>
      <TopNav {...{ navigation, route }} />
      <ScrollView>
        <HeaderText text={'Testimonies'} />
        {/*placeholder cards for approve/disapprove/comment and upload-in-progress*/}
        <TestimonyCard agendaItem={fakeAgendaItem} testimony={fakeTestimony} />
        <TestimonyCard agendaItem={fakeAgendaItem} testimony={fakeDisapprove} />
        <TestimonyCard agendaItem={fakeAgendaItem} testimony={fakeComment} />
        <TestimonyCard
          agendaItem={fakeAgendaItem}
          testimony={fakeComment}
          uploadPercentComplete={0.5}
        />
      </ScrollView>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 15,
    borderWidth: 0,
    margin: 20,
    overflow: 'hidden',
    flex: 1,
    backgroundColor: 'white',
  },

  // itemFooter: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  // },
});
