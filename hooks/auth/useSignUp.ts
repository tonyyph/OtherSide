import { signUpWithEmail } from "@/api";
import { formatDateTimeShort } from "@/lib/date";
import { validateEmail, validateLetter, validatePassword } from "@/utils";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { AxiosError } from "axios";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useMemoFunc, useValidateInput } from "../commons";

export const useSignUp = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailAddressState = useValidateInput({
    defaultValue: "",
    validate: validateEmail
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
  const genderState = useValidateInput({
    defaultValue: "male",
    validate: validateLetter
  });

  const birthDayState = useValidateInput({
    defaultValue: formatDateTimeShort(new Date()),
    validate: validateLetter
  });

  const onSignUp = useMemoFunc(
    async (sheetRef: React.RefObject<BottomSheetModalMethods>) => {
      setLoading(true);
      const setError = (error: string = "Invalid password") => {
        confirmPasswordState.setState((prev) => ({ ...prev, error }));
      };

      if (
        passwordState.value !== confirmPasswordState.value &&
        passwordState.value?.length >= 6
      ) {
        setError(
          "The password you entered in the 'Confirm Password' field does not match the original password."
        );
        sheetRef.current?.present();
        setLoading(false);
        return;
      }

      if (passwordState.value.length < 6) {
        setError(
          "The password you’ve entered is too short. Please make sure your password is at least 6 characters long and contains a combination of letters, numbers, and special characters for better security."
        );
        sheetRef.current?.present();
        setLoading(false);
        return;
      }

      if (!emailAddressState?.value?.includes("@")) {
        setError(
          "The email address you provided is not in a valid format. Please make sure to enter a valid email address (e.g., example@domain.com) and try again."
        );
        sheetRef.current?.present();
        setLoading(false);
        return;
      }

      try {
        const { data: session } = await signUpWithEmail({
          email: emailAddressState.value,
          password: passwordState.value,
          confirmPassword: confirmPasswordState.value,
          firstName: firstNameState.value,
          gender: genderState.value,
          birthday: isEmpty(birthDayState.value)
            ? birthDayState?.defaultValue
            : birthDayState.value
        });
        if (!!session && session?.confirmationToken) {
          setRegisterSuccess(true);
        }
      } catch (error) {
        console.log(
          "error:",
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );

        if (
          (error as AxiosError<RestfulApiError>).response?.data?.message ===
          "Email is already in use"
        ) {
          setError(
            "The email address you provided is already associated with an existing account."
          );
        } else {
          setError(
            (error as AxiosError<RestfulApiError>).response?.data?.message
          );
        }

        sheetRef.current?.present();
      } finally {
        setLoading(false);
      }
    }
  );

  return {
    emailAddressState,
    passwordState,
    confirmPasswordState,
    firstNameState,
    genderState,
    onSignUp,
    registerSuccess,
    loading,
    birthDayState
  };
};
