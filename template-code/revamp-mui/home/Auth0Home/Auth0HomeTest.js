module.exports = `import '@testing-library/jest-dom';
import {BrowserRouter} from 'react-router-dom';
import {act, fireEvent, render} from '@testing-library/react';
import {axiosApiInstance} from 'components/Auth/api';
import Auth0Home from './Auth0Home.component';

const getAuth0HomeComponent = () =>
  render(
    <BrowserRouter>
      <Auth0Home />
    </BrowserRouter>,
  );

const successResponse = {
  data: {
    aud: 'ja2saeWwsQTPipcGVp5MeVNo6TM5FZyj',
    email: 'shivali.umbarkar@konverge.ai',
    email_verified: true,
    exp: 1687853260,
    iat: 1687853200,
    iss: 'https://dev-ozf8os16exv4eaj6.us.auth0.com/',
    name: 'shivali',
    nickname: 'shivali.umbarkar',
    picture:
      'https://s.gravatar.com/avatar/889cfb1bee063ed6b47616770c0bd445?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fsh.png',
    sub: 'auth0|64959c595d6cbd4d6d295838',
    updated_at: '2023-06-27T08:06:40.389Z',
  },
  status: 200,
  statusText: 'OK',
};

const errorResponse = {
  response: {
    data: {
      error: 'Not Found',
      message: 'Incorrect email or password',
    },
  },
  status: 404,
  statusText: 'Not Found',
};

let mockPost: jest.SpyInstance;
beforeEach(() => {
  mockPost = jest.spyOn(axiosApiInstance, 'get');
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

describe('Auth0Home Component', () => {
  it('should display Auth0 Home Component when API response status is 200', async () => {
    const mockHistory = jest.fn();
    const mockUseNavigate = jest.fn().mockReturnValue(mockHistory);

    mockPost.mockImplementation(() => Promise.resolve(successResponse));
    const auth0HomecomponentRef = getAuth0HomeComponent();

    await act(async () => {
      fireEvent.click(auth0HomecomponentRef.getByRole('button', {name: 'Sign Out'}));
    });
    expect(await auth0HomecomponentRef.findByText('Welcome to Konverge')).toBeInTheDocument();
    expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
    expect(localStorage.removeItem).toHaveBeenCalledWith('checkBoxStatus');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refreshtoken');
    expect(localStorage.removeItem).toHaveBeenCalledWith('id_token');
    expect(mockUseNavigate('/sign-in'));
  });
});
`;
