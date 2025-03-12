import { loginWithUsername } from "@/api";
import { useUserAuthenticateStore } from "@/stores";
import { authenStore } from "@/stores/authenStore";
import { validatePassword, validateUsername } from "@/utils";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMemoFunc, useValidateInput } from "../commons";

export const useLogin = () => {
  const { setIsLoggedIn } = useUserAuthenticateStore();
  const [loading, setLoading] = useState(false);

  const usernameState = useValidateInput({
    defaultValue: "",
    validate: validateUsername
  });
  const passwordState = useValidateInput({
    defaultValue: "",
    validate: validatePassword
  });
  const cookieAccessState = useValidateInput({ defaultValue: "" });
  const cookieRefreshState = useValidateInput({ defaultValue: "" });

  const onLogin = useMemoFunc(
    async (sheetRef: React.RefObject<BottomSheetModalMethods>) => {
      passwordState.setState({ error: "", valid: true });
      const setError = (error: string = "Invalid password") => {
        passwordState.setState((prev) => ({ ...prev, error }));
      };
      setLoading(true);
      try {
        const { data: session } = await loginWithUsername({
          email: usernameState.value,
          password: passwordState.value
        });
        if (session && session.accessToken && session.refreshToken) {
          setIsLoggedIn(true);
          authenStore.setState({
            cookie: session
          });
        }
      } catch (error) {
        setError(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
        sheetRef.current?.present();
      } finally {
        setLoading(false);
      }
    }
  );

  return {
    usernameState,
    cookieAccessState,
    cookieRefreshState,
    passwordState,
    onLogin,
    loading
  };
};
