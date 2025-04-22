import { ArticleExploreItem } from "@/components/article/article-explore-item";
import { FooterGradient } from "@/components/common/footer-gradient";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useExplore } from "@/hooks/article/useExplore";
import { cn } from "@/lib/utils";
import { exactDesign } from "@/utils";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import { ChevronRight } from "lucide-react-native";
import React, { useCallback } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const {
    categories,
    onSaveCategory,
    onUnSaveCategory,
    articles,
    loadingArt: loading
  } = useExplore();

  const filterSaveCategories = categories?.filter(
    (category) => category?.isSaved
  );

  const renderCategoryItem = ({ item }: { item: any }) => (
    <View className="flex-row items-center justify-between px-4 my-2">
      <View className="flex-row items-center gap-3">
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/1342234724/vector/secret-product-icon.jpg?s=612x612&w=0&k=20&c=N4eaLPkYL19bzSYUYaOX1OqXHCaMBBLYDSgt3hvXsl0="
          }}
          className="h-[48px] w-[48px] rounded-full border border-border"
          resizeMode="center"
        />
        <View className="w-[180px]">
          <Text className="text-foreground text-base font-medium">
            {item?.name}
          </Text>
          {item?.description && (
            <Text
              numberOfLines={2}
              className="text-muted-foreground text-sm font-medium"
            >
              {item?.description}
            </Text>
          )}
        </View>
      </View>
      <Button
        size="sm"
        variant="ghost"
        onPress={() => {
          // eslint-disable-next-line no-unused-expressions
          item?.isSaved ? onUnSaveCategory(item.id) : onSaveCategory(item.id);
        }}
        className={cn(
          "h-10 w-[78px]",
          item?.isSaved ? "bg-blue-300" : "bg-white"
        )}
      >
        <Text
          className={cn(
            "text-blue-300 font-bold",
            item?.isSaved ? "text-background" : "text-muted-foreground"
          )}
        >
          {item?.isSaved ? `Saved` : `Save`}
        </Text>
      </Button>
    </View>
  );

  const MemoizedArticle = React.memo(ArticleExploreItem);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <MemoizedArticle item={item} />,
    []
  );

  return loading ? (
    <View
      className="flex-1 bg-background p-4 gap-4"
      style={{ paddingTop: top / 3 }}
    >
      <View className="flex-1 overflow-hidden rounded-lg">
        <View className="bg-background justify-between flex-row gap-3 mb-6">
          <Skeleton className="h-6 w-1/3 rounded-full" />
          <Skeleton className="mx-3 h-6 w-1/5 rounded-full" />
        </View>
        {React.Children.toArray(
          [1, 2, 3].map((i) => (
            <View className="bg-background ml-2 items-center flex flex-row mb-4">
              <Skeleton className="h-[48px] w-[48px] rounded-full" />
              <Skeleton className="mx-3 h-6 w-1/2 rounded-full" />
              <Skeleton className="mx-3 h-8 w-1/4 rounded-full" />
            </View>
          ))
        )}
        <Skeleton className="mx-3 h-6 w-1/3 rounded-full my-6" />
        {React.Children.toArray(
          [1, 2, 3].map((i) => (
            <View className="bg-background flex mb-4 gap-4">
              <Skeleton className="h-[178px] w-full rounded-lg" />
              <Skeleton className="h-6 w-1/2 rounded-full" />
              <Skeleton className="h-4 w-1/4 rounded-full" />
            </View>
          ))
        )}
      </View>
    </View>
  ) : (
    <View className="flex-1 bg-background">
      <FlatList
        data={articles}
        keyExtractor={(item: any, index: any) => `${item.id} + ${index}`}
        ListHeaderComponent={
          <>
            <View className="flex-row justify-between px-4 my-4">
              <Text className="text-foreground text-base font-bold">
                Categories
              </Text>
              <Link href="/categories" asChild>
                <Button size="sm" variant="ghost">
                  <View className="flex-row gap-2">
                    <Text className="text-muted-foreground text-sm">
                      See all
                    </Text>
                    <ChevronRight className="size-5 text-muted-foreground" />
                  </View>
                </Button>
              </Link>
            </View>
            <FlatList
              data={filterSaveCategories}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal={false}
              ListEmptyComponent={() => (
                <View className="items-center opacity-85">
                  <LottieView
                    style={{
                      width: exactDesign(200),
                      height: exactDesign(200)
                    }}
                    source={require("@/assets/json/empty_category.json")}
                    autoPlay
                    loop
                  />
                </View>
              )}
              scrollEnabled={false}
            />
            <View className="px-4 my-6">
              <Text className="text-foreground text-base font-bold">
                Popular News
              </Text>
            </View>
          </>
        }
        renderItem={renderItem}
        ListFooterComponent={<View style={{ height: bottom * 2.5 }} />}
      />
      <FooterGradient />
    </View>
  );
}
