module.exports = `import CSS from "csstype";
import theme from "../../theme";

export const Heading: CSS.Properties = {
  color: theme.palette.primary.main,
};

export const MainGrid: CSS.Properties = {
  display: "grid",
  gridTemplateRows: "40px 30px 120px 65px 35px 35px 10px",
  rowGap: "8px",
  textAlign: "center",
};

export const Btn: CSS.Properties = {
  width: "75%",
  height: "48px",
  padding: "12px",
  color: "rgb(253, 249, 243)",
  fontWeight: 600,
  textTransform: "uppercase",
  background: theme.palette.warning.main,
  border: "none",
  borderRadius: "3px",
  outline: 0,
  cursor: "pointer",
  marginTop: "5%",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-out",
};

export const OtpError: CSS.Properties = {
  border: "1px solid red",
};

export const OtpInputNumber: CSS.Properties = {
  width: "2rem",
  height: "2rem",
  margin: "0.1rem 0.5rem",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid rgba(0, 0, 0, 0.3)",
};

export const MainBox: CSS.Properties = {
  maxWidth: "450px",
  height: "auto",
  margin: "auto",
  background: theme.palette.background.default,
  border: "0.25px solid #CFCFCF",
  boxShadow: "0px 0px 6px rgba(6, 2, 214, 0.15)",
  borderRadius: "20px",
  padding: "2rem 0rem",
};

export const Div: CSS.Properties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "50px",
  marginBottom: "50px",
  justifyContent: "center",
};

export const ParentBox: CSS.Properties = {
  padding: "4rem 1rem 0rem 1rem",
};

export const CodeText: CSS.Properties = {
  marginTop: "20px",
  lineHeight: 4,
};

export const ResendText: CSS.Properties = {
  color: "#707070",
};
export const Errmsz: CSS.Properties = {
  color: "rgb(198, 40, 40)",
  fontFamily: "Roboto",
  fontWeight: "400",
  fontSize: "0.75rem",
  lineHeight: "1.66",
  letterSpacing: "0.03333em",
  marginTop: "7px",
};
`