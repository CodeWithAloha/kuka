import React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import BootComponent from '../BootComponent';
import { IconText } from '../../components/IconText';

describe('IconText', () => {
  describe('Render', () => {
    afterEach(cleanup);
    it('text as child and name required', async () => {
      const { queryByText, toJSON } = render(
        <BootComponent>
          <IconText name="book-outline">Next</IconText>
        </BootComponent>
      );
      expect(queryByText('Next')).toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
