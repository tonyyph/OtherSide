import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useCategory } from "@/hooks/article/useCategory";
import { cn } from "@/lib/utils";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Image, View, FlatList, ListRenderItem } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ITEM_HEIGHT = 72;

const CategoryItem = memo(
  ({
    category,
    toggleCategorySave
  }: {
    category: CategoryS;
    toggleCategorySave: (id: string, isSaved: boolean) => Promise<void>;
  }) => {
    const [isSaved, setIsSaved] = useState(category.isSaved);

    const handlePress = useCallback(async () => {
      const newSavedState = !isSaved;
      setIsSaved(newSavedState); // Optimistically update UI
      await toggleCategorySave(category.id, newSavedState);
    }, [category.id, isSaved, toggleCategorySave]);

    return (
      <View
        className="flex flex-row items-center justify-between px-6 my-2"
        style={{ height: ITEM_HEIGHT }}
      >
        <View className="flex flex-row items-center gap-3">
          <Image
            source={{
              uri:
                category.image ??
                "https://media.istockphoto.com/id/1342234724/vector/secret-product-icon.jpg?s=612x612&w=0&k=20&c=N4eaLPkYL19bzSYUYaOX1OqXHCaMBBLYDSgt3hvXsl0="
            }}
            className="h-[48px] w-[48px] rounded-full border border-border"
            resizeMode="center"
          />
          <View className="w-[180px]">
            <Text className="text-foreground text-base/8 font-medium">
              {category.name}
            </Text>
            {category.description && (
              <Text
                numberOfLines={2}
                className="text-muted-foreground text-sm/6 font-medium flex-1"
              >
                {category.description}
              </Text>
            )}
          </View>
        </View>
        <Button
          size="sm"
          variant="ghost"
          onPress={handlePress}
          className={cn("h-10 w-[78px]", isSaved ? "bg-blue-300" : "bg-white")}
        >
          <Text
            className={cn(
              "text-blue-300 font-bold",
              isSaved ? "text-background" : "text-muted-foreground"
            )}
          >
            {isSaved ? `Saved` : `Save`}
          </Text>
        </Button>
      </View>
    );
  }
);

export default function CategoriesScreen() {
  const { categories = [], onUnSaveCategory, onSaveCategory } = useCategory();

  const { bottom } = useSafeAreaInsets();

  const [localCategories, setLocalCategories] = useState(categories);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const toggleCategorySave = useCallback(
    async (id: string, isSaved: boolean) => {
      setLocalCategories((prevCategories) =>
        prevCategories.map((cat) => (cat.id === id ? { ...cat, isSaved } : cat))
      );
      isSaved ? await onSaveCategory(id) : await onUnSaveCategory(id);
    },
    [onSaveCategory, onUnSaveCategory]
  );

  const renderItem: ListRenderItem<CategoryS> = useCallback(
    ({ item }) => (
      <CategoryItem category={item} toggleCategorySave={toggleCategorySave} />
    ),
    [toggleCategorySave]
  );

  return (
    <FlatList
      data={localCategories}
      className="flex-1 bg-background z-10"
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      removeClippedSubviews={true}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      getItemLayout={(_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index
      })}
      ListFooterComponent={() => <View style={{ height: bottom * 5 }} />}
    />
  );
}
