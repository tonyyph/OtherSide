////////////////////////////////////////////////////////////////

type SignUpRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
};

type SignUpResponse = {
  email: string;
  firstName: string;
  lastName: string;
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

type LogoutResponse = {
  message: string;
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
  message?: string;
  statusCode?: number;
};

type UpdateProfileRequest = {
  email?: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  gender?: string;
};

type UpdateProfileResponse = {
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  confirmationToken: string;
  role: string;
  isActive: boolean;
  id: number;
  createdAt: string;
  updatedAt: string;
  language: string;
};

type GetProfileResponse = {
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  language: string;
};

type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

type ChangePasswordResponse = {
  message: string;
};

type GetArticlesRequest = {
  skip?: string;
  limit?: string;
};

type Category = {};

type Article = {
  isBookmarked: boolean;
  isUnRead: boolean;
  createdAt: string;
  leftPerspective: {
    id: number;
    title: string;
    content: string;
    category: Category[];
    imageUrl: string;
    likeCount: number;
    commentCount: number;
    dislikeCount: number;
  };
  rightPerspective: {
    id: number;
    title: string;
    content: string;
    category: Category[];
    imageUrl: string;
    likeCount: number;
    commentCount: number;
    dislikeCount: number;
  };
};

type GetArticlesResponse = {
  pagination: {
    total: number;
    limit: string;
    skip: string;
    hasMore: boolean;
  };
  articles: Article[];
};
