module.exports =  `import CSS from "csstype";

export const mainDiv :CSS.Properties={
  marginTop:"2%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "40vh",
}

export const Btn: CSS.Properties = {
  width: "20%",
  padding: "11px 13px",
  color: "rgb(253, 249, 243)",
  fontWeight: 600,
  textTransform: "uppercase",
  background: "#13003d",
  border: "none",
  borderRadius: "3px",
  outline: 0,
  cursor: "pointer",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-out",
  marginTop:"40px"
};
      
export const BtnText :CSS.Properties ={
  color:"white",
  fontSize:"13px",
  textDecoration:"none",
}

export const headingTop :CSS.Properties={
  fontSize: "65px",
}

export const text :CSS.Properties={
  fontWeight: 400
}

export const notFoundtext :CSS.Properties={
  marginTop: "0rem",
  fontWeight: 500
}`