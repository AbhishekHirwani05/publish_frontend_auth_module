module.exports = `import CSS from "csstype";
import theme from "../../theme";
import "@fontsource/roboto";

export const Heading: CSS.Properties = {
  color: theme.palette.primary.main,
};

export const MainGrid: CSS.Properties = {
  display: "grid",
  gridTemplateRows: "50px 100px 100px 40px 30px",
  rowGap: "8px",
  textAlign: "center",
};

export const ResetPswBtn: CSS.Properties = {
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
};
export const paragraph: CSS.Properties = {
  fontWeight:"bold", marginLeft:"10px"
};

export const MajorBox: CSS.Properties = {
  maxWidth: "550px",
  height: "auto",
  margin: "auto",
  marginTop:"150px",
  background: theme.palette.background.default,
  // border: "0.25px solid #CFCFCF",
  boxShadow: "0px 0px 6px rgba(6, 2, 214, 0.15)",
  borderRadius: "20px",
  padding: "2rem 3rem",
};
`