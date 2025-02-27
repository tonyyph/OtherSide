import { useUserAuthenticateStore } from "@/stores/user-authenticate/store";
import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export default function UnAuthenticatedLayout() {
  const { isLoggedIn } = useUserAuthenticateStore();

  if (isLoggedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
