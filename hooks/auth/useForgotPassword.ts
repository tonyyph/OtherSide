import { forgotPassword } from "@/api";
import { validateUsername } from "@/utils";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMemoFunc, useValidateInput } from "../commons";

export const useForgotPassword = () => {
  const emailState = useValidateInput({
    defaultValue: "",
    validate: validateUsername
  });
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const onForgotPassword = useMemoFunc(
    async (sheetRef: React.RefObject<BottomSheetModalMethods>) => {
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
        sheetRef.current?.present();
      } finally {
      }
    }
  );

  return {
    emailState,
    onForgotPassword,
    registerSuccess
  };
};
