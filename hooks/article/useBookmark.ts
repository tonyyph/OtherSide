import { getBookmarks } from "@/api";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useBookmark = () => {
  const [data, setData] = useState<GetEngagementResponse>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data: session } = await getBookmarks();
        setData(session);
      } catch (error) {
        console.log(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return {
    bookmarks: data,
    loading: loading
  };
};
