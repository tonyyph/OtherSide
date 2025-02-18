import { CheckBox, UnCheckBox } from "@/components/common/icons";
import { AuthIllustration } from "@/components/svg-assets/auth-illustration";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useLogin } from "@/hooks/auth/useLogin";
import { useUserAuthenticateStore } from "@/stores/user-authenticate/store";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Link } from "expo-router";
import {
  CircleAlertIcon,
  EyeClosedIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  User,
  UserRoundIcon
} from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import {
  Linking,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const [isRemember, setIsRemember] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const { setIsLoggedIn } = useUserAuthenticateStore();
  const { i18n } = useLingui();
  const { onLogin, usernameState, passwordState } = useLogin();
  const handleSignedIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="gap-4 p-8 justify-center flex-1"
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome */}
      <View className="z-10">
        <Trans>
          <View className="gap-2">
            <Text className="font-bold text-[44px] text-white">Welcome to</Text>
            <Text className="font-bold text-[44px] text-primary">
              OtherSide
            </Text>
            <Text className="text-muted-foreground text-[19px]">
              Keep up with the newest news, updates, and announcements from us
            </Text>
          </View>
        </Trans>
      </View>
      {/* Illustration */}
      <AuthIllustration className="h-[350px] opacity-35 absolute top-12 items-center text-primary" />
      {/* Input Field */}
      <View className="flex-1">
        <View className="flex-1 flex-col gap-3">
          {/* Username Field */}
          <View className="mt-36">
            <Text className="text-sm font-medium text-foreground mb-1">
              Email or Phone Number{" "}
              <Text className="font-regular text-red-400 group-active:text-red-400">
                *
              </Text>
            </Text>
            <View className="border-2 border-border rounded-lg relative">
              <TextInput
                className="pl-10 pr-4 rounded-lg bg-background h-12 text-white"
                placeholder={t(i18n)`Enter your username`}
                placeholderTextColor={"gray"}
                autoCapitalize="none"
                value={usernameState.value}
                onChangeText={usernameState.onChangeText}
              />
              <View className="absolute top-3.5 left-3">
                <UserRoundIcon className="size-5 text-muted-foreground" />
              </View>
            </View>
            {!!usernameState.error && (
              <View className=" flex flex-row items-center gap-x-2 mt-1">
                <CircleAlertIcon className="size-4 text-red-400" />
                <Text className="text-red-400 text-sm font-medium">
                  {usernameState.error?.charAt(0).toUpperCase() +
                    usernameState.error?.slice(1)}
                </Text>
              </View>
            )}
          </View>
          {/* Password Field */}
          <View className="">
            <Text className="text-sm font-medium text-foreground mb-1">
              Password{" "}
              <Text className="font-regular text-red-400 group-active:text-red-400">
                *
              </Text>
            </Text>
            <View className="border-2 border-border rounded-lg relative">
              <TextInput
                className="px-10 rounded-lg bg-background h-12 text-white"
                placeholder={t(i18n)`Enter your password`}
                placeholderTextColor={"gray"}
                secureTextEntry={securePassword}
                value={passwordState.value}
                onChangeText={passwordState.onChangeText}
              />
              <View className="absolute top-3.5 left-3">
                <KeyIcon className="size-5 text-muted-foreground" />
              </View>
              <TouchableOpacity
                onPress={onPressSecurePassword}
                className="absolute top-3.5 right-3"
              >
                {securePassword ? (
                  <EyeOffIcon className="size-5 text-muted-foreground" />
                ) : (
                  <EyeIcon className="size-5 text-muted-foreground" />
                )}
              </TouchableOpacity>
            </View>
            {!!passwordState.error && (
              <View className=" flex flex-row items-center gap-x-2 mt-1">
                <CircleAlertIcon className="size-4 text-red-400" />
                <Text className="text-red-400 text-sm font-medium">
                  {passwordState.error?.charAt(0).toUpperCase() +
                    passwordState.error?.slice(1)}
                </Text>
              </View>
            )}
          </View>
          {/* Remember and Forget password */}
          <View className=" flex flex-row justify-between mb-4">
            <View className="flex-row items-center gap-x-1">
              <TouchableOpacity onPress={() => setIsRemember((prev) => !prev)}>
                {isRemember ? <CheckBox /> : <UnCheckBox />}
              </TouchableOpacity>
              <Text className="text-sm text-foreground">
                {t(i18n)`Remember me`}
              </Text>
            </View>
            <Link href="/(aux)/forgot-password">
              <Text className="text-primary text-sm font-semiBold">
                Forgot password?
              </Text>
            </Link>
          </View>
          {/* Login Button */}
          <Button
            variant="default"
            disabled={!usernameState.value || !passwordState.value}
            // onPress={onLogin}
            onPress={handleSignedIn}
          >
            <Text className="text-black text-base font-medium">
              {t(i18n)`Login`}
            </Text>
          </Button>
          {/* Don’t have an account yet? Sign Up */}
          <View className="px-4 mt-4 flex-1">
            <Trans>
              <Text className="mx-auto text-center text-muted-foreground text-sm">
                Don’t have an account yet?{" "}
                <Link href="/(aux)/sign-up">
                  <Text className="text-primary text-sm font-semiBold">
                    Sign Up
                  </Text>
                </Link>{" "}
                now and start your journey with us!{" "}
              </Text>
            </Trans>
          </View>
        </View>
      </View>
      {/* Private policy and term of use */}
      <View className="px-4 justify-end">
        <View className="justify-end">
          <Trans>
            <Text className="mx-auto text-center text-muted-foreground text-xs">
              By continuing, you acknowledge that you understand and agree to
              our{" "}
              <Link href="/(aux)/privacy-policy">
                <Text className="text-primary text-xs">Privacy Policy</Text>
              </Link>{" "}
              and{" "}
              <Text
                className="text-primary text-xs"
                onPress={() =>
                  Linking.openURL(
                    "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                  )
                }
              >
                Terms of Use
              </Text>
            </Text>
          </Trans>
        </View>
      </View>
    </ScrollView>
  );
}
