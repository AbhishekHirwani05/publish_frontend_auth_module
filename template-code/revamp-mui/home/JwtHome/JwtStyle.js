module.exports = `import theme from '../../../../themes/authTheme';
// import '@fontsource/roboto';

/* default style for component */
export const style = {
  ChidlBox: {
    paddingBottom: '30px',
  },

  Heading: {
    color: theme.palette.primary.main,
  },

  SignOutBtn: {
    background: theme.palette.warning.main,
    marginTop: '15px',
  },
  SignOutUsingRedirectBtn: {
    background: theme.palette.warning.main,
    marginTop: '15px',
    display: 'flex',
    marginLeft: '41%',
  },

  ChidlBox2: {
    display: 'inline-grid',
  },

  ParentBox: {
    padding: '7rem 1rem 0rem 1rem',
    textAlign: 'center',
  },
};
`;
