module.exports = `import {FC} from 'react';
import {Button} from '@mui/material';
import {IPrimaryButtonProps} from 'interfaces/authCommon.interface';
import theme from 'themes/authTheme';

const FormButton: FC<IPrimaryButtonProps> = ({variant, type, children, style, disabled}) => (
  <Button
    sx={{
      height: '48px',
      borderRadius: '4px',
      width: '463px',
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '18px',
      boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.1)',
      background: theme.palette.info.main,
    }}
    variant={variant}
    type={type}
    fullWidth
    style={style}
    disabled={disabled}
  >
    {children}
  </Button>
);
export default FormButton;

`;
