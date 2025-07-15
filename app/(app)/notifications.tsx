import { ScrollView, Text } from "react-native";

export default function NotificationsScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="bg-background"
      contentContainerClassName="py-6"
    >
      <Text className="text-foreground text-base font-bold px-6 mb-6">
        Today, April 22
      </Text>
    </ScrollView>
  );
}
