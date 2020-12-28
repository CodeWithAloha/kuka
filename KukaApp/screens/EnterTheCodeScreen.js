import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { AuthHeader } from '../components/AuthHeader';

export const EnterTheCodeScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const [code, setCode] = useState('');

  const handleSubmit = () => {
    navigation.navigate('New Password');
  };

  return (
    <Layout style={styles.container}>
      <AuthHeader
        titleText="Enter the code"
        leadText="The password recovery code was sent to your email"
      />
      <View style={styles.bodyContainer}>
        <Input
          value={code}
          label="CODE"
          placeholder="enter the code"
          onChangeText={nextValue => setCode(nextValue)}
          style={styles.formField}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleSubmit}
        >CONTINUE</Button>
        <Button
          style={styles.buttonSpacing}
          appearance="outline"
        >
          RESEND EMAIL
        </Button>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
    flex: 1,
  },
  bodyContainer: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    padding: 24,
  },
  buttonSpacing: {
    marginTop: 14,
  },
});
