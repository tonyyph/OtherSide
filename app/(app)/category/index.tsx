import { CategoryItem } from "@/components/category/category-item";
import { AddNewButton } from "@/components/common/add-new-button";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import { useCategory } from "@/hooks/article/useCategory";
import { cn } from "@/lib/utils";
import { useLingui } from "@lingui/react";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { Image, SectionList, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CategoriesScreen() {
  const { categories = [], onUnSaveCategory, onSaveCategory } = useCategory();

  return (
    <ScrollView className="flex-1 bg-background py-4 gap-4">
      {React.Children.toArray(
        categories?.map((category, index) => (
          <View className="flex flex-row items-center justify-between px-6 my-2">
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
                  {category?.name}
                </Text>
                {category?.description && (
                  <Text
                    numberOfLines={2}
                    className="text-muted-foreground text-sm/6 font-medium flex-1"
                  >
                    {category?.description}
                  </Text>
                )}
              </View>
            </View>
            <Button
              size="sm"
              variant="ghost"
              onPress={() => {
                !!category?.isSaved
                  ? onUnSaveCategory(category?.id)
                  : onSaveCategory?.(category?.id);
              }}
              className={cn(
                "h-10 w-[78px]",
                category?.isSaved ? "bg-blue-300" : "bg-white"
              )}
            >
              <Text
                className={cn(
                  "text-blue-300 font-bold",
                  category?.isSaved
                    ? "text-background"
                    : "text-muted-foreground"
                )}
              >
                {category?.isSaved ? `Saved` : `Save`}
              </Text>
            </Button>
          </View>
        ))
      )}
    </ScrollView>
  );
}
