import { LoginInButton } from "@/components/auth/auth-social";
import { CheckBox, UnCheckBox } from "@/components/common/icons";
import { AuthIllustration } from "@/components/svg-assets/auth-illustration";
import { Text } from "@/components/ui/text";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Link } from "expo-router";
import { KeyIcon, User } from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import {
  Linking,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

type Strategy = "email_code" | "oauth_google" | "oauth_apple";

export default function LoginScreen() {
  const [withEmail, setWithEmail] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const { i18n } = useLingui();
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleSignedUp = useCallback(() => {
    console.log("1", 1);
  }, []);

  const handleSignedIn = useCallback(() => {
    console.log("2", 2);
  }, []);

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
            <Text className="font-bold text-[44px] text-white">Welcome to</Text>
            <Text className="font-bold text-[44px] text-primary">
              OtherSide
            </Text>
            <Text className="text-muted-foreground text-[19px]">
              Keep up with the newest news, updates, and announcements from us
            </Text>
          </View>
        </Trans>
      </View>
      {/* Illustration */}
      <AuthIllustration className="h-[350px] opacity-35 absolute top-12 items-center text-primary" />
      {/* Input Field */}
      <View className="flex-1">
        <View className="flex-1 flex-col gap-3">
          {/* Username Field */}
          <View className="mt-36">
            <Text className="text-sm font-medium text-foreground mb-1">
              Username{" "}
              <Text className="font-regular text-red-400 group-active:text-red-400">
                *
              </Text>
            </Text>
            <View className="border border-border rounded-lg relative">
              <TextInput
                ref={usernameRef}
                className="pl-10 pr-4 rounded-lg bg-background h-12 text-white"
                placeholder={t(i18n)`Enter your username`}
                placeholderTextColor={"gray"}
                onChangeText={() => {}}
              />
              <View className="absolute top-3.5 left-3">
                <User className="size-5 text-muted-foreground" />
              </View>
            </View>
          </View>

          {/* Password Field */}
          <View className="">
            <Text className="text-sm font-medium text-foreground mb-1">
              Password{" "}
              <Text className="font-regular text-red-400 group-active:text-red-400">
                *
              </Text>
            </Text>
            <View className=" border border-border rounded-lg relative">
              <TextInput
                ref={passwordRef}
                className="pl-10 pr-4 rounded-lg bg-background h-12 text-white"
                placeholder={t(i18n)`Enter your password`}
                placeholderTextColor={"gray"}
                secureTextEntry
                onChangeText={() => {}}
              />
              <View className="absolute top-3.5 left-3">
                <KeyIcon className="size-5 text-muted-foreground" />
              </View>
            </View>
          </View>
          {/* Remember and Forget password */}
          <View className=" flex flex-row justify-between mb-4">
            <View className="flex-row items-center gap-x-1">
              <TouchableOpacity onPress={() => setIsRemember((prev) => !prev)}>
                {isRemember ? <CheckBox /> : <UnCheckBox />}
              </TouchableOpacity>
              <Text className="text-sm text-foreground">{t(
                i18n
              )`Remember me`}</Text>
            </View>
            <Link href="/(aux)/privacy-policy">
              <Text className="text-primary text-sm">Forgot password?</Text>
            </Link>
          </View>
          {/* Login Button */}
          <LoginInButton onSignedIn={handleSignedIn} />
          {/* Don’t have an account yet? Sign up */}
          <View className="px-4 mt-4 flex-1">
            <Trans>
              <Text className="mx-auto text-center text-muted-foreground text-sm">
                Don’t have an account yet?{" "}
                <Link href="/(aux)/privacy-policy">
                  <Text className="text-primary text-sm font-semiBold">
                    Sign up
                  </Text>
                </Link>{" "}
                now and start your journey with us!{" "}
              </Text>
            </Trans>
          </View>
        </View>
      </View>
      {/* Private policy and term of use */}
      <View className="px-4 justify-end">
        <View className="justify-end">
          <Trans>
            <Text className="mx-auto text-center text-muted-foreground text-xs">
              By continuing, you acknowledge that you understand and agree to
              our{" "}
              <Link href="/(aux)/privacy-policy">
                <Text className="text-primary text-xs">Privacy Policy</Text>
              </Link>{" "}
              and{" "}
              <Text
                className="text-primary text-xs"
                onPress={() =>
                  Linking.openURL(
                    "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                  )
                }
              >
                Terms of Use
              </Text>
            </Text>
          </Trans>
        </View>
      </View>
    </ScrollView>
  );
}
