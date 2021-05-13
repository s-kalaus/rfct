import React from 'react';
import { IEntity } from '~/interfaces/entity';
import { Entities } from './Entities';
import { IStyleSheet } from '~/interfaces/style-sheet';

export interface IProps {
  text: string;
  entities: IEntity[];
  onTextChange: (text: string) => void;
  onInputRef: (node: HTMLTextAreaElement) => void;
}

export const Editor = ({
  text,
  onTextChange,
  entities,
  onInputRef,
}: IProps) => (
  <div style={styles.wrapper}>
    <textarea
      style={styles.input}
      ref={onInputRef}
      onChange={(event) => onTextChange(event.target.value)}
      value={text}
      rows={10}
      data-testid="textarea"
    />
    <Entities entities={entities} text={text} />
  </div>
);

const styles: IStyleSheet = {
  wrapper: {
    position: 'relative',
  },
  input: {
    fontFamily:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    fontSize: '14px',
    background: 'none',
    border: '1px solid',
    width: '100%',
    resize: 'none',
    padding: '5px',
    whiteSpace: 'pre-wrap',
    boxSizing: 'border-box',
    wordBreak: 'break-word',
  },
};
