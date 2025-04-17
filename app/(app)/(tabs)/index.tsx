import { ArticlePerspectiveRow } from "@/components/article/article-perspective-row";
import { FooterGradient } from "@/components/common/footer-gradient";
import { ArticleFilter, SelectFilter } from "@/components/home/select-filter";
import { HomeSkeleton } from "@/components/skeleton/home-skeleton";
import { useArticle } from "@/hooks/article/useArticle";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<ArticleFilter>(ArticleFilter.All);

  const { articles, loadingMore, fetchMore } = useArticle({
    limit: "10",
    page,
    isRandom: false,
    filter
  });

  const loadMore = useCallback(() => {
    if (!loadingMore) {
      fetchMore({ pages: page + 1 });
      setPage((prev) => prev + 1);
    }
  }, [loadingMore, page, fetchMore]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <ArticlePerspectiveRow item={item} type="home" />
    ),
    []
  );

  const handleSetFilter = useCallback((newFilter: ArticleFilter) => {
    setFilter(newFilter);
    setPage(1); // Reset pagination on filter change
  }, []);

  return (
    <View className="bg-background flex-1">
      <View className="border border-blue-100 z-10 rounded-lg opacity-80 top-20 right-3 absolute bg-white">
        <SelectFilter value={filter} onSelect={handleSetFilter} />
      </View>

      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.createdAt}-${index}`}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<HomeSkeleton />}
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
