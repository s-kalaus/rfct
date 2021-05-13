import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { IEntity } from '~/interfaces/entity';

interface IProps {
  text: string;
  entities: IEntity[];
  onTextChange: (text: string) => void;
  onEntitiesChange: (entities: IEntity[]) => void;
}

export interface IOutput {
  selection: IEntity;
  focusedEntities: IEntity[];
  handleSelectionChange: (text: string) => void;
  hasZeroSelection: boolean;
  deleteEntity: (entity: IEntity) => void;
  addEntity: (label: string) => void;
  handleTextChange: (text: string) => void;
  inputNode: MutableRefObject<HTMLTextAreaElement | null>;
}

export const useEntityHighlighter = ({
  entities,
  text,
  onTextChange,
  onEntitiesChange,
}: IProps): IOutput => {
  const inputNode = useRef<HTMLTextAreaElement | null>(null);
  const [focusedEntities, setFocusedEntities] = useState<IEntity[]>([]);
  const [selection, setSelection] = useState<IEntity>(SELECTION_DEFAULT);

  const selectionChangeHandler = useCallback(
    ({ target: { selectionStart, selectionEnd } }) =>
      setSelection({
        selectionStart,
        selectionEnd,
        label: '',
      }),
    [setSelection]
  );

  const handleSelectionChange = useCallback(
    (label: string) => setSelection({ ...selection, label }),
    [selection, setSelection]
  );

  const handleTextChange = useCallback(
    (textUpdated) => {
      const entitiesUpdated = entities.reduce(
        (prev: IEntity[], entity: IEntity) => {
          const textSelected = text.substr(
            entity.selectionStart,
            entity.selectionEnd - entity.selectionStart
          );
          const selectionStart = findClosestStart(
            textUpdated,
            textSelected,
            entity
          );
          if (selectionStart === -1) {
            return prev;
          }
          return [
            ...prev,
            {
              ...entity,
              selectionStart,
              selectionEnd: selectionStart + textSelected.length,
            },
          ];
        },
        []
      );
      onTextChange(textUpdated);
      onEntitiesChange(entitiesUpdated);
      setFocusedEntities([]);
    },
    [text, entities, onTextChange, onEntitiesChange]
  );

  const deleteEntity = useCallback(
    (entity: IEntity) => {
      setFocusedEntities([]);
      onEntitiesChange(entities.filter((theEntity) => entity !== theEntity));
    },
    [entities, onEntitiesChange]
  );

  const addEntity = useCallback(
    (label) => {
      setSelection(SELECTION_DEFAULT);
      onEntitiesChange(entities.concat({ ...selection, label }));
    },
    [selection, entities, onEntitiesChange]
  );

  useEffect(() => {
    const input = inputNode.current;

    if (input) {
      input.addEventListener('select', selectionChangeHandler, false);
      input.addEventListener('click', selectionChangeHandler, false);
      input.addEventListener('keydown', selectionChangeHandler, false);

      return () => {
        input.removeEventListener('select', selectionChangeHandler);
        input.removeEventListener('click', selectionChangeHandler);
        input.removeEventListener('keydown', selectionChangeHandler);
      };
    }
  }, [selectionChangeHandler, inputNode]);

  useEffect(
    () =>
      setFocusedEntities(
        entities.filter(
          ({ selectionStart, selectionEnd }) =>
            selectionStart <= selection.selectionStart &&
            selectionEnd > selection.selectionStart
        )
      ),
    [entities, selection]
  );

  const hasZeroSelection = selection.selectionStart === selection.selectionEnd;

  return {
    selection,
    focusedEntities,
    handleSelectionChange,
    hasZeroSelection,
    deleteEntity,
    addEntity,
    handleTextChange,
    inputNode,
  };
};

export const SELECTION_DEFAULT: IEntity = {
  selectionStart: 0,
  selectionEnd: 0,
  label: '',
};

export const findClosestStart = (
  text: string,
  textSelected: string,
  entity: IEntity,
  lastMatch: number | null = null
): number => {
  if (lastMatch === null) {
    const index = text.indexOf(textSelected);
    if (index === -1) {
      return index;
    }
    return findClosestStart(text, textSelected, entity, index);
  }
  const from = lastMatch + textSelected.length;
  const index = text.indexOf(textSelected, from);
  if (index === -1) {
    return lastMatch;
  }
  const prevDiff = Math.abs(entity.selectionStart - lastMatch);
  const nextDiff = Math.abs(entity.selectionStart - index);
  if (prevDiff < nextDiff) {
    return lastMatch;
  }
  return findClosestStart(text, textSelected, entity, index);
};
