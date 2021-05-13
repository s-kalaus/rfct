import React from 'react';
import { render, act } from '@testing-library/react';
import {
  findClosestStart,
  IOutput,
  SELECTION_DEFAULT,
  useEntityHighlighter,
} from './useEntityHighlighter';
import { IEntity } from '~/interfaces/entity';

describe('useEntityHighlighter', () => {
  const text = 'Text';
  let entities: IEntity[] = [];
  let onTextChange = jest.fn();
  let onEntitiesChange = jest.fn();
  let addEventListener = jest.fn();
  let removeEventListener = jest.fn();

  const assemble = (
    props = { text, entities, onTextChange, onEntitiesChange },
    inputRef = true
  ) => {
    let result: IOutput & {
      unmount: () => void;
    } = {
      focusedEntities: [],
      handleSelectionChange: jest.fn(),
      hasZeroSelection: true,
      deleteEntity: jest.fn(),
      addEntity: jest.fn(),
      handleTextChange: jest.fn(),
      unmount: jest.fn(),
      selection: {
        selectionStart: 0,
        selectionEnd: 0,
        label: '',
      },
      inputNode: { current: null },
    };
    const Component = () => {
      Object.assign(result, useEntityHighlighter(props));
      if (inputRef) {
        result.inputNode.current = {
          addEventListener,
          removeEventListener,
        } as any;
      }
      return null;
    };
    const { unmount } = render(<Component />);
    Object.assign(result, { unmount });
    return result;
  };

  beforeEach(() => {
    entities = [{ selectionStart: 0, selectionEnd: 0, label: 'Label' }];
    addEventListener = jest.fn();
    removeEventListener = jest.fn();
    onTextChange = jest.fn();
    onEntitiesChange = jest.fn();
  });

  test('return default values', () => {
    const result = assemble();
    expect(result).toMatchSnapshot();
  });

  test('subscribe to input events', () => {
    assemble();
    ['select', 'click', 'keydown'].forEach((type) =>
      expect(addEventListener).toHaveBeenCalledWith(
        type,
        expect.any(Function),
        false
      )
    );
  });

  test('do not subscribe if no input', () => {
    assemble({ text, entities, onTextChange, onEntitiesChange }, false);
    expect(addEventListener).not.toHaveBeenCalled();
  });

  test('unsubscribe from input events', () => {
    const { unmount } = assemble();
    unmount();
    ['select', 'click', 'keydown'].forEach((type) =>
      expect(removeEventListener).toHaveBeenCalledWith(
        type,
        expect.any(Function)
      )
    );
  });

  test('react on event', () => {
    let callback = jest.fn();
    addEventListener = jest.fn(
      (type: string, theCallback) => (callback = theCallback)
    );
    const result = assemble();
    act(() => {
      callback({ target: { selectionStart: 0, selectionEnd: 1 } });
    });
    expect(result.selection).toEqual({
      ...SELECTION_DEFAULT,
      selectionEnd: 1,
    });
  });

  test('handle selection change', () => {
    const result = assemble();
    act(() => {
      result.handleSelectionChange('Test');
    });
    expect(result.selection).toEqual({ ...SELECTION_DEFAULT, label: 'Test' });
  });

  test('handle delete entity', () => {
    const result = assemble();
    act(() => {
      result.deleteEntity(entities[0]);
    });
    expect(onEntitiesChange).toHaveBeenCalledWith([]);
  });

  test('handle add entity', () => {
    const result = assemble();
    act(() => {
      result.addEntity('Test');
    });
    expect(onEntitiesChange).toHaveBeenCalledWith([
      ...entities,
      { ...SELECTION_DEFAULT, label: 'Test' },
    ]);
  });

  test('handle focused entities', () => {
    let callback = jest.fn();
    addEventListener = jest.fn(
      (type: string, theCallback) => (callback = theCallback)
    );
    const result = assemble({
      text,
      entities: [
        {
          selectionStart: 0,
          selectionEnd: 10,
          label: 'Test1',
        },
        {
          selectionStart: 11,
          selectionEnd: 21,
          label: 'Test2',
        },
      ],
      onTextChange,
      onEntitiesChange,
    });
    act(() => {
      callback({ target: { selectionStart: 3, selectionEnd: 5 } });
    });
    expect(result.focusedEntities).toEqual([
      {
        selectionStart: 0,
        selectionEnd: 10,
        label: 'Test1',
      },
    ]);
  });

  test.each`
    text           | selectionStart | selectionEnd | textSelected | expected
    ${'1 2 3 4 5'} | ${0}           | ${1}         | ${'1'}       | ${0}
    ${'1 2 1 4 5'} | ${0}           | ${1}         | ${'1'}       | ${0}
    ${'1 2 1 4 5'} | ${4}           | ${5}         | ${'1'}       | ${4}
    ${'1 2 3 4 5'} | ${0}           | ${1}         | ${'6'}       | ${-1}
  `(
    'findClosestStart',
    ({ text, selectionStart, selectionEnd, textSelected, expected }) => {
      const index = findClosestStart(text, textSelected, {
        selectionStart,
        selectionEnd,
        label: 'Test',
      });
      expect(index).toBe(expected);
    }
  );

  test('handle test change: remove entity', () => {
    entities = [{ selectionStart: 1, selectionEnd: 3, label: 'Label1' }];
    const result = assemble();
    act(() => {
      result.handleTextChange('Test1');
    });
    expect(onTextChange).toHaveBeenCalledWith('Test1');
    expect(onEntitiesChange).toHaveBeenCalledWith([]);
  });

  test('handle test change: move to right', () => {
    entities = [
      { selectionStart: 1, selectionEnd: 2, label: 'Label1' },
      { selectionStart: 3, selectionEnd: 4, label: 'Label2' },
    ];
    const result = assemble();
    act(() => {
      result.handleTextChange('1Test');
    });
    expect(onTextChange).toHaveBeenCalledWith('1Test');
    expect(onEntitiesChange).toHaveBeenCalledWith([
      { selectionStart: 2, selectionEnd: 3, label: 'Label1' },
      { selectionStart: 4, selectionEnd: 5, label: 'Label2' },
    ]);
  });
});
