module.exports = `
export interface ISignUpUserData {
  name?: string | undefined;
  email?: string | undefined;
  password?: string;
  confirmPassword?: string;
  showPassword?: boolean;
  showConfirmPassword?: boolean;
}
`;
