import React from 'react';
import { render } from '@testing-library/react';
import { EntityHighlighter } from './index';
import { IProps as IEditorProps } from './components/Editor';
import { IProps as IFormProps } from './components/Form';
import { IProps as IFocusedEntitiesProps } from './components/FocusedEntities';

let mockRef: any;

jest.mock('./components/Editor', () => ({
  Editor: (props: IEditorProps) => {
    const { onInputRef } = props;
    onInputRef(mockRef);
    return `mock-editor: ${JSON.stringify({ ...props, mockRef })}`;
  },
}));
jest.mock('./components/Form', () => ({
  Form: (props: IFormProps) => `mock-form: ${JSON.stringify(props)}`,
}));
jest.mock('./components/FocusedEntities', () => ({
  FocusedEntities: (props: IFocusedEntitiesProps) =>
    `mock-focused-entities: ${JSON.stringify(props)}`,
}));
jest.mock('./hooks/useEntityHighlighter', () => ({
  useEntityHighlighter: () => ({
    focusedEntities: [],
    handleSelectionChange: jest.fn(),
    hasZeroSelection: true,
    deleteEntity: jest.fn(),
    addEntity: jest.fn(),
    handleTextChange: jest.fn(),
    selection: {
      selectionStart: 0,
      selectionEnd: 0,
      label: '',
    },
    inputNode: { current: null },
  }),
}));

describe('index', () => {
  const entities = [{ selectionStart: 0, selectionEnd: 5, label: 'Test' }];
  const text = 'Hello World';

  beforeEach(() => {
    mockRef = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };
  });

  test('renders component', () => {
    const { container } = render(
      <EntityHighlighter
        entities={entities}
        text={text}
        onTextChange={jest.fn()}
        onEntitiesChange={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('renders component: no ref', () => {
    mockRef = null;
    const { container } = render(
      <EntityHighlighter
        entities={entities}
        text={text}
        onTextChange={jest.fn()}
        onEntitiesChange={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
