import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';

describe('Form', () => {
  const label = 'Label';
  const onSubmit = jest.fn();
  const onLabelChange = jest.fn();

  test('renders component', () => {
    const { container } = render(
      <Form
        label={label}
        disabled={false}
        onSubmit={onSubmit}
        onLabelChange={onLabelChange}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('react on label change', () => {
    render(
      <Form
        label={label}
        disabled={false}
        onSubmit={onSubmit}
        onLabelChange={onLabelChange}
      />
    );
    userEvent.type(screen.getByTestId('input'), '!');
    expect(onLabelChange).toHaveBeenCalledWith('Label!');
  });

  test('react on button click', () => {
    render(
      <Form
        label={label}
        disabled={false}
        onSubmit={onSubmit}
        onLabelChange={onLabelChange}
      />
    );
    userEvent.click(screen.getByTestId('button'));
    expect(onSubmit).toHaveBeenCalledWith('Label');
  });

  test('not react on label change if disabled', () => {
    render(
      <Form
        label={label}
        disabled={true}
        onSubmit={onSubmit}
        onLabelChange={onLabelChange}
      />
    );
    userEvent.type(screen.getByTestId('input'), '!');
    expect(onLabelChange).not.toHaveBeenCalled();
  });
});
