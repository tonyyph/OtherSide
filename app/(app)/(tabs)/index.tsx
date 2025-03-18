import { ArticleItem } from "@/components/article/article-item";
import { FooterGradient } from "@/components/common/footer-gradient";
import { HomeSkeleton } from "@/components/skeleton/home-skeleton";
import { useArticle } from "@/hooks/article/useArticle";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const { articles, loading, fetchMore, loadingMore } = useArticle({
    limit: "10",
    page,
    isRandom: false
  });

  const loadMore = useCallback(() => {
    if (!loadingMore) {
      setPage((prev) => prev + 1);
      fetchMore({ pages: page + 1 });
    }
  }, [loadingMore, page, fetchMore]);

  const renderHorizontalItem = useCallback(({ item }: { item: any }) => {
    return <ArticleItem item={item} />;
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
    [loading, renderHorizontalItem]
  );

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.createdAt}-${index}`}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <HomeSkeleton />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : null
        }
      />
      <FooterGradient />
    </View>
  );
}
