import React from 'react';
import { Layout } from '@ui-kitten/components';
import Video from 'react-native-video';
import { TopNav } from '../components/TopNav';

export const VideoScreen = ({ navigation, route }) => {
  return (
    <Layout style={{ flex: 1 }}>
      <TopNav {...{ navigation, route }} />
      {route.params?.uri && (
        <Video
          controls
          source={{ uri: route.params.uri }}
          style={{ flex: 1 }}
        />
      )}
    </Layout>
  );
};
