module.exports = `import theme from '../../../themes/authTheme';

/* default style for component */
export const style = {
  heading: {
    // mt: '10px',
    fontFamily: theme.typography.h6.fontFamily,
    fontStyle: theme.typography.h6.fontStyle,
    fontWeight: theme.typography.h6.fontWeight,
    fontSize: theme.typography.h6.fontSize,
    lineHeight: theme.typography.h6.lineHeight,
    color: theme.palette.primary.dark,
  },

  formGrid: {
    textAlign: '-webkit-center',
    paddingTop: '179px',
    // paddingBottom: '20px',
  },

  formBox: {
    justifyContent: 'center',
    display: 'flex',
    background: '#FFFFFF',
    boxShadow: '0px 0px 10px rgba(111, 111, 111, 0.05)',
    borderRadius: '12px',
    width: '546px',
    height: '699px',
    padding: '15px 65px 10px 65px',
  },

  innerFormBox: {
    mt: '330px',
  },

  lockIcon: {
    position: 'absolute',
    width: '546px',
    height: '299px',
    mb: '30px',
  },

  subTitle: {
    mt: '8px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '20px',
    lineHeight: '23px',

    color: '#727272',
  },

  homeBtn: {
    marginTop: '24px',
  },
};
`;
