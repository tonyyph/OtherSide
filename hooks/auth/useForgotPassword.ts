import { forgotPassword } from "@/api";
import { actionWithLoading, validateUsername } from "@/utils";
import { AxiosError } from "axios";
import { Alert, Keyboard } from "react-native";
import { useMemoFunc, useValidateInput } from "../commons";

export const useForgotPassword = () => {
  const emailState = useValidateInput({
    defaultValue: "",
    validate: validateUsername
  });

  const onForgotPassword = useMemoFunc(
    actionWithLoading(async () => {
      const setError = (error: string = "Invalid email") => {
        emailState.setState((prev) => ({ ...prev, error }));
      };

      try {
        console.log("emailState.value", emailState.value);
        const { data: messages } = await forgotPassword({
          email: emailState.value
        });
        console.log("messages", messages);
      } catch (error) {
        console.log("error:", error);

        setError((error as AxiosError<RestfulApiError>).response?.data?.error);
        Alert.alert(
          "Authentication failed",
          "Your email is incorrect. Please check and try again.",
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
    emailState,
    onForgotPassword
  };
};
