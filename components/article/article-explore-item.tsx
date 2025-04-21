import { formatDateTime } from "@/lib/date";
import { router } from "expo-router";
import { ClockIcon } from "lucide-react-native";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

export const ArticleExploreItem = ({ item }: { item: any }) => {
  const [defaultImg, setDefaultImg] = useState(
    item.leftPerspective?.imageUrl ?? item.rightPerspective?.imageUrl
  );

  return (
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
            uri: !!defaultImg
              ? defaultImg
              : (item.leftPerspective?.imageUrl ??
                  item.rightPerspective?.imageUrl) ||
                "https://image5.photobiz.com/1592/14_20171212102313_8219173_large.jpg"
          }}
          onError={() => {
            setDefaultImg(
              "https://image5.photobiz.com/1592/14_20171212102313_8219173_large.jpg"
            );
          }}
          className="h-[220px] rounded-lg"
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
};
