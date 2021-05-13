import React from 'react';
import { IEntity } from '~/interfaces/entity';
import { IStyleSheet } from '~/interfaces/style-sheet';

export interface IProps {
  text: string;
  entity: IEntity;
  onDelete: (entity: IEntity) => void;
}

export const FocusedEntity = ({ text, entity, onDelete }: IProps) => (
  <div style={styles.frame}>
    {text.substring(entity.selectionStart, entity.selectionEnd)}
    {entity.label && ` (${entity.label})`}
    <button
      style={styles.button}
      onClick={() => onDelete(entity)}
      data-testid="button"
    >
      <span role="img" aria-label="Delete">
        🗑️
      </span>
    </button>
  </div>
);

const styles: IStyleSheet = {
  frame: { wordBreak: 'break-word' },
  button: {
    border: '0 none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
  highlight: {
    opacity: 0.3,
  },
};
