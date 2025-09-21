import { BottomSheet } from "@/components/common/bottom-sheet";
import { CheckBox, UnCheckBox } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/ui/loading";
import { useLogin } from "@/hooks/auth/useLogin";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
  }, []);

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
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor={"#ffffff"} />

      <LoadingScreen loading={loading} />
      <KeyboardAwareScrollView
        className={"flex-grow bg-white"}
        keyboardShouldPersistTaps={"handled"}
      >
        <View className="bg-white gap-2 p-6 justify-center flex-1">
          {/* Illustration */}
          <Image
            source={require("@/assets/images/logo-transparent.png")}
            className="h-[300px] w-[300px] rounded-full opacity-20 absolute top-12 right-0"
          />
          {/* Welcome */}
          <View className="z-10">
            <View className="flex flex-col gap-2">
              <Text className="font-bold text-[36px] text-blue-500">
                AubidNow
              </Text>
              <Text className="text-gray-500 text-[16px]">
                Discover thousands of items, place your bid, and win with just a
                few taps.
              </Text>
            </View>
          </View>

          {/* Input Field */}
          <View className="flex-1">
            <View className="flex-1 flex-col gap-3">
              {/* Username Field */}
              <View className="mt-10">
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  Email or Phone Number{" "}
                  <Text className="font-regular text-red-500">*</Text>
                </Text>
                <View className="border border-gray-300 rounded-lg relative bg-white">
                  <TextInput
                    className="pl-10 pr-4 rounded-lg h-12 text-gray-800"
                    placeholder={`Enter your email`}
                    placeholderTextColor={"#aaa"}
                    autoCapitalize="none"
                    value={usernameState.value}
                    onChangeText={usernameState.onChangeText}
                  />
                  <View className="absolute top-3.5 left-3">
                    <UserRoundIcon color="#888" size={20} />
                  </View>
                </View>
                {!!usernameState.error && (
                  <View className=" flex flex-row items-center gap-x-2 mt-1">
                    <CircleAlertIcon color="#f87171" size={16} />
                    <Text className="text-red-500 text-sm font-medium">
                      {usernameState.error?.charAt(0).toUpperCase() +
                        usernameState.error?.slice(1)}
                    </Text>
                  </View>
                )}
              </View>
              {/* Password Field */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  Password <Text className="font-regular text-red-500">*</Text>
                </Text>
                <View className="border border-gray-300 rounded-lg relative bg-white">
                  <TextInput
                    className="px-10 rounded-lg h-12 text-gray-800"
                    placeholder={`Enter your password`}
                    placeholderTextColor={"#aaa"}
                    secureTextEntry={securePassword}
                    value={passwordState.value}
                    onChangeText={passwordState.onChangeText}
                  />
                  <View className="absolute top-3.5 left-3">
                    <KeyIcon color="#888" size={20} />
                  </View>
                  <TouchableOpacity
                    onPress={onPressSecurePassword}
                    className="absolute top-3.5 right-3"
                  >
                    {securePassword ? (
                      <EyeOffIcon color="#888" size={20} />
                    ) : (
                      <EyeIcon color="#888" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                {!!passwordState.error && (
                  <View className=" flex flex-row items-center gap-x-2 mt-1">
                    <CircleAlertIcon color="#f87171" size={16} />
                    <Text className="text-red-500 text-sm font-medium">
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
                  <Text className="text-sm text-gray-700">{`Remember me`}</Text>
                </View>
              </View>
              {/* Login Button */}
              <Button
                variant="default"
                size={"lg"}
                className="rounded-full mx-2 mt-4 bg-blue-500"
                disabled={!usernameState.value || !passwordState.value}
                onPress={handleLogin}
              >
                <Text className="text-white text-base font-medium">
                  {`Login`}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <BottomSheet ref={sheetRef} index={0} enableDynamicSizing>
        <BottomSheetView>
          <View className="p-4">
            <View className="items-center mb-5 px-6 pb-4">
              <Image
                source={require("@/assets/images/warning.png")}
                className="w-[64px] h-[64px] self-center mb-4"
              />
              <Text className="!text-xl text-gray-900 mb-2 font-semibold text-center">
                Invalid email or password
              </Text>
              <Text className="!text-lg text-gray-600 mb-2 mx-4 text-center">
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
              <Text className="text-white text-base font-medium">
                {`Try again`}
              </Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
