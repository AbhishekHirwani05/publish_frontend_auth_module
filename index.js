#!/usr/bin/env node
const fs = require('fs');
const { execSync } = require('child_process');
const inquirer = require('inquirer');
const readline = require('readline');

/* Boilerplate rewrite files */
const urlData = require('./template-code/shared/apiEndPointURL');
const publicRoute = require('./template-code/routing/public.route');
const protectedRoute = require('./template-code/routing/protected.route');
const mainPage = require('./template-code/routing/mainpage');
const root = require('./template-code/routing/root');
const header = require('./template-code/routing/header');
const customIndex = require('./template-code/routing/custom.index');

/* Revamp Imports */
const signUpMuiRevamp = require('./template-code/revamp-mui/SignUp/signUp');
const signUpMuiRevampStyle = require('./template-code/revamp-mui/SignUp/signUpStyle');
const signUpMuiRevampTest = require('./template-code/revamp-mui/SignUp/SignUpTest');
const signInMuiRevamp = require('./template-code/revamp-mui/SignIn/Signin');
const signInMuiRevampStyle = require('./template-code/revamp-mui/SignIn/SigninStyle');
const signInMuiRevampTest = require('./template-code/revamp-mui/SignIn/SigninTest');
const forgotPasswordMuiRevamp = require('./template-code/revamp-mui/ForgotPassword/ForgotPassword');
const forgotPasswordMuiRevampStyle = require('./template-code/revamp-mui/ForgotPassword/ForgotPasswordStyle');
const forgotPasswordMuiRevampTest = require('./template-code/revamp-mui/ForgotPassword/ForgotPasswordTest');
const inputControlRevamp = require('./template-code/revamp-mui/Controls/inputComponent');
const primaryButtonControlRevamp = require('./template-code/revamp-mui/Controls/primaryButton');
const socialButtonControlRevamp = require('./template-code/revamp-mui/Controls/socialButton');
const commonInterfaceRevamp = require('./template-code/revamp-mui/AuthInterfaces/commonInterface');
const signUpInterfaceRevamp = require('./template-code/revamp-mui/AuthInterfaces/signUpInterface');
const signInInterfaceRevamp = require('./template-code/revamp-mui/AuthInterfaces/signInInterface');
const verifyInterfaceRevamp = require('./template-code/revamp-mui/AuthInterfaces/verifyOTPInterface');
const resetPasswordInterfaceRevamp = require('./template-code/revamp-mui/AuthInterfaces/resetPasswordInterface');
const forgotPasswordInterfaceRevamp = require('./template-code/revamp-mui/AuthInterfaces/forgotPasswordInterface');

const themeRevamp = require('./template-code/revamp-mui/AuthTheme/authTheme');
const {
  imageDataRevamp,
} = require('./template-code/revamp-mui/AuthImages/export-icons-revamp');
const resetPasswordMuiRevamp = require('./template-code/revamp-mui/ResetPassword/ResetPassword');
const resetPasswordMuiRevampStyle = require('./template-code/revamp-mui/ResetPassword/ResetPasswordStyle');
const resetPasswordMuiRevampTest = require('./template-code/revamp-mui/ResetPassword/ResetPasswordTest');
const auth0ResetPasswordMuiRevamp = require('./template-code/revamp-mui/Auth0ResetPassword/Auth0ResetPassword');
const auth0ResetPasswordMuiRevampStyle = require('./template-code/revamp-mui/Auth0ResetPassword/Auth0ResetPasswordStyle');
const auth0ResetPasswordMuiRevampTest = require('./template-code/revamp-mui/Auth0ResetPassword/Auth0ResetPasswordTest');
const verifyMuiRevamp = require('./template-code/revamp-mui/Verify/Verify');
const verifyMuiRevampStyle = require('./template-code/revamp-mui/Verify/VerifyStyle');
const verifyMuiRevampTest = require('./template-code/revamp-mui/Verify/VerifyTest');
const azureConfig = require('./template-code/revamp-mui/AzureAD/azureConfig');
const graphAPI = require('./template-code/revamp-mui/AzureAD/graphAPI');
const AzureHome = require('./template-code/revamp-mui/home/AzureHome/AzureHome');
const JwtHome = require('./template-code/revamp-mui/home/JwtHome/JwtHome');
const Auth0Home = require('./template-code/revamp-mui/home/Auth0Home/Auth0Home');
const GoogleHome = require('./template-code/revamp-mui/home/GoogleHome/GoogleHome');
const GoogleHomeRevampTest = require('./template-code/revamp-mui/home/GoogleHome/GoogleHomeTest');
const RoleManagementDashboard = require('./template-code/revamp-mui/RoleManagement/RoleManagementDashboard.component');
const RoleManagementStyle = require('./template-code/revamp-mui/RoleManagement/RoleManagementStyle');
const Auth0HomeTest = require('./template-code/revamp-mui/home/Auth0Home/Auth0HomeTest');
const JwtStyle = require('./template-code/revamp-mui/home/JwtHome/JwtStyle');
const MainHome = require('./template-code/revamp-mui/home/MainHome');
const pageNotFoundRevamp = require('./template-code/revamp-mui/PageNotFound/PageNotFound');
const pageNotFoundStyleRevamp = require('./template-code/revamp-mui/PageNotFound/PageNotFoundStyle');
const pageNotFoundTestRevamp = require('./template-code/revamp-mui/PageNotFound/PageNotFoundtest');
const storeDataRevamp = require('./template-code/revamp-mui/Atom/store');
const mainAPIRevamp = require('./template-code/revamp-mui/mainAPI/api');
const adminDashboardRevamp = require('./template-code/revamp-mui/Admin/index');
const adminDashboardMuiStyleRevamp = require('./template-code/revamp-mui/Admin/style');

/* writeFile Array */
const writeArr = [
  {
    path: './src/routes/public.route.tsx',
    importPath: publicRoute,
  },
  {
    path: './src/routes/protected.route.tsx',
    importPath: protectedRoute,
  },
  {
    path: './src/components/MainPage/MainPage.tsx',
    importPath: mainPage,
  },
  {
    path: './src/components/RootComponent/RootComponent.component.tsx',
    importPath: root,
  },
  {
    path: './src/components/Header/Header.component.tsx',
    importPath: header,
  },
  {
    path: './src/custom/index.tsx',
    importPath: customIndex,
  },
  {
    path: './src/components/Auth/SignUp/SignUp.component.tsx',
    importPath: signUpMuiRevamp,
  },
  {
    path: './src/components/Auth/SignUp/SignUp.css.ts',
    importPath: signUpMuiRevampStyle,
  },
  {
    path: './src/components/Auth/SignUp/SignUp.spec.tsx',
    importPath: signUpMuiRevampTest,
  },
  {
    path: './src/components/Auth/SignIn/SignIn.component.tsx',
    importPath: signInMuiRevamp,
  },
  {
    path: './src/components/Auth/SignIn/SignIn.css.ts',
    importPath: signInMuiRevampStyle,
  },
  {
    path: './src/components/Auth/SignIn/SignIn.spec.tsx',
    importPath: signInMuiRevampTest,
  },
  {
    path: './src/components/Auth/ResetPassword/ResetPassword.component.tsx',
    importPath: resetPasswordMuiRevamp,
  },
  {
    path: './src/components/Auth/ResetPassword/ResetPassword.css.ts',
    importPath: resetPasswordMuiRevampStyle,
  },
  {
    path: './src/components/Auth/ResetPassword/ResetPassword.spec.tsx',
    importPath: resetPasswordMuiRevampTest,
  },
  {
    path: './src/components/Auth/Auth0ResetPassword/Auth0ResetPassword.component.tsx',
    importPath: auth0ResetPasswordMuiRevamp,
  },
  {
    path: './src/components/Auth/Auth0ResetPassword/Auth0ResetPassword.css.ts',
    importPath: auth0ResetPasswordMuiRevampStyle,
  },
  {
    path: './src/components/Auth/Auth0ResetPassword/Auth0ResetPassword.spec.tsx',
    importPath: auth0ResetPasswordMuiRevampTest,
  },
  {
    path: './src/components/Auth/Verify/Verify.component.tsx',
    importPath: verifyMuiRevamp,
  },
  {
    path: './src/components/Auth/Verify/Verify.css.ts',
    importPath: verifyMuiRevampStyle,
  },
  {
    path: './src/components/Auth/Verify/Verify.spec.tsx',
    importPath: verifyMuiRevampTest,
  },
  {
    path: './src/components/Auth/ForgotPassword/ForgotPassword.component.tsx',
    importPath: forgotPasswordMuiRevamp,
  },
  {
    path: './src/components/Auth/ForgotPassword/ForgotPassword.css.ts',
    importPath: forgotPasswordMuiRevampStyle,
  },
  {
    path: './src/components/Auth/ForgotPassword/ForgotPassword.spec.tsx',
    importPath: forgotPasswordMuiRevampTest,
  },
  {
    path: './src/components/Auth/PageNotFound/PageNotFound.component.tsx',
    importPath: pageNotFoundRevamp,
  },
  {
    path: './src/components/Auth/PageNotFound/PageNotFound.css.ts',
    importPath: pageNotFoundStyleRevamp,
  },
  {
    path: './src/components/Auth/PageNotFound/PageNotFound.spec.tsx',
    importPath: pageNotFoundTestRevamp,
  },
  {
    path: './src/components/Auth/Controls/Input.component.tsx',
    importPath: inputControlRevamp,
  },
  {
    path: './src/components/Auth/Controls/PrimaryButton.component.tsx',
    importPath: primaryButtonControlRevamp,
  },
  {
    path: './src/components/Auth/Controls/SocialServiceBtn.component.tsx',
    importPath: socialButtonControlRevamp,
  },
  {
    path: './src/interfaces/authCommon.interface.ts',
    importPath: commonInterfaceRevamp,
  },
  {
    path: './src/interfaces/authSignUp.interface.ts',
    importPath: signUpInterfaceRevamp,
  },
  {
    path: './src/interfaces/authSignIn.interface.ts',
    importPath: signInInterfaceRevamp,
  },
  {
    path: './src/interfaces/authVerify.interface.ts',
    importPath: verifyInterfaceRevamp,
  },
  {
    path: './src/interfaces/authResetPassword.interface.ts',
    importPath: resetPasswordInterfaceRevamp,
  },
  {
    path: './src/components/Auth/AzureAD/azureConfig.ts',
    importPath: azureConfig,
  },
  {
    path: './src/components/Auth/AzureAD/graphAPI.tsx',
    importPath: graphAPI,
  },
  {
    path: './src/interfaces/authForgotPassword.interface.ts',
    importPath: forgotPasswordInterfaceRevamp,
  },
  {
    path: './src/components/Auth/home/AzureHome/AzureHome.component.tsx',
    importPath: AzureHome,
  },
  {
    path: './src/components/Auth/home/GoogleHome/GoogleHome.component.tsx',
    importPath: GoogleHome,
  },
  {
    path: './src/components/Auth/home/GoogleHome/GoogleHome.spec.tsx',
    importPath: GoogleHomeRevampTest,
  },
  {
    path: './src/components/Auth/RoleManagement/RoleManagementDashboard.component.tsx',
    importPath: RoleManagementDashboard,
  },
  {
    path: './src/components/Auth/RoleManagement/RoleManagementStyle.css.ts',
    importPath: RoleManagementStyle,
  },
  {
    path: 'src/components/Auth/home/JwtHome/JwtHome.component.tsx',
    importPath: JwtHome,
  },
  {
    path: 'src/components/Auth/home/Auth0Home/Auth0Home.component.tsx',
    importPath: Auth0Home,
  },
  {
    path: 'src/components/Auth/home/Auth0Home/Auth0Home.spec.tsx',
    importPath: Auth0HomeTest,
  },
  {
    path: './src/components/Auth/home/JwtHome/JwtHomeStyle.css.ts',
    importPath: JwtStyle,
  },
  {
    path: './src/components/Auth/home/MainHome.component.tsx',
    importPath: MainHome,
  },
  {
    path: './src/themes/authTheme.ts',
    importPath: themeRevamp,
  },
  {
    path: './src/components/Auth/Atom/store.ts',
    importPath: storeDataRevamp,
  },
  {
    path: './src/components/Auth/api.tsx',
    importPath: mainAPIRevamp,
  },
  {
    path: './src/components/Auth/Admin/AdminDashboard.component.tsx',
    importPath: adminDashboardRevamp,
  },
  {
    path: './src/components/Auth/Admin/style.css.ts',
    importPath: adminDashboardMuiStyleRevamp,
  },
];

/* Asking user inputs */
const readUserInput = async (flag) => new Promise((resolve) => {
  const rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt(`\n\nPlease enter your ${flag}\n`);
  rl.prompt();
  rl.on('line', (key) => {
    fs.appendFileSync('.env', `\n${flag}=${key}`);
    rl.close();
    resolve(true);
  });
});

/* Fetching .env credentials  */
const checkEnvVarsVite = async (answers) => {
  if (fs.existsSync('.env')) {
    fs.readFile('.env', async (err, data) => {
      if (err) {
        console.log(err);
      }
      const envData = data.toString().split('\n');
      const keyArr = [];
      envData.forEach((idata) => {
        keyArr.push(idata.split('=')[0]);
      });
      if (answers.strategy !== 'Google') {
        if (!keyArr.includes('VITE_APP_API_BASE_URL')) {
          await readUserInput('VITE_APP_API_BASE_URL');
        }
        if (answers.captcha === true) {
          if (!keyArr.includes('VITE_APP_RECAPTCHA_SITE_KEY')) {
            await readUserInput('VITE_APP_RECAPTCHA_SITE_KEY');
          }
        }
      } else {
        if (!keyArr.includes('VITE_APP_API_BASE_URL')) {
          await readUserInput('VITE_APP_API_BASE_URL');
        }
        if (!keyArr.includes('GOOGLE_CLIENT_ID')) {
          await readUserInput('GOOGLE_CLIENT_ID');
        }
        if (!keyArr.includes('GOOGLE_REDIRECT_URL')) {
          await readUserInput('GOOGLE_REDIRECT_URL');
        }
      }
    });
  } else if (answers.strategy !== 'Google') {
    await readUserInput('VITE_APP_API_BASE_URL');
    if (answers.captcha === true) {
      await readUserInput('VITE_APP_RECAPTCHA_SITE_KEY');
    }
  } else {
    await readUserInput('VITE_APP_API_BASE_URL');
    await readUserInput('GOOGLE_CLIENT_ID');
    await readUserInput('GOOGLE_REDIRECT_URL');
  }

  // if (fs.existsSync('.env')) {
  //   fs.readFile('.env', async (err, data) => {
  //     if (err) {
  //       throw err;
  //     }
  //     const envData = data.toString().split('\n');
  //     const keyArr = [];
  //     envData.map((idata) => {
  //       keyArr.push(idata.split('=')[0]);
  //     });
  //     if (answers.strategy !== 'Google') {
  //       if (!keyArr.includes('VITE_APP_API_BASE_URL')) {
  //         await readUserInput('VITE_APP_API_BASE_URL');
  //       }
  //       if (!keyArr.includes('VITE_APP_RECAPTCHA_SITE_KEY')) {
  //         await readUserInput('VITE_APP_RECAPTCHA_SITE_KEY');
  //       }
  //     } else {
  //       if (!keyArr.includes('VITE_APP_API_BASE_URL')) {
  //         await readUserInput('VITE_APP_API_BASE_URL');
  //       }
  //       if (!keyArr.includes('VITE_APP_RECAPTCHA_SITE_KEY')) {
  //         await readUserInput('VITE_APP_RECAPTCHA_SITE_KEY');
  //       }
  //       if (!keyArr.includes('GOOGLE_CLIENT_ID')) {
  //         await readUserInput('GOOGLE_CLIENT_ID');
  //       }
  //       if (!keyArr.includes('GOOGLE_REDIRECT_URL')) {
  //         await readUserInput('GOOGLE_REDIRECT_URL');
  //       }
  //     }
  //   });
  // } else if (answers.strategy !== 'Google') {
  //   await readUserInput('VITE_APP_API_BASE_URL');
  //   await readUserInput('VITE_APP_RECAPTCHA_SITE_KEY');
  // } else {
  //   await readUserInput('VITE_APP_API_BASE_URL');
  //   await readUserInput('VITE_APP_RECAPTCHA_SITE_KEY');
  //   await readUserInput('GOOGLE_CLIENT_ID');
  //   await readUserInput('GOOGLE_REDIRECT_URL');
  // }
};

const createMuiRevampCode = async (answers) => {
  /* Calling .env credentials  */
  await checkEnvVarsVite(answers);

  execSync(
    'npm i react-hook-form react18-input-otp @mui/material @emotion/react @emotion/styled @mui/icons-material react-router-dom axios @react-oauth/google jwt-decode react-toastify react-google-recaptcha inquirer@^8.0.0 @azure/msal-browser @azure/msal-react @azure/msal-common jotai @fontsource/lato @fontsource/roboto react18-input-otp --save',
    { stdio: 'inherit' },
  );
  // execSync(
  //   'npm i @mui/material @emotion/react @emotion/styled
  // @mui/icons-material @fontsource/roboto --save',
  //   { stdio: 'inherit' },
  // );
  // execSync('npm i react-router-dom --save', { stdio: 'inherit' });
  // execSync('npm i axios --save', { stdio: 'inherit' });
  // execSync('npm i @react-oauth/google --save', { stdio: 'inherit' });
  // execSync('npm i jwt-decode --save', { stdio: 'inherit' });
  // execSync('npm i react-toastify', { stdio: 'inherit' });
  // execSync('npm i react-google-recaptcha', { stdio: 'inherit' });
  execSync('npm i @types/react-google-recaptcha --save-dev', {
    stdio: 'inherit',
  });
  // execSync('npm install --save inquirer@^8.0.0', { stdio: 'inherit' });
  // execSync(
  //   'npm install @azure/msal-browser @azure/msal-react @azure/msal-common',
  //   { stdio: 'inherit' },
  // );
  // execSync('npm install jotai', { stdio: 'inherit' });
  // execSync('npm install @fontsource/lato', { stdio: 'inherit' });
  // execSync('npm install @fontsource/roboto', { stdio: 'inherit' });
  // execSync('npm i react18-input-otp', { stdio: 'inherit' });

  const dirArray = [
    './src/components/Auth/SignUp',
    './src/components/Auth/SignIn',
    './src/components/Auth/ResetPassword',
    './src/components/Auth/Verify',
    './src/components/Auth/ForgotPassword',
    './src/components/Auth/PageNotFound',
    './src/components/Auth/home/AzureHome',
    './src/components/Auth/home/GoogleHome',
    './src/components/Auth/RoleManagement',
    './src/components/Auth/home',
    './src/components/Auth/home/JwtHome',
    './src/components/Auth/home/Auth0Home',
    './src/components/Auth/Auth0ResetPassword',
    './src/components/Auth/Controls',
    './src/auth-assets/images',
    './src/components/Auth/AzureAD',
    './src/components/Auth/Atom',
    './src/components/RootComponent',
    './src/components/Auth/Admin',
  ];
  dirArray.forEach((p) => fs.mkdirSync(p, { recursive: true }));

  imageDataRevamp.forEach((imageDataRevampobj) => {
    fs.writeFileSync(
      `./src/auth-assets/images/${imageDataRevampobj.name}`,
      imageDataRevampobj.data,
    );
  });

  writeArr.forEach((writeObj) => {
    fs.writeFile(writeObj.path, writeObj.importPath, 'utf-8', (err) => {
      if (err) {
        if (err) throw err;
      }
      return null;
    });
  });
};

inquirer
  .prompt([
    {
      type: 'list',
      name: 'strategy',
      message: 'Which authentication strategy do you want to use?',
      choices: ['JWT Strategy', 'AWS Cognito', 'Auth0', 'Google'],
    },
    {
      type: 'confirm',
      name: 'twoFA',
      message: 'Do you want to add 2FA?',
      choices: ['YES', 'NO'],
      default: true,
      when(answers) {
        return answers.strategy === 'JWT Strategy';
      },
    },
    {
      type: 'confirm',
      name: 'captcha',
      message: 'Do you want to add captcha?',
      choices: ['YES', 'NO'],
      when(answers) {
        return answers.strategy === 'JWT Strategy';
      },
    },
  ])

  .then((selAns) => {
    const answers = selAns;
    fs.writeFile(
      './src/auth-config.ts',
      `export const options = {
        captcha: ${answers.captcha},
        '2FA': ${answers.twoFA},
        strategy: '${answers.strategy}'
    }`,
      'utf-8',
      (err) => {
        if (err) {
          if (err) throw err;
        }
        return null;
      },
    );

    const dirArray = ['./src/shared/'];
    dirArray.forEach((p) => fs.mkdirSync(p, { recursive: true }));

    fs.writeFile(
      './src/shared/apiEndPointURL.ts',
      urlData.createReactApp,
      'utf-8',
      (err) => {
        if (err) {
          if (err) throw err;
        }
        return null;
      },
    );

    /*  MUI REVAMP */
    createMuiRevampCode(answers);
  });
