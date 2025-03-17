import { TabBar } from "@/components/common/tab-bar";
import { useColorPalette } from "@/hooks/use-color-palette";
import { Tabs } from "expo-router";
import { BarChartBigIcon } from "lucide-react-native";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { getColor } = useColorPalette();
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: getColor("--background"),
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          borderWidth: 1,
          borderTopWidth: 1,
          backgroundColor: getColor("--background"),
          borderColor: getColor("--border"),
          borderTopColor: getColor("--border"),
          bottom: bottom ? 36 : 16,
          marginHorizontal: (width - (8 * 5 + 48 * 4 + 16)) / 2,
          paddingVertical: 0,
          paddingBottom: 0,
          height: 64,
          borderRadius: 16
        },
        headerTitleStyle: {
          fontFamily: "Poppins-SemiBold",
          fontSize: 16,
          color: getColor("--foreground")
        },
        headerStyle: {
          backgroundColor: getColor("--background")
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: `Home`,
          headerTitleStyle: { marginLeft: 5 },
          headerTitleAlign: "center"
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          headerTitle: `Explore`,
          headerTitleStyle: { marginLeft: 5 },
          headerTitleAlign: "center"
        }}
      />

      <Tabs.Screen
        name="bookmarks"
        options={{
          headerTitle: `Bookmarks`,
          headerTitleStyle: { marginLeft: 5 },
          headerTitleAlign: "center"
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          headerTitleStyle: { marginLeft: 5 },
          headerTitleAlign: "center",
          headerTitle: `Profile`,
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <BarChartBigIcon color={color} />
        }}
      />
    </Tabs>
  );
}
