import { CrownIcon, PencilIcon } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

import { UserAvatar } from "../common/user-avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

import { userStore } from "@/stores/userStore";
import { Link, useRouter } from "expo-router";

export function ProfileCard() {
  const router = useRouter();
  const userProfile = userStore.getState().userProfile;

  return (
    <View className="mx-6 flex-row items-center justify-center overflow-hidden rounded-lg">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/(app)/profile-edit")}
        className="flex flex-1 flex-row items-center justify-center gap-3"
      >
        <UserAvatar
          imageUrl="https://media.licdn.com/dms/image/v2/C4E0BAQHRcd8MW8NoEQ/company-logo_200_200/company-logo_200_200/0/1631373100497?e=2147483647&v=beta&t=1pTjV_f6c_HEPpm-zTeobA6HYV_YNV4aLrGLGBB0K-w"
          fallbackClassName="bg-background"
          className="h-16 w-16"
        />
        <View className="flex-1 justify-center gap-1.5">
          <Text className="line-clamp-1 font-semiBold">
            {userProfile?.firstName ?? ""}
          </Text>
          <Badge
            variant="default"
            className="flex-row gap-1 self-start rounded-md"
          >
            {true && <CrownIcon className="size-4 text-primary-foreground" />}
            <Text className="font-medium text-sm text-center">
              {userProfile?.role
                ? userProfile?.role.toLocaleUpperCase()
                : "Admin"}
            </Text>
          </Badge>
        </View>
      </TouchableOpacity>
      <Link href="/(app)/profile-edit" asChild>
        <Button size="icon" variant="ghost">
          <PencilIcon className="h-5 w-5 text-foreground" />
        </Button>
      </Link>
    </View>
  );
}
