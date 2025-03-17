import { getArticles } from "@/api";
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
  isRandom = false
}: {
  limit: string;
  isRandom?: boolean;
}) => {
  const [data, setData] = useState<Article[]>();
  const [loading, setLoading] = useState(true);
  const { isArticled, setIsArticled } = useUserArticleStore();

  useLayoutEffect(() => {
    setIsArticled(true);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data: session } = await getArticles({
          limit: limit,
          skip: "0",
          random: isRandom
        });

        setData(session?.articles);
      } catch (error) {
        console.log(
          (error as AxiosError<RestfulApiError>).response?.data?.message
        );
      } finally {
        setLoading(false);
        setIsArticled(false);
      }
    };

    !!isArticled && fetchArticles();
  }, [isArticled]);

  return {
    articles: data,
    loading: loading
  };
};
