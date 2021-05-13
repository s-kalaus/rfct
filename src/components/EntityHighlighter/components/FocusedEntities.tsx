import React from 'react';
import { IEntity } from '~/interfaces/entity';
import { FocusedEntity } from './FocusedEntity';

export interface IProps {
  text: string;
  entities: IEntity[];
  onDelete: (entity: IEntity) => void;
}

export const FocusedEntities = ({ entities, text, onDelete }: IProps) => (
  <>
    {entities.map((entity) => (
      <FocusedEntity
        text={text}
        entity={entity}
        key={JSON.stringify(entity)}
        onDelete={onDelete}
      />
    ))}
  </>
);
