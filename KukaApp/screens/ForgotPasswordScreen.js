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

export const ForgotPasswordScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    navigation.navigate('Enter the code');
  };

  return (
    <Layout style={styles.container}>
      <AuthHeader
        titleText="Reset Password"
        leadText="Please enter your email address. A code will be sent to your email"
      />
      <View style={styles.bodyContainer}>
        <Input
          value={email}
          label="EMAIL"
          placeholder="Email"
          onChangeText={nextValue => setEmail(nextValue)}
          style={styles.formField}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit}>CONTINUE</Button>
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
});
