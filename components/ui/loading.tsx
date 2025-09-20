import { ActivityIndicator, Modal, View } from "react-native";

export function LoadingScreen({ loading = false }: { loading: boolean }) {
  return (
    <Modal visible={loading} animationType="fade" transparent>
      <View className="flex-1 justify-center bg-overlay items-center">
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
}
