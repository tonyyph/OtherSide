import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { FeatureFlag, useFeatureFlag } from "@/hooks/use-feature-flag";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Palette, themeVariables } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { useUserSettingsStore } from "@/stores/user-settings/store";
import * as Haptics from "expo-haptics";
import { LockKeyholeIcon, MoonStarIcon, SunIcon } from "lucide-react-native";
import { vars } from "nativewind";
import { ScrollView, StatusBar, View, useWindowDimensions } from "react-native";

export default function AppearanceScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { preferredPalette, setPreferredPalette } = useUserSettingsStore();
  const width = useWindowDimensions().width;
  const isDynamicColorPaletteEnabled = useFeatureFlag(
    FeatureFlag.DynamicColorPalette
  );

  const palettes = [
    {
      id: Palette.Default,
      label: `Default`,
      themeVariables: themeVariables[Palette.Default]["dark"],
      pro: false
    },
    {
      id: Palette.TokyoNight,
      label: `Tokyo Night`,
      themeVariables: themeVariables[Palette.TokyoNight]["dark"],
      pro: false
    },
    {
      id: Palette.WinterIsComing,
      label: `Winter is coming`,
      themeVariables: themeVariables[Palette.WinterIsComing]["dark"],
      pro: false
    },
    {
      id: Palette.Catppuccin,
      label: `Catppuccin`,
      themeVariables: themeVariables[Palette.Catppuccin]["dark"],
      pro: false
    },
    {
      id: Palette.RosePine,
      label: `Rosé Pine`,
      themeVariables: themeVariables[Palette.RosePine]["dark"],
      pro: false
    }
  ];

  return (
    <ScrollView className="bg-background" contentContainerClassName="px-6 py-3">
      <Text className="font-semiBold text-base text-foreground">
        {`App theme`}
      </Text>
      <Text className="mb-4 text-muted-foreground text-sm">
        {`Toggle between light and dark mode`}
      </Text>
      <Tabs
        value={colorScheme || "light"}
        onValueChange={(value: any) => {
          setColorScheme(value);
          if (value === "dark") {
            StatusBar.setBarStyle("light-content");
          } else {
            StatusBar.setBarStyle("dark-content");
          }
        }}
      >
        <TabsList>
          <TabsTrigger value="light">
            <SunIcon className="h-5 w-5 text-muted-foreground" />
            <Text>{`Light`}</Text>
          </TabsTrigger>
          <TabsTrigger value="dark">
            <MoonStarIcon className="h-5 w-5 text-muted-foreground" />
            <Text>{`Dark`}</Text>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {!isDynamicColorPaletteEnabled && (
        <>
          <Text className="mt-8 font-semiBold text-base text-foreground">
            {`Color palette`}
          </Text>
          <Text className="mb-4 text-muted-foreground text-sm">
            {`Choose a preferred color palette for OtherSide`}
          </Text>
          <View className="flex-row flex-wrap gap-4">
            {palettes.map((palette) => (
              <View key={palette.id} style={vars(palette.themeVariables)}>
                <Button
                  variant={"outline"}
                  size="lg"
                  className={cn(
                    "!border-2 !h-32 rounded-xl p-1 active:bg-background",
                    palette.id === preferredPalette && "!border-primary"
                  )}
                  onPress={() => {
                    setPreferredPalette(palette.id);
                    Haptics.notificationAsync(
                      Haptics.NotificationFeedbackType.Success
                    );
                  }}
                  style={{ width: (width - 12 * 4) / 2 - 4 }}
                >
                  <View className="h-full flex-1 items-center justify-center rounded-md bg-background">
                    <Text className="!text-5xl !text-primary mb-2 font-semiBold">
                      Aa
                    </Text>
                  </View>
                  <View className="absolute right-1 bottom-1 left-1 w-full rounded-b-md bg-muted py-1">
                    <Text className="!text-xs text-center font-medium text-foreground uppercase">
                      {palette.label}
                    </Text>
                  </View>

                  {palette.pro && (
                    <Badge
                      variant="secondary"
                      className="absolute top-1 right-1 rounded-lg py-1.5"
                    >
                      <LockKeyholeIcon className="size-4 text-primary" />
                    </Badge>
                  )}
                </Button>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}
