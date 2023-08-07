module.exports = `import React, {FC} from 'react';
import {Button} from '@mui/material';
import {ISocialMediaButtonProps} from 'interfaces/authCommon.interface';

const SocialServiceBtn: FC<ISocialMediaButtonProps> = ({variant, children, startIcon, onClick}) => (
  <Button
    variant={variant}
    sx={{
      height: '48px',
      width: '463px',
      border: '2px solid #1976D2',
      borderRadius: '4px',
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '18px',
      textTransform: 'none',
      lineHeight: ' 22px',
    }}
    fullWidth
    startIcon={startIcon}
    onClick={onClick}
  >
    {children}
  </Button>
);
export default SocialServiceBtn;
`;
