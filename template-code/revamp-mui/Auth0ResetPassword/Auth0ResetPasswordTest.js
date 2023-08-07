module.exports = `import '@testing-library/jest-dom';
import {act, fireEvent, render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios, {AxiosResponse} from 'axios';
import Auth0ResetPassword from './Auth0ResetPassword.component';

const getAuthOResetPasswordComponent = () =>
  render(
    <BrowserRouter>
      <Auth0ResetPassword />
    </BrowserRouter>,
  );
const successResponse = {
  data: {
    message: 'Token sent to email',
  },
  status: 200,
  statusText: 'OK',
};

jest.mock('axios');
jest.mock('@azure/msal-react');
jest.mock('react-toastify');

describe('Auth0 ResetPassword component', () => {
  it('should render correctly', async () => {
    const authOResetPasswordComponentRef = getAuthOResetPasswordComponent();
    expect(authOResetPasswordComponentRef.getByRole('heading', {name: 'Forgot Password'})).toBeInTheDocument();
    expect(authOResetPasswordComponentRef.getByRole('button', {name: 'GET PASSWORD RECOVERY LINK'}));
    expect(authOResetPasswordComponentRef.getByTestId('forgotpasswordform')).toBeInTheDocument();
  });

  it('Submit GET PASSWORD RECOVERY LINK button  without any inputs', async () => {
    const authOResetPasswordComponentRef = getAuthOResetPasswordComponent();

    const emailInput = authOResetPasswordComponentRef.getByLabelText('email *');
    const invalidEmail = '';

    await act(async () => {
      fireEvent.change(emailInput, {target: {value: invalidEmail}});
      fireEvent.click(authOResetPasswordComponentRef.getByRole('button', {name: 'GET PASSWORD RECOVERY LINK'}));
    });
    expect(authOResetPasswordComponentRef.getByText('Email is required')).toBeInTheDocument();
  });

  it('Submit GET PASSWORD RECOVERY LINK button with wrong inputs', async () => {
    const authOResetPasswordComponentRef = getAuthOResetPasswordComponent();

    const emailInput = authOResetPasswordComponentRef.getByLabelText('email *');
    const invalidEmail = 'test123@asd';

    await act(async () => {
      fireEvent.change(emailInput, {target: {value: invalidEmail}});
      fireEvent.click(authOResetPasswordComponentRef.getByRole('button', {name: 'GET PASSWORD RECOVERY LINK'}));
    });

    expect(authOResetPasswordComponentRef.getByText('Enter valid email address')).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('forgotPasswordHandler should call with success response', async () => {
    const toastSuccess = jest.spyOn(toast, 'success');
    const authOResetPasswordComponentRef = getAuthOResetPasswordComponent();

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    await act(async () => {
      fireEvent.change(await authOResetPasswordComponentRef.getByLabelText('email *'), {
        target: {value: 'test@example.com'},
      });
      fireEvent.click(authOResetPasswordComponentRef.getByRole('button', {name: 'GET PASSWORD RECOVERY LINK'}));
    });

    expect(toastSuccess).toHaveBeenCalledWith('Token sent to email', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
});
`;
