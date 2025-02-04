import { BackButton } from "@/components/common/back-button";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "230 8% 85%"
        },
        headerShadowVisible: false,
        headerLeft: () => <BackButton />,
        headerTitle: ""
      }}
    >
      <Stack.Screen
        name="step-one"
        options={{
          headerLeft: () => null
        }}
      />
      <Stack.Screen
        name="step-two"
        options={{
          headerStyle: {
            backgroundColor: "230 12% 81%"
          }
        }}
      />
      <Stack.Screen name="step-three" />
    </Stack>
  );
}
