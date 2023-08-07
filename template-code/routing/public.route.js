module.exports = `/** Imports */
import SignUp from 'components/Auth/SignUp/SignUp.component';
import SignIn from 'components/Auth/SignIn/SignIn.component';
import Resetpassword from 'components/Auth/ResetPassword/ResetPassword.component';
import Verify from 'components/Auth/Verify/Verify.component';
import ForgotPassword from 'components/Auth/ForgotPassword/ForgotPassword.component';
import {TRouteType} from 'types';
import Pagenotfound from 'components/Auth/PageNotFound/PageNotFound.component';
import Auth0ResetPassword from 'components/Auth/Auth0ResetPassword/Auth0ResetPassword.component';


/** Lazy imports */

const publicRoutesList: TRouteType[] = [
  {
    path: '*',
    element: <Pagenotfound />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/authzero-forgot-password',
    element: <Auth0ResetPassword />,
  },
  {
    path: '/verify',
    element: <Verify />,
  },
  {
    path: '/reset-password/:id',
    element: <Resetpassword />,
  },
];

export {publicRoutesList};
`;
