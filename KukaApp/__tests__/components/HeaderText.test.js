import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import BootComponent from '../BootComponent';
import { HeaderText } from '../../components/HeaderText';

describe('HeaderText', () => {
  describe('Render', () => {
    afterEach(cleanup);
    it('text as property', async () => {
      const { queryByText, toJSON } = render(
        <BootComponent>
          <HeaderText text="A tag line" />
        </BootComponent>
      );
      expect(queryByText('A tag line')).toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    });
    it('text as child (does not render)', async () => {
      const { queryByText, toJSON } = render(
        <BootComponent>
          <HeaderText>A tag line</HeaderText>
        </BootComponent>
      );
      expect(queryByText('A tag line')).not.toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
