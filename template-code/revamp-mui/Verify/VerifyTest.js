module.exports = `/* default test case for component */
import {act, fireEvent, render} from '@testing-library/react';
import Verify from 'components/Auth/Verify/Verify.component';
import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import axios, {AxiosResponse} from 'axios';
import {toast} from 'react-toastify';

const getVerfiyPageComponent = () =>
  render(
    <BrowserRouter>
      <Verify />
    </BrowserRouter>,
  );
const successResponse = {
  data: {
    message: 'Login successful',
    refreshToken: 'eyJhbGciOiJIUzI1NiIs',
    token: 'eyJhbGciOiJIUzI1NiIsInR',
    user: {},
  },
  status: 200,
  statusText: 'OK',
};
const errorResponse = {
  status: 500,
  statusText: 'Internal Server Error',
  response: {
    data: {
      error: 'Internal Server Error',
      message: 'Invalid OTP',
      statusCode: 500,
    },
  },
};

jest.mock('axios');

describe('Verify Account Form component', () => {
  it('Submit Verify Account form without any inputs', async () => {
    const verifycomponentRef = getVerfiyPageComponent();
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    await act(async () => {
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-0'), {target: {value: ''}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-1'), {target: {value: ''}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-2'), {target: {value: ''}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-3'), {target: {value: ''}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-4'), {target: {value: ''}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-5'), {target: {value: ''}});
      fireEvent.click(await verifycomponentRef.getByText('Submit'));
    });
    expect(await verifycomponentRef.getAllByTestId('ErrorMsz'));
    expect(await verifycomponentRef.getAllByTestId('ErrorIcon'));
    expect(await verifycomponentRef.getByText('OTP is required'));
  });
  it('ResendHandler called with Success Response', async () => {
    const verifycomponentRef = getVerfiyPageComponent();
    const toastSuccess = jest.spyOn(toast, 'success');

    jest.mock('axios');
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      statusText: 'OK',
      data: {
        message: 'Please verify the OTP send on your email-id',
        token: 'eyJhbGciOiJIUzI1NiIsInR5',
      },
      status: 200,
    } as AxiosResponse);
    await act(async () => {
      fireEvent.click(verifycomponentRef.getByText('Resend'));
    });
    expect(toastSuccess).toHaveBeenCalledWith('Please verify the OTP send on your email-id', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });

  it('otpHandler should call with success response', async () => {
    const verifycomponentRef = getVerfiyPageComponent();
    const toastSuccess = jest.spyOn(toast, 'success');
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce(successResponse as AxiosResponse);
    await act(async () => {
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-0'), {target: {value: '1'}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-1'), {target: {value: '2'}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-2'), {target: {value: '3'}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-3'), {target: {value: '4'}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-4'), {target: {value: '5'}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-5'), {target: {value: '6'}});
      fireEvent.click(verifycomponentRef.getByText('Submit'));
    });
    expect(toastSuccess).toHaveBeenCalledWith('Login successful', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });

  it('otpHandler should call  with Error response', async () => {
    const verifycomponentRef = getVerfiyPageComponent();
    const toastError = jest.spyOn(toast, 'error');
    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(
      errorResponse as unknown as AxiosResponse,
    );
    await act(async () => {
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-0'), {target: {value: '1'}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-1'), {target: {value: '2'}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-2'), {target: {value: '3'}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-3'), {target: {value: '4'}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-4'), {target: {value: '5'}});
      fireEvent.change(await verifycomponentRef.getByTestId('otpInputBox-5'), {target: {value: '6'}});
      fireEvent.click(verifycomponentRef.getByText('Submit'));
    });
    expect(toastError).toHaveBeenCalledWith('Invalid OTP', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
  it('ResendHandler called with error response', async () => {
    const verifycomponentRef = getVerfiyPageComponent();
    const toastError = jest.spyOn(toast, 'error');
    (axios.get as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce({
      response: {data: {message: 'Unauthorized', statusCode: 401}},
      status: 401,
      statusText: 'Unauthorized',
    } as unknown as AxiosResponse);

    await act(async () => {
      fireEvent.click(verifycomponentRef.getByText('Resend'));
    });
    expect(toastError).toHaveBeenCalledWith('Unauthorized', {
      position: toast.POSITION.TOP_RIGHT,
    });
  });
});
`;
