import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import { MailIcon, SquareAsterisk, User } from "lucide-react-native";
import { ScrollView, TextInput, View } from "react-native";

export default function ForgotPasswordScreen() {
  const { i18n } = useLingui();
  const { onForgotPassword, emailState, registerSuccess } = useForgotPassword();

  if (!!registerSuccess) {
    return (
      <View className=" flex-1 bg-background justify-center mb-4 gap-8 p-8">
        <MailIcon className="absolute top-36 right-0  size-80 text-muted-foreground opacity-35" />
        <Text className="font-bold text-[20px] text-muted-foreground text-center mt-8 justify-center">
          Success! We've sent you an email. Please check your inbox and follow
          the instructions to proceed.
        </Text>
        <Button
          variant="default"
          size={"lg"}
          className="rounded-full mx-2"
          disabled={!emailState.value}
          onPress={() => {
            router.back();
          }}
        >
          <Text className="text-background text-base font-medium">
            {`Go back`}
          </Text>
        </Button>
      </View>
    );
  }

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="gap-4 p-8 justify-center flex-1"
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome */}
      <View className="z-10">
        <View className="gap-2">
          <Text className="font-bold text-[44px] text-muted-foreground">
            Forgot
          </Text>
          <Text className="font-bold text-[44px] text-primary">Password?</Text>
          <Text className="text-muted-foreground text-[19px]">
            Don’t worry! it happens. Please enter the address associated with
            your account.
          </Text>
        </View>
      </View>
      {/* Illustration */}
      <SquareAsterisk className="absolute top-16 right-0 size-80 text-muted-foreground opacity-30" />
      {/* Input Field */}
      <View className="flex-1">
        <View className="flex-1 flex-col gap-3">
          {/* Username Field */}
          <View className="mt-4">
            <Text className="text-sm font-medium text-foreground mb-1">
              Email Address{" "}
              <Text className="font-regular text-red-400 group-active:text-red-400">
                *
              </Text>
            </Text>
            <View className="border-2 border-border rounded-lg relative">
              <TextInput
                className="pl-10 pr-4 rounded-lg bg-background h-12 text-white"
                placeholder={`Enter your email address`}
                placeholderTextColor={"gray"}
                autoCapitalize="none"
                value={emailState.value}
                onChangeText={emailState.onChangeText}
              />
              <View className="absolute top-3.5 left-3">
                <User className="size-5 text-muted-foreground" />
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Private policy and term of use */}
      <View className="px-4 justify-end">
        <View className="justify-end">
          {/* Submit Button */}
          <Button
            variant="default"
            size={"lg"}
            className="rounded-full mb-10"
            disabled={!emailState.value}
            // onPress={handleSendEmailToResetPassword}
            onPress={onForgotPassword}
          >
            <Text className="text-background text-base font-medium">
              {`Submit`}
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
