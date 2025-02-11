import { ScrollView, Text, View } from "react-native";

export function CategoryNews({}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="flex flex-row gap-2 px-6 mb-6"
    >
      <View className="border rounded-full border-blue-400 px-3 py-1">
        <Text className="text-blue-400">All</Text>
      </View>
      <View className="border border-border rounded-full px-3 py-1">
        <Text className="text-foreground">Trending</Text>
      </View>
      <View className="border border-border rounded-full px-3 py-1">
        <Text className="text-foreground">Sport</Text>
      </View>
      <View className="border border-border rounded-full px-3 py-1">
        <Text className="text-foreground">Business</Text>
      </View>
      <View className="border border-border rounded-full px-3 py-1">
        <Text className="text-foreground">Innovation</Text>
      </View>
      <View className="border border-border rounded-full px-3 py-1">
        <Text className="text-foreground">Culture</Text>
      </View>
      <View className="border border-border rounded-full px-3 py-1">
        <Text className="text-foreground">Arts</Text>
      </View>
      <View className="border border-border rounded-full px-3 py-1">
        <Text className="text-foreground">Travel</Text>
      </View>
      <View className="border border-border rounded-full px-3 py-1">
        <Text className="text-foreground">Earth</Text>
      </View>
      <View className="border border-border rounded-full px-3 py-1">
        <Text className="text-foreground">Politics</Text>
      </View>
    </ScrollView>
  );
}
