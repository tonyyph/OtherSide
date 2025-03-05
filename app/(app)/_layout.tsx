import { BackButton } from "@/components/common/back-button";
import { useProfile } from "@/hooks/profile/useProfile";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useUserAuthenticateStore } from "@/stores/user-authenticate/store";
import { useLingui } from "@lingui/react";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function AuthenticatedLayout() {
  const { getColor } = useColorPalette();
  const { i18n } = useLingui();
  const { isLoggedIn } = useUserAuthenticateStore();
  const { userProfile } = useProfile();

  if (!isLoggedIn) {
    return <Redirect href={"/login"} />;
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
          options={{ headerTitle: `Breaking News` }}
        />
        <Stack.Screen
          name="article-comment"
          options={{
            presentation: "modal",
            headerTitle: "",
            headerStyle: {
              backgroundColor: getColor("--muted")
            }
          }}
        />
        <Stack.Screen
          name="appearance"
          options={{
            presentation: "modal",
            headerTitle: `Appearance`
          }}
        />
        <Stack.Screen
          name="profile-edit"
          options={{
            presentation: "modal",
            headerTitle: `Fill Your Profile`
          }}
        />
        <Stack.Screen
          name="category/index"
          options={{
            headerTitle: `Categories`
          }}
        />
        <Stack.Screen
          name="change-password/index"
          options={{
            presentation: "modal",
            headerTitle: `Change Password`
          }}
        />
        <Stack.Screen
          name="explore-categories"
          options={{ headerTitle: `Explore Categories` }}
        />
        <Stack.Screen
          name="notifications"
          options={{ headerTitle: `Notifications` }}
        />
        <Stack.Screen
          name="search"
          options={{ headerTitle: `Search`, headerShown: false }}
        />
        <Stack.Screen
          name="feedback"
          options={{
            presentation: "modal",
            headerTitle: `Feedback`
          }}
        />
        <Stack.Screen
          name="language"
          options={{
            presentation: "modal",
            headerTitle: `Language`
          }}
        />
      </Stack>
    </View>
  );
}
