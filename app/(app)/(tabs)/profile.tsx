import * as Application from "expo-application";
import * as Haptics from "expo-haptics";

import { BottomSheet } from "@/components/common/bottom-sheet";
import { FooterGradient } from "@/components/common/footer-gradient";
import { MenuItem } from "@/components/common/menu-item";
import { toast } from "@/components/common/toast";
import { ProfileCard } from "@/components/profile/profile-card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useLogout } from "@/hooks/auth/useLogout";
import { useLocale } from "@/locales/provider";
import { useUserSettingsStore } from "@/stores/user-settings/store";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import {
  BellIcon,
  BookTypeIcon,
  ChevronRightIcon,
  EarthIcon,
  KeyRoundIcon,
  LogOutIcon,
  MessageSquareQuoteIcon,
  ScrollTextIcon,
  ShapesIcon,
  Share2Icon,
  SwatchBookIcon
} from "lucide-react-native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  Linking,
  ScrollView,
  Share,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { userStore } from "@/stores/userStore";
import { Skeleton } from "@/components/ui/skeleton";
import { ListSkeleton } from "@/components/common/list-skeleton";

export default function ProfileScreen() {
  const { i18n } = useLingui();
  const { bottom } = useSafeAreaInsets();
  const { language } = useLocale();
  const sheetRef = useRef<BottomSheetModal>(null);
  const { onLogout } = useLogout();
  const [loading, setLoading] = useState(true);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);
  const userProfile = userStore.getState().userProfile;

  const { setEnabledPushNotifications, enabledPushNotifications } =
    useUserSettingsStore();
  useLayoutEffect(() => {
    !!userProfile && setLoading(false);
    hideTimer.current = setTimeout(() => {
      setLoading(false);
    }, 650);
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [userProfile]);

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

  if (loading) {
    return (
      <View className="flex-1 bg-background py-4 gap-4">
        <View className="mx-6 flex-row items-center justify-center overflow-hidden rounded-lg">
          <Skeleton className="h-16 w-16 rounded-full" />
          <View className=" flex-1 bg-background gap-3">
            <Skeleton className="mx-3 h-5 w-1/2 rounded-full" />
            <Skeleton className="mx-3 h-6 w-2/3 rounded-full" />
          </View>
          <Skeleton className="h-6 w-6 rounded-full" />
        </View>
        <ListSkeleton />
      </View>
    );
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
            <Link href="/change-password" asChild>
              <MenuItem
                label={t(i18n)`Change password`}
                icon={KeyRoundIcon}
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
              onPress={() => {
                sheetRef.current?.present();
              }}
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
      <BottomSheet ref={sheetRef} index={0} enableDynamicSizing>
        <BottomSheetView style={{ paddingBottom: bottom }}>
          <View className="p-4">
            <View className="items-center mb-5 px-6 pb-4">
              <LottieView
                style={{ width: 120, height: 120 }}
                source={require("@/assets/json/logout.json")}
                autoPlay
                loop
              />
              <Text className="!text-xl !text-white mb-2 font-semiBold text-center">
                Ready to Leave?
              </Text>
              <Text className="!text-lg !text-foreground mb-2 text-center">
                Are you sure you want to log out? You will need to log in again
                to access your account.
              </Text>
            </View>
            <Button
              variant="default"
              className="rounded-full mx-4"
              onPress={() => {
                onLogout();
                sheetRef?.current?.close();
              }}
            >
              <Text className="text-white text-base font-medium">
                {t(i18n)`Logout`}
              </Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
