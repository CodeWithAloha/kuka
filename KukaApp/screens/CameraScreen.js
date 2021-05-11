import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { Layout, Text, StyleService } from '@ui-kitten/components';
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
          {console.log(captures)}
          {captures.map(({ uri }) => (
            <View style={styles.galleryImageContainer} key={uri}>
              <Image source={{ uri }} style={styles.galleryImage} />
            </View>
          ))}
        </ScrollView>
      )}
      <View style={styles.bottomToolbar}>
        <TouchableOpacity
          onPress={isRecording ? stopRecord : record}
          style={styles.capture}
        >
          <Text style={{ fontSize: 14 }}>
            {isRecording ? 'Stop' : 'Record'}
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleService.create({
  capture: {
    flex: 0,
    backgroundColor: 'color-primary-default',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  bottomToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 100,
    bottom: 0,
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
