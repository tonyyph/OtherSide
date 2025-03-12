import { getUserProfile } from "@/api";
import { useUserAuthenticateStore } from "@/stores";
import { authenStore } from "@/stores/authenStore";
import { useUserProfileStore } from "@/stores/user-profile/store";
import { userStore } from "@/stores/userStore";
import { AxiosError } from "axios";
import { useEffect, useLayoutEffect, useState } from "react";

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
export const useProfile = () => {
  const [data, setData] = useState<userProps>();
  const [loading, setLoading] = useState(true);
  const { setIsLoggedIn } = useUserAuthenticateStore();
  const { isUpdateProfile, setIsUpdateProfile } = useUserProfileStore();

  useLayoutEffect(() => {
    setIsUpdateProfile(true);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: session } = await getUserProfile();
        userStore.setState({ userProfile: session });

        setData(session);
      } catch (error) {
        setIsLoggedIn(false);
        authenStore.setState({
          cookie: undefined
        });
        console.log(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
      } finally {
        setIsUpdateProfile(false);
        setLoading(false);
      }
    };

    !!isUpdateProfile && fetchUserProfile();
  }, [isUpdateProfile]);

  return {
    userProfile: data,
    loading: loading
  };
};
