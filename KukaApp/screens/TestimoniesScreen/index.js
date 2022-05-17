import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { Header } from '../../components/Header';
import TestimonyCard from './TestimonyCard';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const TestimoniesScreen = ({ navigation, route }) => {
  const [testimonies, setTestimonies] = useState();
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

  useEffect(() => {
    (async () => {
      try {
        const user = auth().currentUser;

        return firestore()
          .collectionGroup('testimonies')
          .where('userId', '==', user.uid)
          .onSnapshot(
            querySnapshot => {
              let docs = [];
              querySnapshot.forEach(documentSnapshot =>
                docs.push(documentSnapshot.data())
              );
              setTestimonies(docs);
            },
            error => console.error(error)
          );
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Header text="Testimonies" inset />
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
