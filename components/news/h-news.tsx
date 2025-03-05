import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Bookmark, ClockIcon } from "lucide-react-native";
import { Image, Text, View } from "react-native";

type HorizontalNewsProps = {
  title?: string;
  authorName?: string;
  timestamp?: string;
  category?: string;
  authorAvatar?: string;
  imgUrl?: string;
};

export function HorizontalNews({
  title = `'Studio sex' and 'hitman threats': Insiders speak out about Diddy's 90s music empire`,
  authorName = "BBC News",
  authorAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1024px-BBC_News_2019.svg.png",
  timestamp = "13 hours ago",
  category,
  imgUrl = "https://ichef.bbci.co.uk/news/1536/cpsprodpb/0561/live/ae1fd0e0-e3d3-11ef-a319-fb4e7360c4ec.jpg.webp"
}: HorizontalNewsProps) {
  const { i18n } = useLingui();

  return (
    <View className="flex flex-row items-center w-[260px] px-5 mx-2">
      <View className=" flex-1 gap-3 justify-between">
        <Image
          source={{ uri: imgUrl }}
          className="h-[146px] w-[260px] rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-foreground text-medium font-medium">{title}</Text>
        <View className="flex flex-row justify-between items-center gap-2">
          <View className="flex flex-row items-center gap-2">
            <Image
              source={{ uri: authorAvatar }}
              className="h-8 w-8 rounded-full border border-border"
              resizeMode="cover"
            />
            <Text className="text-muted-foreground font-bold text-xs">
              {`${authorName}`}
            </Text>
            <ClockIcon className="size-5 text-muted-foreground" />
            <Text className="text-muted-foreground text-xs">{timestamp}</Text>
          </View>
          <Bookmark className="size-5 text-foreground" />
        </View>
      </View>
    </View>
  );
}
