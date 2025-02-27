import { View } from "react-native";
import { Skeleton } from "../ui/skeleton";

export function ListSkeleton() {
  return (
    <View>
      <View className="mb-3 mt-4 gap-5 px-6">
        <Skeleton className="h-6 w-[30%] rounded-full" />
        <View className="mb-3 flex-row justify-between items-center gap-5">
          <Skeleton className="h-6 w-[80%] rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </View>
        <View className="mb-3 flex-row justify-between items-center gap-5">
          <Skeleton className="h-6 w-[80%] rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </View>
        <Skeleton className="h-6 w-[40%] rounded-full" />
        <View className="mb-3 flex-row justify-between items-center gap-5 ">
          <Skeleton className="h-6 w-[80%] rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </View>
        <View className="mb-3 flex-row justify-between items-center gap-5">
          <Skeleton className="h-6 w-[80%] rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </View>
        <View className="mb-3 flex-row justify-between items-center gap-5">
          <Skeleton className="h-6 w-[80%] rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </View>
        <View className="mb-3 flex-row justify-between items-center gap-5">
          <Skeleton className="h-6 w-[80%] rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </View>
        <Skeleton className="h-6 w-[40%] rounded-full" />
        <View className="mb-3 flex-row justify-between items-center gap-5">
          <Skeleton className="h-6 w-[80%] rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </View>
        <View className="mb-3 flex-row justify-between items-center gap-5">
          <Skeleton className="h-6 w-[80%] rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </View>
        <View className="mb-3 flex-row justify-between items-center gap-5">
          <Skeleton className="h-6 w-[80%] rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </View>
        <View className="mb-3 flex-row justify-between items-center gap-5">
          <Skeleton className="h-6 w-[80%] rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </View>
        <Skeleton className="h-6 w-[30%] rounded-full" />
      </View>
      <Skeleton className="mx-auto h-16 w-16 rounded-full" />
    </View>
  );
}
