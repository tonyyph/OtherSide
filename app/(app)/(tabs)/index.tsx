import { ActivityIndicator, FlatList, View } from "react-native";
import { ArticleItem } from "@/components/article/article-item";
import { FooterGradient } from "@/components/common/footer-gradient";
import { HomeSkeleton } from "@/components/skeleton/home-skeleton";
import { useArticle } from "@/hooks/article/useArticle";
import { useState } from "react";

export default function HomeScreen() {
  const [page, setPage] = useState(1);
  const { articles, loading, fetchMore, loadingMore } = useArticle({
    limit: "10",
    page,
    isRandom: false
  });

  const loadMore = () => {
    if (!loading) {
      setPage((prev) => prev + 1);
      fetchMore({ pages: page + 1 });
    }
  };

  const renderHorizontalItem = ({ item }: { item: any }) => {
    return <ArticleItem item={item} />;
  };

  const renderItem = ({ item }: { item: any }) => {
    const customData = [
      {
        ...item?.leftPerspective,
        side: "Left",
        isBookmarked: item?.isBookmarked,
        createdAt: item?.createdAt
      },
      {
        ...item?.rightPerspective,
        side: "Right",
        isBookmarked: item?.isBookmarked,
        createdAt: item?.createdAt
      }
    ];

    return (
      <View className="flex-1">
        {loading && <HomeSkeleton />}
        <FlatList
          data={customData}
          horizontal
          renderItem={renderHorizontalItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          pagingEnabled
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.createdAt}-${index}`}
        pagingEnabled
        ListEmptyComponent={() => <HomeSkeleton />}
        showsVerticalScrollIndicator={false}
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
