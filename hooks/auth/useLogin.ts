import { loginWithUsername } from "@/api";
import { authenStore } from "@/stores/authenStore";
import { actionWithLoading, validatePassword, validateUsername } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import { Alert, Keyboard } from "react-native";
import { useMemoFunc, useValidateInput } from "../commons";

export const useLogin = () => {
  const navigation = useNavigation<NavigationProps<"LoginScreen">>();
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
    actionWithLoading(async () => {
      const setError = (error: string = "Invalid password") => {
        passwordState.setState((prev) => ({ ...prev, error }));
      };

      try {
        console.log("usernameState.value", usernameState.value);
        console.log("passwordState.value", passwordState.value);
        const { data: session } = await loginWithUsername({
          email: usernameState.value,
          password: passwordState.value
        });
        console.log("session", session);
        if (session && session.accessToken && session.refreshToken) {
          authenStore.setState({
            cookie: session
          });
        }
      } catch (error) {
        console.log("error:", error);

        setError((error as AxiosError<RestfulApiError>).response?.data?.error);
        Alert.alert(
          "Login failed",
          "Your username or password is incorrect. Please check and try again.",
          [
            {
              text: "OK",
              onPress: () => {
                Keyboard.dismiss();
              }
            }
          ]
        );
      } finally {
      }
    })
  );

  return {
    usernameState,
    cookieAccessState,
    cookieRefreshState,
    passwordState,
    onLogin
  };
};
