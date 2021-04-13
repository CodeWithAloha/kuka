import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import BootComponent from '../BootComponent';
import { AuthHeader } from '../../components/AuthHeader';

describe('AuthHeader', () => {
  describe('Render', () => {
    afterEach(cleanup);
    it('has title and subtitle', async () => {
      const { queryByText, toJSON } = render(
        <BootComponent>
          <AuthHeader titleText="KukaNow" leadText="My subtitle" />
        </BootComponent>
      );
      expect(queryByText('KukaNow')).toBeTruthy();
      expect(queryByText('My subtitle')).toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
