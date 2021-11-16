import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  Card,
  Input,
  Layout,
  Modal,
  StyleService,
  Text,
  useStyleSheet,
} from '@ui-kitten/components';
import { AuthHeader } from '../components/AuthHeader';
import { Formik } from 'formik';
import auth from '@react-native-firebase/auth';
import SuccessIcon from '../assets/images/checkbox.svg';

export const ForgotPasswordScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const [inProgress, setInProgress] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState();

  const sendResetEmail = async values => {
    setInProgress(true);
    try {
      await auth().sendPasswordResetEmail(values.email);
      setModalOpen(true);
    } catch (err) {
      setMessage(err.message || 'error occurred');
      setInProgress(false);
    }
  };

  return (
    <Layout style={styles.container}>
      <AuthHeader
        titleText="Reset Password"
        leadText="Please enter your email address. A code will be sent to your email"
      />
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={sendResetEmail}
      >
        {({ handleChange, handleSubmit, values }) => (
          <>
            <View style={styles.bodyContainer}>
              <View>
                {message && <Text status="warning">{message}</Text>}
                <Input
                  value={values.email}
                  autoCompleteType="email"
                  autoCapitalize="none"
                  label="EMAIL"
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  style={styles.formField}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button onPress={handleSubmit} disabled={inProgress}>
                CONTINUE
              </Button>
            </View>
          </>
        )}
      </Formik>
      <Modal
        visible={isModalOpen}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalOpen(false)}
        style={{ width: '80%' }}
      >
        <Card style={styles.modalStyle} disabled={true}>
          <SuccessIcon style={styles.modalIcon} width={150} height={150} />
          <Text style={styles.modalHeaderText}>Success</Text>
          <Text style={styles.modalText} category="p1">
            You will receive an email with password instructions
          </Text>
          <Button
            onPress={() => {
              setModalOpen(false);
              navigation.navigate('Login');
            }}
          >
            OK
          </Button>
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
  formField: {
    marginTop: 10,
  },
  modalStyle: {
    textAlign: 'center',
  },
  modalIcon: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modalHeaderText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 32,
    marginTop: 20,
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 30,
  },
});
