module.exports = `import { Configuration } from '@azure/msal-browser';
import {API_URL} from '../../../shared/apiEndPointURL';

export const msalConfig:Configuration = {
  auth: {
    clientId: API_URL.azureADClientId,
    authority: API_URL.azureADAuthority,
    redirectUri: API_URL.azureADRedirectURL,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

/* Add scopes here for ID token to be used at Microsoft identity platform endpoints. */
export const loginRequest = {
  scopes: ['User.Read'],
};

/* Add the endpoints here for Microsoft Graph API services you'd like to use. */
export const graphConfig = {
  graphMeEndpoint: API_URL.azureADGraphMeEndPoint,
};
`;
