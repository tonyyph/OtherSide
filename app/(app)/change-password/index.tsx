import { BottomSheet } from "@/components/common/bottom-sheet";
import { KeyboardSpacer } from "@/components/common/keyboard-spacer";
import { Button } from "@/components/ui/button";
import { usePassword } from "@/hooks/profile/usePassword";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import { debounce } from "lodash";
import LottieView from "lottie-react-native";
import {
  CircleAlertIcon,
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChangePasswordScreen() {
  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const sheetRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  const {
    passwordState,
    newPasswordState,
    confirmNewPasswordState,
    onChangePassword,
    changePasswordSuccess
  } = usePassword();

  const onPressSecureOldPassword = () => {
    setSecureOldPassword((prev) => !prev);
  };

  const onPressSecureNewPassword = () => {
    setSecureNewPassword((prev) => !prev);
  };
  const onPressSecureConfirmPassword = () => {
    setSecureConfirmPassword((prev) => !prev);
  };

  useEffect(() => {
    if (changePasswordSuccess) {
      sheetRef.current?.present();
    }
  }, [changePasswordSuccess]);

  return (
    <View className="flex-1 bg-background">
      <KeyboardAwareScrollView
        className={"flex-grow bg-background"}
        keyboardShouldPersistTaps={"handled"}
      >
        <View className="gap-8 p-8 justify-between flex-1">
          {/* Illustration */}
          <KeyRoundIcon className="absolute top-0 right-0 size-80 text-muted-foreground opacity-30" />

          {/* Welcome */}
          <View className="z-10">
            <View className="">
              <Text className="font-bold text-[44px] text-muted-foreground">
                For security
              </Text>
              <Text className="font-semiBold text-[44px] text-primary">
                reasons
              </Text>
              <Text className="text-muted-foreground mt-2 text-[20px]">
                Please confirm your current password before setting a new one.
              </Text>
            </View>
          </View>

          {/* Input Field */}
          <View className="flex-1">
            <View className="flex-1 flex-col gap-3">
              <View className="my-3 mt-12">
                <Text className="text-sm font-medium text-foreground mb-2">
                  Current Password{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
                </Text>
                <View className="border border-foreground rounded-lg relative">
                  <TextInput
                    className="px-4 rounded-lg bg-background h-12 text-white"
                    placeholder={`Enter your password`}
                    placeholderTextColor={"gray"}
                    secureTextEntry={secureOldPassword}
                    value={passwordState.value}
                    onChangeText={passwordState.onChangeText}
                  />
                  <TouchableOpacity
                    onPress={onPressSecureOldPassword}
                    className="absolute top-3.5 right-3"
                  >
                    {secureOldPassword ? (
                      <EyeOffIcon className="size-5 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="size-5 text-muted-foreground" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View className="my-3">
              <Text className="text-sm font-medium text-foreground mb-2">
                New Password{" "}
                <Text className="font-regular text-red-400 group-active:text-red-400">
                  *
                </Text>
              </Text>
              <View className="border border-foreground rounded-lg relative">
                <TextInput
                  className="px-4 rounded-lg bg-background h-12 text-white"
                  placeholder={`Enter your password`}
                  placeholderTextColor={"gray"}
                  secureTextEntry={secureNewPassword}
                  value={newPasswordState.value}
                  onChangeText={newPasswordState.onChangeText}
                />
                <TouchableOpacity
                  onPress={onPressSecureNewPassword}
                  className="absolute top-3.5 right-3"
                >
                  {secureNewPassword ? (
                    <EyeOffIcon className="size-5 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="size-5 text-muted-foreground" />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View className="my-3">
              <Text className="text-sm font-medium text-foreground mb-2">
                Confirm Password{" "}
                <Text className="font-regular text-red-400 group-active:text-red-400">
                  *
                </Text>
              </Text>
              <View className="border border-foreground rounded-lg relative">
                <TextInput
                  className="px-4 rounded-lg bg-background h-12 text-white"
                  placeholder={`Enter your confirm password`}
                  placeholderTextColor={"gray"}
                  secureTextEntry={secureConfirmPassword}
                  value={confirmNewPasswordState.value}
                  onChangeText={confirmNewPasswordState.onChangeText}
                />
                <TouchableOpacity
                  onPress={onPressSecureConfirmPassword}
                  className="absolute top-3.5 right-3"
                >
                  {secureConfirmPassword ? (
                    <EyeOffIcon className="size-5 text-muted-foreground" />
                  ) : (
                    <EyeIcon className="size-5 text-muted-foreground" />
                  )}
                </TouchableOpacity>
              </View>
              {!!confirmNewPasswordState.error && (
                <View className="flex flex-row items-center gap-x-2 mt-2">
                  <CircleAlertIcon className="size-4 text-red-400" />
                  <Text className="text-red-400 text-sm font-medium">
                    {confirmNewPasswordState.error?.charAt(0).toUpperCase() +
                      confirmNewPasswordState.error?.slice(1)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {/* Private policy and term of use */}
        <View className="p-8">
          <View className="justify-end">
            {/* Login Button */}
            <Button
              variant="default"
              size={"lg"}
              className="rounded-full"
              disabled={
                !passwordState.value ||
                !newPasswordState.value ||
                !confirmNewPasswordState.value
              }
              onPress={debounce(() => {
                onChangePassword();
                Keyboard.dismiss();
              }, 500)}
            >
              <Text className="text-background text-base font-medium">
                {`Save`}
              </Text>
            </Button>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <KeyboardSpacer value={100} />

      <BottomSheet ref={sheetRef} index={0} enableDynamicSizing>
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <View className="p-4">
            <View className="mb-5 px-4 pb-4 gap-4">
              <LottieView
                style={{ width: 120, height: 120, alignSelf: "center" }}
                source={require("@/assets/json/biometrics.json")}
                autoPlay
                loop
              />
              <Text className="!text-xl !text-white mb-2 font-semiBold text-center">
                {`Change Password Successful`}
              </Text>
              <Text className="!text-lg !text-foreground mb-2 text-center">
                {`Your password has been updated successfully. If you
                didn’t make this change, please contact support immediately.`}
              </Text>
            </View>
            <Button
              variant="default"
              className="rounded-full mx-4"
              onPress={() => {
                sheetRef?.current?.close();
                router.dismiss();
              }}
            >
              <Text className="text-background text-base font-medium">
                {`Go back`}
              </Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
