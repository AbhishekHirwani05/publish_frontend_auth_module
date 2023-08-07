module.exports = `/* default test case for component */
import '@testing-library/jest-dom';
import { fireEvent, screen, render } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { API_URL } from 'shared/apiEndPointURL';
import axios from 'axios';
import GoogleHome from './GoogleHome.component';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('@react-oauth/google', () => ({
  googleLogout: jest.fn(),
}));

describe('GoogleHome component', () => {
  /**
   @author      : Abhishek Hirwani
   @date        : 2023-06-23
   @description : check GoogleHome component render correctly
   */
  it('renders welcome message', () => {
    const data = render(<GoogleHome />);
    const welcomeMessage = screen.getByText(/Welcome to Auth Home/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('calls googleLogout and clears local storage when sign out button is clicked', () => {
    render(<GoogleHome />);
    const signOutButton = screen.getByText(/Sign out/i);
    fireEvent.click(signOutButton);

    expect(googleLogout).toHaveBeenCalledTimes(1);
    expect(localStorage.removeItem).toHaveBeenCalledWith('refreshtoken');
    expect(localStorage.removeItem).toHaveBeenCalledWith('id_token');
  });

  test('should call the APIs and set localStorage values on component mount', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    const mockGet = jest.spyOn(axios, 'get');
    const mockPost = jest.spyOn(axios, 'post');

    const mockIdToken = 'mock-id-token';
    window.localStorage.setItem('id_token', mockIdToken);

    const mockGenerateAuthResponse = {
      statusText: 'OK',
      data: {
        id_token: 'R2VPwXXXhpw_gQjFXXXXXXXX12asdasf',
      },
    };

    const mockMeResponse = {
      statusText: 'OK',
      data: {
        email_verified: true,
      },
    };

    const mockGoogleLoginResponse = {
      statusText: 'OK',
      data: {
        id_token: 'R2VPwXXXhpw_gQjFXXXXXXXX',
        refresh_token: 'R2VPwXXXdaerqhpw_gQ23jFXXXXXXXX',
      },
    };

    axios.get.mockResolvedValueOnce(mockGenerateAuthResponse);
    axios.get.mockResolvedValueOnce(mockMeResponse);
    axios.post.mockResolvedValueOnce(mockGoogleLoginResponse);

    render(<GoogleHome />);

    expect(mockPost).toHaveBeenCalledWith(\`\${API_URL.googleLogin}\`, {
      code: expect.any(String),
    });

    expect(mockGet).toHaveBeenCalledWith(\`\${API_URL.me}\`, {
      headers: {
        Authorization: \`\Bearer \${mockIdToken}\`,
      },
    });

    expect(mockGet).toHaveBeenCalledWith(\`\${API_URL.generateAuth}\`, {
      headers: {
        config: 'R2VPwhpw_gQjFXXXXXXXX',
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('id_token', 'R2VPwXXXhpw_gQjFXXXXXXXX');
    expect(localStorage.setItem).toHaveBeenCalledWith('refreshtoken', 'R2VPwXXXhpw_gQjFXXXXXXXX12asdasf');
    expect(mockNavigate).toHaveBeenCalledWith('/sign-in');
  });

  test('should call the APIs and set localStorage values on component mount', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    const mockGet = jest.spyOn(axios, 'get');

    const mockedError = {
      statusText: 'Not Found',
    };

    render(<GoogleHome />);

    axios.get.mockRejectedValueOnce(mockedError);

    expect(mockGet).toHaveBeenCalledWith(\`\${API_URL.googleLogin}\`, {
      headers: {
        config: ' ',
      },
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('should call the APIs and set localStorage values on component mount', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    const mockGet = jest.spyOn(axios, 'get');

    const mockedError = {
      statusText: 'Not Found',
    };

    render(<GoogleHome />);

    axios.get.mockRejectedValueOnce(mockedError);

    expect(mockGet).toHaveBeenCalledWith(\`\${API_URL.me}\`, {
      headers: {
        Authorization: ' ',
      },
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
  });
});
`;
