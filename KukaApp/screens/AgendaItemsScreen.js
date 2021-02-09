import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  Divider,
  Layout,
  List,
  Tab,
  TabView,
  Text,
  useTheme,
} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import { differenceInCalendarDays } from 'date-fns';
import { IconText } from '../components/IconText';
import { HeaderText } from '../components/HeaderText';

const UpcomingList = ({ navigation }) => {
  const theme = useTheme();
  const [agendas, setAgendas] = useState();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    (async () => {
      try {
        return firestore()
          .collection('agendaItems')
          .where('sessionTime', '>', now)
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

  const handlePress = item => {
    navigation.navigate('Agenda', item);
  };

  const renderItem = ({ item, index }) => {
    const days = differenceInCalendarDays(item.sessionTime.toDate(), now);

    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View
          style={{ padding: 16, backgroundColor: theme['color-basic-100'] }}
        >
          <Text category="h6">{item.title}</Text>
          <IconText name="book-outline" style={{ marginTop: 10 }}>
            {item.billCode}
          </IconText>
          <IconText name="clock-outline" style={{ marginTop: 4 }}>
            {days + ' days left to submit testimony'}
          </IconText>
        </View>
      </TouchableOpacity>
    );
  };

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

const HistoryList = ({ navigation }) => {
  const [agendas, setAgendas] = useState();

  const handlePress = item => {
    navigation.navigate('Agenda', item);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={{ padding: 16 }} onPress={handlePress}>
          <Text>{item.title}</Text>
          <IconText name="book-outline" style={{ marginTop: 16 }}>
            {item.billCode}
          </IconText>
        </View>
      </TouchableOpacity>
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
      {/*<TopNav noBackButton {...{ navigation, route }} />*/}
      <HeaderText text="Agenda Items" />
      <TabView
        style={{ flex: 1, paddingTop: 8 }}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
        shouldLoadComponent={index => index === selectedIndex}
      >
        <Tab title="UPCOMING">
          <UpcomingList navigation={navigation} />
        </Tab>
        <Tab title="HISTORY">
          <HistoryList navigation={navigation} />
        </Tab>
      </TabView>
    </Layout>
  );
};
