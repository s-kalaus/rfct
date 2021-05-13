import React, { MutableRefObject } from 'react';
import { IEntity } from '~/interfaces/entity';
import { useEntityHighlighter } from './hooks/useEntityHighlighter';
import { Form } from './components/Form';
import { FocusedEntities } from './components/FocusedEntities';
import { Editor } from './components/Editor';

export interface IProps {
  text: string;
  entities: IEntity[];
  onTextChange: (text: string) => void;
  onEntitiesChange: (entities: IEntity[]) => void;
}

export const EntityHighlighter = (props: IProps) => {
  const { text, entities } = props;
  const {
    focusedEntities,
    handleSelectionChange,
    hasZeroSelection,
    deleteEntity,
    addEntity,
    handleTextChange,
    selection,
    inputNode,
  } = useEntityHighlighter(props);

  return (
    <>
      <Editor
        onInputRef={setInputRef(inputNode)}
        text={text}
        entities={entities}
        onTextChange={handleTextChange}
      />
      <Form
        label={selection.label}
        disabled={hasZeroSelection}
        onSubmit={addEntity}
        onLabelChange={handleSelectionChange}
      />
      <FocusedEntities
        text={text}
        entities={focusedEntities}
        onDelete={deleteEntity}
      />
    </>
  );
};

const setInputRef =
  (inputNode: MutableRefObject<HTMLTextAreaElement | null>) =>
  (node: HTMLTextAreaElement) => {
    if (node) {
      inputNode.current = node;
    }
  };
