import { exactDesign } from "@/utils";
import LottieView from "lottie-react-native";
import { Modal, View } from "react-native";

export function LoadingScreen({ loading = false }: { loading: boolean }) {
  return (
    <Modal visible={loading} animationType="fade" transparent>
      <View className="flex-1 justify-center bg-overlay items-center">
        <LottieView
          style={{ width: exactDesign(160), height: exactDesign(160) }}
          source={require("@/assets/json/loading.json")}
          autoPlay
          loop
        />
      </View>
    </Modal>
  );
}
