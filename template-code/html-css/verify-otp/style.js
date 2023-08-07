module.exports = `import CSS from "csstype";

export const MiddleText: CSS.Properties = {
  textAlign: "center",
};

export const MainBox: CSS.Properties = {
  textAlign: "center",
  overflowY: "hidden",
};

export const MainGrid: CSS.Properties = {
  display: "grid",
  gridTemplateRows: "60px 35px 65px 55px 42px 55px 50px",
  rowGap: "8px",
  textAlign: "center",
};

export const Title: CSS.Properties = {
  fontWeight: "normal",
  color: "#13003d",
  textShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

export const ParentBox: CSS.Properties = {
  padding: "1rem 0rem 30rem 1rem",
};

export const Btn: CSS.Properties = {
  width: "25%",
  padding: "11px 13px",
  color: "rgb(253, 249, 243)",
  fontWeight: 600,
  textTransform: "uppercase",
  background: "#13003d",
  border: "none",
  borderRadius: "3px",
  outline: 0,
  cursor: "pointer",
  justifySelf: "center",
  alignItems: "center",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-out",
};

export const otpError: CSS.Properties = {
  border: "1px solid red",
};

export const otpInput: CSS.Properties = {
  width: "2rem",
  height: "2rem",
  margin: " 0 1rem ",
  fontSize: "1rem",
  borderRadius: "4px",
  border: "1px solid rgba(0, 0, 0, 0.3)",
};

export const BtnMainDiv: CSS.Properties = {
  display: "grid",
  gridTemplateRows: "1fr",
  marginTop: "15px",
};

export const Errmsz: CSS.Properties = {
  color: "red",
  textAlign: "center",
  fontSize: "0.8rem",
};
 `