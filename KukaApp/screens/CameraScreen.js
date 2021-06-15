import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import {
  Layout,
  Text,
  StyleService,
  Button,
  Icon,
} from '@ui-kitten/components';
import { RNCamera } from 'react-native-camera';
import { TopNav } from '../components/TopNav';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export const CameraScreen = ({ navigation, route }) => {
  const camera = useRef();
  const [isRecording, setIsRecording] = useState(false);
  const [captures, setCaptures] = useState([]);

  const record = async () => {
    try {
      if (camera) {
        const options = {
          quality: RNCamera.Constants.VideoQuality['1080p'],
          maxDuration: 5,
        };
        const data = await camera.current.recordAsync(options);
        setCaptures([data, ...captures]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecord = () => {
    camera.current.stopRecording();
    setIsRecording(false);
  };

  return (
    <Layout style={{ flex: 1 }}>
      <TopNav {...{ navigation, route }} />
      <RNCamera
        style={{ flex: 1 }}
        ref={camera}
        onRecordingStart={() => setIsRecording(true)}
      />
      {captures.length > 0 && (
        <ScrollView
          horizontal={true}
          style={[styles.bottomToolbar, styles.galleryContainer]}
        >
          <Text>Gallery</Text>
          {captures.map(({ uri }) => (
            <View style={styles.galleryImageContainer} key={uri}>
              <Text>Image</Text>
              {console.log(uri)}
              <Image
                source={{ uri }}
                style={styles.galleryImage}
              />
            </View>
          ))}
        </ScrollView>
      )}
      <Button
        style={styles.bottomToolbar}
        size="giant"
        appearance="ghost"
        onPress={isRecording ? stopRecord : record}
        accessoryLeft={props => (
          <Icon
            {...props}
            name={isRecording ? 'video-off-outline' : 'video-outline'}
          />
        )}
      />
    </Layout>
  );
};

const styles = StyleService.create({
  bottomToolbar: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    alignSelf: 'center',
  },
  galleryContainer: {
    bottom: 100,
  },
  galleryImageContainer: {
    width: 75,
    height: 75,
    marginRight: 5,
  },
  galleryImage: {
    width: 75,
    height: 75,
  },
});
