import { BackButton } from "@/components/common/back-button";
import { useColorPalette } from "@/hooks/use-color-palette";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function AuxiliaryLayout() {
  const { getColor } = useColorPalette();

  return (
    <SafeAreaView className="flex-1 bg-background">
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
          name="categories"
          options={{
            presentation: "fullScreenModal",
            headerTitle: `Categories`
          }}
        />
        <Stack.Screen
          name="privacy-policy"
          options={{
            presentation: "modal",
            headerTitle: `Privacy Policy`
          }}
        />
        <Stack.Screen
          name="select-language"
          options={{
            presentation: "modal",
            headerTitle: `Selected your language`
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            presentation: "modal",
            headerTitle: `Sign Up`
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            presentation: "modal",
            headerTitle: `Forgot Password`
          }}
        />
        <Stack.Screen
          name="reset-password"
          options={{
            presentation: "modal",
            headerTitle: `Reset Password`
          }}
        />
        <Stack.Screen
          name="login-error"
          options={{
            presentation: "modal",
            headerTitle: `Login Error`
          }}
        />
        <Stack.Screen
          name="terms-of-service"
          options={{
            presentation: "modal",
            headerTitle: `Terms & Conditions`
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
