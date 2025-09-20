import { useMemoFunc } from "@/hooks/commons";
import { useUserAuthenticateStore } from "@/stores";
import { authenStore } from "@/stores/authenStore";
import { userStore } from "@/stores/userStore";

export const useLogout = () => {
  const { setIsLoggedIn } = useUserAuthenticateStore();

  const onLogout = useMemoFunc(async () => {
    try {
      authenStore.setState({ cookie: undefined });
      userStore.setState({ userProfile: undefined });
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  });

  return {
    onLogout
  };
};
