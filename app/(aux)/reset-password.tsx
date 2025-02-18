import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useResetPassword } from "@/hooks/auth/useResetPassword";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { router } from "expo-router";
import {
  EyeIcon,
  EyeOffIcon,
  KeyIcon,
  KeyRoundIcon,
  MailIcon
} from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function ResetPasswordScreen() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);

  const { i18n } = useLingui();
  const { onResetPassword, passwordState } = useResetPassword();

  const onPressSecurePassword = () => {
    setSecurePassword((prev) => !prev);
  };
  const handleToResetPassword = useCallback(() => {
    if (passwordState.value === "a") {
      setIsSubmitted(true);
    } else {
      Alert.alert(
        "Invalid Password",
        "Invalid new password. Please check and try again.",
        [
          {
            text: "OK",
            onPress: () => {
              Keyboard.dismiss();
            }
          }
        ]
      );
    }
  }, [passwordState.value]);

  if (isSubmitted) {
    return (
      <View className=" flex-1  justify-center mb-4 gap-8 p-8">
        <MailIcon className="absolute top-36 right-0  size-80 text-muted-foreground opacity-35" />
        <Text className="font-bold text-[20px] text-muted-foreground text-center mt-8 justify-center">
          Your password has been successfully reset. Use your new password to
          log in. Contact support if this wasn’t you.
        </Text>
        <Button
          variant="default"
          size={"lg"}
          disabled={!passwordState.value}
          onPress={() => {
            router.back();
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
    <ScrollView
      className="bg-background"
      contentContainerClassName="gap-4 p-8 justify-center flex-1"
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome */}
      <View className="z-10">
        <Trans>
          <View className="gap-2">
            <Text className="font-bold text-[36px] text-white">Reset</Text>
            <Text className="font-bold text-[36px] text-primary">Password</Text>
            <Text className="text-muted-foreground text-[16px]">
              Don’t worry! it happens. Please enter the new password associated
              with your account.
            </Text>
          </View>
        </Trans>
      </View>
      {/* Illustration */}
      <KeyRoundIcon className="absolute top-16 right-0 size-80 text-muted-foreground opacity-30" />
      {/* Input Field */}
      <View className="flex-1">
        <View className="flex-1 flex-col gap-3">
          {/* Username Field */}
          <View className="mt-4">
            <Text className="text-sm font-medium text-foreground mb-2">
              New password{" "}
              <Text className="font-regular text-red-400 group-active:text-red-400">
                *
              </Text>
            </Text>
            <View className="border-2 border-border rounded-lg relative">
              <TextInput
                className="pl-10 pr-4 rounded-lg bg-background h-12 text-white"
                placeholder={t(i18n)`Enter your new password`}
                placeholderTextColor={"gray"}
                autoCapitalize="none"
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
            disabled={!passwordState.value}
            onPress={handleToResetPassword}
            // onPress={onForgotPassword}
          >
            <Text className="text-black text-base font-medium">{t(
              i18n
            )`Submit`}</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
