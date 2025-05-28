import { useMemoFunc } from "@/hooks";
import { cn } from "@/lib/utils";
import { SCREEN_HEIGHT } from "@/utils";
import { useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const ArticleContent = ({ content }: { content: any }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showReadMore, setShowReadMore] = useState(false);
  const didSetExpanded = useRef(false);
  const { height } = useWindowDimensions();

  const handleLayout = useMemoFunc((event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > SCREEN_HEIGHT / 5) {
      setShowReadMore(true);
      if (!didSetExpanded.current) {
        setIsExpanded(false);
        didSetExpanded.current = true;
      }
    }
  });
  const handleReadMore = useMemoFunc(() => {
    setIsExpanded(true);
  });

  const handleShowLess = useMemoFunc(() => {
    setIsExpanded(false);
  });

  return (
    <ScrollView
      nestedScrollEnabled
      className="flex-1"
      scrollEnabled={showReadMore && isExpanded}
    >
      <View
        style={{
          maxHeight: isExpanded ? height : height / 3.5
        }}
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
      {showReadMore && !isExpanded && (
        <TouchableOpacity
          onPress={handleReadMore}
          className="py-1 px-2 items-center self-center flex-row justify-center rounded-full border border-foreground"
          accessible
          accessibilityLabel="Read more"
          accessibilityRole="button"
        >
          <Text className="text-xs font-medium text-foreground">Read more</Text>
        </TouchableOpacity>
      )}
      {showReadMore && isExpanded && (
        <TouchableOpacity
          onPress={handleShowLess}
          className="py-1 px-2 items-center self-center flex-row justify-center rounded-full border border-foreground my-10"
          accessible
          accessibilityLabel="Read less"
          accessibilityRole="button"
        >
          <Text className="text-xs font-medium text-foreground">Read less</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};
