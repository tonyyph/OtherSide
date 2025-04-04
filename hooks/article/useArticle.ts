import { getArticles } from "@/api";
import { useUserAuthenticateStore } from "@/stores";
import { authenStore } from "@/stores/authenStore";
import { useUserArticleStore } from "@/stores/user-article/store";
import { AxiosError } from "axios";
import { useEffect, useLayoutEffect, useState } from "react";

type Category = {};

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
  isRandom = false
}: {
  limit: string;
  page: number;
  isRandom?: boolean;
}) => {
  const [data, setData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { isArticled, setIsArticled } = useUserArticleStore();
  const { setIsLoggedIn } = useUserAuthenticateStore();

  useLayoutEffect(() => {
    fetchArticles(1);
  }, []);

  useEffect(() => {
    if (isArticled) fetchArticles(1);
  }, [isArticled]);

  const fetchArticles = async (pageNum: number, append = false) => {
    try {
      if (!append) setLoading(true);
      else setIsFetchingMore(true);

      const skip = (pageNum - 1) * parseInt(limit, 10);
      const { data: session } = await getArticles({
        limit,
        skip: skip.toString(),
        random: isRandom
      });

      setData((prevData) =>
        append ? [...prevData, ...session?.articles] : session?.articles
      );
    } catch (error) {
      console.log(
        (error as AxiosError<RestfulApiError>).response?.data?.message
      );
      setIsLoggedIn(false);
      authenStore.setState({
        cookie: undefined
      });
    } finally {
      if (!append) setLoading(false);
      setIsFetchingMore(false);
      setIsArticled(false);
    }
  };

  const fetchMore = ({ pages }: { pages: number }) => {
    if (!isFetchingMore) {
      fetchArticles(pages + 1, true);
    }
  };

  return {
    articles: data,
    loading,
    fetchMore,
    loadingMore: isFetchingMore
  };
};
