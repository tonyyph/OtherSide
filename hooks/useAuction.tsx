import { getAuctions, handleTriggerBid } from "@/api";
import { authenStore } from "@/stores/authenStore";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useMemoFunc } from "./commons";

export const useAuction = ({
  limit,
  page,
  filter = "live"
}: {
  limit?: string;
  page?: number;
  filter?: string;
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const fetchAuctions = useCallback(
    async (pageNum: number, append = false, currentFilter: string = "live") => {
      try {
        if (!append) setLoading(true);
        else setIsFetchingMore(true);

        const { data: session } = await getAuctions();
        const auctions = session?.data || [];

        setData((prevData) => (append ? [...prevData, ...auctions] : auctions));
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
        fetchAuctions(1, false, filter);
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
    auctions: data,
    loading,
    fetchMore,
    loadingMore: isFetchingMore,
    handleOnBid,
    fetchAuctions
  };
};
