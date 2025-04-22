import {
  analyticsScrollDepth,
  analyticsShare,
  analyticsTimeSpent,
  analyticsView
} from "@/api";
import * as Application from "expo-application";
import Constants from "expo-constants";
import { useMemoFunc } from "../commons";

export const useAnalytics = () => {
  const onAnalyticsView = useMemoFunc(async (articleId: number) => {
    console.log("111", 111);
    await analyticsView({
      articleId: articleId,
      deviceType: Constants.deviceName ?? "iOS",
      appVersion: Application.nativeApplicationVersion ?? "1.0.2",
      sessionId: Constants.sessionId ?? ""
    });
  });

  const onAnalyticsTimeSpent = useMemoFunc(async (data: any) => {
    await analyticsTimeSpent({
      articleId: data?.articleId,
      timeSpentSeconds: data?.timeSpentSeconds,
      deviceType: Constants.deviceName ?? "iOS",
      appVersion: Application.nativeApplicationVersion ?? "1.0.2",
      sessionId: Constants.sessionId ?? ""
    });
  });

  const onAnalyticsScrollDepth = useMemoFunc(async (data: any) => {
    await analyticsScrollDepth({
      articleId: data?.articleId,
      scrollPercentage: data?.scrollPercentage,
      deviceType: Constants.deviceName ?? "iOS",
      appVersion: Application.nativeApplicationVersion ?? "1.0.2",
      sessionId: Constants.sessionId ?? ""
    });
  });

  const onAnalyticsShare = useMemoFunc(async (data: any) => {
    await analyticsShare({
      articleId: data?.articleId,
      platform: data?.platform,
      deviceType: Constants.deviceName ?? "iOS",
      appVersion: Application.nativeApplicationVersion ?? "1.0.2",
      sessionId: Constants.sessionId ?? ""
    });
  });

  return {
    onAnalyticsView,
    onAnalyticsTimeSpent,
    onAnalyticsScrollDepth,
    onAnalyticsShare
  };
};
