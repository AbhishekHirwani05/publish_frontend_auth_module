module.exports = `/* default style for component */
import theme from '../../../themes/authTheme';

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
      paddingTop: '100px',
      paddingBottom: '100px',
    },
    '@media only screen and (max-width: 600px)': {
      paddingTop: '100px',
      paddingBottom: '100px',
    },
  },
  heading: {
    mb: '25px',
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
    marginTop: '60px',
  },


  subTitle: {
    fontFamily: theme.typography.subtitle1.fontFamily,
    fontStyle: theme.typography.subtitle1.fontStyle,
    fontWeight: theme.typography.subtitle1.fontWeight,
    fontSize: theme.typography.subtitle1.fontSize,
    lineHeight: theme.typography.subtitle1.lineHeight,
    color: ' #555555',
    mb: '25px',
  },

  linkResend: {
    fontFamily: theme.typography.subtitle1.fontFamily,
    fontStyle: theme.typography.subtitle1.fontStyle,
    fontWeight: theme.typography.h6.fontWeight,
    fontSize: theme.typography.subtitle1.fontSize,
    lineHeight: theme.typography.subtitle1.lineHeight,
    color: '#1976D2',
    border: 'none',
    background: 'none',
    mb: '25px',
  },
  
  error: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: theme.typography.caption.fontFamily,
    fontStyle: theme.typography.caption.fontStyle,
    fontWeight: theme.typography.caption.fontWeight,
    fontSize: theme.typography.caption.fontSize,
    // lineHeight: '19px',
    color: 'red',
    mb: '20px',
  },

  OtpError: {
    border: '1px solid red',
  },
  OtpInputNumber: {
    width: '42px',
    height: '42px',
    margin: '0.1rem 1rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: ' 1.5px solid #CBCBCB',
  },

  otpBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px',
  },
};
`;
