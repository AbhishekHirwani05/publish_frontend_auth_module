module.exports = `import '@testing-library/jest-dom';
import {act, fireEvent, render} from '@testing-library/react';
import axios, {AxiosResponse} from 'axios';
import {BrowserRouter} from 'react-router-dom';
import {IResetPasswordUserData} from 'interfaces/authResetPassword.interface';
import {toast} from 'react-toastify';
import Resetpassword from './ResetPassword.component';

const getResetPasswordComponent = () =>
  render(
    <BrowserRouter>
      <Resetpassword />
    </BrowserRouter>,
  );
jest.mock('axios');
const successResponse = {
  data: {
    message: 'Token Verified',
  },
  status: 200,
  statusText: 'OK',
};
beforeEach(() => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn().mockReturnValue({id: '123'}),
  }));
});
describe('Resetpassword component', () => {
  it('should display reset password heading when API response status is 200', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    const resetpasswordcomponentRef = getResetPasswordComponent();
    expect(await resetpasswordcomponentRef.findByText('Reset Password')).toBeInTheDocument();
  });
  test('should set valid state to false when given a valid token', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({
      status: 403,
    } as AxiosResponse);
    const resetpasswordcomponentRef = getResetPasswordComponent();
    expect(resetpasswordcomponentRef.getByTestId('linkExpiredForm')).toBeInTheDocument();
  });
  test('should set valid state to false when given a valid token', async () => {
    const toastError = jest.spyOn(toast, 'error');
    const resetpasswordcomponentRef = getResetPasswordComponent();
    expect(resetpasswordcomponentRef.getByText('The Password reset link is expired.')).toBeInTheDocument();
    expect(toastError).toHaveBeenCalledWith('Internal Server Error', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
  test('validates password input', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    const resetpasswordcomponentRef = getResetPasswordComponent();
    const invalidPassword = '';
    await resetpasswordcomponentRef.findByText('RESET PASSWORD');
    await act(async () => {
      fireEvent.change(await resetpasswordcomponentRef.findByLabelText('Password *'), {
        target: {value: invalidPassword},
      });
      fireEvent.click(await resetpasswordcomponentRef.findByText('RESET PASSWORD'));
      fireEvent.blur(await resetpasswordcomponentRef.findByLabelText('Password *'));
    });
    await resetpasswordcomponentRef.findByText('Password is required');
    const passwordErrorMessage = resetpasswordcomponentRef.getByText('Password is required');
    expect(passwordErrorMessage).toBeInTheDocument();
  });
  test('validates confirm password input', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    const resetpasswordcomponentRef = getResetPasswordComponent();
    const invalidConfirmPassword = 'password';
    const resetPasswordButton = await resetpasswordcomponentRef.findByText('RESET PASSWORD');
    await act(async () => {
      fireEvent.change(await resetpasswordcomponentRef.findByLabelText('Password *'), {
        target: {value: 'validPassword123#'},
      });
      fireEvent.change(await resetpasswordcomponentRef.findByLabelText('Confirm Password *'), {
        target: {value: invalidConfirmPassword},
      });
      fireEvent.blur(await resetpasswordcomponentRef.findByLabelText('Confirm Password *'));
      fireEvent.click(resetPasswordButton);
    });

    const confirmPasswordErrorMessage = await resetpasswordcomponentRef.findByText(
      'Password should contain at least one lowercase, uppercase, number and special character',
    );
    expect(confirmPasswordErrorMessage).toBeInTheDocument();
  });

  test('show password, confirm password and mousedown event', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    const mockSetShowPasswordValue = jest.fn<void, [boolean]>();
    const mockSetShowConfirmPasswordValue = jest.fn<void, [boolean]>();
    const props: IResetPasswordUserData & {
      setShowPasswordValue: typeof mockSetShowPasswordValue;
      setShowConfirmPasswordValue: typeof mockSetShowConfirmPasswordValue;
    } = {
      showPassword: false,
      setShowPasswordValue: mockSetShowPasswordValue,
      showConfirmPassword: false,
      setShowConfirmPasswordValue: mockSetShowConfirmPasswordValue,
    };
    const getResetPasswordComponentRef = () =>
      render(
        <BrowserRouter>
          <Resetpassword {...props} />
        </BrowserRouter>,
      );
    const resetpasswordcomponentNewRef = getResetPasswordComponentRef();

    const showPasswordButton = await resetpasswordcomponentNewRef.findByTestId('password-icon');
    const showConfirmPasswordButton = await resetpasswordcomponentNewRef.findByTestId('confirm-password-icon');
    await act(async () => {
      fireEvent.click(await showPasswordButton);
      fireEvent.mouseDown(await showPasswordButton);
      fireEvent.click(await showConfirmPasswordButton);
    });
    expect(mockSetShowPasswordValue).toBeTruthy();
    expect(mockSetShowConfirmPasswordValue).toBeTruthy();
  });

  test('renders reset password form with success', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    const toastSucces = jest.spyOn(toast, 'success');
    const mockHistory = jest.fn();
    const mockUseNavigate = jest.fn().mockReturnValue(mockHistory);
    jest.mock('axios');
    (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValueOnce({
      statusText: 'OK',
      status: 200,
      data: {message: 'Password reset successfully'},
    } as AxiosResponse);
    const resetpasswordcomponentRef = getResetPasswordComponent();
    const passwordInput = await resetpasswordcomponentRef.findByLabelText('Password *');
    const confirmPasswordInput = await resetpasswordcomponentRef.findByLabelText('Confirm Password *');
    const resetPasswordButton = await resetpasswordcomponentRef.findByText('RESET PASSWORD');
    await act(async () => {
      fireEvent.change(await passwordInput, {target: {value: 'validPassword123#'}});
      fireEvent.change(await confirmPasswordInput, {target: {value: 'validPassword123#'}});
      fireEvent.click(await resetPasswordButton);
    });
    const confirmResetPasswordMessage = await resetpasswordcomponentRef.findByText('Password Reset Successfully.');
    expect(await confirmResetPasswordMessage).toBeInTheDocument();
    await act(async () => {
      resetpasswordcomponentRef.findByText('SIGN IN');
      fireEvent.click(resetpasswordcomponentRef.getByText('SIGN IN'));
    });
    expect(mockUseNavigate('/sign-in'));
    expect(toastSucces).toHaveBeenCalledWith('Password reset successfully', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
  test('renders reset password form with error catch block', async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    const toastError = jest.spyOn(toast, 'error');
    (axios.put as jest.MockedFunction<typeof axios.put>).mockRejectedValueOnce({
      status: 500,
      statusText: 'Internal Server Error',
      response: {
        data: {
          error: 'Internal Server Error',
          message: 'Failed',
          statusCode: 500,
        },
      },
    } as unknown as AxiosResponse);
    const resetpasswordcomponentRef = getResetPasswordComponent();
    const passwordInput = await resetpasswordcomponentRef.findByLabelText('Password *');
    const confirmPasswordInput = await resetpasswordcomponentRef.findByLabelText('Confirm Password *');
    const resetPasswordButton = await resetpasswordcomponentRef.findByText('RESET PASSWORD');
    await act(async () => {
      fireEvent.change(await passwordInput, {target: {value: 'validPassword123#'}});
      fireEvent.change(await confirmPasswordInput, {target: {value: 'validPassword123#'}});
      fireEvent.click(await resetPasswordButton);
    });
    expect(toastError).toHaveBeenCalledWith('Internal Server Error', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
});
`;
