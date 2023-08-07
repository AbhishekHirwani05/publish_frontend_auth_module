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
      // marginTop: '10px',
      paddingTop: '100px',
      paddingBottom: '100px',
    },
    '@media only screen and (max-width: 600px)': {
      // marginTop: '20px',
      paddingTop: '190px',
      paddingBottom: '190px',
    },
  },

  successMszFormBox: {
    background: '#FFFFFF',
    border: '1px solid #CCCCCC',
    boxShadow: '0px 0px 10px rgba(111, 111, 111, 0.05)',
    borderRadius: '12px',
    width: '463px',
    padding: '15px 65px 10px 65px',
    '@media only screen and (max-width: 900px) and (min-width: 600px)': {
      width: 'auto',
      // marginTop: '10px',
      paddingTop: '120px',
      paddingBottom: '120px',
    },
    '@media only screen and (max-width: 600px)': {
      // marginTop: '20px',
      paddingTop: '241px',
      paddingBottom: '240px',
    },
  },

  errorBox: {
    width: '563px',
    height: '85px',
    display: 'flex',
    justifyContent: 'center',
    background: '#FFDCE0',
    borderRadius: '10px',
  },
  welcomeBackImg: {
    height: '100vh',
    width: '100%',
  },

  welcomeBackMobileImg: {
    height: '890px',
    width: '100%',
  },
  heading: {
    mb: '39px',
    mt: '10px',
    fontFamily: theme.typography.h6.fontFamily,
    fontStyle: theme.typography.h6.fontStyle,
    fontWeight: theme.typography.h6.fontWeight,
    fontSize: theme.typography.h6.fontSize,
    lineHeight: theme.typography.h6.lineHeight,
    color: theme.palette.primary.dark,
  },

  sucessHeading: {
    mb: '10px',
    mt: '25px',
    fontFamily: theme.typography.h6.fontFamily,
    fontStyle: theme.typography.h6.fontStyle,
    fontWeight: theme.typography.subtitle1.fontWeight,
    fontSize: theme.typography.h6.fontSize,
    lineHeight: theme.typography.h6.lineHeight,
    color: theme.palette.primary.dark,
  },

  signInMsz: {
    mb: '25px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '20px',
    lineHeight: '23px',
    color: '#727272',
  },
  lockIcon: {
    height: '53px',
    width: '53px',
    marginTop: '94px',
  },
  succesIcon: {
    marginTop: '72px',
  },

  error: {
    color: 'red',
    display: 'flex',
    fontFamily: theme.typography.caption.fontFamily,
    fontStyle: theme.typography.caption.fontStyle,
    fontWeight: theme.typography.caption.fontWeight,
    fontSize: theme.typography.caption.fontSize,
    // lineHeight: '19px',
    marginTop: '5px',
  },

  linkError: {
    color: 'red',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: theme.typography.caption.fontFamily,
    fontStyle: theme.typography.caption.fontStyle,
    fontWeight: theme.typography.caption.fontWeight,
    fontSize: theme.typography.caption.fontSize,
    // lineHeight: '19px',
  },
  paragraph: {
    fontWeight: 'bold',
    marginLeft: '10px',
  },

  linkExpiredFormBox: {
    background: '#FFDCE0',
    border: '1px solid #CCCCCC',
    boxShadow: '0px 0px 10px rgba(111, 111, 111, 0.05)',
    borderRadius: '10px',
    width: '463px',
    padding: '15px 65px 10px 65px',
    '@media only screen and (max-width: 900px) and (min-width: 600px)': {
      width: 'auto',
      paddingTop: '310px',
      paddingBottom: '310px',
    },
    '@media only screen and (max-width: 600px)': {
      paddingTop: '310px',
      paddingBottom: '310px',
    },
  },
};
`;
