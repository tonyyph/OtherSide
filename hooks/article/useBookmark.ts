import { getBookmarks } from "@/api";
import { useUserBookmarkStore } from "@/stores/user-bookmark/store";
import { AxiosError } from "axios";
import { useEffect, useLayoutEffect, useState } from "react";

export const useBookmark = () => {
  const [data, setData] = useState<GetEngagementResponse>();
  const [loading, setLoading] = useState(true);
  const { isBookmarked, setIsBookmarked } = useUserBookmarkStore();

  useLayoutEffect(() => {
    setIsBookmarked(true);
  }, []);

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
        setIsBookmarked(false);
      }
    };

    !!isBookmarked && fetchBookmarks();
  }, [isBookmarked]);

  return {
    bookmarks: data,
    loading: loading
  };
};
