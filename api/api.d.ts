////////////////////////////////////////////////////////////////

type SignUpRequest = {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
  birthday: string;
  gender: string;
};

type SignUpResponse = {
  email: string;
  first_name: string;
  last_name: string;
  birthday: string;
  gender: string;
  confirmationToken: string;
  role: string;
  isActive: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
};

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

type ForgotPasswordRequest = {
  email: string;
};

type ForgotPasswordResponse = {
  message: string;
};

type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

type ResetPasswordResponse = {
  message: string;
};

type RefreshTokenRequest = {
  refreshToken: string;
};

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};
type RestfulApiError = {
  error?: string;
};
