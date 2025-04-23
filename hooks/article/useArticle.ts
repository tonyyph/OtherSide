import { getArticles } from "@/api";
import { useUserAuthenticateStore } from "@/stores";
import { authenStore } from "@/stores/authenStore";
import { useUserArticleStore } from "@/stores/user-article/store";
import { AxiosError } from "axios";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useProfile } from "../profile/useProfile";

type Article = {
  isBookmarked: boolean;
  isUnRead: boolean;
  createdAt: Date;
  leftPerspective: {
    id: number;
    title: string;
    content: string;
    category: Category[];
    imageUrl: string;
    likeCount: number;
    commentCount: number;
    dislikeCount: number;
  };
  rightPerspective: {
    id: number;
    title: string;
    content: string;
    category: Category[];
    imageUrl: string;
    likeCount: number;
    commentCount: number;
    dislikeCount: number;
  };
};

export const useArticle = ({
  limit,
  page,
  isRandom = false,
  filter = "live"
}: {
  limit: string;
  page: number;
  isRandom?: boolean;
  filter?: string;
}) => {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { isArticled, setIsArticled } = useUserArticleStore();

  const { setIsLoggedIn } = useUserAuthenticateStore();
  const { userProfile } = useProfile();

  const fetchArticles = useCallback(
    async (pageNum: number, append = false, currentFilter: string = "live") => {
      try {
        if (!append) setLoading(true);
        else setIsFetchingMore(true);

        const skip = (pageNum - 1) * parseInt(limit, 10);

        const { data: session } = await getArticles({
          limit,
          skip: skip.toString(),
          random: isRandom,
          filter: currentFilter
        });

        const articles = session?.articles || [];

        setData((prevData) => (append ? [...prevData, ...articles] : articles));
        setHasMore(articles.length === parseInt(limit, 10));
      } catch (error) {
        console.log(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
        setIsLoggedIn(false);
        authenStore.setState({ cookie: undefined });
      } finally {
        if (!append) setLoading(false);
        setIsFetchingMore(false);
        setIsArticled(false);
      }
    },
    [limit, isRandom, setIsArticled, setIsLoggedIn]
  );

  const fetchMore = ({ pages }: { pages: number }) => {
    if (!isFetchingMore && hasMore) {
      fetchArticles(pages, true);
    }
  };

  useLayoutEffect(() => {
    fetchArticles(1, false, filter);
  }, [fetchArticles, filter]);

  useEffect(() => {
    fetchArticles(1, false, filter);
  }, [isArticled, filter, setIsArticled, fetchArticles]);

  return {
    articles: data,
    loading,
    fetchMore,
    loadingMore: isFetchingMore,
    hasMore,
    role: userProfile?.role
  };
};
