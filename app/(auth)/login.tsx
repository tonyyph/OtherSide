import { BottomSheet } from "@/components/common/bottom-sheet";
import { CheckBox, UnCheckBox } from "@/components/common/icons";
import { AuthIllustration } from "@/components/svg-assets/auth-illustration";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useLogin } from "@/hooks/auth/useLogin";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import {
  CircleAlertIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  UserRoundIcon
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Linking,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [isRemember, setIsRemember] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const sheetRef = useRef<BottomSheetModal>(null);
  const { i18n } = useLingui();
  const { bottom } = useSafeAreaInsets();

  const { onLogin, usernameState, passwordState, loading } = useLogin();

  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };

  useEffect(() => {
    !!passwordState.error && sheetRef.current?.present();
  }, [passwordState.error]);

  return (
    <View className="flex-1">
      <Modal
        visible={loading}
        animationType="fade"
        transparent
        className="bg-overlay"
      >
        <View className="flex-1 justify-center bg-overlay items-center">
          <LottieView
            style={{ width: 200, height: 200 }}
            source={require("@/assets/json/loading.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
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
              <Text className="font-bold text-[44px] text-white">
                Welcome to
              </Text>
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
                <TouchableOpacity
                  onPress={() => setIsRemember((prev) => !prev)}
                >
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
              size={"lg"}
              className="rounded-full mx-2"
              disabled={!usernameState.value || !passwordState.value}
              onPress={onLogin}
            >
              <Text className="text-white text-base font-medium">
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
        <BottomSheet ref={sheetRef} index={0} enableDynamicSizing>
          <BottomSheetView style={{ paddingBottom: bottom }}>
            <View className="p-4">
              <View className="items-center mb-5 px-6 pb-4">
                <Image
                  source={require("@/assets/images/warning.png")}
                  className="w-[64px] h-[64px] self-center mb-4"
                />
                <Text className="!text-xl !text-white mb-2 font-semiBold text-center">
                  Invalid email or password
                </Text>
                <Text className="!text-lg !text-foreground mb-2 text-center">
                  Your email or password is incorrect. Please check and try
                  again.
                </Text>
              </View>
              <Button
                variant="default"
                className="rounded-full mx-4"
                onPress={() => sheetRef?.current?.close()}
              >
                <Text className="text-white text-base font-medium">
                  {t(i18n)`Try again`}
                </Text>
              </Button>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </ScrollView>
    </View>
  );
}
