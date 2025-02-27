import { Button } from "@/components/ui/button";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Link } from "expo-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightIcon,
  ChevronRight,
  ClockIcon,
  HeartIcon,
  PlusIcon
} from "lucide-react-native";
import { Image, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { i18n } = useLingui();

  return (
    <ScrollView
      className="flex-1 bg-background"
      style={{ paddingTop: top / 3 }}
    >
      <View className="flex gap-3 flex-row items-center justify-between px-6 mb-4">
        <Text className="text-foreground text-base font-bold">Topic</Text>
        <View className=" flex-row gap-x-2">
          <Text className="text-muted-foreground text-sm font-semiBold">
            See all
          </Text>
          <ChevronRight className="size-5 text-muted-foreground" />
        </View>
      </View>
      <View className="flex flex-row items-center justify-between px-6 my-2">
        <View className="flex flex-row items-center gap-3">
          <Image
            source={{
              uri: "https://png.pngtree.com/template/20190316/ourmid/pngtree-medical-health-logo-image_79631.jpg"
            }}
            className="h-[70px] w-[70px] rounded-lg border border-border"
            resizeMode="center"
          />
          <View className="w-[180px]">
            <Text className="text-foreground text-base/8 font-medium">
              {"Health"}
            </Text>
            <Text
              numberOfLines={2}
              className="text-muted-foreground text-sm/6 font-medium flex-1"
            >
              {"Get energizing workout moves, healthy recipes..."}
            </Text>
          </View>
        </View>
        <Link href={"/"} asChild>
          <Button
            size="sm"
            variant="ghost"
            className="h-10 border border-blue-400 w-[78px]"
          >
            <Text className="text-blue-400 font-bold">{t(i18n)`Save`}</Text>
          </Button>
        </Link>
      </View>
      <View className="flex flex-row items-center justify-between px-6 my-2">
        <View className="flex flex-row items-center gap-3">
          <Image
            source={{
              uri: "https://marketplace.canva.com/EAFvxbQlQwU/1/0/1600w/canva-blue-modern-artificial-intelligence-technology-logo-fSD54RypYpE.jpg"
            }}
            className="h-[70px] w-[70px] rounded-lg border border-border"
            resizeMode="center"
          />
          <View className="w-[180px]">
            <Text className="text-foreground text-base/8 font-medium">
              {"Technology"}
            </Text>
            <Text
              numberOfLines={2}
              className="text-muted-foreground text-sm/6 font-medium flex-1"
            >
              {"the application of scientific knowledge to the practi..."}
            </Text>
          </View>
        </View>
        <Link href={"/"} asChild>
          <Button
            size="sm"
            variant="ghost"
            className="h-10 border border-blue-400 bg-blue-400 w-[78px]"
          >
            <Text className="text-background font-bold">{t(i18n)`Saved`}</Text>
          </Button>
        </Link>
      </View>
      <View className="flex flex-row items-center justify-between px-6 my-2">
        <View className="flex flex-row items-center gap-3">
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjuielmOlM8IPGa3I0gnZ6KafefrApKfrnaQ&s"
            }}
            className="h-[70px] w-[70px] rounded-lg border border-border"
            resizeMode="center"
          />
          <View className="w-[180px]">
            <Text className="text-foreground text-base/8 font-medium">
              {"Art"}
            </Text>
            <Text
              numberOfLines={2}
              className="text-muted-foreground text-sm/6 font-medium flex-1"
            >
              {"Art is a diverse range of human activity, and result..."}
            </Text>
          </View>
        </View>
        <Link href={"/"} asChild>
          <Button
            size="sm"
            variant="ghost"
            className="h-10 border border-blue-400 bg-blue-400 w-[78px]"
          >
            <Text className="text-background font-bold">{t(i18n)`Saved`}</Text>
          </Button>
        </Link>
      </View>
      <View className="flex gap-3 flex-row items-center justify-between px-6 my-6">
        <Text className="text-foreground text-base font-bold">
          Popular Topic
        </Text>
      </View>
      <View className="flex flex-row items-center px-5 mx-2 mb-6">
        <View className=" flex-1 gap-3 justify-between">
          <Image
            source={{
              uri: "https://i.abcnewsfe.com/a/8b51905d-2325-498f-becb-a6d160e9c67e/donald-trump-2-gty-gmh-250206_1738848883793_hpMain_16x9.jpg?w=992"
            }}
            className="h-[185px] rounded-lg"
            resizeMode="cover"
          />
          <Text className="text-muted-foreground font-semiBold text-xs">
            {t(i18n)`U.S`}
          </Text>
          <Text className="text-foreground text-medium font-medium">{`Judge temporarily blocks Trump's federal government employee buyout`}</Text>
          <View className="flex flex-row justify-between items-center gap-2">
            <View className="flex flex-row items-center gap-2">
              <ClockIcon className="size-5 text-muted-foreground" />
              <Text className="text-muted-foreground text-xs">
                {"3 hours ago"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex flex-row items-center px-5 mx-2 mb-6">
        <View className=" flex-1 gap-3 justify-between">
          <Image
            source={{
              uri: "https://i.abcnewsfe.com/a/afd657e6-6fea-4584-99e6-ff33a89e8667/elon-1-gty-er-250305_1738789732005_hpMain_16x9.jpg?w=992"
            }}
            className="h-[185px] rounded-lg"
            resizeMode="cover"
          />
          <Text className="text-muted-foreground font-semiBold text-xs">
            {t(i18n)`U.S`}
          </Text>
          <Text className="text-foreground text-medium font-medium">{`Musk trolls critics and federal workers as DOGE targets US agencies`}</Text>
          <View className="flex flex-row justify-between items-center gap-2">
            <View className="flex flex-row items-center gap-2">
              <ClockIcon className="size-5 text-muted-foreground" />
              <Text className="text-muted-foreground text-xs">
                {"3 hours ago"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: bottom * 2.5 }} />
    </ScrollView>
  );
}
