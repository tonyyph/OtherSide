import * as Application from "expo-application";

import { BottomSheet } from "@/components/common/bottom-sheet";
import { FooterGradient } from "@/components/common/footer-gradient";
import { ListSkeleton } from "@/components/common/list-skeleton";
import { MenuItem } from "@/components/common/menu-item";
import { toast } from "@/components/common/toast";
import { ProfileCard } from "@/components/profile/profile-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { useLogout } from "@/hooks/auth/useLogout";
import { useColorPalette } from "@/hooks/use-color-palette";
import { useLocale } from "@/locales/provider";
import { useUserSettingsStore } from "@/stores/user-settings/store";
import { userStore } from "@/stores/userStore";
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
  Share2Icon
} from "lucide-react-native";
import { useLayoutEffect, useRef, useState } from "react";
import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  Share,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { i18n } = useLingui();
  const { getColor } = useColorPalette();
  const { bottom, top } = useSafeAreaInsets();
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
    }, 3000);
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [userProfile]);

  async function handleCopyVersion() {
    toast.success(`Copied version ${Application.nativeApplicationVersion}`);
  }

  const onRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  async function handleShare() {
    try {
      await Share.share({
        url: `https://otherside-jet.vercel.app/get-app`,
        message: t(
          i18n
        )`OtherSide is a news aggregation app designed to provide users with diverse perspectives on current events, helping them see beyond their usual sources. By curating stories from various media outlets, OtherSide ensures balanced, unbiased news coverage. Whether you're interested in global affairs, technology, finance, or culture, the app delivers real-time updates and multiple viewpoints on each topic. Stay informed with OtherSide, where news meets perspective. Feel free to give it a try and let me know what you think. https://otherside-jet.vercel.app/get-app`
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  if (loading) {
    return (
      <View
        className="flex-1 bg-background py-4 gap-4"
        style={{ paddingTop: top }}
      >
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
    <View className="flex-1 bg-background" style={{ paddingTop: top }}>
      <ScrollView
        contentContainerClassName="py-6 gap-4"
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={getColor("--primary")}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{ paddingBottom: bottom + 80 }}
        className="bg-background"
      >
        <ProfileCard />
        <View className="mt-4 gap-2">
          <Text className="mx-6 text-muted-foreground">{`General`}</Text>
          <View>
            <Link href="/categories" asChild>
              <MenuItem
                label={`Categories`}
                icon={ShapesIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
          </View>
        </View>
        <View className="gap-2 mt-4">
          <Text className="mx-6 text-muted-foreground">{`App settings`}</Text>
          <View>
            <Link href="/change-password" asChild>
              <MenuItem
                label={`Change Password`}
                icon={KeyRoundIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
            {/* <Link href="/appearance" asChild>
              <MenuItem
                label={`Appearance`}
                icon={SwatchBookIcon}
                disabled
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link> */}
            <Link href="/language" asChild>
              <MenuItem
                label={`Language`}
                icon={EarthIcon}
                rightSection={
                  <View className="flex flex-row items-center gap-2">
                    <Text className="text-muted-foreground uppercase">
                      {`${language}`}
                    </Text>
                    <ChevronRightIcon className="h-5 w-5 text-foreground" />
                  </View>
                }
              />
            </Link>
            <MenuItem
              label={`Push notifications`}
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
                        toast.error(`Push notifications are not enabled`);
                        setEnabledPushNotifications(false);
                        return;
                      }
                      toast.success(`Push notifications are enabled`);
                    } else {
                      toast.success(`Push notifications are disabled`);
                    }
                    setEnabledPushNotifications(checked);
                  }}
                />
              }
            />
          </View>
        </View>
        <View className="gap-2">
          <Text className="mx-6 text-muted-foreground">{`Others`}</Text>
          <View>
            <Link href="/privacy-policy" asChild>
              <MenuItem
                label={`Privacy policy`}
                icon={ScrollTextIcon}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
            <MenuItem
              label={`Terms of use`}
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
                label={`Send feedback`}
                icon={MessageSquareQuoteIcon}
                disabled={true}
                rightSection={
                  <ChevronRightIcon className="h-5 w-5 text-foreground" />
                }
              />
            </Link>
            <MenuItem
              label={`Share with friends`}
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
                {`Sign out`}
              </Text>
            </Button>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          className="items-center gap-3"
          onLongPress={handleCopyVersion}
        >
          <Image
            source={require("@/assets/images/logo-transparent.png")}
            className="mx-auto h-16 w-24 rounded-full"
          />
          <Text className="text-muted-foreground text-sm">
            {`ver.`}
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
              <Text className="text-background text-base font-medium">
                {`Logout`}
              </Text>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
