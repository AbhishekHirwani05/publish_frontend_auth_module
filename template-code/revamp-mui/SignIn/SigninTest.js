module.exports = `/* default test case for component */
import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import {ISignInUserData} from 'interfaces/authSignIn.interface';
import axios, {AxiosResponse} from 'axios';
import {useMsal} from '@azure/msal-react';
import {toast} from 'react-toastify';
import Signin from './SignIn.component';

const getSignInPageComponent = () =>
  render(
    // <BrowserRouter>
      <Signin />
    // </BrowserRouter>,
  );

  jest.mock('@react-oauth/google', () => ({
    useGoogleLogin: jest.fn(),
  }));
    
  jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
  }));

const successResponse = {
  data: {
    message: 'Please verify the OTP send on your email-id',
    token: 'eyJhbGciOiJIUzI1NiIs',
    refreshToken: 'eyJhbGciOiJIUzI1NiIs',
  },
  status: 200,
  statusText: 'OK',
};
const mockedLoginPopup = jest.fn().mockResolvedValue({accessToken: 'mockedAccessToken'});

jest.mock('axios');
jest.mock('@azure/msal-react');
jest.mock('react-toastify');

beforeEach(() => {
  (useMsal as jest.Mock).mockReturnValue({instance: {loginPopup: mockedLoginPopup}});
});
afterEach(() => {
  jest.clearAllMocks();
});
type LocalStorageMock = {
  getItem: jest.Mock;
  setItem: jest.Mock;
  removeItem: jest.Mock;
};

const localStorageMock: LocalStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('SignInForm component', () => {
  it('should render correctly', async () => {
    const signIncomponentRef = getSignInPageComponent();
    expect(signIncomponentRef.getByText('Sign In')).toBeInTheDocument();
    expect(signIncomponentRef.getByTestId('signInform')).toBeInTheDocument();
  });
  it('Submit SignIn form without any inputs', async () => {
    const signIncomponentRef = getSignInPageComponent();
    const emailInput = signIncomponentRef.getByLabelText('Email *');
    const passwordInput = signIncomponentRef.getByLabelText('Password *');
    const invalidPassword = '';
    const invalidEmail = '';
    await act(async () => {
      fireEvent.change(emailInput, {target: {value: invalidEmail}});
      fireEvent.change(passwordInput, {target: {value: invalidPassword}});
      fireEvent.click(signIncomponentRef.getByText('SIGN IN'));
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
    });
    expect(signIncomponentRef.getByText('Email is required')).toBeInTheDocument();
    expect(signIncomponentRef.getByText('Password is required')).toBeInTheDocument();
  });
  it('Submit SignIn form with wrong inputs', async () => {
    const signIncomponentRef = getSignInPageComponent();
    const emailInput = signIncomponentRef.getByLabelText('Email *');
    const passwordInput = signIncomponentRef.getByLabelText('Password *');
    const invalidPassword = '12345';
    const invalidEmail = 'test@123';
    await act(async () => {
      fireEvent.change(emailInput, {target: {value: invalidEmail}});
      fireEvent.change(passwordInput, {target: {value: invalidPassword}});
      fireEvent.click(signIncomponentRef.getByText('SIGN IN'));
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
    });
    expect(signIncomponentRef.getByText('Enter valid email address')).toBeInTheDocument();
    expect(
      signIncomponentRef.getByText(
        'Password should contain at least one lowercase, uppercase, number and special character',
      ),
    ).toBeInTheDocument();
  });
  it('show password, confirm password and mousedown event', async () => {
    const mockSetShowPasswordValue = jest.fn<void, [boolean]>();
    const props: ISignInUserData & {
      setShowPasswordValue: typeof mockSetShowPasswordValue;
    } = {
      showPassword: false,
      setShowPasswordValue: mockSetShowPasswordValue,
    };
    render(
      // <BrowserRouter>
        <Signin {...props} />
      // </BrowserRouter>,
    );
    const showPasswordButton = screen.getByTestId('eyeIcon');
    await act(async () => {
      fireEvent.click(showPasswordButton);
      fireEvent.mouseDown(showPasswordButton);
    });
    expect(mockSetShowPasswordValue).toBeTruthy();
  });
  it('signInHandler should call with success response', async () => {
    const toastSuccess = jest.spyOn(toast, 'success');
    const signIncomponentRef = getSignInPageComponent();
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    await act(async () => {
      fireEvent.change(await signIncomponentRef.getByLabelText('Email *'), {target: {value: 'test@example.com'}});
      fireEvent.change(await signIncomponentRef.getByLabelText('Password *'), {target: {value: 'Test@1234'}});
      fireEvent.click(signIncomponentRef.getByText('SIGN IN'));
    });
    expect(toastSuccess).toHaveBeenCalledWith('Please verify the OTP send on your email-id', {
      position: toast.POSITION.TOP_RIGHT,
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', 'eyJhbGciOiJIUzI1NiIs');
    expect(localStorage.setItem).toHaveBeenCalledWith('refreshtoken', 'eyJhbGciOiJIUzI1NiIs');
  });
  it('signInHandler should call  with error response catch block', async () => {
    const toastError = jest.spyOn(toast, 'error');
    const signIncomponentRef = getSignInPageComponent();
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce({
      response: {
        data: {
          error: 'Not Found',
          message: 'Incorrect email or password',
        },
      },
      status: 404,
      statusText: 'Not Found',
    } as unknown as AxiosResponse);
    await act(async () => {
      fireEvent.change(await signIncomponentRef.getByLabelText('Email *'), {target: {value: 'test@example.com'}});
      fireEvent.change(await signIncomponentRef.getByLabelText('Password *'), {target: {value: 'Test@1234'}});
      fireEvent.click(signIncomponentRef.getByText('SIGN IN'));
    });
    expect(toastError).toHaveBeenCalledWith('Incorrect email or password', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
  it('Social media button click', async () => {
    const mockHistory = jest.fn();
    const signIncomponentRef = getSignInPageComponent();
    const mockUseNavigate = jest.fn().mockReturnValue(mockHistory);
    await act(async () => {
      fireEvent.click(signIncomponentRef.getByText('Continue with Google'));
      fireEvent.click(signIncomponentRef.getByText('Continue with Microsoft'));
    });
    expect(mockUseNavigate('/'));
  });
  it('should handle checkbox click', async () => {
    const {getByLabelText} = render(
      // <BrowserRouter>
        <Signin />
      // </BrowserRouter>,
    );
    const checkbox = getByLabelText('Remember Me');
    await act(async () => {
      fireEvent.click(checkbox);
    });
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('checkBoxStatus', 'true');

    await act(async () => {
      fireEvent.click(checkbox);
    });
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith('checkBoxStatus');
  });

  it('calls onSuccess and navigates to google-login page', () => {
    const mockNavigate = jest.fn();
    const mockGoogleLogin = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    useGoogleLogin.mockReturnValue({
      onSuccess: mockGoogleLogin,
    });
    render(<Signin />);
    const googleButton = screen.getByTestId('googleLogInButton');
    fireEvent.click(googleButton);
    expect(mockNavigate).toHaveBeenCalledWith('/google-login');
    expect(console.log).toHaveBeenCalledWith(expect.anything());
  });
});
`;
