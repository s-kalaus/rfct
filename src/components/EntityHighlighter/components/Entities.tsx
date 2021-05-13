import React from 'react';
import { IEntity } from '~/interfaces/entity';
import { Entity } from './Entity';

export interface IProps {
  text: string;
  entities: IEntity[];
}

export const Entities = ({ text, entities }: IProps) => (
  <>
    {entities.map((entity) => (
      <Entity text={text} entity={entity} key={JSON.stringify(entity)} />
    ))}
  </>
);
