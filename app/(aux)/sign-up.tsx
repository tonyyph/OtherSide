import { DatePicker } from "@/components/common/date-picker";
import { Button } from "@/components/ui/button";
import { Radio } from "@/components/ui/radio";
import { Text } from "@/components/ui/text";
import { useSignUp } from "@/hooks/auth/useSignUp";
import { formatDateShort } from "@/lib/date";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Link, router } from "expo-router";
import {
  BadgeCheckIcon,
  CaseLowerIcon,
  CaseSensitiveIcon,
  KeyIcon,
  MailIcon,
  NewspaperIcon,
  UserRoundPlusIcon
} from "lucide-react-native";
import { useCallback, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Linking, ScrollView, TextInput, View } from "react-native";

export default function SignUpScreen() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    onSignUp,
    passwordState,
    confirmPasswordState,
    firstNameState,
    lastNameState,
    genderState,
    birthDayState,
    emailAddressState
  } = useSignUp();

  const handleSignUp = useCallback(() => {
    setIsSubmitted(true);
  }, []);
  //TODO: remove this when all done.

  const { i18n } = useLingui();
  const form = useForm({
    defaultValues: {
      date: new Date()
    }
  });

  if (isSubmitted) {
    return (
      <View className=" flex-1 justify-center mb-4 gap-8 p-8">
        <BadgeCheckIcon className="absolute top-36 right-0  size-80 text-muted-foreground opacity-35" />
        <Text className="font-bold text-[20px] text-muted-foreground text-center mt-8 justify-center">
          Sign Up successful! Please check your email to verify your account and
          complete the registration process. Welcome aboard!
        </Text>
        <Button
          variant="default"
          size={"lg"}
          disabled={!emailAddressState.value}
          onPress={() => {
            router.dismiss();
          }}
        >
          <Text className="text-black text-base font-medium">
            {t(i18n)`Login`}
          </Text>
        </Button>
      </View>
    );
  }

  return (
    <FormProvider {...form}>
      <ScrollView
        className="bg-background"
        contentContainerClassName="gap-4 p-8 justify-center"
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome */}
        <View className="z-10">
          <Trans>
            <View className="gap-1">
              <Text className="font-bold text-[36px] text-white">Create</Text>
              <Text className="font-bold text-[36px] text-primary">
                your account
              </Text>
              <Text className="text-muted-foreground text-[16px]">
                Register to get started with us and explore about our app.
              </Text>
            </View>
          </Trans>
        </View>
        {/* Illustration */}
        <UserRoundPlusIcon className="absolute top-0 right-0 size-80 text-muted-foreground opacity-30" />
        {/* Input Field */}
        <View className="flex-1">
          <View className="flex-1 flex-col gap-3">
            {/* Username Field */}
            <View className="flex flex-row justify-between gap-2">
              <View className="my-1 flex-1">
                <Text className="text-sm font-medium text-foreground mb-1">
                  First Name{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
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
                  Last Name{" "}
                  <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text>
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
                Email Address{" "}
                <Text className="font-regular text-red-400 group-active:text-red-400">
                  *
                </Text>
              </Text>
              <View className="border border-border rounded-lg relative">
                <TextInput
                  className="pl-10 pr-10 rounded-lg bg-background h-12 text-white"
                  placeholder={t(i18n)`ex: tonyphan@example.com`}
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

            <View className="flex flex-row justify-between gap-4 items-center my-1">
              <View className="flex-1 justify-center">
                <Text className="text-sm font-medium text-foreground mb-1">
                  Gender{" "}
                  {/* <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text> */}
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
                  {/* <Text className="font-regular text-red-400 group-active:text-red-400">
                    *
                  </Text> */}
                  {/* TODO: remove this */}
                </Text>
                <View className="rounded-lg">
                  <Controller
                    name="date"
                    rules={{ required: true }}
                    control={form.control}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        value={value}
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
            <View className="my-1">
              <Text className="text-sm font-medium text-foreground mb-1">
                Password{" "}
                <Text className="font-regular text-red-400 group-active:text-red-400">
                  *
                </Text>
              </Text>
              <View className="border border-border rounded-lg relative">
                <TextInput
                  className="pl-10 pr-10 rounded-lg bg-background h-12 text-white"
                  placeholder={t(i18n)`Enter your password`}
                  placeholderTextColor={"gray"}
                  secureTextEntry
                  value={passwordState.value}
                  onChangeText={passwordState.onChangeText}
                />
                <View className="absolute top-4 left-3">
                  <KeyIcon className="size-5 text-muted-foreground" />
                </View>
              </View>
            </View>
            <View className="my-1">
              <Text className="text-sm font-medium text-foreground mb-1">
                Confirm password{" "}
                <Text className="font-regular text-red-400 group-active:text-red-400">
                  *
                </Text>
              </Text>
              <View className="border border-border rounded-lg relative">
                <TextInput
                  className="pl-10 pr-10 rounded-lg bg-background h-12 text-white"
                  placeholder={t(i18n)`Enter your confirm password`}
                  placeholderTextColor={"gray"}
                  secureTextEntry
                  value={confirmPasswordState.value}
                  onChangeText={confirmPasswordState.onChangeText}
                />
                <View className="absolute top-4 left-3">
                  <KeyIcon className="size-5 text-muted-foreground" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Private policy and term of use */}
        <View className="justify-end mt-4">
          <View className="flex-1 justify-end">
            {/* Login Button */}
            <Button
              variant="default"
              size={"lg"}
              disabled={
                !emailAddressState.value ||
                !passwordState.value ||
                !confirmPasswordState.value ||
                !firstNameState.value ||
                !lastNameState.value
                // !genderState.value || //TODO: remove this
                // !birthDayState.value
              }
              // onPress={handleSignUp}
              onPress={onSignUp}
            >
              <Text className="text-black text-base font-medium">
                {t(i18n)`Sign Up`}
              </Text>
            </Button>
          </View>
          <View className="justify-end mt-6">
            <Trans>
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
            </Trans>
          </View>
        </View>
      </ScrollView>
    </FormProvider>
  );
}
