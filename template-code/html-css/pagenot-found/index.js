module.exports = `import React from "react";
import { Link } from 'react-router-dom';
import { Btn, BtnText, headingTop, mainDiv, notFoundtext, text } from "./style";

/* this is the starting point for page not found screen */
const PageNotFound = () => {
  return (
    <div style={mainDiv}>
      <h1 style={headingTop}>404</h1>
      <h2 style={notFoundtext}> PAGE NOT FOUND</h2>
      <h3 style={text}> The page you were looking for doesn't exsist.</h3>
      <button type="submit" style={Btn}
      >
        <Link  style={BtnText} to="/">Back to Home</Link>
      </button>
    </div>
  );
};

export default PageNotFound;
`