import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { authenStore } from "@/stores/authenStore";
import { useUserAuthenticateStore } from "@/stores/user-authenticate/store";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Redirect, Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export default function AuthenticatedLayout() {
  const { getColor } = useColorPalette();
  const { i18n } = useLingui();
  const { isLoggedIn, setIsLoggedIn } = useUserAuthenticateStore();
  const [loading, setLoading] = useState(false);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  // const isAuthenticated = authenStore((store) => !!store.cookie);

  // console.log("AuthenticatedLayout 💯 isAuthenticated:", isAuthenticated);

  // useEffect(() => {
  //   setIsLoggedIn(false);
  // }, []);

  if (!isLoggedIn) {
    return <Redirect href={"/login"} />;
  }

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(true);
      hideTimer.current = setTimeout(() => {
        setLoading(false);
      }, 1500);

      return () => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
      };
    }
  }, [isLoggedIn]);

  if (loading) {
    return (
      <View className="flex-1 items-center">
        <LottieView
          style={{ width: "60%", height: "100%" }}
          source={require("@/assets/json/loading.json")}
          autoPlay
          loop
        />
      </View>
    );
  }

  const isOnBoarding = false;

  if (isOnBoarding) {
    return <Redirect href={"/onboarding/step-one"} />;
  }

  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: getColor("--foreground"),
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Poppins-SemiBold",
            fontSize: 16,
            color: getColor("--foreground")
          },
          headerStyle: {
            backgroundColor: getColor("--background")
          },
          headerLeft: () => <BackButton />
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="breaking-news"
          options={{ headerTitle: t(i18n)`Breaking News` }}
        />
        <Stack.Screen
          name="appearance"
          options={{
            presentation: "modal",
            headerTitle: t(i18n)`Appearance`
          }}
        />
        <Stack.Screen
          name="profile-edit"
          options={{
            presentation: "modal",
            headerTitle: t(i18n)`Fill Your Profile`
          }}
        />
        <Stack.Screen
          name="category/index"
          options={{
            headerTitle: t(i18n)`Categories`
          }}
        />
        <Stack.Screen
          name="explore-categories"
          options={{ headerTitle: t(i18n)`Explore Categories` }}
        />
        <Stack.Screen
          name="notifications"
          options={{ headerTitle: t(i18n)`Notifications` }}
        />
        <Stack.Screen
          name="search"
          options={{ headerTitle: t(i18n)`Search`, headerShown: false }}
        />
        <Stack.Screen
          name="feedback"
          options={{
            presentation: "modal",
            headerTitle: t(i18n)`Feedback`
          }}
        />
        <Stack.Screen
          name="language"
          options={{
            presentation: "modal",
            headerTitle: t(i18n)`Language`
          }}
        />
      </Stack>
    </View>
  );
}
