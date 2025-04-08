import { FooterGradient } from "@/components/common/footer-gradient";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticle } from "@/hooks/article/useArticle";
import { useExplore } from "@/hooks/article/useExplore";
import { formatDateTime } from "@/lib/date";
import { cn, getMaxItem } from "@/lib/utils";
import { exactDesign } from "@/utils";
import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import { ChevronRight, ClockIcon } from "lucide-react-native";
import React, { useMemo } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { categories, onSaveCategory, onUnSaveCategory } = useExplore();
  const { articles, loading } = useArticle({
    limit: "5",
    isRandom: true,
    page: 1
  });

  const filterSaveCategories = categories?.filter(
    (category) => category?.isSaved === true
  );

  // const ThreeOfCategories = useMemo(
  //   () => getMaxItem?.(categories, 3),
  //   [categories]
  // );

  const renderItem = ({ item }: { item: CategoryS }) => {
    return (
      <View className="flex flex-row items-center justify-between px-4 my-2">
        <View className="flex flex-row items-center gap-3">
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1342234724/vector/secret-product-icon.jpg?s=612x612&w=0&k=20&c=N4eaLPkYL19bzSYUYaOX1OqXHCaMBBLYDSgt3hvXsl0="
            }}
            className="h-[48px] w-[48px] rounded-full border border-border"
            resizeMode="center"
          />
          <View className="w-[180px]">
            <Text className="text-foreground text-base/8 font-medium">
              {item?.name}
            </Text>
            {item?.description && (
              <Text
                numberOfLines={2}
                className="text-muted-foreground text-sm/6 font-medium flex-1"
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
            !!item?.isSaved
              ? onUnSaveCategory(item?.id)
              : onSaveCategory?.(item?.id);
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
  };

  if (loading) {
    return (
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
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 bg-background"
        style={{ paddingTop: top / 3 }}
      >
        <View className="flex gap-3 flex-row items-center justify-between px-4 mb-4">
          <Text className="text-foreground text-base font-bold">
            Categories
          </Text>
          <Link href="/categories" asChild>
            <Button size="sm" variant={"ghost"} className="">
              <View className=" flex-row gap-x-2">
                <Text className="text-muted-foreground text-sm font-semiBold">
                  See all
                </Text>
                <ChevronRight className="size-5 text-muted-foreground" />
              </View>
            </Button>
          </Link>
        </View>
        <View className="max-h-[280px]">
          <FlatList
            data={filterSaveCategories}
            renderItem={renderItem}
            ListEmptyComponent={() => (
              <View className="flex-1 justify-center self-center opacity-85 items-center gap-4">
                <LottieView
                  style={{ width: exactDesign(200), height: exactDesign(200) }}
                  source={require("@/assets/json/empty_category.json")}
                  autoPlay
                  loop
                />
              </View>
            )}
            keyExtractor={(item: any, index: any) => `${item.id}-${index}`}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
          />
        </View>
        <View className="flex gap-3 flex-row items-center justify-between px-4 my-6">
          <Text className="text-foreground text-base font-bold">
            Popular News
          </Text>
        </View>
        {React.Children.toArray(
          articles?.map((article, index) => (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/(app)/article-details",
                  params: { articleString: JSON.stringify(article, null, 2) }
                });
              }}
              className="flex flex-row items-center mx-4 mb-6"
            >
              <View className=" flex-1 gap-3 justify-between">
                <Image
                  source={{
                    uri:
                      article?.leftPerspective?.imageUrl ??
                      article?.rightPerspective?.imageUrl ??
                      "https://reliasoftware.com/images/careers/relia-software-office.webp"
                  }}
                  className="h-[185px] rounded-lg"
                  resizeMode="cover"
                />
                <Text className="text-foreground text-medium font-medium">
                  {article?.leftPerspective?.title ??
                    article?.rightPerspective?.title}
                </Text>
                <View className="flex flex-row justify-between items-center gap-2">
                  <View className="flex flex-row items-center gap-2">
                    <ClockIcon className="size-5 text-muted-foreground" />
                    <Text className="text-muted-foreground text-xs">
                      {formatDateTime?.(article?.createdAt) ?? null}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))
        )}
        <View style={{ height: bottom * 2.5 }} />
      </ScrollView>
      <FooterGradient />
    </View>
  );
}
