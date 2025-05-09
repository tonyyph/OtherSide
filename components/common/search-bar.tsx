import { memoFC } from "@/utils";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useNavigation } from "expo-router";
import { ChevronLeft, Search } from "lucide-react-native";
import { useRef } from "react";
import { TextInput, View } from "react-native";
import { Button } from "../ui/button";

export const SearchBar = memoFC(() => {
  const navigation = useNavigation();
  const textRef = useRef<TextInput>(null);
  const { i18n } = useLingui();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View className="flex flex-row items-center justify-between gap-4 bg-background px-6 py-3">
      <Button
        size="icon"
        onPress={goBack}
        className="h-10 w-10 rounded-full bg-background border border-border"
      >
        <ChevronLeft className="size-5 text-muted-foreground" />
      </Button>
      <View className="flex-1 border border-border rounded-full">
        <TextInput
          ref={textRef}
          className="pl-10 rounded-full bg-background h-12"
          placeholder={t(i18n)`Search news, topics and more`}
          onChangeText={() => {}}
        />
        <View className="absolute top-3.5 left-3">
          <Search className="size-5 text-muted-foreground" />
        </View>
      </View>
    </View>
  );
});
