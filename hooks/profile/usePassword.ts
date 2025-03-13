import { changePassword } from "@/api";
import { actionWithLoading, validatePassword } from "@/utils";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMemoFunc, useValidateInput } from "../commons";

type userProps = {
  id?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  birthday?: string;
  gender?: string;
  language?: string;
  updatedAt?: string;
  createdAt?: string;
};

export const usePassword = () => {
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const passwordState = useValidateInput({
    defaultValue: "",
    validate: validatePassword
  });

  const newPasswordState = useValidateInput({
    defaultValue: "",
    validate: validatePassword
  });

  const confirmNewPasswordState = useValidateInput({
    defaultValue: "",
    validate: validatePassword
  });

  const onChangePassword = useMemoFunc(
    actionWithLoading(async () => {
      const setError = (error: string = "Invalid password") => {
        confirmNewPasswordState.setState((prev) => ({ ...prev, error }));
      };

      if (newPasswordState.value !== confirmNewPasswordState.value) {
        setError("Password does not match");
        return;
      }

      try {
        const { data: session } = await changePassword({
          currentPassword: passwordState.value,
          newPassword: newPasswordState.value
        });
        if (session) {
          setChangePasswordSuccess(true);
        }
      } catch (error) {
        setError(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
      } finally {
        setLoading(false);
      }
    })
  );

  return {
    loading,
    changePasswordSuccess,
    onChangePassword,
    passwordState,
    newPasswordState,
    confirmNewPasswordState,
    setChangePasswordSuccess
  };
};
