import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { Header } from '../../components/Header';
import TestimonyCard from './TestimonyCard';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const TestimoniesScreen = ({ navigation, route }) => {
  const [history, setHistory] = useState();
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    (async () => {
      try {
        const user = auth().currentUser;

        return firestore()
          .collectionGroup('testimonies')
          .where('userId', '==', user.uid)
          .onSnapshot(
            querySnapshot => {
              let promises = [];
              // retrieve agenda data for each corresponding testimony
              querySnapshot.forEach(documentSnapshot => {
                const testimony = documentSnapshot.data();

                promises.push(
                  new Promise((resolve, reject) => {
                    documentSnapshot.ref.parent.parent.get().then(
                      snapshot => {
                        resolve({
                          agenda: snapshot.data(),
                          testimony: testimony,
                        });
                      },
                      error => reject(error)
                    );
                  })
                );
              });
              Promise.all(promises).then(result => setHistory(result));
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
        {history &&
          history.map((i, index) => (
            <TestimonyCard history={i} key={index} navigation={navigation} />
          ))}
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
});
