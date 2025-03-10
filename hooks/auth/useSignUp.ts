import { signUpWithEmail } from "@/api";
import {
  actionWithLoading,
  validateLetter,
  validatePassword,
  validateUsername
} from "@/utils";
import { AxiosError } from "axios";
import { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { useMemoFunc, useValidateInput } from "../commons";

export const useSignUp = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const emailAddressState = useValidateInput({
    defaultValue: "",
    validate: validateUsername
  });
  const passwordState = useValidateInput({
    defaultValue: "",
    validate: validatePassword
  });
  const confirmPasswordState = useValidateInput({
    defaultValue: "",
    validate: validatePassword
  });
  const firstNameState = useValidateInput({
    defaultValue: "",
    validate: validateLetter
  });
  const lastNameState = useValidateInput({
    defaultValue: "",
    validate: validateLetter
  });
  const genderState = useValidateInput({
    defaultValue: "male",
    validate: validateLetter
  });
  const birthDayState = useValidateInput({
    defaultValue: "",
    validate: validateLetter
  });

  const onSignUp = useMemoFunc(
    actionWithLoading(async () => {
      const setError = (error: string = "Invalid password") => {
        passwordState.setState((prev) => ({ ...prev, error }));
      };

      console.log("first", {
        email: emailAddressState.value,
        password: passwordState.value,
        confirmPassword: confirmPasswordState.value,
        firstName: firstNameState.value,
        lastName: lastNameState.value,
        birthday: birthDayState.value,
        gender: genderState.value
      });
      try {
        const { data: session } = await signUpWithEmail({
          email: emailAddressState.value,
          password: passwordState.value,
          confirmPassword: confirmPasswordState.value,
          firstName: firstNameState.value,
          lastName: lastNameState.value,
          birthday: birthDayState.value,
          gender: genderState.value
        });
        if (!!session && session?.confirmationToken) {
          setRegisterSuccess(true);
        }
      } catch (error) {
        console.log("error:", error);

        setError((error as AxiosError<RestfulApiError>).response?.data?.error);
        Alert.alert(
          "Sign Up failed",
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
    emailAddressState,
    passwordState,
    confirmPasswordState,
    firstNameState,
    lastNameState,
    genderState,
    birthDayState,
    onSignUp,
    registerSuccess
  };
};
