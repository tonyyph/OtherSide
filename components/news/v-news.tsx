import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Bookmark, BookmarkCheckIcon, ClockIcon } from "lucide-react-native";
import { Image, Text, View } from "react-native";
import { BookmarkFilled } from "../common/icons";

type VerticalNewsProps = {
  title?: string;
  authorName?: string;
  timestamp?: string;
  side?: string;
  authorAvatar?: string;
  imgUrl?: string;
  isBookmarked?: boolean;
  content?: string;
};
export function VerticalNews({
  title,
  timestamp,
  side = "Left",
  imgUrl,
  isBookmarked = false,
  content
}: VerticalNewsProps) {
  const { i18n } = useLingui();

  return (
    <View className="flex flex-row items-center px-6 my-2">
      <View className="flex gap-3 flex-row">
        <Image
          source={{
            uri:
              imgUrl ??
              "https://reliasoftware.com/images/careers/relia-software-office.webp"
          }}
          className="h-[120px] w-[120px] border border-border rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1">
          <View className="flex flex-row items-center gap-2">
            <View
              style={{
                backgroundColor: side === "Right" ? "#ef4444" : "#3b82f6"
              }}
              className="rounded-full px-3 py-[2px] self-start items-center justify-center"
            >
              <Text className="!text-xs !text-blue-50 font-semiBold">
                {side ?? "Left"}
              </Text>
            </View>
            <View className="flex-1 flex-row justify-between items-center gap-2">
              <View className="flex flex-row items-center gap-2">
                <ClockIcon className="size-5 text-muted-foreground" />
                <Text className="text-muted-foreground text-xs">
                  {timestamp}
                </Text>
              </View>
              <View className="flex">
                {isBookmarked ? (
                  <BookmarkFilled className="size-5 text-blue-600" />
                ) : (
                  <Bookmark className="size-5 text-foreground" />
                )}
              </View>
            </View>
          </View>
          <Text
            numberOfLines={2}
            className="text-white text-medium font-medium mt-3"
          >
            {title}
          </Text>
          <Text
            numberOfLines={2}
            className="text-foreground text-xs font-medium mt-3"
          >
            {content}
          </Text>
        </View>
      </View>
    </View>
  );
}
