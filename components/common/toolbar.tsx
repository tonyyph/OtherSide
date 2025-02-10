import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { BellIcon, Search } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Toolbar() {
  const { i18n } = useLingui();
  return (
    <View className="flex flex-row items-center justify-between gap-4 bg-background px-6 py-3">
      <TouchableOpacity activeOpacity={0.8} className="flex-1">
        <Input
          placeholder={t(i18n)`Search news, topics and more`}
          className=" pl-10 rounded-full bg-background h-12"
          editable={true}
          pointerEvents="none"
        />
        <View className="absolute top-3.5 left-3">
          <Search className="size-5 text-muted-foreground" />
        </View>
      </TouchableOpacity>
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
