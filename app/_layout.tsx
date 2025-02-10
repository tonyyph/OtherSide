import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { PostHogProvider } from "posthog-react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LocaleProvider } from "@/locales/provider";
import { cssInterop } from "nativewind";
import { LinearGradient } from "expo-linear-gradient";
import Svg from "react-native-svg";

import "../global.css";
import { CustomPaletteWrapper } from "@/components/common/custom-palette-wrapper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ToastRoot } from "@/components/common/toast";
import { PortalHost } from "@rn-primitives/portal";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true }
  }
});
cssInterop(LinearGradient, {
  className: {
    target: "style"
  }
});

export const unstable_settings = {
  initialRouteName: "(app)"
};

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [fontsLoaded] = useFonts({
    "Haskoy-Regular": require("../assets/fonts/Haskoy-Regular.ttf"),
    "Haskoy-Medium": require("../assets/fonts/Haskoy-Medium.ttf"),
    "Haskoy-SemiBold": require("../assets/fonts/Haskoy-SemiBold.ttf"),
    "Haskoy-Bold": require("../assets/fonts/Haskoy-Bold.ttf")
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PostHogProvider
      autocapture
      // apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY!}
      apiKey={"phx_8s4eOA8xjkEGpx8ntRsdHK6CJXGxFm9qcjMFFucu9cjJeI3"}
      options={{
        // host: process.env.EXPO_PUBLIC_POSTHOG_HOST!,
        host: "https://us.i.posthog.com",
        disabled: false
      }}
    >
      <LocaleProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <CustomPaletteWrapper>
            <SafeAreaProvider>
              <GestureHandlerRootView>
                <BottomSheetModalProvider>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                      name="(aux)"
                      options={{
                        presentation: "modal"
                      }}
                    />
                  </Stack>
                  <ToastRoot />
                  <PortalHost />
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </CustomPaletteWrapper>
          <StatusBar style="auto" />
        </ThemeProvider>
      </LocaleProvider>
    </PostHogProvider>
  );
}
