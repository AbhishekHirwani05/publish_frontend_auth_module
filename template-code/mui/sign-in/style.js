module.exports = `import CSS from "csstype";
import theme from "../../theme";
import "@fontsource/roboto";

export const Heading: CSS.Properties = {
  color: theme.palette.primary.main,
};

export const MainGrid: CSS.Properties = {
  display: "grid",
  gridTemplateRows: "50px 86px 81px 30px 40px 10px 70px 40px 60px 0px",
  rowGap: "8px",
  textAlign: "center",
};

export const SignUpBtn: CSS.Properties = {
  background: theme.palette.warning.main,
  height: "48px",
};

export const MSButton: CSS.Properties = {
  height: "48px",
  display: "flex",
  background: "white",
  border: "1px solid #CBCBCB",
  justifyContent: "start",
};

export const MSICon: CSS.Properties = {
  height: "24px", 
  width: "20px",
};

export const MSText: CSS.Properties = {
  fontSize: "15px",
  fontWeight: 600,
  color: "#5E5E5E",
  border: "1px #8C8C8C",
  marginTop: "3px",
};

export const DividerMainBox: CSS.Properties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

export const Divider: CSS.Properties = {
  flex: 1, 
  height: "1px", 
  backgroundColor: "#8C8C8C", 
  opacity: 0.5,
};

export const OrText: CSS.Properties = {
  width: "40px", 
  textAlign: "center", 
  color: theme.palette.secondary.main,
};

export const LastTextBox: CSS.Properties = {
  marginTop: "40px",
};

export const AccText: CSS.Properties = {
  color: theme.palette.secondary.main,
};

export const LinkText: CSS.Properties = {
  color: theme.palette.primary.main,
  cursor: "pointer",
};

export const MainBox: CSS.Properties = {
  maxWidth: "28%",
  height: "auto",
  margin: "auto",
  background: theme.palette.background.default,
  border: "0.25px solid #CFCFCF",
  boxShadow: "0px 0px 6px rgba(6, 2, 214, 0.15)",
  borderRadius: "20px",
  padding: "2rem 3rem 6rem",
};

export const ErrorMsg: CSS.Properties = {
  color: theme.palette.warning.dark,
};

export const ForgotPasswordText: CSS.Properties = {
  color: "#707070",
  float: "right",
  marginTop: "1rem",
  cursor: "pointer",
};

export const ParentBox: CSS.Properties = {
  padding: "4rem 1rem 0rem 1rem",
};      

export const RememberMeCheckBox: CSS.Properties = {
  marginBottom: '2rem'
};    
`;