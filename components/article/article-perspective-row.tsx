import React, { useEffect, useRef } from "react";
import { FlatList, View } from "react-native";
import { ArticleItem } from "./article-item";

export const ArticlePerspectiveRow = ({
  item
}: {
  item: any;
  type: string;
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [bookmark, setBookmark] = React.useState<boolean>(item?.isBookmarked);

  useEffect(() => {
    setBookmark(item?.isBookmarked);
  }, [item?.isBookmarked]);

  const handleBookmark = () => {
    setBookmark((prev: boolean) => !prev);
  };

  const customData = [
    item?.leftPerspective && {
      ...item.leftPerspective,
      side: "Left",
      isBookmarked: bookmark,
      createdAt: item?.createdAt
    },
    item?.rightPerspective && {
      ...item.rightPerspective,
      side: "Right",
      isBookmarked: bookmark,
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
      handleBookmark={handleBookmark}
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
