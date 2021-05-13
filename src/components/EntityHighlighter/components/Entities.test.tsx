import React from 'react';
import { render } from '@testing-library/react';
import { Entities } from './Entities';

describe('Entities', () => {
  const text = 'Text';
  const entities = [{ selectionStart: 0, selectionEnd: 0, label: 'Label' }];

  test('renders component', () => {
    const { container } = render(<Entities text={text} entities={entities} />);
    expect(container).toMatchSnapshot();
  });
});
