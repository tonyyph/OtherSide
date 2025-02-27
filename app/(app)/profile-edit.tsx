import { BottomSheet } from "@/components/common/bottom-sheet";
import { DatePicker } from "@/components/common/date-picker";
import { UserAvatar } from "@/components/common/user-avatar";
import { Button } from "@/components/ui/button";
import { Radio } from "@/components/ui/radio";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useProfile } from "@/hooks/profile/useProfile";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import { formatDateShort } from "@/lib/date";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import {
  CaseLowerIcon,
  CaseSensitiveIcon,
  MailIcon,
  UserRoundPenIcon
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Image, ScrollView, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const {
    firstNameState,
    lastNameState,
    genderState,
    birthDayState,
    loading,
    emailAddressState,
    passwordState,
    onUpdateProfile
  } = useUpdateProfile();

  const sheetRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  const { i18n } = useLingui();
  const form = useForm({
    defaultValues: {
      date: new Date()
    }
  });

  if (loading) {
    return (
      <View className="bg-background flex-1 p-6 gap-4 justify-between">
        <View className="flex-1">
          <UserRoundPenIcon className="absolute top-0 right-0 size-80 text-muted-foreground opacity-30" />
          <View className="bg-background self-center mb-10 border border-blue-200 rounded-full">
            <Skeleton className="m-[2px] h-28 w-28 rounded-full self-center" />
          </View>
          <View className="flex-row gap-2 mb-6">
            <View className="flex-1 gap-2">
              <Skeleton className="h-4 w-2/3 rounded-full" />
              <Skeleton className="h-10" />
            </View>
            <View className="flex-1 gap-2">
              <Skeleton className="h-4 w-2/3 rounded-full" />
              <Skeleton className="h-10 " />
            </View>
          </View>
          <View className="gap-2 mb-6">
            <Skeleton className="h-4 w-1/3 rounded-full" />
            <Skeleton className="h-10 " />
          </View>
          <View className="gap-2 mb-6">
            <Skeleton className="h-4 w-1/3 rounded-full" />
            <Skeleton className="h-10 " />
          </View>
          <View className="gap-2 mb-6">
            <Skeleton className="h-4 w-1/3 rounded-full" />
            <Skeleton className="h-10" />
          </View>
        </View>
        <View className="flex-1 justify-end">
          <Skeleton className="h-12 rounded-full bottom-16" />
        </View>
      </View>
    );
  }

  return (
    <FormProvider {...form}>
      <ScrollView
        className="bg-background"
        contentContainerClassName="gap-4 p-8 justify-center flex-1"
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-background self-center mb-2 border border-blue-200 rounded-full">
          <UserAvatar
            imageUrl="https://media.licdn.com/dms/image/v2/C4E0BAQHRcd8MW8NoEQ/company-logo_200_200/company-logo_200_200/0/1631373100497?e=2147483647&v=beta&t=1pTjV_f6c_HEPpm-zTeobA6HYV_YNV4aLrGLGBB0K-w"
            fallbackClassName="bg-background"
            className="h-28 w-28"
          />
        </View>
        {/* Illustration */}
        <UserRoundPenIcon className="absolute top-0 right-0 size-80 text-muted-foreground opacity-30" />
        {/* Input Field */}
        <View className="flex-1">
          <View className="flex-1 flex-col gap-3">
            {/* Username Field */}
            <View className="flex flex-row justify-between gap-2">
              <View className="my-1 flex-1">
                <Text className="text-sm font-medium text-foreground mb-1">
                  First Name
                </Text>
                <View className="border border-border rounded-lg relative">
                  <TextInput
                    className="pl-10 pr-10 rounded-lg bg-background h-12 text-white"
                    placeholder={t(i18n)`ex: Tony .D`}
                    placeholderTextColor={"gray"}
                    autoCapitalize="none"
                    value={firstNameState.value}
                    onChangeText={firstNameState.onChangeText}
                  />
                  <View className="absolute top-4 left-3">
                    <CaseSensitiveIcon className="size-5 text-muted-foreground" />
                  </View>
                </View>
              </View>

              <View className="my-1 flex-1">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Last Name
                </Text>
                <View className="border border-border rounded-lg relative">
                  <TextInput
                    className="pl-10 pr-10 rounded-lg bg-background h-12 text-white"
                    placeholder={t(i18n)`ex: Phan`}
                    placeholderTextColor={"gray"}
                    autoCapitalize="none"
                    value={lastNameState.value}
                    onChangeText={lastNameState.onChangeText}
                  />
                  <View className="absolute top-4 left-3">
                    <CaseLowerIcon className="size-5 text-muted-foreground" />
                  </View>
                </View>
              </View>
            </View>

            <View className="my-1">
              <Text className="text-sm font-medium text-foreground mb-1">
                Email Address
              </Text>
              <View className="border border-border rounded-lg relative">
                <TextInput
                  className="pl-10 pr-10 rounded-lg bg-background h-12 text-white opacity-30"
                  placeholderTextColor={"gray"}
                  autoCapitalize="none"
                  value={emailAddressState.value}
                  editable={false}
                />
                <View className="absolute top-4 left-3">
                  <MailIcon className="size-5 text-muted-foreground opacity-50" />
                </View>
              </View>
            </View>

            <View className="justify-center">
              <Text className="text-sm font-medium text-foreground mb-1">
                Gender
              </Text>
              <View className="flex flex-row items-center gap-2 h-12">
                <View className="flex flex-row items-center gap-2 justify-center">
                  <Radio
                    selected={genderState.value === "male" ? true : false}
                    onPress={() => {
                      genderState.onChangeText("male");
                    }}
                  />
                  <Text className="text-sm font-medium text-white">
                    {"Male"}
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-2 justify-center">
                  <Radio
                    selected={genderState.value === "female" ? true : false}
                    onPress={() => {
                      genderState.onChangeText("female");
                    }}
                  />
                  <Text className="text-sm font-medium text-white">
                    {"Female"}
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-sm font-medium text-foreground mb-1">
                Birthday
              </Text>
              <View className="rounded-lg">
                <Controller
                  name="date"
                  rules={{ required: true }}
                  control={form.control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      value={new Date(birthDayState.value ?? "1990-01-01")}
                      onChange={(val) => {
                        birthDayState.onChangeText(formatDateShort(val));
                        onChange(val);
                      }}
                      minimumDate={
                        new Date(Date.now() - 365 * 24 * 60 * 60 * 1000 * 100)
                      }
                      maximumDate={
                        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                      }
                    />
                  )}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="justify-end bottom-16">
          {/* Login Button */}
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full"
            onPress={() => sheetRef.current?.present()}
          >
            <Text className="text-white text-base font-medium">
              {t(i18n)`Save changes`}
            </Text>
          </Button>
        </View>
      </ScrollView>
      <BottomSheet ref={sheetRef} index={0} enableDynamicSizing>
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <View className="p-4">
            <View className="mb-5 px-4 pb-4">
              <Image
                source={require("@/assets/images/success.png")}
                className="w-[64px] h-[64px] self-center mb-4"
              />
              <Text className="!text-xl !text-white mb-2 font-semiBold text-center">
                {`Profile Update Successful`}
              </Text>
              <Text className="!text-lg !text-foreground mb-2 text-center">
                {`Your profile information has been updated successfully. If you didn’t make this change, please contact support immediately.`}
              </Text>
            </View>
            <Button
              variant="default"
              className="rounded-full mx-4"
              disabled={!passwordState.value}
              onPress={() => {
                onUpdateProfile();
                sheetRef?.current?.close();
                router.dismiss();
              }}
            >
              <Text className="text-white text-base font-medium">
                {`Go back`}
              </Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </FormProvider>
  );
}
