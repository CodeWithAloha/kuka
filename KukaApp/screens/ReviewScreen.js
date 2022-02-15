import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'uuid';
import {
  Input,
  Button,
  Spinner,
  Text,
  Icon,
  Modal,
  Card,
} from '@ui-kitten/components';
import { TopNav } from '../components/TopNav';

export const ReviewScreen = ({ navigation, route }) => {
  const user = auth().currentUser;
  const profileRef = firestore().collection('users').doc(user.uid);
  const [profile, setProfile] = useState();
  const [position, setPosition] = useState();
  const [positionCaption, setPositionCaption] = useState(false);
  const [name, setName] = useState(user.displayName);
  const [nameCaption, setNameCaption] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [emailCaption, setEmailCaption] = useState(false);
  const [zipCode, setZipCode] = useState(profile?.zipCode);
  const [zipCodeCaption, setZipCodeCaption] = useState(false);
  const [lobbyGroup, setLobbyGroup] = useState(profile?.lobbyGroup);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState();

  useEffect(() => {
    (async () => {
      setProfile(await profileRef.get());
    })();
  }, []);

  const submit = async () => {
    try {
      if (!position) {
        setPositionCaption(true);
      }

      if (!name) {
        setNameCaption(true);
      }

      if (!email) {
        setEmailCaption(true);
      }

      if (!zipCode) {
        setZipCodeCaption(true);
      }

      if (position && name && zipCode && email) {
        setUploading(true);
        setPositionCaption(false);
        setNameCaption(false);
        setEmailCaption(false);
        setZipCodeCaption(false);

        const agendaRef = firestore()
          .collection('agendaItems')
          .doc(route.params.agendaId);

        const testimony = await agendaRef
          .collection('testimonies')
          .where('userId', '==', user.uid)
          .get();

        if (testimony.empty) {
          const ref = storage().ref(
            '/agenda-items/' + route.params.agendaId + '/' + uuidv1() + '.mp4'
          );
          const snapshot = await ref.putFile(route.params.uri);

          agendaRef.collection('testimonies').add({
            userId: user.uid,
            position,
            name,
            email,
            zipCode,
            position,
            lobbyGroup,
            createdAt: firestore.FieldValue.serverTimestamp(),
            fullPath: snapshot.metadata.fullPath,
          });
        } else {
          setUploadError('Only one testimony allowed per agenda.');
        }
      }
    } catch (error) {
      console.error(error);
      setUploadError(error);
    } finally {
      setUploading(false);
    }
  };

  const handlePosition = pos => {
    setPosition(pos);
  };

  const renderCaption = message => (
    <View>
      <Text status="danger">{message}</Text>
    </View>
  );

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
        <View
          style={{
            paddingTop: 8,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          <Button
            onPress={() => handlePosition('Approve')}
            status={position === 'Approve' ? 'primary' : 'basic'}
            appearance="outline"
          >
            <View style={styles.positionView}>
              <Icon
                style={styles.icon}
                fill="#8F9BB3"
                name="arrow-circle-up-outline"
              />
              <Text>Approve</Text>
            </View>
          </Button>
          <Button
            onPress={() => handlePosition('Disapprove')}
            status={position === 'Disapprove' ? 'primary' : 'basic'}
            appearance="outline"
          >
            <View style={styles.positionView}>
              <Icon
                style={styles.icon}
                fill="#8F9BB3"
                name="arrow-circle-down-outline"
              />
              <Text>Disapprove</Text>
            </View>
          </Button>
          <Button
            onPress={() => handlePosition('Comment')}
            status={position === 'Comment' ? 'primary' : 'basic'}
            appearance="outline"
          >
            <View style={styles.positionView}>
              <Icon
                style={styles.icon}
                fill="#8F9BB3"
                name="message-circle-outline"
              />
              <Text>Comment</Text>
            </View>
          </Button>
        </View>
        {positionCaption ? (
          <Text status="danger">Missing position.</Text>
        ) : null}
        <View style={{ padding: 16 }}>
          <Input
            value={name}
            label="NAME"
            placeholder="John Doe"
            onChangeText={nextValue => setName(nextValue)}
            caption={nameCaption ? renderCaption('Missing name.') : null}
          />
          <Input
            value={email}
            label="EMAIL"
            placeholder="user@email.com"
            onChangeText={nextValue => setEmail(nextValue)}
            style={styles.formField}
            caption={emailCaption ? renderCaption('Missing email.') : null}
          />
          <Input
            value={zipCode}
            label="ZIPCODE"
            placeholder="96818"
            onChangeText={nextValue => setZipCode(nextValue)}
            style={styles.formField}
            caption={zipCodeCaption ? renderCaption('Missing zip code.') : null}
          />
          <Input
            value={lobbyGroup}
            label="LOBBYING GROUP (Optional)"
            placeholder="Group A"
            onChangeText={nextValue => setLobbyGroup(nextValue)}
            style={styles.formField}
          />
          <Button
            onPress={submit}
            style={styles.formField}
            disabled={uploading}
          >
            SUBMIT TESTIMONY
          </Button>
        </View>
      </ScrollView>
      <Modal
        visible={uploading || uploadError}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        {uploading && <Spinner />}
        {uploadError && (
          <Card>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Text status="danger" style={{ marginBottom: 16 }}>
                {uploadError}
              </Text>
              <Button onPress={() => setUploadError('')}>Close</Button>
            </View>
          </Card>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  formField: { marginTop: 10 },
  icon: { width: 48, height: 64 },
});
