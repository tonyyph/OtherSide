import { ArticlePerspectiveRow } from "@/components/article/article-perspective-row";
import { FooterGradient } from "@/components/common/footer-gradient";
import { ArticleFilter, SelectFilter } from "@/components/home/select-filter";
import { HomeSkeleton } from "@/components/skeleton/home-skeleton";
import { useArticle } from "@/hooks/article/useArticle";
import { FileTextIcon } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<ArticleFilter>(ArticleFilter.All);

  const { articles, loadingMore, fetchMore, hasMore, role } = useArticle({
    limit: "10",
    page,
    isRandom: false,
    filter
  });

  const EmptyState = () => {
    return (
      <View className="flex-1">
        <View className="items-center flex-1 justify-center gap-4 mt-[90%]">
          <FileTextIcon size={130} color="#9CA3AF" />
          <Text className="text-2xl text-[#9CA3AF]">{`No articles found`}</Text>
        </View>
      </View>
    );
  };

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchMore({ pages: page + 1 });
      setPage((prev) => prev + 1);
    }
  }, [loadingMore, hasMore, page, fetchMore]);
  const MemoizedArticle = React.memo(ArticlePerspectiveRow);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <MemoizedArticle item={item} type="home" />,
    [MemoizedArticle]
  );

  const handleSetFilter = useCallback((newFilter: ArticleFilter) => {
    setFilter(newFilter);
    setPage(1);
  }, []);

  return (
    <View className="bg-background flex-1">
      {role === "admin" && (
        <View className="border border-blue-100 z-10 rounded-lg opacity-80 top-20 right-3 absolute bg-white">
          <SelectFilter value={filter} onSelect={handleSetFilter} />
        </View>
      )}

      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.createdAt}-${index}`}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        ListEmptyComponent={!loadingMore ? <EmptyState /> : <HomeSkeleton />}
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
