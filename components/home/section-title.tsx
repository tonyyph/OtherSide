import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Text, View } from "react-native";
import { Button } from "../ui/button";

type SelectionTitleProps = {
  name: string;
  href: string;
};

export function SelectionTitle({ name, href }: SelectionTitleProps) {
  return (
    <View className="mt-3 mb-5 flex-row items-center justify-between gap-5 px-6">
      <Text className="text-foreground text-3xl font-bold">{name}</Text>
      <Link
        // href="/transaction/new-record"
        href={href as any}
        asChild
        onPress={Haptics.selectionAsync}
      >
        <Button
          size="icon"
          className="h-10 w-10 rounded-full border border-border bg-background"
        >
          <ArrowRight className="size-5 text-foreground" />
        </Button>
      </Link>
    </View>
  );
}
