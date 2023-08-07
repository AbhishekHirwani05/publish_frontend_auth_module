module.exports = `import CSS from "csstype";
import theme from "../../theme";
import "@fontsource/roboto";

export const Heading: CSS.Properties = {
  color: theme.palette.primary.main,
};

export const MainGrid: CSS.Properties = {
  display: "grid",
  gridTemplateRows: "100px 100px 100px 10px",
  textAlign: "center",
};

export const BackBtn: CSS.Properties = {
  background: theme.palette.warning.main,
  height: "48px",
};

export const LinkText: CSS.Properties = {
  color: theme.palette.primary.main,
  cursor: "pointer",
};

export const MainBox: CSS.Properties = {
  maxWidth: "25%",
  height: "auto",
  margin: "auto",
  background: theme.palette.background.default,
  border: "0.25px solid #CFCFCF",
  boxShadow: "0px 0px 6px rgba(6, 2, 214, 0.15)",
  borderRadius: "20px",
  padding: "2rem 3rem 6rem",
};

export const ParentBox: CSS.Properties = {
  padding: "4rem 1rem 0rem 1rem",
};

export const PageNotFpund: CSS.Properties = {
  color: theme.palette.primary.main,
  marginTop: "9%",
  fontSize: "25px",
  fontWeight: 500,
};
`