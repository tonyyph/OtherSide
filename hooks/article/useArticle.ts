import { getArticles } from "@/api";
import { useUserAuthenticateStore } from "@/stores";
import { authenStore } from "@/stores/authenStore";
import { useUserArticleStore } from "@/stores/user-article/store";
import { AxiosError } from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useProfile } from "../profile/useProfile";

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
  const { isArticled, setIsArticled } = useUserArticleStore();
  const { setIsLoggedIn } = useUserAuthenticateStore();
  const { userProfile } = useProfile();
  useLayoutEffect(() => {
    fetchArticles(1, false);
  }, []);

  useEffect(() => {
    fetchArticles(1, false, filter);
  }, [isArticled, filter]);

  const fetchArticles = async (
    pageNum: number,
    append = false,
    filter: string = "live"
  ) => {
    try {
      if (!append) setLoading(true);
      else setIsFetchingMore(true);

      const skip = (pageNum - 1) * parseInt(limit, 10);
      console.log("parseInt(limit, 10)", parseInt(limit, 10));

      console.log(" limit:", limit);

      console.log(" pageNum:", pageNum);

      console.log(" skip:", skip);

      const { data: session } = await getArticles({
        limit,
        skip: skip.toString(),
        random: isRandom,
        filter: filter
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
    console.log(" fetchMore 💯 pages:", pages);

    if (isFetchingMore) {
      fetchArticles(pages + 1, true);
    }
  };

  return {
    articles: data,
    loading,
    fetchMore,
    loadingMore: isFetchingMore,
    role: userProfile?.role
  };
};
