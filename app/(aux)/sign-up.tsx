import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Link, router } from "expo-router";
import {
  BadgeCheckIcon,
  MailIcon,
  NewspaperIcon,
  SquareAsterisk,
  User
} from "lucide-react-native";
import { useCallback, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Linking,
  ScrollView,
  TextInput,
  View
} from "react-native";

export default function SignUpScreen() {
  const [emailAddress, setEmailAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { i18n } = useLingui();
  const usernameRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(() => {
    setIsSubmitted(true);
    if (emailAddress === "admin@gmail.com") {
      //   router.push("/(app)/(tabs)");
    } else {
      Alert.alert(
        "Register Failed",
        "Invalid information. Please check and try again.",
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
  }, [emailAddress]);

  if (isSubmitted) {
    return (
      <View className=" flex-1  justify-center mb-4 gap-8 p-8">
        <BadgeCheckIcon className="absolute top-36 right-0  size-80 text-muted-foreground opacity-35" />
        <Text className="font-bold text-[20px] text-muted-foreground text-center mt-8 justify-center">
          Sign up successful! Please check your email to verify your account and
          complete the registration process. Welcome aboard!
        </Text>
        <Button
          variant="default"
          size={"lg"}
          disabled={!emailAddress}
          onPress={() => {
            router.dismiss();
          }}
        >
          <Text className="text-black text-base font-medium">{t(
            i18n
          )`Login`}</Text>
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
            <Text className="font-bold text-[44px] text-white">Create</Text>
            <Text className="font-bold text-[44px] text-primary">
              your account
            </Text>
            <Text className="text-muted-foreground text-[19px]">
              Register to get started with us and explore about our app.
            </Text>
          </View>
        </Trans>
      </View>
      {/* Illustration */}
      <NewspaperIcon className="absolute top-16 right-0 size-80 text-muted-foreground opacity-30" />
      {/* Input Field */}
      <View className="flex-1">
        <View className="flex-1 flex-col gap-3">
          {/* Username Field */}
          <View className="flex flex-row justify-between gap-2">
            <View className="my-1 mt-4 flex-1">
              <Text className="text-sm font-medium text-foreground mb-1">
                First Name{" "}
                <Text className="font-regular text-red-400 group-active:text-red-400">
                  *
                </Text>
              </Text>
              <View className="border-2 border-border rounded-lg relative">
                <TextInput
                  className="pl-5 pr-5 rounded-lg bg-background h-12 text-white"
                  placeholder={t(i18n)`ex: Tony Phan`}
                  placeholderTextColor={"gray"}
                  // error="invalid emailAddress"
                  autoCapitalize="none"
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                  }}
                />
              </View>
            </View>

            <View className="my-1 mt-4 flex-1">
              <Text className="text-sm font-medium text-foreground mb-1">
                Last Name{" "}
                <Text className="font-regular text-red-400 group-active:text-red-400">
                  *
                </Text>
              </Text>
              <View className="border-2 border-border rounded-lg relative">
                <TextInput
                  className="pl-5 pr-5 rounded-lg bg-background h-12 text-white"
                  placeholder={t(i18n)`ex: Tony Phan`}
                  placeholderTextColor={"gray"}
                  // error="invalid emailAddress"
                  autoCapitalize="none"
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                  }}
                />
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
            <View className="border-2 border-border rounded-lg relative">
              <TextInput
                className="pl-5 pr-5 rounded-lg bg-background h-12 text-white"
                placeholder={t(i18n)`ex: tonyphan@example.com`}
                placeholderTextColor={"gray"}
                value={emailAddress}
                onChangeText={(text) => {
                  setEmailAddress(text);
                }}
              />
            </View>
          </View>
          <View className="my-1">
            <Text className="text-sm font-medium text-foreground mb-1">
              Password{" "}
              <Text className="font-regular text-red-400 group-active:text-red-400">
                *
              </Text>
            </Text>
            <View className="border-2 border-border rounded-lg relative">
              <TextInput
                className="pl-5 pr-5 rounded-lg bg-background h-12 text-white"
                placeholder={t(i18n)`Enter your password`}
                placeholderTextColor={"gray"}
                // secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                }}
              />
            </View>
          </View>
          <View className="my-1">
            <Text className="text-sm font-medium text-foreground mb-1">
              Confirm password{" "}
              <Text className="font-regular text-red-400 group-active:text-red-400">
                *
              </Text>
            </Text>
            <View className="border-2 border-border rounded-lg relative">
              <TextInput
                className="pl-5 pr-5 rounded-lg bg-background h-12 text-white"
                placeholder={t(i18n)`Enter your confirm password`}
                placeholderTextColor={"gray"}
                // secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                }}
              />
            </View>
          </View>
        </View>
        <View className="">
          {/* Login Button */}
          <Button
            variant="default"
            size={"lg"}
            disabled={
              !emailAddress ||
              !password ||
              !confirmPassword ||
              !firstName ||
              !lastName
            }
            onPress={handleSignUp}
          >
            <Text className="text-black text-base font-medium">{t(
              i18n
            )`Sign Up`}</Text>
          </Button>
        </View>

        {/* Private policy and term of use */}
        {/* Private policy and term of use */}
        <View className="mt-6 justify-end">
          <View className="justify-end">
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
      </View>
    </ScrollView>
  );
}
