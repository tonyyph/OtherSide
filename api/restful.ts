import axios from "axios";

export const signUpWithEmail = async (data: SignUpRequest) => {
  console.log("signUpWithEmail 💯 data:", data);

  return await axios.post<SignUpResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/users`,
    {
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      first_name: data.first_name,
      last_name: data.last_name,
      birthday: data.birthday,
      gender: data.gender
    }
  );
};

export const loginWithUsername = async (data: LoginRequest) => {
  return await axios.post<LoginResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/sign-in`,
    {
      email: data.email,
      password: data.password
    },
    {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json"
      }
    }
  );
};

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  return await axios.post<ForgotPasswordResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/forgot-password`,
    {
      email: data.email
    }
  );
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  return await axios.post<ResetPasswordResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/reset-password`,
    {
      token: data.token,
      newPassword: data.newPassword
    }
  );
};

export const refreshToken = async (data: RefreshTokenRequest) => {
  return await axios.post<RefreshTokenResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/refresh-token`,
    {
      refreshToken: data.refreshToken
    }
  );
};
