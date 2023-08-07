module.exports = `import {PublicClientApplication} from '@azure/msal-browser';
import {MsalProvider} from '@azure/msal-react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {App} from 'App';
import {msalConfig} from 'components/Auth/AzureAD/azureConfig';
import {LabelProvider} from 'providers';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../i18n/i18n';
import '../../variable.css';
import '../../themes/theme.scss';
import '@fontsource/lato';
import '@fontsource/roboto';

/**
@author      : Ajinkya Deshmukh
@date        : 2023-05-02
@description : This is main component of app which wraps all the context provider
               such as react-context and react-query-context
*/

/**
@TODO : should take data from caching should not call api again if not modified
*/
const msalInstance = new PublicClientApplication(msalConfig);
const RootComponent = () => {
  const queryClient = new QueryClient();

  return (
    /* react query provider */
    <QueryClientProvider client={queryClient}>
      {/* context provider */}
      <ToastContainer />
      <MsalProvider instance={msalInstance}>
        <LabelProvider>
          <App />
        </LabelProvider>
      </MsalProvider>
    </QueryClientProvider>
  );
};
export default RootComponent;`;
