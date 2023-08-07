module.exports = `import {createTheme, Shadows} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7A7A7A',
      light: '#CBCBCB',
      dark: '#000000',
    },
    secondary: {
      main: '#D8D8D8',
      dark: '#555555',
    },
    info: {
      main: '#1976D2',
      light: '#727272',
    },
    error: {
      main: '#E24841',
    },
  },

  typography: {
    allVariants: {
      fontFamily: 'Lato',
    },
    h6: {
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '26px',
      lineHeight: '31px',
    },
    subtitle1: {
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '22px',
    },
    caption: {
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '19px',
    },
  },

  shadows: [
    'none',
    '0px 0px 10px rgba(111, 111, 111, 0.05)',
    '2px 4px 4px rgba(0, 0, 0, 0.1)',
    ...Array(20).fill('none'),
  ] as Shadows,
});

export default theme;
`;
