import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Editor } from './Editor';
import { IProps as IEntitiesProps } from './Entities';

jest.mock('./Entities', () => ({
  Entities: (props: IEntitiesProps) =>
    `mock-entities: ${JSON.stringify(props)}`,
}));

describe('Editor', () => {
  const text = 'Text';
  const entities = [{ selectionStart: 0, selectionEnd: 0, label: 'Label' }];
  const onTextChange = jest.fn();
  const onInputRef = jest.fn();

  test('renders component', () => {
    const { container } = render(
      <Editor
        text={text}
        entities={entities}
        onTextChange={onTextChange}
        onInputRef={onInputRef}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('react on text change', () => {
    render(
      <Editor
        text={text}
        entities={entities}
        onTextChange={onTextChange}
        onInputRef={onInputRef}
      />
    );
    userEvent.type(screen.getByTestId('textarea'), '!');
    expect(onTextChange).toHaveBeenCalledWith('Text!');
  });
});
