import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View, ViewToken } from "react-native";
import { ArticleItem } from "./article-item";
import { useAnalytics } from "@/hooks/analytics/useAnalytics";

export const ArticlePerspectiveRow = ({
  item,
  type
}: {
  item: any;
  type: string;
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [bookmark, setBookmark] = useState<boolean>(item?.isBookmarked);

  const viewStartTime = useRef<{ [side: string]: number }>({});
  const viewTimers = useRef<{ [side: string]: number }>({});

  const { onAnalyticsTimeSpent, onAnalyticsScrollDepth, onAnalyticsShare } =
    useAnalytics();

  useEffect(() => {
    setBookmark(item?.isBookmarked);
  }, [item?.isBookmarked]);

  const handleBookmark = () => {
    setBookmark((prev) => !prev);
  };

  const handleShare = (platform: string, id: number) => {
    onAnalyticsShare({
      articleId: id,
      platform
    });
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
      handleShare={handleShare}
      onPressToPerspective={() => onPressToPerspective(item.side)}
    />
  );

  const onViewableItemsChanged = useCallback(
    ({ changed }: { changed: ViewToken[] }) => {
      const now = Date.now();

      changed.forEach(({ item, isViewable }) => {
        const side = item?.side;
        if (!side) return;

        if (isViewable) {
          viewStartTime.current[side] = now;
        } else if (viewStartTime.current[side]) {
          const timeSpentMs = now - viewStartTime.current[side];
          const timeSpentSec = +(timeSpentMs / 1000).toFixed(2); // seconds

          viewTimers.current[side] = +(
            // accumulate and round
            ((viewTimers.current[side] || 0) + timeSpentSec).toFixed(2)
          );

          onAnalyticsTimeSpent({
            articleId: item?.id,
            timeSpentSeconds: viewTimers.current[side]
          });
          onAnalyticsScrollDepth({
            articleId: item?.id,
            scrollPercentage: 100 // Assuming full view
          });

          console.log(
            `[${type}] Perspective ${side} viewed for ${timeSpentSec}s (total: ${viewTimers.current[side]}s)`
          );
        }
      });
    },
    [type, onAnalyticsTimeSpent, onAnalyticsScrollDepth]
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

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
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};
