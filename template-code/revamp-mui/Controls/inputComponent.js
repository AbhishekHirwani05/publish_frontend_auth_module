module.exports = `import React, {FC} from 'react';
import {TextField} from '@mui/material';
import { IInputfieldProps } from 'interfaces/authCommon.interface';

const InputTextField: FC<IInputfieldProps> = ({
  label,
  type,
  autoComplete,
  variant,
  InputProps,
  helperText,
  error,
  register,
  disabled,
  onFocus,
  sx,
}) => (
  <TextField
    fullWidth
    label={label}
    type={type}
    autoComplete={autoComplete}
    variant={variant}
    InputProps={InputProps}
    disabled={disabled}
    helperText={helperText}
    error={error}
    {...register}
    sx={sx}
    onFocus={onFocus}
  />
);
export default InputTextField;`;
