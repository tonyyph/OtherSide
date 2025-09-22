import { getListAuctionsMe } from "@/api";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMemoFunc } from "./commons";

export const useAuctionMe = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const getAuctionsDetails = useMemoFunc(async (id: string) => {
    try {
      const { data: session } = await getListAuctionsMe();

      setData(session);
    } catch (error) {
      console.log(
        "error",
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  });

  return {
    getAuctionsDetails,
    loading,
    auction: data
  };
};
