import { AuthEmail } from "@/components/auth/auth-email";
import {
  AppleAuthButton,
  GoogleAuthButton
} from "@/components/auth/auth-social";
import { AuthIllustration } from "@/components/svg-assets/auth-illustration";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Link } from "expo-router";
import { MailIcon } from "lucide-react-native";
import { usePostHog } from "posthog-react-native";
import { useCallback, useState } from "react";
import { Linking, ScrollView, View } from "react-native";

type Strategy = "email_code" | "oauth_google" | "oauth_apple";

export default function LoginScreen() {
  const [withEmail, setWithEmail] = useState(false);
  const { i18n } = useLingui();
  const posthog = usePostHog();

  const handleSignedUp = useCallback(
    (
      strategy: Strategy,
      userData: {
        id?: string;
        email?: string;
        name?: string;
      }
    ) => {
      posthog.identify(userData.id);
      posthog.capture("user_signed_up", { strategy });
    },
    [posthog]
  );

  const handleSignedIn = useCallback(
    (
      strategy: Strategy,
      userData: {
        id?: string;
        email?: string;
        name?: string;
      }
    ) => {
      posthog.identify(userData.id);
      posthog.capture("user_signed_in", { strategy });
    },
    [posthog]
  );

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="gap-4 p-8"
      automaticallyAdjustKeyboardInsets
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Trans>
        <View className="gap-4">
          <Text className="font-semiBold text-3xl text-primary">
            Welcome to OtherSide
          </Text>
          <Text className="text-muted-foreground">
            Stay informed with the latest news, updates, and insights tailored
            just for you.
          </Text>
        </View>
      </Trans>
      <AuthIllustration className="my-16 h-[326px] items-center text-primary" />
      <View className="flex flex-col gap-3">
        <AppleAuthButton
          onSignedUp={handleSignedUp}
          onSignedIn={handleSignedIn}
        />
        <GoogleAuthButton
          onSignedUp={handleSignedUp}
          onSignedIn={handleSignedIn}
        />
        <Button variant="outline" onPress={() => setWithEmail(true)}>
          <MailIcon className="h-5 w-5 text-primary" />
          <Text>{t(i18n)`Continue with Email`}</Text>
        </Button>
        <Separator className="mx-auto my-3 w-[70%]" />
        {withEmail && (
          <AuthEmail onSignedUp={handleSignedUp} onSignedIn={handleSignedIn} />
        )}
      </View>
      <View className="px-4">
        <Trans>
          <Text className="mx-auto text-center text-muted-foreground text-xs">
            By continuing, you acknowledge that you understand and agree to our{" "}
            <Link href="/">
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
    </ScrollView>
  );
}
