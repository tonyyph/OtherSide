import { authenStore } from "@/stores/authenStore";
import messaging from "@react-native-firebase/messaging";
import axios from "axios";
import { Platform } from "react-native";

async function getFcmToken() {
  await messaging().registerDeviceForRemoteMessages();
  if (await messaging().isDeviceRegisteredForRemoteMessages) {
    const apnsToken = await messaging().getAPNSToken();
    if ((apnsToken && Platform.OS === "ios") || Platform.OS === "android") {
      const token = await messaging().getToken();
      return token;
    }
    return null;
  } else {
    console.log("Device not registered for remote messages");
    return null;
  }
}
export const signUpWithEmail = async (data: SignUpRequest) => {
  return await axios.post<SignUpResponse>(
    `https://auction-api.reliasoftware.com/users`,
    {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      firstName: data.firstName,
      gender: data.gender,
      language: data.language,
      birthday: data.birthday
    }
  );
};

export const loginWithUsername = async (data: LoginRequest) => {
  return await axios.post<LoginResponse>(
    `https://auction-api.reliasoftware.com/api/v1/auth/login`,
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
    `https://auction-api.reliasoftware.com/auth/logout`,
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
    `https://auction-api.reliasoftware.com/auth/forgot-password`,
    {
      email: data.email
    }
  );
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  return await axios.post<ResetPasswordResponse>(
    `https://auction-api.reliasoftware.com/auth/reset-password`,
    {
      token: data.token,
      newPassword: data.newPassword
    }
  );
};

export const refreshToken = async (data: RefreshTokenRequest) => {
  return await axios.post<RefreshTokenResponse>(
    `https://auction-api.reliasoftware.com/auth/refresh-token`,
    {
      refreshToken: data.refreshToken
    }
  );
};

export const deleteAccount = async (password: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.delete<DeleteResponse>(
    `https://auction-api.reliasoftware.com/me`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      },
      data: {
        password: password
      }
    }
  );
};

export const changePassword = async (data: ChangePasswordRequest) => {
  const cookie = authenStore.getState().cookie;

  return await axios.put<ChangePasswordResponse>(
    `https://auction-api.reliasoftware.com/me/change-password`,
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

export const getMeUserToken = async () => {
  const cookie = authenStore.getState().cookie;
  const url = `https://auction-api.reliasoftware.com/api/v1/me/user_token`;

  return await axios.get<any>(url, {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${cookie?.accessToken}`
    }
  });
};

export const postUserToken = async () => {
  const cookie = authenStore.getState().cookie;
  const url = `https://auction-api.reliasoftware.com/api/v1/me/user_token`;
  const token = await getFcmToken();

  return await axios.post<any>(
    url,
    {
      token: token
    },
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getAuctions = async () => {
  const cookie = authenStore.getState().cookie;
  const url = `https://auction-api.reliasoftware.com/api/v1/app/auctions`;

  return await axios.get<any>(url, {
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${cookie?.accessToken}`
    }
  });
};

// Engagement

export const getEngagementArt = async (id: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<ArticleEngagementResponse>(
    `https://auction-api.reliasoftware.com/engagement/article/${id}`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getAuctionsDetail = async (id: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<any>(
    `https://auction-api.reliasoftware.com/api/v1/app/auctions/${id}`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const handleTriggerBid = async (id: string, bidValue: number) => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<any>(
    `https://auction-api.reliasoftware.com/api/v1/app/auctions/${id}/bids`,
    {
      amount: bidValue
    },
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getListAuctionsBid = async (id: string) => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<any>(
    `https://auction-api.reliasoftware.com/api/v1/app/auctions/${id}/bids`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getListAuctionsMe = async () => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<any>(
    `https://auction-api.reliasoftware.com/api/v1/me/auctions`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const getMe = async () => {
  const cookie = authenStore.getState().cookie;
  return await axios.get<any>(
    `https://auction-api.reliasoftware.com/api/v1/me`,
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
    `https://auction-api.reliasoftware.com/engagement/likes`,
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
    `https://auction-api.reliasoftware.com/engagement/dislikes`,
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
    `https://auction-api.reliasoftware.com/engagement/comments`,
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
    `https://auction-api.reliasoftware.com/engagement/bookmarks`,
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
    `https://auction-api.reliasoftware.com/engagement/like/${artId}`,
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
    `https://auction-api.reliasoftware.com/engagement/dislike/${artId}`,
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
    `https://auction-api.reliasoftware.com/engagement/bookmark/${artId}`,
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
    `https://auction-api.reliasoftware.com/engagement/comment/${data.artId}`,
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
    `https://auction-api.reliasoftware.com/engagement/like/${likeId}`,
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
    `https://auction-api.reliasoftware.com/engagement/dislike/${dislikeId}`,
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
    `https://auction-api.reliasoftware.com/engagement/bookmark/${bookmarkId}`,
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
    `https://auction-api.reliasoftware.com/engagement/comment/${commentId}`,
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
    `https://auction-api.reliasoftware.com/categories`,
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
    `https://auction-api.reliasoftware.com/categories/${id}/save`,
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
    `https://auction-api.reliasoftware.com/categories/${id}/unsave`,
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

////////////// ANALYTICS //////////////
export const analyticsView = async (req: AnalyticsViewRequest) => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<ArticleInteraction>(
    `https://auction-api.reliasoftware.com/article-analytics/view`,
    {
      articleId: req.articleId,
      deviceInfo: {
        deviceType: req.deviceType ?? "",
        appVersion: req.appVersion ?? "",
        sessionId: req.sessionId ?? ""
      }
    },
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const analyticsTimeSpent = async (req: AnalyticsViewRequest) => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<ArticleInteraction>(
    `https://auction-api.reliasoftware.com/article-analytics/time-spent`,
    {
      articleId: req.articleId,
      timeSpentSeconds: req.timeSpentSeconds ?? 0,
      deviceInfo: {
        deviceType: req.deviceType ?? "",
        appVersion: req.appVersion ?? "",
        sessionId: req.sessionId ?? ""
      }
    },
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const analyticsScrollDepth = async (req: AnalyticsViewRequest) => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<ArticleInteraction>(
    `https://auction-api.reliasoftware.com/article-analytics/scroll-depth`,
    {
      articleId: req.articleId,
      scrollPercentage: req.scrollPercentage ?? 0,
      deviceInfo: {
        deviceType: req.deviceType ?? "",
        appVersion: req.appVersion ?? "",
        sessionId: req.sessionId ?? ""
      }
    },
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};

export const analyticsShare = async (req: AnalyticsViewRequest) => {
  const cookie = authenStore.getState().cookie;
  return await axios.post<ArticleInteraction>(
    `https://auction-api.reliasoftware.com/article-analytics/share`,
    {
      articleId: req.articleId,
      platform: req.platform ?? "",
      deviceInfo: {
        deviceType: req.deviceType ?? "",
        appVersion: req.appVersion ?? "",
        sessionId: req.sessionId ?? ""
      }
    },
    {
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${cookie?.accessToken}`
      }
    }
  );
};
