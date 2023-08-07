module.exports = 
`import CSS from "csstype";
import theme from "../../../theme";
import "@fontsource/roboto";

export const Heading: CSS.Properties = {
  color: theme.palette.primary.main,
};

export const SignOutBtn: CSS.Properties = {
  background: theme.palette.warning.main,
  marginTop: "15px",
};
export const SignOutUsingRedirectBtn: CSS.Properties = {
  background: theme.palette.warning.main,
  marginTop: "15px",
  display: "flex",
  marginLeft:"41%"
};

export const ChidlBox2:CSS.Properties={
  display:"inline-grid"
}

export const ParentBox: CSS.Properties = {
  padding: "7rem 1rem 0rem 1rem",
  textAlign: "center",
};
export const ChidlBox :CSS.Properties={
  paddingBottom:"30px"
}`;

