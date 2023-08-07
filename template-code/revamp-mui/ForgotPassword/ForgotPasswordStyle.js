module.exports = `
import theme from 'themes/authTheme';

/* default style for component */
export const style = {
  mainGrid: {
    height: '100vh',
  },

  welcomeImg: {
    height: '100vh',
    width: '100%',
  },

  welcomeMobileImg: {
    height: '890px',
    width: '100%',
  },

  lockIcon: {
    height: '53px',
    width: '53px',
    marginTop: '96px',
  },

  formGrid: {
    textAlign: '-webkit-center',
    paddingTop: '20px',
    paddingBottom: '20px',
    margin: 'auto',
    '@media only screen and (max-width: 600px)': {
      marginTop: '-640px',
    },
    '@media only screen and (max-width: 900px) and (min-width: 600px)': {
      marginTop: '-645px',
    },
  },

  formBox: {
    background: '#FFFFFF',
    border: '1px solid #CCCCCC',
    boxShadow: '0px 0px 10px rgba(111, 111, 111, 0.05)',
    borderRadius: '12px',
    height: '511px',
    width: '463px',
    padding: '15px 65px 10px 65px',
    '@media only screen and (max-width: 900px) and (min-width: 600px)': {
      width: 'auto',
    },
  },

  forgotPswText: {
    mb: '30px',
    mt: '6px',
    fontFamily: theme.typography.h6.fontFamily,
    fontStyle: theme.typography.h6.fontStyle,
    fontWeight: theme.typography.h6.fontWeight,
    fontSize: theme.typography.h6.fontSize,
    lineHeight: theme.typography.h6.lineHeight,
    color: theme.palette.primary.dark,
  },

  errBox: {
    display: 'flex',
    justifyItems: 'center',
    mt: '4px',
    position: 'absolute',
  },

  errorMsg: {
    color: theme.palette.error.main,
    fontSize: theme.typography.caption.fontSize,
    paddingLeft: '8px',
  },

  errorIcon: {
    height: '20px',
    width: '20px',
    marginTop: '2px',
  },

  forgotBtn: {
    background: theme.palette.info.main,
    borderRadius: '4px',
  },

  testPsw: {
    mt: '30px',
    fontStyle: theme.typography.subtitle1.fontStyle,
    fontWeight: theme.typography.subtitle1.fontWeight,
    fontSize: theme.typography.subtitle1.fontSize,
    lineHeight: theme.typography.subtitle1.lineHeight,
    color: theme.palette.info.light,
  },
};
`;
