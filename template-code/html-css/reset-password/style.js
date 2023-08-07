module.exports = `import CSS from 'csstype'
export const Flex: CSS.Properties = {
  display: "grid",
  gridTemplateRows: "20px 100px 100px 100px 100px 100px 100px",
}

export const MainBox: CSS.Properties = {
  width: "100%",
  marginTop: "2%",
  borderRadius: "20px",
}

export const Form: CSS.Properties = {
  margin: " 0 auto",
  display: "grid",
  flexDirection: "column",
  width: "30%",
  padding: "1.2rem",
  position: "relative",
}

export const Input: CSS.Properties = {
  padding: "11px 13px",
  background: "#f9f9fa",
  color: "#070045",
  width: "auto",
  borderRadius: "4px",
  outline: 0,
  border: "1px solid rgb(38, 38, 38)",
  fontSize: "14px",
  transition: "all 0.3s ease - out",
  boxShadow: "0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1)",
};

export const Btn: CSS.Properties = {
  width: "100%",
  padding: "11px 13px",
  color: "rgb(253, 249, 243)",
  fontWeight: 600,
  textTransform: "uppercase",
  background: "#13003d",
  border: "none",
  borderRadius: "3px",
  outline: 0,
  cursor: "pointer",
  marginTop: "1.5rem",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-out",
}

export const Title: CSS.Properties = {
  fontWeight: "normal",
  color: "#2a2a29",
  textShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  margin: '0%'
}
export const Label: CSS.Properties = {
  fontWeight: "light",
  fontFamily: "inherit",
  color: "#4e4d4d",
  fontSize: "14px",
  textAlign: "left",
  paddingTop: "10px",
  paddingBottom: "5px",
}

export const MainDiv : CSS.Properties = {
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr 1fr 24px"
}

export const ErrorMsg: CSS.Properties = {
  color: "red",
  textAlign: "left",
  margin: 0,
  fontSize: '0.8rem'
}

export const SignInText: CSS.Properties = {
  color: "#13003d",
  cursor: "pointer",
} 

export const PswIcon: CSS.Properties = {
  top: '52px', 
  right: '20px',
  position: "absolute", 
  width: '12px'
} 
export const Paragraph: CSS.Properties = {
  fontWeight: "bold",
  textAlign: "left",
  paddingLeft: "9px",
};

export const ulist: CSS.Properties = {
  textAlign: "left",
  paddingLeft: "25px",
  paddingRight: "25px",
};

export const mainDiv: CSS.Properties = {
  display: "flex",
 flexDirection: "column",
 justifyContent: "center",
 alignItems: "center",
 width: "100%",
 height: "25vh",
 };
`;
