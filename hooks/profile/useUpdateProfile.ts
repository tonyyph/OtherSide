import { updateUserProfile } from "@/api";
import { useUserProfileStore } from "@/stores/user-profile/store";
import { userStore } from "@/stores/userStore";
import { actionWithLoading, validateLetter, validateUsername } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useMemoFunc, useValidateInput } from "../commons";

export const useUpdateProfile = () => {
  const [updateProfileSuccess, setUpdateProfileSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const userProfile = userStore.getState().userProfile;
  const { setIsUpdateProfile } = useUserProfileStore();

  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const emailAddressState = useValidateInput({
    defaultValue: userProfile?.email,
    validate: validateUsername
  });
  const firstNameState = useValidateInput({
    defaultValue: userProfile?.firstName,
    validate: validateLetter
  });

  const lastNameState = useValidateInput({
    defaultValue: userProfile?.lastName,
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
      firstNameState.onChangeText(userProfile?.firstName || "");
      lastNameState.onChangeText(userProfile?.lastName || "");
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
          firstName: firstNameState.value,
          lastName: lastNameState.value,
          birthday: birthDayState.value,
          gender: genderState.value
        });
        if (session) {
          userStore.setState({
            userProfile: {
              id: session.id,
              email: session.email,
              firstName: session.firstName,
              lastName: session.lastName,
              birthday: session.birthday,
              gender: session.gender,
              language: session.language,
              createdAt: session.createdAt,
              updatedAt: session.updatedAt
            }
          });
          setIsUpdateProfile(true);
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
    setUpdateProfileSuccess
  };
};
