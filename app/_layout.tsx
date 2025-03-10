import { CustomPaletteWrapper } from "@/components/common/custom-palette-wrapper";
import { ToastRoot } from "@/components/common/toast";
import { LocaleProvider } from "@/locales/provider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import LottieView from "lottie-react-native";
import { cssInterop } from "nativewind";
import { PostHogProvider } from "posthog-react-native";
import { useCallback, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Svg from "react-native-svg";
import "../global.css";

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

cssInterop(LottieView, {
  className: {
    target: "style"
  }
});

export const unstable_settings = {
  initialRouteName: "(app)"
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf")
  });
  const [updating, setUpdating] = useState<boolean>(false);

  const checkAndForceUpdates = useCallback(async () => {
    if (__DEV__) {
      return;
    }
    setUpdating(true);
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log("error", error);
    }
    setUpdating(false);
  }, []);

  useEffect(() => {
    checkAndForceUpdates();

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PostHogProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY!}
      options={{
        host: process.env.EXPO_PUBLIC_POSTHOG_HOST!,
        disabled: false
      }}
    >
      <LocaleProvider>
        <ThemeProvider value={DarkTheme}>
          <CustomPaletteWrapper>
            <SafeAreaProvider>
              <GestureHandlerRootView>
                <KeyboardProvider>
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
                </KeyboardProvider>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </CustomPaletteWrapper>
        </ThemeProvider>
      </LocaleProvider>
    </PostHogProvider>
  );
}
