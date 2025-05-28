import { Text } from "@/components/ui/text";
import { useEngagement } from "@/hooks/article/useEngagement";
import { formatDateTimeShort } from "@/lib/date";
import React, { useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import Animated from "react-native-reanimated";

type CommentProps = {
  id: string;
  commentData: Comments[] | undefined;
};

export default function ArticleDetailScreen({ id, commentData }: CommentProps) {
  const { getEngagementArticles, data } = useEngagement();

  useEffect(() => {
    !!id && getEngagementArticles(id);
  }, [id, getEngagementArticles]);

  const comments = commentData ?? data?.comments;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View className="gap-3 justify-between z-10">
        <View className="p-5 gap-4 justify-between mx-3">
          {React.Children.toArray(
            comments?.map((comment, index) => (
              <View>
                <View className="flex flex-row items-center gap-4">
                  <View className=" flex-1 pb-2">
                    <Text className="text-sm font-medium ita text-white">
                      {comment?.user?.firstName}
                    </Text>
                    <Text>{comment?.text}</Text>
                    <Text className="text-sm text-muted-foreground">
                      {formatDateTimeShort?.(comment?.createdAt) ?? null}
                    </Text>
                  </View>
                </View>
                {comments?.length > 1 && comments?.length - 1 > index && (
                  <View className="h-[1px] bg-border mt-2" />
                )}
              </View>
            ))
          )}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
