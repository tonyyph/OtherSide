import { BottomSheet } from "@/components/common/bottom-sheet";
import { DatePicker } from "@/components/common/date-picker";
import { Button } from "@/components/ui/button";
import { Radio } from "@/components/ui/radio";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";
import { formatDateShort } from "@/lib/date";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import {
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  MailIcon,
  UserRoundPenIcon
} from "lucide-react-native";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EditProfileScreen() {
  const {
    firstNameState,
    genderState,
    loading,
    emailAddressState,
    onUpdateProfile,
    handleDeleteAccount,
    birthDayState,
    passwordState
  } = useUpdateProfile();
  const [securePassword, setSecurePassword] = useState(true);

  const form = useForm({
    defaultValues: {
      date: new Date()
    }
  });
  const sheetRef = useRef<BottomSheetModal>(null);
  const sheetDeleteRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };

  console.log("birthDayState", birthDayState.value);
  console.log("1", new Date(birthDayState.value ?? "1990-01-01"));

  if (loading) {
    return (
      <View className="bg-background flex-1 p-6 gap-4 justify-between">
        <View className="flex-1">
          <UserRoundPenIcon className="absolute top-0 right-0 size-80 text-muted-foreground opacity-30" />
          {/* <View className="bg-background self-center mb-10 border border-blue-200 rounded-full">
            <Skeleton className="m-[2px] h-28 w-28 rounded-full self-center" />
          </View> */}
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
    <View className="flex-1">
      <ScrollView
        className="bg-background"
        contentContainerClassName="gap-4 p-8 justify-center flex-1"
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Illustration */}
        <UserRoundPenIcon className="absolute top-0 right-0 size-80 text-muted-foreground opacity-30" />
        {/* Input Field */}
        <View className="flex-1">
          <View className="flex-1 flex-col gap-3">
            {/* Username Field */}
            <View className="flex flex-row justify-between gap-2">
              <View className="my-1 flex-1">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Name
                </Text>
                <View className="border border-border rounded-lg relative">
                  <TextInput
                    className="pl-4 pr-10 rounded-lg bg-background h-12 text-white"
                    placeholder={`ex: Tony .D`}
                    placeholderTextColor={"gray"}
                    autoCapitalize="none"
                    value={firstNameState.value}
                    onChangeText={firstNameState.onChangeText}
                  />
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
            <View className="flex-row gap-2 my-2">
              <View className="justify-center flex-1">
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
                        value={
                          !!birthDayState.value
                            ? new Date(birthDayState.value)
                            : value
                        }
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
            <Separator className="mb-4" />
            <View className="gap-3">
              <Text className="font-medium text-base text-foreground">
                {`Danger zone`}
              </Text>
              <Button
                onPress={() => {
                  sheetDeleteRef.current?.present();
                }}
                variant="destructive-outline"
                size="sm"
                className="self-start"
              >
                <Text>{`Delete your account`}</Text>
              </Button>
              <Text className="mb-4 text-muted-foreground text-sm">
                {`All your data will be deleted`}
              </Text>
            </View>
          </View>
        </View>

        <View className="justify-end mb-4">
          {/* Login Button */}
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full"
            onPress={() => sheetRef.current?.present()}
          >
            <Text className="text-background text-base font-medium">
              {`Save changes`}
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
              onPress={() => {
                onUpdateProfile();
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
      <BottomSheet ref={sheetDeleteRef} index={0} enableDynamicSizing>
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <View className="p-4">
            <View className="mb-5 px-4 pb-4">
              <Image
                source={require("@/assets/images/warning.png")}
                className="w-[64px] h-[64px] self-center mb-4"
              />
              <Text className="!text-xl !text-white mb-2 font-semiBold text-center">
                {`Delete Account?`}
              </Text>
              <Text className="!text-lg !text-foreground mb-2 text-center">
                {`To confirm, please enter your password. This action will permanently delete your account and cannot be undone.`}
              </Text>
              <View className="mt-4">
                <View className="border-2 border-border rounded-full relative">
                  <TextInput
                    className="px-10 rounded-full bg-background h-12 text-white"
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
                    className="absolute top-3.5 right-4"
                  >
                    {securePassword ? (
                      <EyeOffIcon className="size-5 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="size-5 text-muted-foreground" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Button
              variant="default"
              className="rounded-full mx-4"
              disabled={passwordState.value.length < 6}
              onPress={() => {
                handleDeleteAccount();
                sheetRef?.current?.close();
              }}
            >
              <Text className="text-background text-base font-medium">
                {`Confirm & Delete`}
              </Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
