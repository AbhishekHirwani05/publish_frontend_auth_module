module.exports = `import {InputProps, SxProps} from '@mui/material';
import {FocusEventHandler} from 'react';

export type IInputfieldProps = {
  variant: 'outlined' | 'standard' | 'filled' | undefined;
  type: string;
  label: string;
  InputProps: InputProps | undefined;
  error: boolean;
  helperText: React.ReactNode;
  autoComplete: string;
  register: object;
  disabled: boolean;
  onFocus: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  sx: SxProps;
};

export type IPrimaryButtonProps = {
  variant: 'text' | 'outlined' | 'contained' | undefined;
  type: 'submit' | undefined;
  children: React.ReactNode;
  style: React.CSSProperties;
  disabled: boolean;
};

export type ISocialMediaButtonProps = {
  variant: 'text' | 'outlined' | 'contained' | undefined;
  children: React.ReactNode;
  startIcon: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
`;
