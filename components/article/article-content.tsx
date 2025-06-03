import { useMemoFunc } from "@/hooks";
import { cn } from "@/lib/utils";
import { SCREEN_HEIGHT } from "@/utils";
import { useState } from "react";
import {
  LayoutChangeEvent,
  Text,
  useWindowDimensions,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const ArticleContent = ({ content }: { content: any }) => {
  const [showReadMore, setShowReadMore] = useState(false);
  const { height } = useWindowDimensions();

  const handleLayout = useMemoFunc((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > SCREEN_HEIGHT / 5) {
      setShowReadMore(true);
    }
  });

  return (
    <ScrollView
      nestedScrollEnabled
      className="flex-1"
      scrollEnabled={showReadMore}
    >
      <View
        style={{ maxHeight: height }}
        className={cn(`overflow-hidden flex-row flex-wrap`)}
        onLayout={handleLayout}
      >
        <Text
          numberOfLines={20}
          className="flex-1 text-muted-foreground text-lg font-medium"
        >
          {content}
        </Text>
      </View>
    </ScrollView>
  );
};
