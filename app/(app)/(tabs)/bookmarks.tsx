import { FooterGradient } from "@/components/common/footer-gradient";
import { VerticalNews } from "@/components/news/v-news";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookmark } from "@/hooks/article/useBookmark";
import { formatDateTime } from "@/lib/date";
import { BookmarkXIcon } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function BookmarksScreen() {
  const { top, bottom } = useSafeAreaInsets();

  const { bookmarks, loading } = useBookmark();

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

  if (loading) {
    return (
      <View
        className="flex-1 bg-background py-4 gap-4"
        style={{ paddingTop: top / 3 }}
      >
        {React.Children.toArray(
          [1, 2, 3, 4, 5, 6].map((i) => (
            <View className="mx-6 flex-row items-center justify-center overflow-hidden rounded-lg">
              <Skeleton className="h-[120px] w-[120px] rounded-lg" />
              <View className=" flex-1 bg-background gap-4">
                <View className=" flex flex-row gap-2">
                  <Skeleton className="mx-3 h-8 w-12 rounded-full" />
                  <Skeleton className="h-8 w-2/5 rounded-full" />
                </View>
                <Skeleton className="mx-3 h-8 w-full rounded-full" />
                <Skeleton className="mx-3 h-7 w-full rounded-full" />
              </View>
              <Skeleton className="h-8 w-8 top-1 rounded-full self-start" />
            </View>
          ))
        )}
        <FooterGradient />
      </View>
    );
  }

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
        {React.Children.toArray(
          bookmarks?.map?.((item: any) => (
            <VerticalNews
              title={item?.article?.title}
              side={item?.article?.perspectiveType}
              content={item?.article?.content}
              timestamp={formatDateTime(item?.createdAt)}
              imgUrl={item?.article?.imageUrl}
              isBookmarked={true}
            />
          ))
        )}
        <View style={{ height: bottom * 3 }} />
      </ScrollView>
      <FooterGradient />
    </View>
  );
}
