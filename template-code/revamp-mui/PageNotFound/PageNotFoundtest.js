module.exports = `/* default test case for component */
import {fireEvent, render} from '@testing-library/react';
import {BrowserRouter, useNavigate} from 'react-router-dom';
import Pagenotfound from './PageNotFound.component';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Page Not Found Account component', () => {
  it(' pageNotFoundHandler called to navigate to Home page correctly ', () => {
    const mockedUseNavigate = useNavigate as jest.Mock;
    const navigateMock = jest.fn();
    mockedUseNavigate.mockReturnValue(navigateMock);

    const {getByTestId, getByText} = render(<Pagenotfound />);
    expect(getByTestId('pageNotFoundForm'));
    const submitButton = getByText('BACK TO HOME');

    fireEvent.submit(submitButton);
    expect(navigateMock).toHaveBeenCalledWith('/home');
  });
});
`;
