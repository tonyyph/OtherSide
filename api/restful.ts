import { authenStore } from "@/stores/authenStore";
import axios from "axios";

export const signUpWithEmail = async (data: SignUpRequest) => {
  return await axios.post<SignUpResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/users`,
    {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      birthday: data.birthday,
      gender: data.gender,
      language: "en"
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

export const logout = async () => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<LogoutResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/auth/logout`,
    {},
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
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

export const getUserProfile = async () => {
  const cookie = authenStore.getState().cookie;

  return await axios.get<GetProfileResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/me`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const updateUserProfile = async (data: UpdateProfileRequest) => {
  const cookie = authenStore.getState().cookie;

  return await axios.put<UpdateProfileResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/me`,
    {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      birthday: data.birthday,
      gender: data.gender,
      language: "en"
    },
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const changePassword = async (data: ChangePasswordRequest) => {
  const cookie = authenStore.getState().cookie;

  return await axios.put<ChangePasswordResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/me/change-password`,
    {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    },
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getArticles = async (data: GetArticlesRequest) => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<GetArticlesResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/articles?limit=${data?.limit}&skip=${data?.skip}&random=${data?.random}`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

// Engagement

export const getEngagementArt = async (id: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<ArticleEngagementResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/article/${id}`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getLikes = async () => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<GetEngagementResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/likes`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getDisLikes = async () => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<GetEngagementResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/dislikes`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getComments = async () => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<GetEngagementResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/comments`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getBookmarks = async () => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<GetEngagementResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/bookmarks`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const createLikes = async (artId: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<PostEngagementActionResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/like/${artId}`,
    {},
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const createDisLikes = async (artId: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<PostEngagementActionResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/dislike/${artId}`,
    {},
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const createBookmarks = async (artId: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<PostEngagementActionResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/bookmark/${artId}`,
    {},
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const createComments = async (data: any) => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<PostEngagementActionResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/comment/${data.artId}`,
    {
      text: data?.text
    },
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const deleteLikes = async (likeId: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.delete<DeleteResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/like/${likeId}`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const deleteDisLikes = async (dislikeId: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.delete<DeleteResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/dislike/${dislikeId}`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const deleteBookmarks = async (bookmarkId: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.delete<DeleteResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/bookmark/${bookmarkId}`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const deleteComments = async (commentId: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.delete<DeleteResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/engagement/comment/${commentId}`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getCategories = async () => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<GetCategoriesResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/categories`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const saveCategories = async (id: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<DeleteResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/categories/${id}/save`,
    {},
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const unSaveCategories = async (id: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.delete<DeleteResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/categories/${id}/unsave`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};
