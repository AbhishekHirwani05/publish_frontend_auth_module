module.exports = `import {act, fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import {useMsal} from '@azure/msal-react';
import {toast} from 'react-toastify';
import React from 'react';
import ForgotPassword from './ForgotPassword.component';

const getForgotPasswordComponent = () =>
  render(
    <BrowserRouter>
      <ForgotPassword />
    </BrowserRouter>,
  );
const successResponse = {
  data: {
    message: 'Token sent to email',
  },
  status: 200,
  statusText: 'OK',
};
const catchErrorResponse = {
  response: {
    data: {
      error: 'Not Found',
      message: 'User not found',
      statusCode: 404,
    },
  },
  status: 404,
  statusText: 'Not Found',
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

describe('ForgotPasswordForm component', () => {
  it('should render correctly', async () => {
    const forgotPasswordComponentRef = getForgotPasswordComponent();
    expect(forgotPasswordComponentRef.getByRole('heading', {name: 'Forgot Password'})).toBeInTheDocument();
    expect(forgotPasswordComponentRef.getByRole('button', {name: 'GET PASSWORD RECOVERY LINK'}));
    expect(forgotPasswordComponentRef.getByTestId('forgotpasswordform')).toBeInTheDocument();
  });

  it('Submit GET PASSWORD RECOVERY LINK button  without any inputs', async () => {
    const forgotPasswordComponentRef = getForgotPasswordComponent();
    const emailInput = forgotPasswordComponentRef.getByLabelText('email *');
    const invalidEmail = '';

    await act(async () => {
      fireEvent.change(emailInput, {target: {value: invalidEmail}});
      fireEvent.click(forgotPasswordComponentRef.getByRole('button', {name: 'GET PASSWORD RECOVERY LINK'}));
    });
    expect(forgotPasswordComponentRef.getByText('Email is required')).toBeInTheDocument();
  });

  it('Submit GET PASSWORD RECOVERY LINK button with wrong inputs', async () => {
    const forgotPasswordComponentRef = getForgotPasswordComponent();
    const emailInput = forgotPasswordComponentRef.getByLabelText('email *');
    const invalidEmail = 'test123@asd';

    await act(async () => {
      fireEvent.change(emailInput, {target: {value: invalidEmail}});
      fireEvent.click(forgotPasswordComponentRef.getByRole('button', {name: 'GET PASSWORD RECOVERY LINK'}));
    });

    expect(forgotPasswordComponentRef.getByText('Enter valid email address')).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('forgotPasswordHandler should call with success response', async () => {
    const toastSuccess = jest.spyOn(toast, 'success');
    const forgotPasswordComponentRef = getForgotPasswordComponent();
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    await act(async () => {
      fireEvent.change(await forgotPasswordComponentRef.getByLabelText('email *'), {
        target: {value: 'test@example.com'},
      });
      fireEvent.click(forgotPasswordComponentRef.getByRole('button', {name: 'GET PASSWORD RECOVERY LINK'}));
    });

    expect(toastSuccess).toHaveBeenCalledWith('Token sent to email', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
  it('forgotPasswordHandler should call the catch block ', async () => {
    const toastError = jest.spyOn(toast, 'error');
    const forgotPasswordComponentRef = getForgotPasswordComponent();
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(
      catchErrorResponse as unknown as AxiosResponse,
    );
    await act(async () => {
      fireEvent.change(await forgotPasswordComponentRef.getByLabelText('email *'), {
        target: {value: 'test@example.com'},
      });
      fireEvent.click(forgotPasswordComponentRef.getByRole('button', {name: 'GET PASSWORD RECOVERY LINK'}));
    });
    expect(toastError).toHaveBeenCalledWith('User not found', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
});
`;
