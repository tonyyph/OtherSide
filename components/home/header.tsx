import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { UserAvatar } from "../common/user-avatar";
import { Text } from "../ui/text";
import { Bell } from "lucide-react-native";

type HomeHeaderProps = {
  walletAccountId?: string;
  onWalletAccountChange?: (walletAccountId?: string) => void;
};

export function HomeHeader({}: HomeHeaderProps) {
  //   const { user } = useUser()
  const router = useRouter();
  const user = {
    id: "123",
    fullName: "Tony Phan",
    imageUrl:
      "https://media.licdn.com/dms/image/v2/C4E0BAQHRcd8MW8NoEQ/company-logo_200_200/company-logo_200_200/0/1631373100497?e=2147483647&v=beta&t=1pTjV_f6c_HEPpm-zTeobA6HYV_YNV4aLrGLGBB0K-w"
  };

  return (
    <View className="flex flex-row items-center justify-between gap-4 bg-background px-6 pb-3">
      <View className="flex flex-1 flex-row items-center gap-3">
        <TouchableOpacity
          activeOpacity={0.8}
          //   onPress={() => router.push('/(app)/profile')}
        >
          <UserAvatar user={user!} />
        </TouchableOpacity>
        <View className="flex-1 gap-1">
          <Text className="line-clamp-1 font-semiBold text-muted-foreground text-sm">
            {"Tony Ph"}
          </Text>
          {/* <SelectWalletAccount
            value={walletAccountId}
            onSelect={onWalletAccountChange}
          /> */}
        </View>
      </View>
      <Bell className="h-6 w-6 text-muted-foreground" />
      {/* <SelectFilter value={filter} onSelect={onFilterChange} /> */}
    </View>
  );
}
