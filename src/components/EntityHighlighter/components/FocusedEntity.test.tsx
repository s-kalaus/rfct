import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FocusedEntity } from './FocusedEntity';

describe('FocusedEntity', () => {
  const text = 'Text';
  const entity = { selectionStart: 0, selectionEnd: 0, label: 'Label' };
  const onDelete = jest.fn();

  test('renders component', () => {
    const { container } = render(
      <FocusedEntity text={text} entity={entity} onDelete={onDelete} />
    );
    expect(container).toMatchSnapshot();
  });

  test('react on delete', () => {
    render(<FocusedEntity text={text} entity={entity} onDelete={onDelete} />);
    userEvent.click(screen.getByTestId('button'));
    expect(onDelete).toHaveBeenCalledWith(entity);
  });
});
