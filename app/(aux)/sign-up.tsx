import { BottomSheet } from "@/components/common/bottom-sheet";
import { DatePicker } from "@/components/common/date-picker";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/ui/loading";
import { Radio } from "@/components/ui/radio";
import { Text } from "@/components/ui/text";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { formatDateTimeShort } from "@/lib/date";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Link, router } from "expo-router";
import { debounce } from "lodash";
import {
  BadgeCheckIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  MailIcon,
  UserRoundPlusIcon
} from "lucide-react-native";
import { useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  Linking,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const {
    onSignUp,
    passwordState,
    confirmPasswordState,
    firstNameState,
    lastNameState,
    genderState,
    birthDayState,
    emailAddressState,
    registerSuccess,
    loading
  } = useSignUp();

  const sheetRef = useRef<BottomSheetModal>(null);
  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };
  const onPressSecureConfirmPassword = () => {
    setSecureConfirmPassword((prev) => !prev);
  };
  const { top, bottom } = useSafeAreaInsets();
  const form = useForm({
    defaultValues: {
      date: new Date()
    }
  });

  if (registerSuccess) {
    return (
      <View
        className="flex-1 bg-background justify-between gap-8 p-8"
        style={{ paddingBottom: bottom }}
      >
        <BadgeCheckIcon className="absolute top-12 right-0 size-80 text-muted-foreground opacity-35" />
        {/* Welcome */}
        <View className="z-10">
          <View className="gap-1">
            <Text className="font-bold text-[36px] text-muted-foreground">
              Sign Up
            </Text>
            <Text className="font-bold text-[36px] text-primary">
              successful
            </Text>
            <Text className="text-muted-foreground text-[16px]">
              Please check your email to verify your account and complete the
              registration process. Welcome aboard!{" "}
            </Text>
          </View>
        </View>
        <Button
          variant="default"
          size={"lg"}
          className="rounded-full mx-2 bottom-6"
          disabled={!emailAddressState.value}
          onPress={() => {
            router.back();
          }}
        >
          <Text className="text-background text-base font-medium">
            {`Login`}
          </Text>
        </Button>
      </View>
    );
  }

  return (
    <FormProvider {...form}>
      <LoadingScreen loading={loading} />

      <View className=" flex-1 bg-background gap-3">
        <ScrollView
          className="bg-background"
          contentContainerClassName="gap-4 px-6 justify-center"
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome */}
          <View className="z-10">
            <View className="">
              <Text className="font-bold text-[32px] text-muted-foreground">
                Create
              </Text>
              <Text className="font-bold text-[32px] text-primary">
                your account
              </Text>
              <Text className="text-muted-foreground text-[16px]">
                Register to get started with us and explore about our app.
              </Text>
            </View>
          </View>
          {/* Illustration */}
          <UserRoundPlusIcon className="absolute top-0 right-0 size-80 text-muted-foreground opacity-30" />
          {/* Input Field */}
          <View className="flex-1">
            <View className="flex-1 flex-col gap-2">
              {/* Username Field */}
              <View className="flex flex-row justify-between gap-2">
                <View className=" flex-1">
                  <Text className="text-sm font-medium text-foreground mb-1">
                    First Name{" "}
                    <Text className="font-regular text-red-400 group-active:text-red-400">
                      *
                    </Text>
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

                <View className=" flex-1">
                  <Text className="text-sm font-medium text-foreground mb-1">
                    Last Name{" "}
                    <Text className="font-regular text-red-400 group-active:text-red-400">
                      *
                    </Text>
                  </Text>
                  <View className="border border-border rounded-lg relative">
                    <TextInput
                      className="pl-4 pr-10 rounded-lg bg-background h-12 text-white"
                      placeholder={`ex: Phan`}
                      placeholderTextColor={"gray"}
                      autoCapitalize="none"
                      value={lastNameState.value}
                      onChangeText={lastNameState.onChangeText}
                    />
                  </View>
                </View>
              </View>

              <View className="">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Email Address{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
                </Text>
                <View className="border border-border rounded-lg relative">
                  <TextInput
                    className="pl-10 pr-10 rounded-lg bg-background h-12 text-white"
                    placeholder={`ex: tonyphan@example.com`}
                    placeholderTextColor={"gray"}
                    autoCapitalize="none"
                    value={emailAddressState.value}
                    onChangeText={emailAddressState.onChangeText}
                  />
                  <View className="absolute top-4 left-3">
                    <MailIcon className="size-5 text-muted-foreground" />
                  </View>
                </View>
              </View>

              <View className="flex flex-row justify-between gap-4 items-center ">
                <View className="flex-1 justify-center">
                  <Text className="text-sm font-medium text-foreground mb-1">
                    Gender{" "}
                  </Text>
                  <View className="flex flex-row items-center gap-2 h-12">
                    <View className="flex flex-row items-center gap-2 justify-center">
                      <Radio
                        selected={genderState.value === "male" ? true : false}
                        onPress={() => {
                          genderState.onChangeText("male");
                        }}
                      />
                      <Text className="text-sm font-medium text-foreground">
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
                      <Text className="text-sm font-medium text-foreground">
                        {"Female"}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-medium text-foreground mb-1">
                    Birthday{" "}
                  </Text>
                  <View className="rounded-lg">
                    <Controller
                      name="date"
                      rules={{ required: true }}
                      control={form.control}
                      defaultValue={new Date()}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          value={value}
                          onChange={(val) => {
                            birthDayState.onChangeText(
                              formatDateTimeShort(val)
                            );
                            onChange(val);
                          }}
                          minimumDate={
                            new Date(
                              Date.now() - 365 * 24 * 60 * 60 * 1000 * 100
                            )
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
              <View className="">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Password{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
                </Text>
                <View className="border border-border rounded-lg relative">
                  <TextInput
                    className="px-10 rounded-lg bg-background h-12 text-white"
                    placeholder={`Enter your password`}
                    placeholderTextColor={"gray"}
                    secureTextEntry={securePassword}
                    value={passwordState.value}
                    onChangeText={passwordState.onChangeText}
                  />
                  <View className="absolute top-4 left-3">
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
              </View>
              <View className="">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Confirm Password{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
                </Text>
                <View className="border border-border rounded-lg relative">
                  <TextInput
                    className="pl-10 pr-10 rounded-lg bg-background h-12 text-white"
                    placeholder={`Enter your confirm password`}
                    placeholderTextColor={"gray"}
                    secureTextEntry={secureConfirmPassword}
                    value={confirmPasswordState.value}
                    onChangeText={confirmPasswordState.onChangeText}
                  />
                  <View className="absolute top-4 left-3">
                    <KeyIcon className="size-5 text-muted-foreground" />
                  </View>
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
              </View>
            </View>
          </View>
          <View className="bg-background mt-4">
            {/* Login Button */}
            <Button
              variant="default"
              size={"lg"}
              className="rounded-full mx-2"
              disabled={
                !emailAddressState.value ||
                !passwordState.value ||
                !confirmPasswordState.value ||
                !firstNameState.value ||
                !lastNameState.value
              }
              onPress={debounce(() => {
                onSignUp(sheetRef);
                Keyboard.dismiss();
              }, 500)}
            >
              <Text className="text-background text-base font-medium">
                {`Sign Up`}
              </Text>
            </Button>
          </View>
        </ScrollView>
        {/* Private policy and term of use */}

        <View className="justify-end bg-background p-6">
          <Text className="mx-auto text-center text-muted-foreground text-xs">
            By signing up, you agree to the{" "}
            <Text
              className="text-primary text-xs"
              onPress={() =>
                Linking.openURL(
                  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                )
              }
            >
              Terms of Service
            </Text>{" "}
            and{" "}
            <Link href="/(aux)/privacy-policy">
              <Text className="text-primary text-xs">
                Data Processing Agreement
              </Text>
            </Link>
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
                Sign Up failed
              </Text>
              <Text className="!text-lg !text-foreground mb-2 text-center">
                {passwordState.error}
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
    </FormProvider>
  );
}
