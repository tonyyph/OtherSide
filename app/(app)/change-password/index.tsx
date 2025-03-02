import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { t, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { CircleAlertIcon, KeyRoundIcon } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePassword } from "@/hooks/profile/usePassword";
import LottieView from "lottie-react-native";

export default function ChangePasswordScreen() {
  const { i18n } = useLingui();
  const sheetRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  const {
    passwordState,
    newPasswordState,
    confirmNewPasswordState,
    onChangePassword,
    changePasswordSuccess
  } = usePassword();

  useEffect(() => {
    if (changePasswordSuccess) {
      sheetRef.current?.present();
    }
  }, [changePasswordSuccess]);

  return (
    <View className=" flex-1 bg-background p-6">
      <View className="flex-1">
        <View className="z-10">
          <Trans>
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
          </Trans>
        </View>
        <KeyRoundIcon className="absolute top-0 right-0 size-80 text-muted-foreground opacity-30" />

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
              placeholder={t(i18n)`Enter your password`}
              placeholderTextColor={"gray"}
              secureTextEntry
              value={passwordState.value}
              onChangeText={passwordState.onChangeText}
            />
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
              placeholder={t(i18n)`Enter your password`}
              placeholderTextColor={"gray"}
              secureTextEntry
              value={newPasswordState.value}
              onChangeText={newPasswordState.onChangeText}
            />
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
              placeholder={t(i18n)`Enter your confirm password`}
              placeholderTextColor={"gray"}
              secureTextEntry
              value={confirmNewPasswordState.value}
              onChangeText={confirmNewPasswordState.onChangeText}
            />
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
      <View className="justify-end bottom-28">
        <Button
          variant="default"
          size={"lg"}
          className="rounded-full"
          disabled={
            !passwordState.value ||
            !newPasswordState.value ||
            !confirmNewPasswordState.value
          }
          onPress={onChangePassword}
        >
          <Text className="text-background text-base font-medium">
            {t(i18n)`Save`}
          </Text>
        </Button>
      </View>
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
