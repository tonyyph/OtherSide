import { FooterGradient } from "@/components/common/footer-gradient";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticle } from "@/hooks/article/useArticle";
import { useExplore } from "@/hooks/article/useExplore";
import { formatDateTime } from "@/lib/date";
import { cn } from "@/lib/utils";
import { exactDesign } from "@/utils";
import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import { ChevronRight, ClockIcon } from "lucide-react-native";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { categories, onSaveCategory, onUnSaveCategory } = useExplore();
  const { articles, loading } = useArticle({
    limit: "5",
    isRandom: true,
    page: 1,
    filter: "all"
  });

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

  const renderArticleItem = ({ item }: { item: any }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(app)/article-details",
          params: { articleString: JSON.stringify(item) }
        })
      }
      className="flex flex-row items-center mx-4 mb-6"
    >
      <View className="flex-1 gap-3">
        <Image
          source={{
            uri:
              (item.leftPerspective?.imageUrl ??
                item.rightPerspective?.imageUrl) ||
              "https://reliasoftware.com/images/careers/relia-software-office.webp"
          }}
          className="h-[185px] rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-foreground font-medium">
          {item.leftPerspective?.title ?? item.rightPerspective?.title}
        </Text>
        <View className="flex-row items-center gap-2">
          <ClockIcon className="size-5 text-muted-foreground" />
          <Text className="text-muted-foreground text-xs">
            {formatDateTime(item.createdAt)}
          </Text>
        </View>
      </View>
    </Pressable>
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
        renderItem={renderArticleItem}
        ListFooterComponent={<View style={{ height: bottom * 2.5 }} />}
      />
      <FooterGradient />
    </View>
  );
}
