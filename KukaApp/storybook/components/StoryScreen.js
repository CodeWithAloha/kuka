import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native';

const styles = {
  flex: 1,
};

export default function StoryScreen(props) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles}>{props.children}</SafeAreaView>
    </SafeAreaProvider>
  );
}
