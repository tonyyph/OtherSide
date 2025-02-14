import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Bookmark, BookmarkCheckIcon, ClockIcon } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import { BookmarkFilled } from "../common/icons";

type VerticalNewsProps = {
  title?: string;
  authorName?: string;
  timestamp?: string;
  category?: string;
  authorAvatar?: string;
  imgUrl?: string;
  isBookmarked?: boolean;
};
export function VerticalNews({
  title = `'Studio sex' and 'hitman threats': Insiders speak out about Diddy's 90s music empire`,
  authorName = "BBC News",
  authorAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1024px-BBC_News_2019.svg.png",
  timestamp = "13 hours ago",
  category = "Scandal",
  imgUrl = "https://ichef.bbci.co.uk/news/1536/cpsprodpb/0561/live/ae1fd0e0-e3d3-11ef-a319-fb4e7360c4ec.jpg.webp",
  isBookmarked = false
}: VerticalNewsProps) {
  const { i18n } = useLingui();

  return (
    <View className="flex flex-row items-center px-6 my-2">
      <View className="flex gap-3 flex-row">
        <Image
          source={{ uri: imgUrl }}
          className="h-[96px] w-[96px] rounded-lg"
          resizeMode="center"
        />
        <View className="flex-1 gap-3">
          <Text className="text-muted-foreground font-bold text-xs">
            {t(i18n)`${category}`}
          </Text>
          <Text
            numberOfLines={2}
            className="text-foreground text-medium font-medium flex-1"
          >
            {title}
          </Text>
          <View className="flex flex-row justify-between items-center gap-2">
            <View className="flex flex-row items-center gap-2">
              <ClockIcon className="size-5 text-muted-foreground" />
              <Text className="text-muted-foreground text-xs">{timestamp}</Text>
            </View>
            {isBookmarked ? (
              <BookmarkFilled className="size-5 text-blue-600" />
            ) : (
              <Bookmark className="size-5 text-foreground" />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
