module.exports = `import React from 'react';
import {useAtom} from 'jotai/react';
import {redirectFrom} from '../Atom/store';
import AzureHome from './AzureHome/AzureHome.component';
import JwtHome from './JwtHome/JwtHome.component';
import Auth0Home from './Auth0Home/Auth0Home.component';
import GoogleHome from './GoogleHome/GoogleHome.component';

/**
 * @author : Shivali Umbarkar
 * @date : 23/03/2023
 * @description : MAin Home Component
 * @params : Return Params
 * @return : Return Output / / define the function type and the return type here */

 const MainHome = () => {
  const [redirectFromVal, setRedirectFrom] = useAtom(redirectFrom);

  const showComponent = (): React.ReactNode => {
    if (redirectFromVal.length > 0) {
      switch (redirectFromVal) {
        case 'jwtlogin':
          return <JwtHome />;
        case 'microsoft':
          return <AzureHome />;
        case 'auth0':
          return <Auth0Home />;
        case 'google':
            return <GoogleHome />;
        default:
          return <JwtHome />;
      }
    }
  };

  return <div>{showComponent()}</div>;
};

export default MainHome;
`;
