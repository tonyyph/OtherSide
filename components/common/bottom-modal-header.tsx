import { AccessibilityRole, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { memoFC } from "@/utils";
import { CloseIcon } from "./icons";

export type TitleAccessible = {
  titleAccessible?: boolean;
  titleAccessibilityRole?: AccessibilityRole;
};

type Props = {
  title?: string;
  onClose?: () => void;
  accessible?: TitleAccessible;
  saving?: boolean;
};
export const BottomModalHeader = memoFC(
  ({ title, accessible, onClose, saving }: Props) => {
    return (
      <View className="flex-row p-4 items-center bg-gray-100 rounded-tl-[24px] rounded-tr-[24px]">
        <Text
          className="text-lg font-semibold"
          accessible={accessible?.titleAccessible}
          accessibilityRole={accessible?.titleAccessibilityRole}
          accessibilityLabel={title}
        >
          {title}
        </Text>
        <View className="flex-grow" />
        {saving && (
          <Text className="text-xs text-gray-700 mr-1">Saving...</Text>
        )}
        <TouchableOpacity
          onPress={onClose}
          className="w-8 h-8 rounded-lg justify-center items-center bg-white"
        >
          <CloseIcon size={16} />
        </TouchableOpacity>
      </View>
    );
  }
);
