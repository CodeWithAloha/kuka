import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { Input, Button } from '@ui-kitten/components';
import { TopNav } from '../components/TopNav';

export const ReviewScreen = ({ navigation, route }) => {
  const user = auth().currentUser;
  const profileRef = firestore().collection('users').doc(user.uid);
  const [profile, isProfileLoading, hasProfileError] =
    useDocumentDataOnce(profileRef);
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [zipCode, setZipCode] = useState(profile?.zipCode);
  const [lobbyGroup, setLobbyGroup] = useState(profile?.lobbyGroup);

  const submit = () => {};

  return (
    <View style={{ flex: 1 }}>
      <TopNav {...{ navigation, route }} />
      <ScrollView>
        <Video
          source={{ uri: route.params.uri }}
          style={{ width: '100%', aspectRatio: 16 / 9 }}
          controls
          paused
        />
        <View style={{ padding: 16 }}>
          <Input
            value={name}
            label="NAME"
            placeholder="John Doe"
            onChangeText={nextValue => setName(nextValue)}
          />
          <Input
            value={email}
            label="EMAIL"
            placeholder="user@email.com"
            onChangeText={nextValue => setEmail(nextValue)}
            style={styles.formField}
          />
          <Input
            value={zipCode}
            label="ZIPCODE"
            placeholder="96818"
            onChangeText={nextValue => setZipCode(nextValue)}
            style={styles.formField}
          />
          <Input
            value={lobbyGroup}
            label="LOBBYING GROUP (Optional)"
            placeholder="Group A"
            onChangeText={nextValue => setLobbyGroup(nextValue)}
            style={styles.formField}
          />
          <Button onPress={submit} style={styles.formField}>
            SUBMIT TESTIMONY
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({ formField: { marginTop: 10 } });
