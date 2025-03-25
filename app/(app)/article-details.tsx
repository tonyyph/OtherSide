import { ArticleItem } from "@/components/article/article-item";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { useCallback } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ArticleDetailScreen() {
  const { articleString } = useLocalSearchParams();
  const articles = JSON.parse(articleString.toString());
  const { bottom, top } = useSafeAreaInsets();

  const renderHorizontalItem = useCallback(({ item }: { item: any }) => {
    return <ArticleItem item={item} contentHeight={2} />;
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      const customData = [
        item?.leftPerspective && {
          ...item.leftPerspective,
          side: "Left",
          isBookmarked: item?.isBookmarked,
          createdAt: item?.createdAt
        },
        item?.rightPerspective && {
          ...item.rightPerspective,
          side: "Right",
          isBookmarked: item?.isBookmarked,
          createdAt: item?.createdAt
        }
      ].filter(Boolean);

      return (
        <View className="flex-1">
          <FlatList
            data={customData}
            horizontal
            renderItem={renderHorizontalItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    },
    [renderHorizontalItem]
  );

  return (
    <View className="flex-1 bg-background">
      <View
        className="p-2 rounded-full border border-blue-100 z-10 left-6 absolute bg-white"
        style={{ top: top }}
      >
        <TouchableOpacity onPress={router.back}>
          <ArrowLeftIcon className="text-background size-5" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={[articles]}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.createdAt}-${index}`}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
