import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { RNCamera } from 'react-native-camera';
import { TopNav } from '../components/TopNav';

export const CameraScreen = ({ navigation, route }) => {
  return (
    <Layout style={{ flex: 1 }}>
      <TopNav {...{ navigation, route }} />
      <RNCamera />
    </Layout>
  );
};
