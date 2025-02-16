import { createUser } from "@/mutations/user";
// import { useOAuth } from '@clerk/clerk-expo'
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import type { SvgProps } from "react-native-svg";
import { toast } from "../common/toast";
import { AppleLogo } from "../svg-assets/apple-logo";
import { GoogleLogo } from "../svg-assets/google-logo";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { useNavigation } from "expo-router";
import { useUserAuthenticateStore } from "@/stores/user-authenticate/store";

type Strategy = "oauth_google" | "oauth_apple";

type AuthSocialProps = {
  label: string;
  icon?: React.ComponentType<SvgProps>;
  strategy: Strategy;
  onSignedUp?: (
    strategy: Strategy,
    userData: {
      id?: string;
      email?: string;
      name?: string;
    }
  ) => void;
  onSignedIn: (
    strategy: Strategy,
    userData: {
      id?: string;
      email?: string;
      name?: string;
    }
  ) => void;
};

export function AuthButton({
  label,
  icon: Icon,
  strategy,
  onSignedIn,
  onSignedUp
}: AuthSocialProps) {
  const { setIsLoggedIn } = useUserAuthenticateStore();
  const onPress = async () => {
    try {
      setIsLoggedIn(true);
    } catch (err: any) {
      toast.error(
        err?.errors?.[0]?.longMessage ?? err.message ?? "Unknown error"
      );
    }
  };

  return (
    <Button variant="default" onPress={onPress}>
      <Text className="text-black text-base font-medium">{label}</Text>
    </Button>
  );
}

export function SignUpButton({
  onSignedUp,
  onSignedIn
}: {
  onSignedUp: (
    strategy: Strategy,
    userData: {
      id?: string;
      email?: string;
      name?: string;
    }
  ) => void;
  onSignedIn: (
    strategy: Strategy,
    userData: {
      id?: string;
      email?: string;
      name?: string;
    }
  ) => void;
}) {
  const { i18n } = useLingui();
  return (
    <AuthButton
      label={t(i18n)`Sign in with Google`}
      icon={GoogleLogo}
      strategy="oauth_google"
      onSignedIn={onSignedIn}
      onSignedUp={onSignedUp}
    />
  );
}

export function LoginInButton({
  onSignedIn
}: {
  onSignedIn: (
    strategy: Strategy,
    userData: {
      id?: string;
      email?: string;
      name?: string;
    }
  ) => void;
}) {
  const { i18n } = useLingui();
  return (
    <AuthButton
      label={t(i18n)`Login`}
      strategy="oauth_apple"
      onSignedIn={onSignedIn}
    />
  );
}
