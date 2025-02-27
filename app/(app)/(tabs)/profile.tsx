import * as Application from "expo-application";
import * as Haptics from "expo-haptics";

import { FooterGradient } from "@/components/common/footer-gradient";
import { MenuItem } from "@/components/common/menu-item";
import { toast } from "@/components/common/toast";
import { ProfileCard } from "@/components/profile/profile-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useLocale } from "@/locales/provider";
import { useUserSettingsStore } from "@/stores/user-settings/store";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import {
  BellIcon,
  BookTypeIcon,
  ChevronRightIcon,
  EarthIcon,
  InboxIcon,
  LogOutIcon,
  MessageSquareQuoteIcon,
  ScrollTextIcon,
  ShapesIcon,
  Share2Icon,
  SwatchBookIcon
} from "lucide-react-native";
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  Share,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUserAuthenticateStore } from "@/stores";
import { useProfile } from "@/hooks/profile/useProfile";

export default function ProfileScreen() {
  const { i18n } = useLingui();
  const { bottom } = useSafeAreaInsets();
  const { language } = useLocale();
  const { setIsLoggedIn } = useUserAuthenticateStore();

  const { setEnabledPushNotifications, enabledPushNotifications } =
    useUserSettingsStore();

  async function handleCopyVersion() {
    toast.success(t(i18n)`Copied version to clipboard`);
  }

  async function handleShare() {
    try {
      await Share.share({
        message: t(
          i18n
        )`OtherSide is a news aggregation app designed to provide users with diverse perspectives on current events, helping them see beyond their usual sources. By curating stories from various media outlets, OtherSide ensures balanced, unbiased news coverage. Whether you're interested in global affairs, technology, finance, or culture, the app delivers real-time updates and multiple viewpoints on each topic. Stay informed with OtherSide, where news meets perspective. Feel free to give it a try and let me know what you think. https://otherside.com`
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="py-4 gap-4"
        contentContainerStyle={{ paddingBottom: bottom + 80 }}
        className="bg-background"
      >
        <ProfileCard />
        <View className="mt-4 gap-2">
          <Text className="mx-6 text-muted-foreground">{t(i18n)`General`}</Text>
          <View>
            <Link href="/category" asChild>
              <MenuItem
                label={t(i18n)`Categories`}
                icon={ShapesIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
          </View>
        </View>
        <View className="gap-2 mt-4">
          <Text className="mx-6 text-muted-foreground">
            {t(i18n)`App settings`}
          </Text>
          <View>
            <Link href="/appearance" asChild>
              <MenuItem
                label={t(i18n)`Appearance`}
                icon={SwatchBookIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
            <Link href="/language" asChild>
              <MenuItem
                label={t(i18n)`Language`}
                icon={EarthIcon}
                rightSection={
                  <View className="flex flex-row items-center gap-2">
                    <Text className="text-muted-foreground uppercase">
                      {t(i18n)`${language}`}
                    </Text>
                    <ChevronRightIcon className="h-5 w-5 text-foreground" />
                  </View>
                }
              />
            </Link>
            <MenuItem
              label={t(i18n)`Push notifications`}
              icon={BellIcon}
              disabled
              rightSection={
                <Switch
                  checked={enabledPushNotifications}
                  disabled
                  onCheckedChange={async (checked) => {
                    if (checked) {
                      const { status: existingStatus } =
                        await Notifications.getPermissionsAsync();
                      let finalStatus = existingStatus;
                      if (existingStatus !== "granted") {
                        const { status } =
                          await Notifications.requestPermissionsAsync();
                        finalStatus = status;
                      }
                      if (finalStatus !== "granted") {
                        toast.error(
                          t(i18n)`Push notifications are not enabled`
                        );
                        setEnabledPushNotifications(false);
                        return;
                      }
                      toast.success(t(i18n)`Push notifications are enabled`);
                    } else {
                      toast.success(t(i18n)`Push notifications are disabled`);
                    }
                    setEnabledPushNotifications(checked);
                  }}
                />
              }
            />
          </View>
        </View>
        <View className="gap-2">
          <Text className="mx-6 text-muted-foreground">{t(i18n)`Others`}</Text>
          <View>
            <Link href="/privacy-policy" asChild>
              <MenuItem
                label={t(i18n)`Privacy policy`}
                icon={ScrollTextIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
            <MenuItem
              label={t(i18n)`Terms of use`}
              icon={BookTypeIcon}
              rightSection={
                <ChevronRightIcon className="h-5 w-5 text-foreground" />
              }
              onPress={() =>
                Linking.openURL(
                  "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                )
              }
            />
            <Link href="/feedback" asChild>
              <MenuItem
                label={t(i18n)`Send feedback`}
                icon={MessageSquareQuoteIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
            <MenuItem
              label={t(i18n)`Share with friends`}
              icon={Share2Icon}
              rightSection={
                <ChevronRightIcon className="h-5 w-5 text-foreground" />
              }
              onPress={handleShare}
            />
            <Button
              variant="ghost"
              onPress={() =>
                Alert.alert(t(i18n)`Are you sure you want to sign out?`, "", [
                  {
                    text: t(i18n)`Cancel`,
                    style: "cancel"
                  },
                  {
                    text: t(i18n)`Sign out`,
                    style: "destructive",
                    onPress: async () => {
                      setIsLoggedIn(false);
                      // await signOut()
                      // await cancelAllScheduledNotifications()
                    }
                  }
                ])
              }
              className="!px-6 justify-start gap-6"
            >
              <LogOutIcon className="h-5 w-5 text-red-500" />
              <Text className="font-regular text-red-500 group-active:text-red-500">
                {t(i18n)`Sign out`}
              </Text>
            </Button>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          className="items-center gap-3"
          onPressIn={Haptics.selectionAsync}
          onLongPress={handleCopyVersion}
        >
          <Image
            source={require("@/assets/images/appstore.png")}
            className="mx-auto h-16 w-16 rounded-full"
          />
          <Text className="text-muted-foreground text-sm">
            {t(i18n)`ver.`}
            {Application.nativeApplicationVersion}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <FooterGradient />
    </View>
  );
}
