import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  Layout,
  TabView,
  Tab,
  List,
  Text,
  Divider,
} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import { differenceInCalendarDays } from 'date-fns';
import { TopNav } from '../components/TopNav';
import { IconText } from '../components/IconText';

const UpcomingList = () => {
  const [agendas, setAgendas] = useState();
  const [now, setNow] = useState(new Date());

  const renderItem = ({ item, index }) => {
    const days = differenceInCalendarDays(
      new Date(item.deadlineTime.toDate()),
      now
    );

    return (
      <View style={{ padding: 16 }}>
        <Text>{item.title}</Text>
        <IconText name="book-outline" style={{ marginTop: 16 }}>
          {item.billCode}
        </IconText>
        <IconText name="clock-outline" style={{ marginTop: 16 }}>
          {days}
        </IconText>
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        return firestore()
          .collection('agendaItems')
          .where('deadlineTime', '>', now)
          .onSnapshot(
            querySnapshot => {
              // TODO investigate changing now date on live updates
              let docs = [];
              querySnapshot.forEach(documentSnapshot =>
                docs.push(documentSnapshot.data())
              );
              setAgendas(docs);
            },
            err => console.error(err)
          );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <>
      {agendas && agendas.length !== 0 ? (
        <List
          data={agendas}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
        />
      ) : (
        <View style={{ padding: 16 }}>
          <Text>There are no upcoming agendas.</Text>
        </View>
      )}
    </>
  );
};

const HistoryList = () => {
  const [agendas, setAgendas] = useState();

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ padding: 16 }}>
        <Text>{item.title}</Text>
        <IconText name="book-outline" style={{ marginTop: 16 }}>
          {item.billCode}
        </IconText>
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const now = new Date();

        return firestore()
          .collection('agendaItems')
          .onSnapshot(
            querySnapshot => {
              let docs = [];
              querySnapshot.forEach(documentSnapshot =>
                docs.push(documentSnapshot.data())
              );
              setAgendas(docs);
            },
            err => console.error(err)
          );
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <List
      data={agendas}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
    />
  );
};

export const AgendaItemsScreen = ({ navigation, route }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Layout style={{ flex: 1 }}>
      <TopNav noBackButton {...{ navigation, route }} />
      <TabView
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        shouldLoadComponent={index => index === selectedIndex}
      >
        <Tab title="UPCOMING">
          <UpcomingList />
        </Tab>
        <Tab title="HISTORY">
          <HistoryList />
        </Tab>
      </TabView>
    </Layout>
  );
};
