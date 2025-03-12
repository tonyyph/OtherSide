import { FlatList, View } from "react-native";

import { ArticleItem } from "@/components/article/article-item";
import { FooterGradient } from "@/components/common/footer-gradient";
import { HomeSkeleton } from "@/components/skeleton/home-skeleton";
import { useArticle } from "@/hooks/article/useArticle";
import { useState } from "react";

export default function HomeScreen() {
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const { articles } = useArticle({ limit: "30" });

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
        {!isContentLoaded && <HomeSkeleton />}
        <FlatList
          data={customData}
          horizontal
          renderItem={renderHorizontalItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(contentHeight) => {
            if (contentHeight > 0) {
              setIsContentLoaded(true);
            }
          }}
        />
      </View>
    );
  };

  return (
    <View className=" flex-1 bg-background">
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.createdAt}-${index}`}
        pagingEnabled
        ListEmptyComponent={() => <HomeSkeleton />}
        showsVerticalScrollIndicator={false}
      />
      <FooterGradient />
    </View>
  );
}
