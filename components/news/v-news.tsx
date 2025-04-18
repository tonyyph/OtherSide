import { useEngagement } from "@/hooks/article/useEngagement";
import { ClockIcon, EllipsisIcon } from "lucide-react-native";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

type VerticalNewsProps = {
  item?: any;
  timestamp?: string;
};
export function VerticalNews({ item, timestamp }: VerticalNewsProps) {
  const { onDeleteBookmarkDetail } = useEngagement();
  return (
    <View className="flex-1 flex-row items-center px-6 gap-2 my-2">
      <View className="flex-1 gap-3 flex-row">
        <Image
          source={{
            uri:
              item?.imageUrl ??
              "https://reliasoftware.com/images/careers/relia-software-office.webp"
          }}
          className="h-[120px] w-[120px] border border-border rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1">
          <View className="flex flex-row items-center gap-2">
            <View
              style={{
                backgroundColor:
                  (item?.perspectiveType ?? "Left") === "Right"
                    ? "#ef4444"
                    : "#3b82f6"
              }}
              className="rounded-full px-3 py-[2px] self-start items-center justify-center"
            >
              <Text className="!text-xs !text-blue-50 font-semiBold">
                {item?.perspectiveType ?? "Left"}
              </Text>
            </View>
            <View className="flex-1 flex-row justify-between items-center gap-2">
              <View className="flex flex-row items-center gap-2">
                <ClockIcon className="size-5 text-muted-foreground" />
                <Text className="text-muted-foreground text-xs">
                  {timestamp}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    `Are you sure you want to remove this bookmark?`,
                    "",
                    [
                      {
                        text: `Cancel`,
                        style: "cancel"
                      },
                      {
                        text: `Confirm`,
                        style: "destructive",
                        onPress: async () => {
                          onDeleteBookmarkDetail(item?.id);
                        }
                      }
                    ]
                  );
                }}
              >
                <EllipsisIcon className="size-6 text-muted-foreground" />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            numberOfLines={2}
            className="text-white text-medium font-medium mt-3"
          >
            {item?.title ?? ""}
          </Text>
          <Text
            numberOfLines={2}
            className="text-foreground text-xs font-medium mt-3"
          >
            {item?.content ?? ""}
          </Text>
        </View>
      </View>
    </View>
  );
}
