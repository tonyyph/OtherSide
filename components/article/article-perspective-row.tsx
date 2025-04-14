import React, { useRef } from "react";
import { FlatList, View } from "react-native";
import { ArticleItem } from "./article-item";

export const ArticlePerspectiveRow = ({ item }: { item: any }) => {
  const flatListRef = useRef<FlatList>(null);

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

  const onPressToPerspective = (currentSide: "Left" | "Right") => {
    const nextIndex = currentSide === "Left" ? 1 : 0;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const renderHorizontalItem = ({ item }: { item: any }) => (
    <ArticleItem
      item={item}
      isShowPerspective={customData?.length > 1}
      onPressToPerspective={() => onPressToPerspective(item.side)}
    />
  );

  return (
    <View className="flex-1">
      <FlatList
        ref={flatListRef}
        data={customData}
        horizontal
        renderItem={renderHorizontalItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
