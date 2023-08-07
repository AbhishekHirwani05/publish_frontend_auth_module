module.exports = {
  groot: `import { IApi } from 'interfaces/index';

    /* Api end point urls */
    export const API_URL: IApi = {
        baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
        recaptchaSiteKey: import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY,
        signUp: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/signup\`,
        login: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/login\`,
        verifyOtp: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/verify-otp\`,
        forgotPassword: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/forgot-password\`,
        googleAuthorization: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/get-authorization\`,
        resetPassword: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/reset-password\`,
        generateAuth: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/generate-auth\`,
        protected: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/protected\`,
        me: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/me\`,
        verifyPasswordToken: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/verify-password-token\`,
        resendOtp: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/resend-otp\`,
        userList: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/get-all-users\`,
        searchUser: \`\${import.meta.env.VITE_APP_API_BASE_URL}/users/search-users\`,
        deleteUser:\`\${import.meta.env.VITE_APP_API_BASE_URL}/users/delete-users\`,
        updateUser:\`\${import.meta.env.VITE_APP_API_BASE_URL}/users/update-role\`,
        azureADClientId: import.meta.env.VITE_APP_AZURE_AD_CLIENT_ID,
        azureADAuthority: import.meta.env.VITE_APP_AZURE_AD_AUTHORITY,
        azureADRedirectURL: import.meta.env.VITE_APP_AZURE_AD_REDIRECT_URL,
        azureADGraphMeEndPoint: \`\${import.meta.env.VITE_APP_AZURE_AD_GRAPH_API_URL}/me\`,
    };
    `,
  createReactApp: `export const API_URL = {
    baseUrl: process.env.VITE_APP_API_BASE_URL ? process.env.VITE_APP_API_BASE_URL : '',
    recaptchaSiteKey: process.env.VITE_APP_RECAPTCHA_SITE_KEY ? process.env.VITE_APP_RECAPTCHA_SITE_KEY : '',
    signUp: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/signup\` : '',
    login: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/login\` : '',
    verifyOtp: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/verify-otp\` : '',
    forgotPassword: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/forgot-password\` : '',
    googleAuthorization: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/get-authorization\` : '',
    resetPassword: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/reset-password\` : '',
    generateAuth: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/generate-auth\` : '',
    protected: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/protected\` : '',
    me: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/me\` : '',
    verifyPasswordToken: process.env.VITE_APP_API_BASE_URL
      ? \`\${process.env.VITE_APP_API_BASE_URL}/users/verify-password-token\`
      : '',
    resendOtp: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/resend-otp\` : '',
    userList: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/get-all-users\` : '',
    searchUser: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/search-users\` : '',
    deleteUser: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/delete-users\` : '',
    updateUser: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_API_BASE_URL}/users/update-role\` : '',
    azureADClientId: process.env.VITE_APP_AZURE_AD_CLIENT_ID ? process.env.VITE_APP_AZURE_AD_CLIENT_ID : '',
    azureADAuthority: process.env.VITE_APP_AZURE_AD_AUTHORITY ? process.env.VITE_APP_AZURE_AD_AUTHORITY : '',
    azureADRedirectURL: process.env.VITE_APP_AZURE_AD_REDIRECT_URL ? process.env.VITE_APP_AZURE_AD_REDIRECT_URL : '',
    azureADGraphMeEndPoint: process.env.VITE_APP_API_BASE_URL ? \`\${process.env.VITE_APP_AZURE_AD_GRAPH_API_URL}/me\` : ''
    };`,
};
