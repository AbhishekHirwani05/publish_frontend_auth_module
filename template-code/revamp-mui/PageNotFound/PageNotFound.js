module.exports = `/* this is a functional component */
import React from 'react';
import {Box, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {style} from './PageNotFound.css';
import PageNotFoundIcon from '../../../auth-assets/images/pageNotFound.png';
import FormButton from '../Controls/PrimaryButton.component';

/**
@author      : SU
@date        : 24/04/2023
@description : Pagenotfound Component
@params      : Return Params
@return      : Return Output
*/

/* define the function type and the return type here */
const Pagenotfound: React.FC<Record<string, unknown>> = () => {
  /* this is for routing */
  const history = useNavigate();
  const pageNotFoundHandler = () => {
    history('/home');
  };
  return (
    <Grid data-testid="pageNotFoundForm" item xs={12} sm={12} md={7} lg={7} xl={7} sx={style.formGrid}>
      <Box sx={style.formBox}>
        <Box component="img" src={PageNotFoundIcon} alt="LockIcon" sx={style.lockIcon} />
        <Box component="form" sx={style.innerFormBox} onSubmit={pageNotFoundHandler}>
          <Typography variant="h6" sx={style.heading}>
            Page Not Found
          </Typography>
          <Typography variant="h6" sx={style.subTitle}>
            The page we are looking for doesn't exist.
          </Typography>
          <FormButton disabled={false} variant="contained" type="submit" style={style.homeBtn}>
            BACK TO HOME
          </FormButton>
        </Box>
      </Box>
    </Grid>
  );
};
export default Pagenotfound;
`;
