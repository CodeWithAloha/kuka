import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Layout, Text, Input, Button } from '@ui-kitten/components';

export const EmailScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inProgress, setInProgress] = useState(false);
  const [message, setMessage] = useState();

  const createUser = async () => {
    try {
      setMessage(null);
      setInProgress(true);
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setMessage(error.message);
      console.log(error);
      setInProgress(false);
    }
  }

  return <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Input value={email} label="EMAIL" placeholder="Email" onChangeText={nextValue => setEmail(nextValue)} />
    <Input value={password} label="PASSWORD" placeholder="Password" onChangeText={nextValue => setPassword(nextValue)} />
    <Button onPress={createUser} disabled={inProgress}>CREATE ACCOUNT</Button>
    {message && <Text>{message}</Text>}
  </Layout>
}