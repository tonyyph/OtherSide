import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { BellIcon, Search } from "lucide-react-native";
import { Text, View } from "react-native";
import { Button } from "../ui/button";

export function Toolbar() {
  const { i18n } = useLingui();
  return (
    <View className="flex flex-row items-center justify-between gap-4 bg-background px-6 py-3">
      <Link href="/(app)/search" asChild onPress={Haptics.selectionAsync}>
        <Button
          size="default"
          className="pl-10 rounded-full bg-background h-12 border border-border flex-1"
        >
          <View className="absolute left-3 flex-row items-center gap-x-2">
            <Search className="size-5 text-muted-foreground" />
            <Text className="text-muted-foreground text-base font-medium">
              {t(i18n)`Search news, topics and more`}
            </Text>
          </View>
        </Button>
      </Link>
      <Link
        href="/(app)/notifications"
        asChild
        onPress={Haptics.selectionAsync}
      >
        <Button size="icon" className="h-10 w-10 rounded-full">
          <BellIcon className="size-5 text-primary-foreground" />
        </Button>
      </Link>
    </View>
  );
}
