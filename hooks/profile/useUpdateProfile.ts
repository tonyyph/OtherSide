import { validateLetter, validateUsername } from "@/utils";
import { useEffect, useState } from "react";
import { useValidateInput } from "../commons";
import { useProfile } from "./useProfile";

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
  const { userProfile, loading } = useProfile();
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

  useEffect(() => {
    if (!!userProfile) {
      firstNameState.onChangeText(userProfile?.first_name || "");
      lastNameState.onChangeText(userProfile?.last_name || "");
      genderState.onChangeText(userProfile?.gender || "");
      birthDayState.onChangeText(userProfile?.birthday || "");
      emailAddressState.onChangeText(userProfile?.email || "");
    }
  }, [userProfile]);

  return {
    userProfile,
    loading,
    updateProfileSuccess,
    firstNameState,
    lastNameState,
    genderState,
    birthDayState,
    emailAddressState
  };
};
