import { deleteAccount, updateUserProfile } from "@/api";
import { useUserAuthenticateStore } from "@/stores";
import { authenStore } from "@/stores/authenStore";
import { useUserProfileStore } from "@/stores/user-profile/store";
import { userStore } from "@/stores/userStore";
import {
  actionWithLoading,
  validateLetter,
  validatePassword,
  validateUsername
} from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useMemoFunc, useValidateInput } from "../commons";

export const useUpdateProfile = () => {
  const [updateProfileSuccess, setUpdateProfileSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const userProfile = userStore.getState().userProfile;
  const { setIsUpdateProfile } = useUserProfileStore();
  const { setIsLoggedIn } = useUserAuthenticateStore();

  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const emailAddressState = useValidateInput({
    defaultValue: userProfile?.email,
    validate: validateUsername
  });
  const firstNameState = useValidateInput({
    defaultValue: userProfile?.firstName,
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
      firstNameState.onChangeText(userProfile?.firstName || "");
      genderState.onChangeText(userProfile?.gender || "");
      emailAddressState.onChangeText(userProfile?.email || "");
      birthDayState.onChangeText(userProfile?.birthday || "");
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
          gender: genderState.value,
          language: "en",
          birthday: birthDayState.value
        });
        if (session) {
          userStore.setState({
            userProfile: {
              id: session.id,
              email: session.email,
              firstName: session.firstName,
              gender: session.gender,
              language: session.language,
              createdAt: session.createdAt,
              updatedAt: session.updatedAt,
              birthday: session.birthday
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

  const handleDeleteAccount = useMemoFunc(
    actionWithLoading(async () => {
      try {
        const { data: session } = await deleteAccount(passwordState.value);

        console.log(" actionWithLoading 💯 session:", session);

        if (session) {
          authenStore.setState({ cookie: undefined });
          userStore.setState({ userProfile: undefined });
          setIsLoggedIn(false);
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
    genderState,
    emailAddressState,
    onUpdateProfile,
    handleDeleteAccount,
    setUpdateProfileSuccess,
    birthDayState,
    passwordState
  };
};
