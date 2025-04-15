import { ArticlePerspectiveRow } from "@/components/article/article-perspective-row";
import { FooterGradient } from "@/components/common/footer-gradient";
import { HomeSkeleton } from "@/components/skeleton/home-skeleton";
import { useArticle } from "@/hooks/article/useArticle";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const { articles, loadingMore, fetchMore } = useArticle({
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

  const renderItem = useCallback(({ item }: { item: any }) => {
    return <ArticlePerspectiveRow item={item} type="home" />;
  }, []);

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
