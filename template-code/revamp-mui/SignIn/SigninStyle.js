module.exports = `import theme from '../../../themes/authTheme';

/* default style for component */
export const style = {
  mainGrid: {
    height: '100vh',
  },

  formGrid: {
    textAlign: '-webkit-center',
    paddingTop: '20px',
    paddingBottom: '20px',
    margin: 'auto',
    '@media only screen and (max-width: 600px)': {
      marginTop: '-650px',
    },
    '@media only screen and (max-width: 900px) and (min-width: 600px)': {
      marginTop: '-650px',
    },
  },

  formBox: {
    background: '#FFFFFF',
    border: '1px solid #CCCCCC',
    boxShadow: '0px 0px 10px rgba(111, 111, 111, 0.05)',
    borderRadius: '12px',
    width: '463px',
    padding: '15px 65px 10px 65px',
    '@media only screen and (max-width: 900px) and (min-width: 600px)': {
      width: 'auto',
      paddingTop: '50px',
      paddingBottom: '50px',
    },
    '@media only screen and (max-width: 600px)': {
      // marginTop: '20px',
      paddingTop: '68px',
    },
  },
  
  heading: {
    mb: '30px',
    mt: '10px',
    fontFamily: theme.typography.h6.fontFamily,
    fontStyle: theme.typography.h6.fontStyle,
    fontWeight: theme.typography.h6.fontWeight,
    fontSize: theme.typography.h6.fontSize,
    lineHeight: theme.typography.h6.lineHeight,
    color: theme.palette.primary.dark,
  },

  welcomeBackImg: {
    height: '100vh',
    width: '100%',
  },

  welcomeBackMobileImg: {
    height: '890px',
    width: '100%',
  },

  lockIcon: {
    height: '53px',
    width: '53px',
    marginTop: '23px',
  },

  error: {
    display: 'flex',
    fontFamily: theme.typography.caption.fontFamily,
    fontStyle: theme.typography.caption.fontStyle,
    fontWeight: theme.typography.caption.fontWeight,
    fontSize: theme.typography.caption.fontSize,
    // lineHeight: '19px',
    marginTop: '5px',
  },

  LinkBox: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10px',
    marginBottom: '25px',
    fontFamily: theme.typography.subtitle1.fontFamily,
    fontStyle: theme.typography.subtitle1.fontStyle,
    fontWeight: theme.typography.subtitle1.fontWeight,
    fontSize: theme.typography.subtitle1.fontSize,
    color: '#555555',
  },

  divider: {
    padding: '15px 15px',
    mb: '35px',
    fontFamily: theme.typography.subtitle1.fontFamily,
    fontStyle: theme.typography.subtitle1.fontStyle,
    fontWeight: theme.typography.subtitle1.fontWeight,
    fontSize: theme.typography.subtitle1.fontSize,
  },

  linkForgot: {
    color: '#1976D2',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
    fontFamily: theme.typography.subtitle1.fontFamily,
    fontStyle: theme.typography.subtitle1.fontStyle,
    fontWeight: theme.typography.subtitle1.fontWeight,
    fontSize: theme.typography.subtitle1.fontSize,
  },
  RememberMeCheckBox: {
    display: 'flex',
    marginBottom: '22px',
    color: '#7A7A7A',
  },
};
`;
