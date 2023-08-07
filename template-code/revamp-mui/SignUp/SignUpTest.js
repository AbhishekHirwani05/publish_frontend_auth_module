module.exports = `/* default test case for component */
import {act, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import {useMsal} from '@azure/msal-react';
import {toast} from 'react-toastify';
import React from 'react';
import SignUp from './SignUp.component';

const getSignUpPageComponent = () =>
  render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>,
  );
const successResponse = {
  data: {
    message: 'User created successfully',
  },
  status: 201,
  statusText: 'Created',
};

const catchErrorResponse = {
  data: {
    error: 'Conflict',
    message: 'Email already exists',
  },
  status: 409,
  statusText: 'Conflict',
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

describe('SignInForm component', () => {
  it('should render correctly', async () => {
    const signUpcomponentRef = getSignUpPageComponent();
    expect(signUpcomponentRef.getByRole('heading', {name: 'Sign Up'})).toBeInTheDocument();
    expect(signUpcomponentRef.getByTestId('signUpform')).toBeInTheDocument();
  });
  it('Submit SignUp form without any inputs', async () => {
    const signUpcomponentRef = getSignUpPageComponent();
    const nameInput = signUpcomponentRef.getByLabelText('Name *');
    const emailInput = signUpcomponentRef.getByLabelText('email *');
    const passwordInput = signUpcomponentRef.getByLabelText('Password *');
    const ConfirmPasswordInput = signUpcomponentRef.getByLabelText('Confirm Password *');

    const invalidnameInput = '';
    const invalidPassword = '';
    const invalidConfirmPasswordInput = '';
    const invalidEmail = '';

    await act(async () => {
      fireEvent.change(nameInput, {target: {value: invalidnameInput}});
      fireEvent.change(emailInput, {target: {value: invalidEmail}});
      fireEvent.change(passwordInput, {target: {value: invalidPassword}});
      fireEvent.change(ConfirmPasswordInput, {target: {value: invalidConfirmPasswordInput}});
      fireEvent.click(signUpcomponentRef.getByRole('button', {name: 'Sign Up'}));
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
    });
    expect(signUpcomponentRef.getByText('Full name is required')).toBeInTheDocument();
    expect(signUpcomponentRef.getByText('Email is required')).toBeInTheDocument();
    expect(signUpcomponentRef.getByText('Password is required')).toBeInTheDocument();
    expect(signUpcomponentRef.getByText('Confirm Password is required')).toBeInTheDocument();
  });
  it('Submit SignUp form with wrong inputs', async () => {
    const signUpcomponentRef = getSignUpPageComponent();
    const nameInput = signUpcomponentRef.getByLabelText('Name *');
    const emailInput = signUpcomponentRef.getByLabelText('email *');
    const passwordInput = signUpcomponentRef.getByLabelText('Password *');
    const confirmPasswordInput = signUpcomponentRef.getByLabelText('Confirm Password *');
    const invalidPassword = '12345';
    const invalidConfirmPassword = '12345';
    const invalidEmail = 'test@123';
    const invalidName = 'A3';
    await act(async () => {
      fireEvent.change(nameInput, {target: {value: invalidName}});
      fireEvent.change(emailInput, {target: {value: invalidEmail}});
      fireEvent.change(passwordInput, {target: {value: invalidPassword}});
      fireEvent.change(confirmPasswordInput, {target: {value: invalidConfirmPassword}});
      fireEvent.click(signUpcomponentRef.getByRole('button', {name: 'Sign Up'}));
      fireEvent.blur(emailInput);
      fireEvent.blur(passwordInput);
    });

    expect(
      signUpcomponentRef.getByText(
        'Name must be contain only uppercase and lowercase letter. Space is not allowed at the starting of the name.',
      ),
    ).toBeInTheDocument();

    expect(signUpcomponentRef.getByText('Enter valid email address')).toBeInTheDocument();
    expect(
      signUpcomponentRef.getByText(
        'Password should contain at least one lowercase, uppercase, number and special character',
      ),
    ).toBeInTheDocument();
    expect(
      signUpcomponentRef.getByText(
        'Confirm Password should contain at least one lowercase,uppercase, number and special character',
      ),
    ).toBeInTheDocument();
  });

  test('should trigger onFocus event', async () => {
    const handleOnFocus = jest.fn();
    const handlePopupClose = jest.fn();
    render(
      <BrowserRouter>
        <SignUp onFocus={handleOnFocus} onClose={handlePopupClose} />
      </BrowserRouter>,
    );

    const inputField = screen.getByLabelText('Password *');
    fireEvent.focus(inputField);
    expect(screen.getByText('Password must include:')).toBeInTheDocument();
    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
    expect(screen.getByText('At least one number')).toBeInTheDocument();
    expect(screen.getByText('At least one lowercase')).toBeInTheDocument();
    expect(screen.getByText('At least one uppercase')).toBeInTheDocument();
    expect(screen.getByText('At least one special character')).toBeInTheDocument();
    expect(screen.getByText('No spaces allow')).toBeInTheDocument();
  });

  it('show password and mousedown event', async () => {
    const handleClickShowPassword = jest.fn();

    render(
      <BrowserRouter>
        <SignUp onClick={handleClickShowPassword} />
      </BrowserRouter>,
    );
    const showPasswordButton = screen.getByTestId('eyeIcon');
    await act(async () => {
      fireEvent.click(showPasswordButton);
      fireEvent.mouseDown(showPasswordButton);
    });
    expect(handleClickShowPassword).toBeTruthy();
  });

  it('show password, confirm password and mousedown event', async () => {
    const handleClickShowConfirmPassword = jest.fn();

    render(
      <BrowserRouter>
        <SignUp onClick={handleClickShowConfirmPassword} />
      </BrowserRouter>,
    );
    const showPasswordButton = screen.getByTestId('eyeIcontwo');
    await act(async () => {
      fireEvent.click(showPasswordButton);
      fireEvent.mouseDown(showPasswordButton);
    });
    expect(handleClickShowConfirmPassword).toBeTruthy();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Signuphandler should call with success response', async () => {
    const toastSuccess = jest.spyOn(toast, 'success');
    const signUpcomponentRef = getSignUpPageComponent();
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    await act(async () => {
      fireEvent.change(await signUpcomponentRef.getByLabelText('Name *'), {target: {value: 'Adam'}});
      fireEvent.change(await signUpcomponentRef.getByLabelText('email *'), {target: {value: 'test@example.com'}});
      fireEvent.change(await signUpcomponentRef.getByLabelText('Password *'), {target: {value: 'Test@1234'}});
      fireEvent.change(await signUpcomponentRef.getByLabelText('Confirm Password *'), {target: {value: 'Test@1234'}});
      fireEvent.click(signUpcomponentRef.getByRole('button', {name: 'Sign Up'}));
    });

    expect(toastSuccess).toHaveBeenCalledWith('User created successfully', {
      position: toast.POSITION.TOP_RIGHT,
    });

    expect(signUpcomponentRef.getByText('Registration Successful')).toBeInTheDocument();
    expect(signUpcomponentRef.getByText('Please sign in to your account.'));
    fireEvent.click(signUpcomponentRef.getByRole('button', {name: 'SIGN IN'}));
  });

  it('Signuphandler should call the catch block ', async () => {
    const toastError = jest.spyOn(toast, 'error');
    const signUpcomponentRef = getSignUpPageComponent();
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValue(catchErrorResponse as AxiosResponse);

    await act(async () => {
      fireEvent.change(await signUpcomponentRef.getByLabelText('Name *'), {target: {value: 'Adam'}});
      fireEvent.change(await signUpcomponentRef.getByLabelText('email *'), {target: {value: 'test@example.com'}});
      fireEvent.change(await signUpcomponentRef.getByLabelText('Password *'), {target: {value: 'Test@1234'}});
      fireEvent.click(signUpcomponentRef.getByRole('button', {name: 'Sign Up'}));
    });
    expect(toastError).toHaveBeenCalledWith('Email already exists', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
  it('Should call recaptcha ', async () => {
    const signUpcomponentRef = getSignUpPageComponent();
    await act(async () => {
      fireEvent.change(signUpcomponentRef.getByTestId('recaptchaform'));
    });
  });
  it('Social media button click', async () => {
    const mockHistory = jest.fn();
    const signUpcomponentRef = getSignUpPageComponent();
    const mockUseNavigate = jest.fn().mockReturnValue(mockHistory);
    await act(async () => {
      fireEvent.click(signUpcomponentRef.getByText('Continue with Google'));
      fireEvent.click(signUpcomponentRef.getByText('Continue with Microsoft'));
    });
    expect(mockUseNavigate('/'));
  });
});

`;
