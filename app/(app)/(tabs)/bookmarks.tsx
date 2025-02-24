import { VerticalNews } from "@/components/news/v-news";
import { formatDateTime } from "@/lib/date";
import { useUserBookmarkStore } from "@/stores/user-bookmark/store";
import { BookmarkIcon, BookmarkXIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BookmarksScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { bookmarks, removeBookmark, removeAllBookmarks } =
    useUserBookmarkStore();

  const DeleteButton = ({
    onDelete,
    canDelete
  }: {
    onDelete: () => void;
    canDelete: boolean;
  }) => {
    return (
      <View className="flex-row p-3 self-end rounded-full">
        <TouchableOpacity
          onPress={onDelete}
          disabled={!canDelete}
          className="bg-red-500 py-3 px-5 rounded-full items-center justify-center"
        >
          <Text className="text-sm text-white font-semiBold">
            {"Dismiss All"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        style={{ paddingTop: top / 3 }}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="mb-6"
      >
        {bookmarks?.length === 0 && (
          <View className="flex-1 justify-center self-center top-60 opacity-85 items-center gap-4">
            <BookmarkXIcon className="w-[200px] h-[200px] text-primary" />
            <Text className="!text-2xl !text-foreground mb-2 font-semiBold">
              {"No Bookmark"}
            </Text>
          </View>
        )}
        {bookmarks?.length > 0 && (
          <DeleteButton
            onDelete={() => {
              removeAllBookmarks();
            }}
            canDelete={true}
          />
        )}
        {React.Children.toArray(
          bookmarks?.map?.((item: any) => (
            <VerticalNews
              title={item?.title}
              side={item?.side}
              content={item?.content}
              timestamp={formatDateTime(item?.createdAt)}
              imgUrl={item?.imageUrl}
              isBookmarked={true}
            />
          ))
        )}

        <View style={{ height: bottom * 3 }} />
      </ScrollView>
    </View>
  );
}
