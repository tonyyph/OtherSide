import { resetPassword } from "@/api";
import { actionWithLoading, validatePassword } from "@/utils";
import { AxiosError } from "axios";
import { Alert, Keyboard } from "react-native";
import { useMemoFunc, useValidateInput } from "../commons";

export const useResetPassword = () => {
  const passwordState = useValidateInput({
    defaultValue: "",
    validate: validatePassword
  });

  const onResetPassword = useMemoFunc(
    actionWithLoading(async () => {
      const setError = (error: string = "Invalid email") => {
        passwordState.setState((prev) => ({ ...prev, error }));
      };

      try {
        console.log("passwordState.value", passwordState.value);
        const { data: messages } = await resetPassword({
          token: "TOKEN HERE",
          newPassword: passwordState.value
        });
        console.log("messages reset password", messages);
      } catch (error) {
        console.log("error:", error);

        setError((error as AxiosError<RestfulApiError>).response?.data?.error);
        Alert.alert(
          "Reset failed",
          "Your information is incorrect. Please check and try again.",
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
    passwordState,
    onResetPassword
  };
};
