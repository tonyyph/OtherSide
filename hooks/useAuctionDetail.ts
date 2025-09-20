import { getAuctionsDetail, getListAuctionsBid } from "@/api";
import { AxiosError } from "axios";
import { useState } from "react";
import { useMemoFunc } from "./commons";

export const useAuctionDetail = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [listBid, setListBid] = useState<any>();
  const getAuctionsDetails = useMemoFunc(async (id: string) => {
    try {
      const { data: session } = await getAuctionsDetail(id);
      const { data: sessionBids } = await getListAuctionsBid(id);

      setData(session);
      setListBid(sessionBids?.data);
    } catch (error) {
      console.log(
        "error",
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    } finally {
      setLoading(false);
    }
  });

  const getListAuctionsBids = useMemoFunc(async (id: string) => {
    try {
      const { data: session } = await getListAuctionsBid(id);

      setListBid(session);
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
    getListAuctionsBids,
    loading,
    auction: data,
    listBid
  };
};
