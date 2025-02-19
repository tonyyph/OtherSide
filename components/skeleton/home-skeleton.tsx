import React from "react";
import { View } from "react-native";
import { Skeleton } from "../ui/skeleton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function HomeSkeleton() {
  const { top } = useSafeAreaInsets();

  return (
    <View className="flex-1" style={{ paddingTop: top }}>
      <Skeleton className="mt-3 h-80 rounded-none" />
      <View className="bg-background pt-5 bottom-4 rounded-t-2xl">
        <View className="flex flex-row gap-x-4 mt-3 items-center">
          <Skeleton className="ml-4 mb-5 h-8 w-16 rounded-full" />
          <Skeleton className="mr-4 mb-5 h-8 rounded-full flex-1" />
        </View>
        {React.Children.toArray(
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Skeleton className="mx-4 mt-3 mb-5 h-5 rounded-full" />
          ))
        )}
        <View className="flex flex-row gap-x-4 mt-3 items-center justify-between">
          <Skeleton className="ml-4 mb-5 h-6 w-20 rounded-full" />
          <View className="flex flex-row items-center gap-x-4 mr-6 ">
            {React.Children.toArray(
              [1, 2, 3].map((i) => (
                <Skeleton className="mb-5 h-6 w-10 rounded-full" />
              ))
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
