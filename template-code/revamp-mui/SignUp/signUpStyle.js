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
    marginTop: '14px',
  },

  recaptchaErrBox: {
    display: 'flex',
    justifyItems: 'center',
    margin: '5px 80px -25px',
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
    boxShadow: theme.shadows[0],
    borderRadius: '12px',
    width: '463px',
    padding: '15px 65px 10px 65px',
    '@media only screen and (max-width: 900px) and (min-width: 600px)': {
      width: 'auto',
    },
  },

  signUpText: {
    mb: '30px',
    mt: '6px',
    fontFamily: theme.typography.h6.fontFamily,
    fontStyle: theme.typography.h6.fontStyle,
    fontWeight: theme.typography.h6.fontWeight,
    fontSize: theme.typography.h6.fontSize,
    lineHeight: theme.typography.h6.lineHeight,
    color: theme.palette.primary.dark,
  },

  gridBox: {
    display: 'grid',
    gridTemplateRows: '24px 70px 73px 73px 73px 53px 110px',
    textAlign: 'center',
    height: '10%',
  },

  recaptchaBox: {
    margin: 'auto',
  },

  signUpBtn: {
    background: theme.palette.info.main,
  },

  alreadyAccText: {
    paddingTop: '18px',
    mb: '19px',
    fontFamily: theme.typography.subtitle1.fontFamily,
    fontStyle: theme.typography.subtitle1.fontStyle,
    fontWeight: theme.typography.subtitle1.fontWeight,
    fontSize: theme.typography.subtitle1.fontSize,
    lineHeight: theme.typography.subtitle1.lineHeight,
    textDecorationLine: theme.typography.subtitle1.textDecorationLine,
    color: theme.palette.secondary.dark,
  },

  signIntext: {
    color: theme.palette.secondary.dark,
    textDecorationColor: theme.palette.secondary.dark,
  },

  paragraph: {
    fontWeight: 'bold',
    marginLeft: '10px',
  },

  dividerMainBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    mb: 1,
    mt: 1,
  },

  divider: {
    flex: 1,
    height: '1px',
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.5,
  },

  orText: {
    width: '40px',
    align: 'center',
    lineHeight: '37px',
    color: theme.palette.secondary.dark,
    fontStyle: theme.typography.subtitle1.fontStyle,
    fontWeight: theme.typography.subtitle1.fontWeight,
    fontSize: theme.typography.subtitle1.fontSize,
  },

  recaptchaErrorMsg: {
    color: theme.palette.error.main,
    fontSize: theme.typography.caption.fontSize,
    mt: 0,
    ml: 1,
    mb: 1,
  },

  errBox: {
    display: 'flex',
    justifyItems: 'center',
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

  socialServiceBtn: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    left: '30px',
  },

  successBox: {
    width: '523px',
    height: '228px',
    background: '#FFFFFF',
    border: '1px solid #CCCCCC',
    boxShadow: theme.shadows[0],
    borderRadius: '12px',
    padding: '71px 42px',
    justifySelf: 'center',
  },

  successIcon: {
    height: '67px',
    width: '67px',
    margin: 'auto',
  },

  successText: {
    mt: '21px',
    pb: '10px',
    fontStyle: theme.typography.h6.fontStyle,
    fontWeight: theme.typography.h6.fontWeight,
    fontSize: theme.typography.h6.fontSize,
    color: theme.palette.primary.dark,
    lineheight: theme.typography.h6.lineheight,
  },

  successSignInText: {
    mb: '25px',
    fontStyle: theme.typography.subtitle1.fontStyle,
    fontWeight: theme.typography.subtitle1.fontWeight,
    fontSize: theme.typography.subtitle1.fontSize,
    lineHeight: theme.typography.subtitle1.lineHeight,
    color: theme.palette.info.light,
  },

  successSignInBtn: {
    width: '463px',
    background: theme.palette.info.main,
    borderRadius: '4px',
  },
};
`;
