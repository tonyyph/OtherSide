import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useModalPortalRoot } from "@rn-primitives/portal";
import { router, useNavigation } from "expo-router";
import { SendIcon, XIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Image, Keyboard, ScrollView, View } from "react-native";
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ArticleDetailScreen() {
  const { i18n } = useLingui();
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { sideOffset, ...rootProps } = useModalPortalRoot();
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const ref = useRef<ScrollView>(null);

  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboard.height.value }]
    };
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => (
        <Button
          size="icon"
          variant="ghost"
          onPress={() => {
            router.back();
          }}
        >
          <XIcon className="size-7 text-foreground" />
        </Button>
      )
    });
  }, []);

  return (
    <View className="flex-1 bg-background" {...rootProps}>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        bounces={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={({ nativeEvent }) => {
          Keyboard.dismiss();
        }}
        showsHorizontalScrollIndicator={false}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        <View
          style={{
            width,
            flex: 1,
            justifyContent: "space-between"
          }}
        >
          <Animated.View className="flex-1 bg-background gap-3 justify-between">
            <View className="p-5 gap-4 justify-between">
              <View className="flex flex-row items-center gap-4 border-b border-border">
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=1" }}
                  className="h-8 w-8 rounded-full border border-border"
                />
                <View className=" flex-1 mb-2">
                  <Text className="text-sm font-medium text-white">
                    John Doe
                  </Text>
                  <Text>
                    This is exactly what I needed to see today. So relatable!
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    {t(i18n)`2 hours ago`}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row items-center gap-4 border-b border-border">
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=2" }}
                  className="h-8 w-8 rounded-full border border-border"
                />
                <View className=" flex-1 mb-2">
                  <Text className="text-sm font-medium text-white">
                    John Doe
                  </Text>
                  <Text>Okay but why is this so accurate? I’m crying 😂😂</Text>
                  <Text className="text-sm text-muted-foreground">
                    {t(i18n)`3 hours ago`}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row items-center gap-4 border-b border-border">
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=3" }}
                  className="h-8 w-8 rounded-full border border-border"
                />
                <View className=" flex-1 mb-2">
                  <Text className="text-sm font-medium text-white">
                    John Doe
                  </Text>
                  <Text>
                    This deserves way more views. People are seriously sleeping
                    on this!
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    {t(i18n)`4 hours ago`}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row items-center gap-4 border-b border-border">
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=4" }}
                  className="h-8 w-8 rounded-full border border-border"
                />
                <View className=" flex-1 mb-2">
                  <Text className="text-sm font-medium text-white">
                    Hla Hells
                  </Text>
                  <Text>
                    I can't stop watching this. The energy is just too good!
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    {t(i18n)`5 hours ago`}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row items-center gap-4">
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?img=5" }}
                  className="h-8 w-8 rounded-full border border-border"
                />
                <View className=" flex-1 mb-2">
                  <Text className="text-sm font-medium text-white">
                    John Doe
                  </Text>
                  <Text>
                    How did you even come up with this? Absolutely genius!
                  </Text>
                  <Text className="text-sm text-muted-foreground">
                    {t(i18n)`Yesterday`}
                  </Text>
                </View>
              </View>
            </View>
            <Animated.View style={translateStyle} className="bg-muted p-4 pb-6">
              <View className="flex flex-row items-center gap-4">
                <Input
                  placeholder={t(i18n)`Enter you comment here...`}
                  autoCapitalize="none"
                  onAccessibilityAction={() => {}}
                  className="line-clamp-1 h-14 flex-1 truncate border rounded-full px-6 border-border bg-black"
                  placeholderTextColor={"gray"}
                  numberOfLines={1}
                  multiline={false}
                />
                <SendIcon className="size-7 text-foreground" />
              </View>
            </Animated.View>
          </Animated.View>
          {/* <View style={{ height: bottom, backgroundColor: "black" }} /> */}
        </View>
      </ScrollView>
    </View>
  );
}
