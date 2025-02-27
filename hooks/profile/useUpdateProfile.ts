import { updateUserProfile } from "@/api";
import { userStore } from "@/stores/userStore";
import {
  actionWithLoading,
  validateLetter,
  validatePassword,
  validateUsername
} from "@/utils";
import { useEffect, useRef, useState } from "react";
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

export const useUpdateProfile = () => {
  const [updateProfileSuccess, setUpdateProfileSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const userProfile = userStore.getState().userProfile;

  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const emailAddressState = useValidateInput({
    defaultValue: userProfile?.email,
    validate: validateUsername
  });
  const firstNameState = useValidateInput({
    defaultValue: userProfile?.first_name,
    validate: validateLetter
  });

  const lastNameState = useValidateInput({
    defaultValue: userProfile?.last_name,
    validate: validateLetter
  });

  const genderState = useValidateInput({
    defaultValue: userProfile?.gender,
    validate: validateLetter
  });

  const birthDayState = useValidateInput({
    defaultValue: userProfile?.birthday,
    validate: validateLetter
  });

  const passwordState = useValidateInput({
    defaultValue: "",
    validate: validatePassword
  });

  useEffect(() => {
    if (!!userProfile) {
      firstNameState.onChangeText(userProfile?.first_name || "");
      lastNameState.onChangeText(userProfile?.last_name || "");
      genderState.onChangeText(userProfile?.gender || "");
      birthDayState.onChangeText(userProfile?.birthday || "");
      emailAddressState.onChangeText(userProfile?.email || "");
      hideTimer.current = setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [userProfile]);

  const onUpdateProfile = useMemoFunc(
    actionWithLoading(async () => {
      try {
        const { data: session } = await updateUserProfile({
          email: emailAddressState.value,
          first_name: firstNameState.value,
          last_name: lastNameState.value,
          birthday: birthDayState.value,
          gender: genderState.value,
          id: userProfile?.id ?? 0
        });
        if (session) {
          console.log("session", session);
          setUpdateProfileSuccess(true);
        }
      } catch (error) {
        console.log("error:", error);
      } finally {
        setLoading(false);
      }
    })
  );

  return {
    userProfile,
    loading,
    updateProfileSuccess,
    firstNameState,
    lastNameState,
    genderState,
    birthDayState,
    emailAddressState,
    onUpdateProfile,
    passwordState,
    setUpdateProfileSuccess
  };
};
