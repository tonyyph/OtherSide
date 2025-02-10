import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Redirect, Stack } from "expo-router";
import { View } from "react-native";

export default function AuthenticatedLayout() {
  const { getColor } = useColorPalette();
  const { i18n } = useLingui();
  const isSignedIn = true;
  const isOnBoarding = false;
  if (!isSignedIn) {
    return <Redirect href={"/login"} />;
  }

  if (isOnBoarding) {
    return <Redirect href={"/onboarding/step-one"} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff223" }} className="flex-1">
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: getColor("--foreground"),
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "Haskoy-SemiBold",
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
          name="explore-categories"
          options={{ headerTitle: t(i18n)`Explore Categories` }}
        />
        <Stack.Screen
          name="notifications"
          options={{ headerTitle: t(i18n)`Notifications` }}
        />
      </Stack>
    </View>
  );
}
