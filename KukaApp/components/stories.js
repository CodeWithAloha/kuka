import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { HeaderText } from './HeaderText';
import { Layout } from '@ui-kitten/components';

storiesOf('HeaderText', module).add('with text=', () => (
  <Layout style={{ height: '100%' }}>
    <HeaderText text="Just the defaults" />
  </Layout>
));
