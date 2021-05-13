import React, { useState } from 'react';
import { IEntity } from '~/interfaces/entity';
import { ENTITY_COLORS } from '../consts/entity-colors';
import { IStyleSheet } from '~/interfaces/style-sheet';
import { hashString } from '~/utils/hash-string';

export interface IProps {
  text: string;
  entity: IEntity;
}

export const Entity = ({ text, entity }: IProps) => {
  const [start] = useState(text.substr(0, entity.selectionStart));
  const [value] = useState(
    text.substr(
      entity.selectionStart,
      entity.selectionEnd - entity.selectionStart
    )
  );
  const [end] = useState(text.substr(entity.selectionEnd));
  const [backgroundColor] = useState(
    ENTITY_COLORS[hashString(entity.label) % ENTITY_COLORS.length].bg
  );

  return (
    <div style={styles.item}>
      {start}
      <span style={{ ...styles.highlight, backgroundColor }}>{value}</span>
      {end}
    </div>
  );
};

const styles: IStyleSheet = {
  item: {
    textAlign: 'left',
    position: 'absolute',
    top: '6px',
    left: '6px',
    right: '6px',
    color: 'transparent',
    pointerEvents: 'none',
    padding: '0',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily:
      'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
    fontSize: '14px',
  },
  highlight: {
    opacity: 0.3,
  },
};
