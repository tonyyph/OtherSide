import { getAuctions, getMeUserToken, handleTriggerBid } from "@/api";
import { authenStore } from "@/stores/authenStore";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useMemoFunc } from "./commons";
import { useAuctionStore } from "@/stores/auctionStore";

export const useAuction = () => {
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { setAuctionData } = useAuctionStore();
  const fetchUserToken = useCallback(async () => {
    try {
      const { data: session } = await getMeUserToken();
      return session;
    } catch (error) {
      console.log(
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
    }
  }, []);

  useEffect(() => {
    fetchUserToken();
  }, [fetchUserToken]);

  const fetchAuctions = useCallback(
    async (pageNum: number, append = false, currentFilter: string = "live") => {
      try {
        if (!append) setLoading(true);
        else setIsFetchingMore(true);

        const { data: session } = await getAuctions();
        const auctions = session?.data || [];
        setAuctionData(auctions);
      } catch (error) {
        console.log(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
        authenStore.setState({ cookie: undefined });
      } finally {
        if (!append) setLoading(false);
        setIsFetchingMore(false);
      }
    },
    []
  );

  const fetchMore = ({ pages }: { pages: number }) => {
    if (!isFetchingMore) {
      fetchAuctions(pages, true);
    }
  };

  const handleOnBid = useMemoFunc(async (id: string, bidValue: number) => {
    setLoading(true);
    try {
      const { data: session } = await handleTriggerBid(id, bidValue);
      if (session) {
        fetchAuctions(1, false);
      }
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
    loading,
    fetchMore,
    loadingMore: isFetchingMore,
    handleOnBid,
    fetchAuctions
  };
};
