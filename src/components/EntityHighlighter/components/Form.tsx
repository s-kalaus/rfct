import React from 'react';

export interface IProps {
  disabled: boolean;
  label: string;
  onSubmit: (label: string) => void;
  onLabelChange: (label: string) => void;
}

export const Form = ({ label, disabled, onSubmit, onLabelChange }: IProps) => (
  <div>
    <input
      data-testid="input"
      type="text"
      placeholder="Entity label"
      value={label}
      onChange={(event) => onLabelChange(event.target.value)}
      disabled={disabled}
    />
    <button
      onClick={() => onSubmit(label)}
      disabled={disabled}
      data-testid="button"
    >
      Add entity for selection
    </button>
  </div>
);
