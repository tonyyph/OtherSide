import { NotificationItem } from "@/components/notification/notification-item";
import { Button } from "@/components/ui/button";
import { useLingui } from "@lingui/react";
import { Link, useNavigation } from "expo-router";
import { EllipsisIcon } from "lucide-react-native";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { i18n } = useLingui();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Link href={"/"} asChild>
          <Button size="sm" variant="ghost" className="h-10">
            <EllipsisIcon className="size-6 text-muted-foreground" />
          </Button>
        </Link>
      )
    });
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-background"
      contentContainerClassName="py-6"
    >
      <Text className="text-foreground text-base font-bold px-6 mb-6">
        Today, April 22
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="mb-6 flex-1"
      >
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </ScrollView>
      <Text className="text-foreground text-base font-bold px-6 mb-6">
        Yesterday, April 21
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="mb-6 flex-1"
      >
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </ScrollView>
      <View style={{ height: bottom }} />
    </ScrollView>
  );
}
