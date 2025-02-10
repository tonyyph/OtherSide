import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Bookmark, ClockIcon } from "lucide-react-native";
import { Image, Text, View } from "react-native";

type NotificationItemProps = {
  title?: string;
  authorName?: string;
  timestamp?: string;
  category?: string;
  authorAvatar?: string;
  imgUrl?: string;
};

export function NotificationItem({
  title = `'Studio sex' and 'hitman threats': Insiders speak out about Diddy's 90s music empire`,
  authorName = "BBC News",
  authorAvatar = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1024px-BBC_News_2019.svg.png",
  timestamp = "13 hours ago",
  category,
  imgUrl = "https://ichef.bbci.co.uk/news/1536/cpsprodpb/0561/live/ae1fd0e0-e3d3-11ef-a319-fb4e7360c4ec.jpg.webp"
}: NotificationItemProps) {
  const { i18n } = useLingui();

  return (
    <View className="flex flex-row items-center mx-6 p-4 my-2 bg-slate-200 rounded-lg">
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1024px-BBC_News_2019.svg.png"
        }}
        className="h-[70px] w-[70px] rounded-full border border-border"
        resizeMode="cover"
      />
      <View className="flex-1 ml-4 justify-between">
        <Text className="text-foreground font-semiBold text-medium">
          BBC News has posted new europe news “Ukraine's President Zele...”
        </Text>
        <Text className="text-muted-foreground text-xs mt-2">15m ago</Text>
      </View>
    </View>
  );
}
