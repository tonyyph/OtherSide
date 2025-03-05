import { Text } from "@/components/ui/text";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { ClockIcon } from "lucide-react-native";
import { Image, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BreakingNewsScreen() {
  const { i18n } = useLingui();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-background"
      contentContainerClassName="py-3"
    >
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
            {`U.S`}
          </Text>
          <Text className="text-foreground text-medium font-medium">{`Judge temporarily blocks Trump's federal government employee buyout`}</Text>
          <View className="flex flex-row justify-between items-center gap-2">
            <View className="flex flex-row items-center gap-2">
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLas6SIkIzEZ6aTqN39_yEomNNA89CD8hEcQ&s"
                }}
                className="h-8 w-8 rounded-full border border-border"
                resizeMode="cover"
              />
              <Text className="text-muted-foreground font-bold text-xs">
                {`ABC News`}
              </Text>
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
            {`U.S`}
          </Text>
          <Text className="text-foreground text-medium font-medium">{`Musk trolls critics and federal workers as DOGE targets US agencies`}</Text>
          <View className="flex flex-row justify-between items-center gap-2">
            <View className="flex flex-row items-center gap-2">
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLas6SIkIzEZ6aTqN39_yEomNNA89CD8hEcQ&s"
                }}
                className="h-8 w-8 rounded-full border border-border"
                resizeMode="cover"
              />
              <Text className="text-muted-foreground font-bold text-xs">
                {`ABC News`}
              </Text>
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
              uri: "https://e0.365dm.com/25/02/768x432/skysports-mo-salah-liverpool_6821734.jpg?20250206212927"
            }}
            className="h-[185px] rounded-lg"
            resizeMode="cover"
          />
          <Text className="text-muted-foreground font-semiBold text-xs">
            {`UK`}
          </Text>
          <Text className="text-foreground text-medium font-medium">{`Liverpool 4-0 Tottenham (agg: 4-1): Cody Gakpo and Mohamed Salah among goalscorers as Arne Slot books first cup final appearance as Reds boss`}</Text>
          <View className="flex flex-row justify-between items-center gap-2">
            <View className="flex flex-row items-center gap-2">
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHBgV0OciagvvhUTijs7fdrr4DtxXr53Tsww&s"
                }}
                className="h-8 w-8 rounded-full border border-border"
                resizeMode="cover"
              />
              <Text className="text-muted-foreground font-bold text-xs">
                {`Sky Sport News`}
              </Text>
              <ClockIcon className="size-5 text-muted-foreground" />
              <Text className="text-muted-foreground text-xs">
                {"3 hours ago"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: bottom }} />
    </ScrollView>
  );
}
