module.exports =    `import CSS from "csstype";
import theme from "../../theme";
import "@fontsource/roboto";

export const Heading: CSS.Properties = {
  color: theme.palette.primary.main,
  textAlign: "center",
};

export const MainGrid: CSS.Properties = {
  display: "grid",
  gridTemplateRows: "22px 58px 15px 1px",
  rowGap: "4rem",
};

export const ForgotPswBtn: CSS.Properties = {
  background: theme.palette.warning.main,
  height: "48px",
};

export const MainBox: CSS.Properties = {
  maxWidth: "350px",
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

export const ParentBox: CSS.Properties = {
  padding: "4rem 1rem 0rem 1rem",
};      `