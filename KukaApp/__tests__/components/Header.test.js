import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import BootComponent from '../BootComponent';
import { Header } from '../../components/Header';

describe('Header', () => {
  describe('Render', () => {
    afterEach(cleanup);
    it('text as property', async () => {
      const { queryByText, toJSON } = render(
        <BootComponent>
          <Header text="A tag line" />
        </BootComponent>
      );
      expect(queryByText('A tag line')).toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    });
    it('text as child (does not render)', async () => {
      const { queryByText, toJSON } = render(
        <BootComponent>
          <Header>A tag line</Header>
        </BootComponent>
      );
      expect(queryByText('A tag line')).not.toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
