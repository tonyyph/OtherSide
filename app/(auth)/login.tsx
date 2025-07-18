import { BottomSheet } from "@/components/common/bottom-sheet";
import { CheckBox, UnCheckBox } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/ui/loading";
import { Text } from "@/components/ui/text";
import { useLogin } from "@/hooks/auth/useLogin";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import {
  CircleAlertIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  UserRoundIcon
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Keyboard,
  Linking,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [securePassword, setSecurePassword] = useState(true);
  const sheetRef = useRef<BottomSheetModal>(null);
  const { onLogin, usernameState, passwordState, loading } = useLogin();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    (async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      const storedPassword = await AsyncStorage.getItem("password");
      const storedRememberMe = await AsyncStorage.getItem("rememberMe");

      if (storedRememberMe === "true") {
        usernameState.onChangeText(storedUsername || "");
        passwordState.onChangeText(storedPassword || "");
        setRememberMe(true);
      }
    })();
  }, [usernameState, passwordState]);

  const handleLogin = async () => {
    if (rememberMe) {
      await AsyncStorage.setItem("username", usernameState.value);
      await AsyncStorage.setItem("password", passwordState.value);
      await AsyncStorage.setItem("rememberMe", "true");
    } else {
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("password");
      await AsyncStorage.setItem("rememberMe", "false");
    }

    onLogin(sheetRef);
    Keyboard.dismiss();
  };

  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };

  return (
    <View className="flex-1 bg-background">
      <LoadingScreen loading={loading} />
      <KeyboardAwareScrollView
        className={"flex-grow bg-background"}
        keyboardShouldPersistTaps={"handled"}
      >
        <View className="bg-background gap-2 p-6 justify-center flex-1">
          {/* Illustration */}
          <Image
            source={require("@/assets/images/logo-transparent.png")}
            className="h-[300px] w-[300px] rounded-full opacity-30 absolute top-12 right-0 items-center text-primary"
          />
          {/* Welcome */}
          <View className="z-10">
            <View className="flex flex-col gap-2">
              <Text className="font-bold text-[40px] text-muted-foreground">
                Welcome to
              </Text>
              <Text className="font-bold text-[40px] text-primary">
                OtherSide
              </Text>
              <Text className="text-muted-foreground text-[16px]">
                Keep up with the newest news, updates, and announcements from us
              </Text>
            </View>
          </View>

          {/* Input Field */}
          <View className="flex-1">
            <View className="flex-1 flex-col gap-3">
              {/* Username Field */}
              <View className="mt-10">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Email or Phone Number{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
                </Text>
                <View className="border-2 border-border rounded-lg relative">
                  <TextInput
                    className="pl-10 pr-4 rounded-lg bg-background h-12 text-white"
                    placeholder={`Enter your email`}
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
                    placeholder={`Enter your password`}
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
              <View className=" flex flex-row justify-between items-center mb-4">
                <View className="flex-row items-center gap-x-1">
                  <TouchableOpacity
                    onPress={() => setRememberMe((prev) => !prev)}
                  >
                    {rememberMe ? <CheckBox /> : <UnCheckBox />}
                  </TouchableOpacity>
                  <Text className="text-sm text-foreground">{`Remember me`}</Text>
                </View>
                <Link href="/(aux)/forgot-password">
                  <Text className="text-primary text-sm font-semiBold">
                    Forgot Password?
                  </Text>
                </Link>
              </View>
              {/* Login Button */}
              <Button
                variant="default"
                size={"lg"}
                className="rounded-full mx-2 mt-4"
                disabled={!usernameState.value || !passwordState.value}
                onPress={handleLogin}
              >
                <Text className="text-background text-base font-medium">
                  {`Login`}
                </Text>
              </Button>
              {/* Don’t have an account yet? Sign Up */}
              <View className="px-4 mt-4 flex-1">
                <Text className="mx-auto text-center text-muted-foreground text-sm">
                  Don’t have an account yet?{" \n"}
                  <Link href="/(aux)/sign-up">
                    <Text className="text-primary text-sm font-semiBold">
                      Sign Up
                    </Text>
                  </Link>{" "}
                  now and start your journey with us!{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* Private policy and term of use */}
      <View className="flex-1 px-8 justify-end bg-background">
        <View className="justify-end">
          <Text className="mx-auto text-center text-muted-foreground text-xs">
            By continuing, you acknowledge that you understand and agree to our{" "}
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
        </View>
      </View>
      <BottomSheet ref={sheetRef} index={0} enableDynamicSizing>
        <BottomSheetView>
          <View className="p-4">
            <View className="items-center mb-5 px-6 pb-4">
              <Image
                source={require("@/assets/images/warning.png")}
                className="w-[64px] h-[64px] self-center mb-4"
              />
              <Text className="!text-xl !text-white mb-2 font-semiBold text-center">
                Invalid email or password
              </Text>
              <Text className="!text-lg !text-foreground mb-2 mx-4 text-center">
                {passwordState.error?.charAt(0).toUpperCase() +
                  passwordState.error?.slice(1) ===
                "Invalid email or password"
                  ? "Your email or password is incorrect. Please check and try again."
                  : passwordState.error?.charAt(0).toUpperCase() +
                    passwordState.error?.slice(1)}
              </Text>
            </View>
            <Button
              variant="default"
              className="rounded-full mx-4 mb-8"
              onPress={() => {
                sheetRef?.current?.close();
                passwordState.setState({ error: "", valid: true });
              }}
            >
              <Text className="text-background text-base font-medium">
                {`Try again`}
              </Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
