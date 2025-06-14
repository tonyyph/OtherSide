////////////////////////////////////////////////////////////////

type SignUpRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  gender: string;
  language: string;
  birthday: string;
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
  gender?: string;
  language?: string;
  birthday?: string;
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
  role: string;
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
  random?: boolean;
  filter?: string;
};

type Category = object;

type Article = {
  isBookmarked: boolean;
  isUnRead: boolean;
  createdAt: Date;
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

type ArticleInfo = {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  author: string;
  publishedAt: string; // ISO date string
  source: string;
  perspectiveType: "left" | "right" | "center"; // Assuming only these values exist
  status: "live" | "draft" | "archived"; // Adjust based on possible statuses
  language: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

type EngagementRecord = {
  id: number;
  createdAt: string; // ISO date string
  article: ArticleInfo;
};

type GetEngagementResponse = EngagementRecord[];

type User = {
  id: number;
};

type EngagementActionInfo = {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  author: string;
  publishedAt: string; // ISO date string
  source: string;
  perspectiveType: "left" | "right" | "center"; // Assuming these are possible values
  status: "live" | "draft" | "archived"; // Adjust based on possible statuses
  language: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

type PostEngagementActionResponse = {
  id: number;
  createdAt: string; // ISO date string
  user: User;
  article: EngagementActionInfo;
};

type DeleteResponse = {
  message: string;
};

type UserEngagement = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

type Comments = {
  id: number;
  text: string;
  user: UserEngagement;
  createdAt: Date; // ISO date string
};

type ArticleEngagementResponse = {
  articleId: number;
  comments: Comments[];
  likesCount: number;
  dislikesCount: number;
  bookmarksCount: number;
};

type CategoryS = {
  id: string;
  name: string;
  image?: string;
  description: string;
  isSaved: boolean;
};

type GetCategoriesResponse = CategoryS[];

type AnalyticsViewRequest = {
  articleId: number;
  deviceType: string;
  timeSpentSeconds?: number; // Optional, if you want to track time spent
  scrollPercentage?: number; // Optional, if you want to track time spent
  platform?: string; // Optional, if you want to track time spent
  appVersion: string;
  sessionId: string;
};

type ArticleInteraction = {
  id: number;
  userId: number;
  articleId: number;
  interactionType: "view" | "like" | "share" | "comment"; // you can extend this as needed
  appVersion: string;
  deviceType: string;
  sessionId: string;
  createdAt: string; // or use `Date` if you parse it
  metadata: Record<string, any>; // or define a specific type if you know the shape
};
