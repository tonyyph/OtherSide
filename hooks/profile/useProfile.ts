import { getUserProfile } from "@/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

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
export const useProfile = () => {
  const [data, setData] = useState<userProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setData(response.data);
      } catch (error) {
        console.log(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return {
    userProfile: data,
    loading: loading
  };
};
