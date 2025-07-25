import { BottomSheet } from "@/components/common/bottom-sheet";
import { DatePicker } from "@/components/common/date-picker";
import { Button } from "@/components/ui/button";
import { LoadingScreen } from "@/components/ui/loading";
import { Radio } from "@/components/ui/radio";
import { Text } from "@/components/ui/text";
import Tooltip from "@/components/ui/tooltip";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { formatDateTimeShort } from "@/lib/date";
import { useLocale } from "@/locales/provider";
import { useUserAGuidingStore } from "@/stores/user-guiding/store";
import { eventBus } from "@/utils/event";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Link, router } from "expo-router";
import { debounce } from "lodash";
import LottieView from "lottie-react-native";
import {
  BadgeCheckIcon,
  ChevronDownIcon,
  CircleAlertIcon,
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  MailIcon,
  UserIcon,
  UserRoundPlusIcon
} from "lucide-react-native";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Keyboard,
  Linking,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignUpScreen() {
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const { isFirstTimeSignUp, setIsFirstTimeSignUp } = useUserAGuidingStore();
  const { language } = useLocale();
  const [selectedLanguage, setSelectedLanguage] = useState(false);

  const {
    onSignUp,
    passwordState,
    confirmPasswordState,
    firstNameState,
    genderState,
    emailAddressState,
    registerSuccess,
    loading,
    birthDayState
  } = useSignUp();

  const form = useForm({
    defaultValues: {
      date: new Date()
    }
  });

  const sheetRef = useRef<BottomSheetModal>(null);
  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };

  const onPressSecureConfirmPassword = () => {
    setSecureConfirmPassword((prev) => !prev);
  };

  const onSelectLanguage = () => {
    eventBus.once("select-language", (selected) => {
      setSelectedLanguage(selected);
    });

    router.push("/select-language");
  };

  const { bottom } = useSafeAreaInsets();

  if (registerSuccess) {
    return (
      <View
        className="flex-1 bg-background justify-between gap-6 p-6"
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
    <View className="flex-1">
      <LoadingScreen loading={loading} />

      <View className=" flex-1 bg-background gap-3">
        <ScrollView
          className="bg-background"
          contentContainerClassName="gap-4 px-5 justify-center"
          automaticallyAdjustKeyboardInsets
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome */}
          <View className="z-10">
            <View className="">
              <Text className="font-bold text-[44px] text-muted-foreground">
                Create
              </Text>
              <Text className="font-bold text-[44px] text-primary">
                your account
              </Text>
              <Text className="text-muted-foreground text-[19px]">
                Register to get started with us and explore about our app.
              </Text>
            </View>
          </View>
          {/* Illustration */}
          <UserRoundPlusIcon className="absolute top-0 right-0 size-80 text-muted-foreground opacity-30" />
          {/* Input Field */}
          <View className="flex-1">
            <View className="flex flex-row justify-between gap-4 items-center">
              {/* Username Field */}
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Name{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
                </Text>
                <View className="border border-border rounded-lg relative">
                  <TextInput
                    className="pl-10 pr-4 rounded-lg bg-background h-12 text-white"
                    placeholder={`ex: Tony .D`}
                    placeholderTextColor={"gray"}
                    autoCapitalize="none"
                    value={firstNameState.value}
                    onChangeText={firstNameState.onChangeText}
                  />
                  <View className="absolute top-4 left-3">
                    <UserIcon className="size-5 text-muted-foreground" />
                  </View>
                </View>
              </View>
              <View className="flex-shrink justify-center">
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
            </View>
            <View className="flex flex-row justify-between gap-2 items-center mt-3">
              <View className="flex-1">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Email Address{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
                </Text>
                <View className="border border-border rounded-lg">
                  <TextInput
                    className="pl-10 pr-4 rounded-lg bg-background h-12 text-white"
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
              <View className="flex-shrink justify-center">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Birth Year
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
                          birthDayState.onChangeText(formatDateTimeShort(val));
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

              <View className="flex-shrink justify-center">
                <Text className="text-sm font-medium text-foreground mb-1.5">
                  Language
                </Text>
                <TouchableOpacity
                  onPress={onSelectLanguage}
                  className="rounded-lg border border-border bg-background h-[42px] items-center justify-center px-4"
                >
                  {selectedLanguage ? (
                    <Text>{language}</Text>
                  ) : (
                    <ChevronDownIcon className="size-5 text-muted-foreground" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-1 flex-col gap-3 mt-3">
              <View className="">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Password{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
                </Text>
                {isFirstTimeSignUp && (
                  <View className="items-start absolute">
                    <Tooltip
                      isVisible={isFirstTimeSignUp}
                      onClose={() => {
                        setIsFirstTimeSignUp(false);
                      }}
                      content={`For added security, you should also:
 ● Use a mix of uppercase and lowercase letters
 ● Avoid common words or easily guessable information (like your name or birthdate)
 ● Change your password regularly`}
                    >
                      <LottieView
                        style={styles.lottieStyle}
                        source={require("@/assets/json/password-validate.json")}
                        autoPlay
                        loop
                      />
                    </Tooltip>
                  </View>
                )}
                <View className="border flex-1 border-border rounded-lg relative">
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
                {!!confirmPasswordState.error && (
                  <View className=" flex flex-row items-center gap-x-2 mt-1">
                    <CircleAlertIcon className="size-4 text-red-400" />
                    <Text className="text-red-400 text-sm font-medium">
                      {confirmPasswordState.error?.charAt(0).toUpperCase() +
                        confirmPasswordState.error?.slice(1)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View className="bg-background mt-8">
            {/* Login Button */}
            <Button
              variant="default"
              size={"lg"}
              className="rounded-full"
              disabled={
                !emailAddressState.value ||
                !passwordState.value ||
                !confirmPasswordState.value ||
                !firstNameState.value ||
                !!passwordState.error ||
                !!confirmPasswordState.error
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
                {confirmPasswordState.error}
              </Text>
            </View>
            <Button
              variant="default"
              className="rounded-full mx-4 mb-8"
              onPress={() => {
                sheetRef?.current?.close();
                confirmPasswordState.setState({ error: "", valid: true });
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

const styles = StyleSheet.create({
  lottieStyle: {
    width: 120,
    height: 120,
    backgroundColor: "#1A1825",
    alignSelf: "center",
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  }
});
