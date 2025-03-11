import { forgotPassword } from "@/api";
import { actionWithLoading, validateUsername } from "@/utils";
import { AxiosError } from "axios";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { useMemoFunc, useValidateInput } from "../commons";

export const useForgotPassword = () => {
  const emailState = useValidateInput({
    defaultValue: "",
    validate: validateUsername
  });
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const onForgotPassword = useMemoFunc(
    actionWithLoading(async () => {
      const setError = (error: string = "Invalid email") => {
        emailState.setState((prev) => ({ ...prev, error }));
      };

      try {
        const { data: messages } = await forgotPassword({
          email: emailState.value
        });
        if (!!messages) {
          setRegisterSuccess(true);
        }
      } catch (error) {
        console.log(
          "error:",
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );

        setError(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
        Alert.alert(
          "Authentication failed",
          `${(error as AxiosError<RestfulApiError>).response?.data?.message}`,
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
    onForgotPassword,
    registerSuccess
  };
};
