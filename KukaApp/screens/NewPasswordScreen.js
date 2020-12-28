import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Input,
  Layout,
  StyleService,
  useStyleSheet,
  Modal,
  Card,
  Text,
} from '@ui-kitten/components';
import SuccessIcon from '../assets/images/checkbox.svg';
import { AuthHeader } from '../components/AuthHeader';

export const NewPasswordScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = () => {
    setModalOpen(true);
  };

  return (
    <Layout style={styles.container}>
      <AuthHeader
        titleText="New Password"
        leadText="Create a new password for your account"
      />
      <View style={styles.bodyContainer}>
        <View>
          <Input
            value={password}
            label="NEW PASSWORD"
            placeholder="Password"
            onChangeText={nextValue => setPassword(nextValue)}
          />
          <Input
            value={passwordConfirm}
            label="REPEAT PASSWORD"
            placeholder="Password"
            onChangeText={nextValue => setPasswordConfirm(nextValue)}
            style={styles.buttonSpacing}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit}>CONTINUE</Button>
      </View>

      <Modal
        visible={isModalOpen}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalOpen(false)}
        style={{width: '80%'}}
      >
        <Card style={styles.modalStyle} disabled={true}>
          <SuccessIcon width={150} height={150} />
          <Text category="h2">Success</Text>
          <Text>Your password was successfully changed.</Text>
          <Button onPress={() => setModalOpen(false)}>GOT IT</Button>
        </Card>
      </Modal>
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
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalStyle: {
  },
});
