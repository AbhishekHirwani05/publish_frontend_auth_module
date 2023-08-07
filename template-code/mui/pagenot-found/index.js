module.exports =  `import { Box,Button, Typography } from "@mui/material";
import React from "react";
import { Heading, MainBox, MainGrid, ParentBox,BackBtn, PageNotFpund } from "./style";
import { Link } from 'react-router-dom';

/* this is the starting point for page not found screen */
const PageNotFound = () => {
  return (
    <Box style={ParentBox}>
      <Box style={MainBox}>
        <form>
          <Box style={MainGrid}>
            <Typography variant="h1" style={Heading}>
              404
            </Typography>

            <Typography variant="h5" style={PageNotFpund}>
             PAGE NOT FOUND
            </Typography>

            <Typography variant="h6" style={Heading}>
              The page you were looking for doesn't exsist.
            </Typography>
            <Button variant="contained" type="submit" style={BackBtn} >
                  <Link  style={{color:"white",textDecoration: "none"}} to="/">Back to Home</Link>
                </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default PageNotFound;
`