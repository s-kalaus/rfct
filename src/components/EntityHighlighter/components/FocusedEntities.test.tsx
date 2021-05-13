import React from 'react';
import { render } from '@testing-library/react';
import { FocusedEntities } from './FocusedEntities';

describe('FocusedEntities', () => {
  const text = 'Text';
  const entities = [{ selectionStart: 0, selectionEnd: 0, label: 'Label' }];
  const onDelete = jest.fn();

  test('renders component', () => {
    const { container } = render(
      <FocusedEntities text={text} entities={entities} onDelete={onDelete} />
    );
    expect(container).toMatchSnapshot();
  });
});
