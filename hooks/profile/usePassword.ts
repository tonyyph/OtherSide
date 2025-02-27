import { changePassword } from "@/api";
import { actionWithLoading, validatePassword } from "@/utils";
import { useState } from "react";
import { useMemoFunc, useValidateInput } from "../commons";

type userProps = {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
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
      try {
        const { data: session } = await changePassword({
          current_password: passwordState.value,
          new_password: newPasswordState.value
        });
        if (session) {
          console.log("session change password", session);
          setChangePasswordSuccess(true);
        }
      } catch (error) {
        console.log("error:", error);
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
