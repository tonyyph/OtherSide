import { useMemoFunc } from "@/hooks/commons";
import { useUserAuthenticateStore } from "@/stores";
import { authenStore } from "@/stores/authenStore";

export const useLogout = () => {
  const { setIsLoggedIn } = useUserAuthenticateStore();

  const onLogout = useMemoFunc(async () => {
    authenStore.setState({ cookie: undefined });
    setIsLoggedIn(false);
  });

  return {
    onLogout
  };
};
