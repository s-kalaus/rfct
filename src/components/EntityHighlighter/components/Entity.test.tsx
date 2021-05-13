import React from 'react';
import { render } from '@testing-library/react';
import { Entity } from './Entity';

describe('Entity', () => {
  const text = 'Text';
  const entity = { selectionStart: 0, selectionEnd: 0, label: 'Label' };

  test('renders component', () => {
    const { container } = render(<Entity text={text} entity={entity} />);
    expect(container).toMatchSnapshot();
  });
});
