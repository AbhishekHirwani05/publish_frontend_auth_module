module.exports = `import CSS from "csstype";
import theme from "../../theme";
import "@fontsource/roboto";
import {options} from "../../../auth-config";

export const Heading: CSS.Properties = {
  color: theme.palette.primary.main,
};

export const MainGrid: CSS.Properties = {
  display: "grid",
  gridTemplateRows: options.captcha ? "50px 100px 100px 100px 85px 130px 48px 35px" : "50px 100px 100px 100px 100px 48px",
  rowGap: "8px",
  textAlign: "center"
};

export const SignUpBtn: CSS.Properties = {
  background: theme.palette.warning.main,
  height: "48px",
};

export const LastTextBox: CSS.Properties = {
  marginTop: "20px",
};

export const AccText: CSS.Properties = {
  color: theme.palette.secondary.main,
};

export const LinkText: CSS.Properties = {
  color: theme.palette.primary.main,
  cursor: "pointer",
};

export const MainBox: CSS.Properties = {
  maxWidth: "450px",
  height: "auto",
  margin: "auto",
  background: theme.palette.background.default,
  border: "0.25px solid #CFCFCF",
  boxShadow: "0px 0px 6px rgba(6, 2, 214, 0.15)",
  borderRadius: "20px",
  padding: "2rem 3rem",
};

export const ErrorMsg: CSS.Properties = {
  color: theme.palette.warning.dark,
};

export const RecaptchaErrorMsg: CSS.Properties = {
    color: theme.palette.warning.dark,
    fontSize: '0.75rem',
    float: 'left'
  };

export const RecaptchaBox: CSS.Properties = {
    margin: "auto",
  };
  
  export const ParentBox: CSS.Properties = {
    padding: "4rem 1rem 0rem 1rem",
  };

  export const paragraph: CSS.Properties = {
    fontWeight:"bold", marginLeft:"10px"
  };
  `